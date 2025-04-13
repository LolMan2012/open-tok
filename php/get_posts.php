<?php
// Connexion à la base de données (à adapter selon ta config)
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'open_tok';

$conn = new mysqli($host, $user, $pass, $db);

// Vérification de la connexion
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Récupérer tous les posts
$sql = "SELECT * FROM posts";
$result = $conn->query($sql);

$posts = [];
while ($row = $result->fetch_assoc()) {
  $posts[] = $row;
}

// Retourner les posts au format JSON
echo json_encode($posts);
?>
