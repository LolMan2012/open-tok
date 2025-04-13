<?php
// Vérifier si le fichier a bien été envoyé
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $uploadDir = 'uploads/'; // Répertoire où les fichiers seront sauvegardés

    // Créer le répertoire uploads si il n'existe pas
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Vérification du type de fichier
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (in_array($file['type'], $allowedTypes)) {
        // Nom du fichier avec son extension
        $fileName = basename($file['name']);
        $filePath = $uploadDir . $fileName;

        // Déplacer le fichier téléchargé vers le dossier
        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            echo "Le fichier a été téléchargé avec succès.";
        } else {
            echo "Erreur lors du téléchargement du fichier.";
        }
    } else {
        echo "Type de fichier non autorisé.";
    }
} else {
    echo "Aucun fichier téléchargé.";
}
?>
