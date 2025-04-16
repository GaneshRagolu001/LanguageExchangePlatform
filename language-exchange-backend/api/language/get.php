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

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    return json_response(['error' => 'User ID required'], 400);
}

$controller = new LanguageController($pdo);

$languages = $controller->getLanguagesByUser($userId);

json_response($languages);
