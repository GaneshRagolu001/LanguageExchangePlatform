<?php
require_once __DIR__ . '/../../helpers/cors.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../controllers/UserController.php';
require_once __DIR__ . '/../../helpers/jwt.php';


$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

// Validate input
if (!$email || !$password) {
    return json_response(['error' => 'Email and password are required'], 400);
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
    return json_response(['error' => 'Invalid email or password'], 400);
}

$jwt = generate_jwt($user['id']);

json_response(['token' => $jwt, 'user' => $user], 200);
exit();