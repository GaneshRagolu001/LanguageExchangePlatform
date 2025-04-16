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

    public function findMatches($user_id)
    {
        $stmt = $this->con->prepare("SELECT native_language, learning_language FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) return [];

        $native = $user['native_language'];
        $learning = $user['learning_language'];

        echo "Looking for users who speak '$learning' and want to learn '$native'<br>";

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

        echo "Found " . count($results) . " matches<br>";

        return $results;
    }
}
