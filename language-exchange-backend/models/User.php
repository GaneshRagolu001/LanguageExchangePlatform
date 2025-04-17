<?php
class User
{
    private $con;

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function createProfile($data)
    {
        $stmt = $this->con->prepare(
            "UPDATE users 
             SET native_language = ?, 
                 learning_language = ?, 
                 bio = ?, 
                 profile_picture = ?
             WHERE email = ?"
        );

        $stmt->execute([
            $data['native_language'],
            $data['learning_language'],
            $data['bio'] ?? '',
            $data['profile_picture'] ?? null,
            $data['email'],
        ]);
        return $stmt->rowCount();
    }

    public function findByEmail($email)
    {
        $stmt = $this->con->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    public function getProfile($userId)
    {
        $stmt = $this->con->prepare("SELECT * FROM users WHERE id = ?");
        // $stmt = $this->con->prepare("SELECT id, name, email,
        //  native_language, learning_language, bio, profile_picture FROM users WHERE id = ?");

        $stmt->execute([$userId]);
        return $stmt->fetch();
    }

    public function updateProfile($userId, $data)
    {
        $query = "UPDATE users SET 
        native_language = ?, 
        learning_language = ?, 
        bio = ?, 
        interests = ?, 
        location = ?" .
            (isset($data['profile_picture']) ? ", profile_picture = ?" : "") .
            " WHERE id = ?";

        $params = [
            $data['native_language'] ?? null,
            $data['learning_language'] ?? null,
            $data['bio'] ?? null,
            $data['interests'] ?? null,
            $data['location'] ?? null,
        ];

        if (isset($data['profile_picture'])) {
            $params[] = $data['profile_picture'];
        }

        $params[] = $userId;

        $stmt = $this->con->prepare($query);
        return $stmt->execute($params);
    }

    public function createConnection($user_id, $connection_id)
    {
        // Helper to update one direction
        $updateConnection = function ($source_id, $target_id) {
            $query = "SELECT connected_user_ids FROM users WHERE id = ?";
            $stmt = $this->con->prepare($query);
            $stmt->execute([$source_id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $connectedIds = isset($row['connected_user_ids']) ? json_decode($row['connected_user_ids'], true) : [];

            if (!in_array($target_id, $connectedIds)) {
                $connectedIds[] = $target_id;
                $updatedJson = json_encode($connectedIds);

                $updateQuery = "UPDATE users SET connected_user_ids = ? WHERE id = ?";
                $updateStmt = $this->con->prepare($updateQuery);
                return $updateStmt->execute([$updatedJson, $source_id]);
            }

            return true;
        };

        // Run in both directions
        $success1 = $updateConnection($user_id, $connection_id);
        $success2 = $updateConnection($connection_id, $user_id);

        return $success1 && $success2;
    }

    public function findMatches($user_id)
    {
        $stmt = $this->con->prepare("SELECT native_language, learning_language FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) return [];

        $native = $user['native_language'];
        $learning = $user['learning_language'];



        $matchStmt = $this->con->prepare("
        SELECT id, name, email, native_language, learning_language, bio
        FROM users
        WHERE 
        LOWER(TRIM(native_language)) = LOWER(TRIM(?))
        AND LOWER(TRIM(learning_language)) = LOWER(TRIM(?))
        AND id != ?
        ");
        $matchStmt->execute([$learning, $native, $user_id]);

        $results =  $matchStmt->fetchAll(PDO::FETCH_ASSOC);


        return $results;
    }

    public function getConnections($userId)
    {
        // Step 1: Fetch the user's connections
        $stmt = $this->con->prepare("SELECT connected_user_ids FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row || empty($row['connected_user_ids'])) {
            return [];
        }

        // Decode and filter
        $connectedIds = json_decode($row['connected_user_ids'], true);

        if (!is_array($connectedIds)) {
            return [];
        }

        // Filter out null or invalid IDs, and reindex array
        $filteredIds = array_values(array_filter($connectedIds, function ($id) {
            return is_numeric($id) && $id !== null;
        }));

        if (empty($filteredIds)) {
            return [];
        }

        // Step 2: Prepare query with dynamic placeholders
        $placeholders = implode(',', array_fill(0, count($filteredIds), '?'));

        $query = "
            SELECT id, name, email, native_language, learning_language, bio, profile_picture, interests, location
            FROM users
            WHERE id IN ($placeholders)
        ";

        $stmt = $this->con->prepare($query);
        $stmt->execute($filteredIds); // Now the number of placeholders matches the parameters

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
