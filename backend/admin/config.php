<?php
// Configuración de la aplicación
define('APP_NAME', 'PadelBook');
define('APP_URL', 'http://localhost/padelbook'); // Cambia esto a tu URL base
define('ASSETS_URL', APP_URL . '/assets');

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Cambia a tu contraseña de MySQL
define('DB_NAME', 'padelbook_db');

// Configuración de sesión
ini_set('session.cookie_httponly', 1);
session_start();

// Zona horaria
date_default_timezone_set('Europe/Madrid');

// Configuración de Google OAuth (tendrías que obtener tus propias credenciales)
define('GOOGLE_CLIENT_ID', 'tu-client-id-de-google');
define('GOOGLE_CLIENT_SECRET', 'tu-client-secret-de-google');
define('GOOGLE_REDIRECT_URI', APP_URL . '/google_callback.php');

// Funciones de utilidad
function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function redirect($location) {
    header("Location: $location");
    exit;
}

function is_admin() {
    return is_logged_in() && ($_SESSION['role'] === 'admin' || $_SESSION['role'] === 'club_admin');
}

function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>