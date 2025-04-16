<?php
// getchat.php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../controllers/MessageController.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';
require_once __DIR__ . '/../../helpers/cors.php'; 

$userId = authenticate();

 
$user1 = $_GET['user1'] ?? null;
$user2 = $_GET['user2'] ?? null;

if (!$user1 || !$user2) {
    return json_response(['error' => 'User IDs required'], 400);
}

$controller = new MessageController($pdo);
$chat = $controller->fetchChat($user1, $user2);

json_response($chat);
