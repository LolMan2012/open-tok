<?php
header("Content-Type: application/json");

$username = $_GET['username'] ?? '';
$username = trim($username);

if (!$username) {
    echo json_encode(["exists" => false]);
    exit;
}

$usersFile = "../data/users.json";
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

echo json_encode(["exists" => isset($users[$username])]);
