<?php
require_once __DIR__ . '/../../helpers/cors.php';
require_once __DIR__ . '/../../controllers/UserController.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';

$userId = authenticate();

if (!$userId) {
    json_response(['error' => 'Unauthorized'], 401);
    exit();
}


$userId = $_GET['id'] ?? null;

if (!$userId) return json_response(['error' => 'User Id required'], 400);

$controller = new UserController($pdo);

$result = $controller->getProfile($userId);
json_response($result);
