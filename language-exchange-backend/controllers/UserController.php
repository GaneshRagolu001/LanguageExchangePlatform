<?php
require_once __DIR__ . '/../models/User.php';

class UserController
{
    private $usermodel;

    public function __construct($pdo)
    {
        $this->usermodel = new User($pdo);
    }

    public function createProfile($data)
    {
        $existing = $this->usermodel->findByEmail($data['email']);
        if (!$existing) return ['success' => false, 'error' => 'Email does not exits'];

        $updatedLines = $this->usermodel->createProfile($data);
        return ($updatedLines != 0)
            ? ['success' => true, 'message' => 'User profile created']
            : ['success' => false, 'error' => 'Could not create user'];
    }

    public function getProfile($userId)
    {
        $profile = $this->usermodel->getProfile($userId);

        if ($profile) {
            return ['success' => true, 'data' => $profile];
        } else {

            return ['success' => false, 'error' => 'User not found'];
        }
    }

    public function updateProfile($userId, $data)
    {
        $updated = $this->usermodel->updateProfile($userId, $data);

        if ($updated) {
            return ['success' => true, 'message' => 'profile updated'];
        } else {

            return ['success' => false, 'error' => 'profile updation failed'];
        }
    }

    public function createConnection($userId, $connection_id)
    {
        $created = $this->usermodel->createConnection($userId, $connection_id);

        if ($created) {
            return ['success' => true, 'message' => 'connection created'. $created];
        } else {

            return ['success' => false, 'error' => 'profile updation failed'];
        }
    }
    public function getConnections($userId)
    {
        $connections = $this->usermodel->getConnections($userId);

        if ($connections) {
            return ['success' => true, 'data' => $connections ];
        } else {

            return ['success' => false, 'error' => 'retrieving connections failed'];
        }
    }

    public function matchUsers($userId)
    {
        return $this->usermodel->findMatches($userId);
    }
}
