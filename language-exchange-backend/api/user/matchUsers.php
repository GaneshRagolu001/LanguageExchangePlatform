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

$user_id = $_GET["id"] ?? null;

if (!$user_id) {
    return json_response(['error' => 'User ID is required'], 400);
}

$controller = new UserController($pdo);

$matches = $controller->matchUsers($user_id);
json_response($matches);
