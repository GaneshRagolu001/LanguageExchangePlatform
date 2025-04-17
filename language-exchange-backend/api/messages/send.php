<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once __DIR__ . '/../../helpers/cors.php';

// === Handle preflight OPTIONS request ===
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../controllers/MessageController.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';

$userId = authenticate();

if (!$userId) {
    json_response(['error' => 'Unauthorized'], 401);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$senderId = $data['sender_id'] ?? null;
$receiverId = $data['receiver_id'] ?? null;
$message = $data['message'] ?? null;

// Ensure both sender_id and receiver_id are provided
if (!$senderId || !$receiverId || !$message) {
    return json_response(['error' => 'All fields are required'], 400);
}



$controller = new MessageController($pdo);
$success = $controller->send($senderId, $receiverId, $message);

if ($success) {
    return json_response(['success' => true, 'message' => 'Message sent']);
} else {
    return json_response(['error' => 'Failed to send message'], 500);
}
