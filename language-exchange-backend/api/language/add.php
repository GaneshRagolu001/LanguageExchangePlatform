<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once __DIR__ . '/../../helpers/cors.php'; 

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../controllers/LanguageController.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../auth/authenticate.php';


$userId = authenticate();

if (!$userId) {

    json_response(['error' => 'Unauthorized' + $userId], 401);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);

$userId = $data['user_id'] ?? null;
$language = $data['language'] ?? null;
$level = $data['proficiency_level'] ?? null;
$learning = $data['learning'] ?? false;

$controller = new LanguageController($pdo);
$success = $controller->addLanguage($userId, $language, $level, $learning);

if ($success) {
    json_response(['success' => true]);
} else {
    json_response(['error' => 'Failed to add language'], 500);
}
