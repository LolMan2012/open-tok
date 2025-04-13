<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

$usersFile = "../data/users.json";
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

if (!isset($users[$username])) {
    echo json_encode(["success" => false, "message" => "Nom d'utilisateur introuvable."]);
    exit;
}

if (!password_verify($password, $users[$username])) {
    echo json_encode(["success" => false, "message" => "Mot de passe incorrect."]);
    exit;
}

echo json_encode(["success" => true]);
