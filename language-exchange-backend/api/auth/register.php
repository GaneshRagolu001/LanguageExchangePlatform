<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../controllers/UserController.php';
require_once __DIR__ . '/../../helpers/cors.php'; 

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$name = $data['name'] ?? null;

// Validate data
if (!$email || !$password || !$name) {
    return json_response(['error' => 'All fields are required'], 400);  
}

// Check if user already exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
    return json_response(['error' => 'Email already in use'], 400);
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert the new user into the database
$stmt = $pdo->prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
$stmt->execute([$email, $hashedPassword, $name]);

json_response(['message' => 'User registered successfully'], 200);
