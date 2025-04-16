<?php
require_once __DIR__ . '/../../controllers/UserController.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';
require_once __DIR__ . '/../../helpers/cors.php';

$userId = authenticate();

if (!$userId) {
    json_response(['error' => 'Unauthorized'], 401);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$required = ['email', 'native_language', 'learning_language'];

foreach ($required as $field) {
    if (empty($data[$field])) {
        json_response(['error' => "$field is required"], 400);
    }
}

$controller = new UserController($pdo);
$result = $controller->createProfile($data);
json_response($result);
