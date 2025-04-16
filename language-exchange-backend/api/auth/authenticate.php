<?php
require_once __DIR__ . '/../../helpers/jwt.php';

function getAuthorizationHeader()
{
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                return trim($value);
            }
        }
    }
    return null;
}

function authenticate()
{
    $authHeader = getAuthorizationHeader();
    if ($authHeader) {
        $token = str_replace('Bearer ', '', $authHeader);
        try {
            $user_id = validate_jwt($token);
            return $user_id;
        } catch (Exception $e) {
            error_log("JWT decode failed: " . $e->getMessage()); // log for debugging
            return null;
        }
    }
    return null;
}

$userId = authenticate();

if (!$userId) {
    json_response(['error' => 'Unauthorized'], 401);
    exit();
}
