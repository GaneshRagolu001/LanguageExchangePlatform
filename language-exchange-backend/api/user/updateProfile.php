<?php
require_once __DIR__ . '/../../helpers/cors.php';
require_once __DIR__ . '/../../controllers/UserController.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';

// Authenticate user
$authUserId = authenticate();
if (!$authUserId) {
    json_response(['error' => 'Unauthorized'], 401);
    exit();
}

// Get user ID from query param (optional override)
$userId = $_GET['id'] ?? $authUserId;
if (!$userId) {
    return json_response(['error' => 'UserId is required'], 400);
}

// Collect form data
$data = [
    'native_language' => $_POST['native_language'] ?? null,
    'learning_language' => $_POST['learning_language'] ?? null,
    'bio' => $_POST['bio'] ?? null,
    'interests' => $_POST['interests'] ?? null,
    'location' => $_POST['location'] ?? null,
];

// Handle profile picture upload
if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../../uploads/profile_pics/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = pathinfo($_FILES['profile_picture']['name'], PATHINFO_EXTENSION);
    $filename = uniqid("profile_", true) . '.' . $ext;
    $destination = $uploadDir . $filename;

    if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $destination)) {
        // Store relative path or public URL
        $data['profile_picture'] = "/uploads/profile_pics/" . $filename;
    } else {
        return json_response(['error' => 'Failed to upload profile picture'], 500);
    }
}

$controller = new UserController($pdo);
$result = $controller->updateProfile($userId, $data);

return json_response($result);
