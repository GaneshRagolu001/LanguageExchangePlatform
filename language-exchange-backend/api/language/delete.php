<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../controllers/LanguageController.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';
require_once __DIR__ . '/../../helpers/cors.php'; 

$userId = authenticate();

if (!$userId) {
    json_response(['error' => 'Unauthorized'], 401);
    exit();
}

$id = $_GET['id'] ?? null;

if (!$id) {
    return json_response(['error' => 'Language ID required'], 400);
}

$controller = new LanguageController($pdo);
$success = $controller->deleteLanguage($id);

if ($success) {
    json_response(['success' => true]);
} else {
    json_response(['error' => 'Failed to delete language'], 500);
}
