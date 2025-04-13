<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (!$username || !$password) {
    echo json_encode(["success" => false, "message" => "Champs requis manquants."]);
    exit;
}

$usersFile = "../data/users.json";
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

if (isset($users[$username])) {
    echo json_encode(["success" => false, "message" => "Ce nom d'utilisateur existe déjà."]);
    exit;
}

$users[$username] = password_hash($password, PASSWORD_DEFAULT);
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
