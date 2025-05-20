<?php
require_once 'includes/config.php';
require_once 'includes/db.php';

// Inicializar cliente de Google
$client = new Google_Client();
$client->setClientId(GOOGLE_CLIENT_ID);
$client->setClientSecret(GOOGLE_CLIENT_SECRET);
$client->setRedirectUri(GOOGLE_REDIRECT_URI);
$client->addScope("email");
$client->addScope("profile");

// Crear URL de autenticación
$auth_url = $client->createAuthUrl();

// Redirigir a la página de autenticación de Google
header('Location: ' . $auth_url);
exit;
?>