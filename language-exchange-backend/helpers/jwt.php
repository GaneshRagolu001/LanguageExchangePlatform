<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Make sure this path is correct

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

define('SECRET_KEY', 'f1b8cfe6a3f55e78418b28c7f4a3ea015e4d2e2281db76229e8e9748cd927f90'); // You may want to define a static key in production

function generate_jwt($userId)
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;
    $payload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'sub' => $userId
    ];

    return JWT::encode($payload, SECRET_KEY, 'HS256');
}

function validate_jwt($jwt)
{
    try {
        $decoded = JWT::decode($jwt, new Key(SECRET_KEY, 'HS256'));
        return $decoded->sub;
    } catch (Exception $e) {
        throw new Exception('Invalid token');
    }
}
