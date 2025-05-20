<?php
require_once 'includes/config.php';
require_once 'includes/db.php';

// Inicializar cliente de Google
$client = new Google_Client();
$client->setClientId(GOOGLE_CLIENT_ID);
$client->setClientSecret(GOOGLE_CLIENT_SECRET);
$client->setRedirectUri(GOOGLE_REDIRECT_URI);

if (isset($_GET['code'])) {
    // Cambiar el código por un token de acceso
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);
    
    // Obtener información del usuario
    $google_oauth = new Google_Service_Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();
    
    // Datos del usuario
    $email = $google_account_info->email;
    $name = $google_account_info->givenName;
    $surname = $google_account_info->familyName;
    $google_id = $google_account_info->id;
    $picture = $google_account_info->picture;
    
    // Comprobar si el usuario existe
    $db->query('SELECT * FROM users WHERE google_id = :google_id OR email = :email');
    $db->bind(':google_id', $google_id);
    $db->bind(':email', $email);
    $existing_user = $db->single();
    
    if ($existing_user) {
        // Actualizar usuario si es necesario
        if (!$existing_user['google_id']) {
            // Vincular cuenta existente con Google
            $db->query('UPDATE users SET google_id = :google_id, profile_image = :profile_image WHERE id = :id');
            $db->bind(':google_id', $google_id);
            $db->bind(':profile_image', $picture);
            $db->bind(':id', $existing_user['id']);
            $db->execute();
        }
        
        // Iniciar sesión
        $_SESSION['user_id'] = $existing_user['id'];
        $_SESSION['name'] = $existing_user['first_name'] . ' ' . $existing_user['last_name'];
        $_SESSION['email'] = $existing_user['email'];
        $_SESSION['role'] = $existing_user['role'];
        
        // Actualizar último login
        $db->query('UPDATE users SET last_login = NOW() WHERE id = :id');
        $db->bind(':id', $existing_user['id']);
        $db->execute();
        
        // Redirigir según el rol
        if ($existing_user['role'] === 'admin' || $existing_user['role'] === 'club_admin') {
            redirect('admin/dashboard.php');
        } else {
            redirect('dashboard.php');
        }
    } else {
        // Crear nuevo usuario
        $db->query('INSERT INTO users (first_name, last_name, email, google_id, profile_image, password_hash, role, status) 
                   VALUES (:first_name, :last_name, :email, :google_id, :profile_image, :password_hash, "player", "active")');
        $db->bind(':first_name', $name);
        $db->bind(':last_name', $surname);
        $db->bind(':email', $email);
        $db->bind(':google_id', $google_id);
        $db->bind(':profile_image', $picture);
        $db->bind(':password_hash', password_hash(bin2hex(random_bytes(16)), PASSWORD_DEFAULT)); // Contraseña aleatoria
        
        if ($db->execute()) {
            $user_id = $db->lastInsertId();
            
            // Iniciar sesión
            $_SESSION['user_id'] = $user_id;
            $_SESSION['name'] = $name . ' ' . $surname;
            $_SESSION['email'] = $email;
            $_SESSION['role'] = 'player';
            
            redirect('dashboard.php');
        } else {
            // Error al crear usuario
            $_SESSION['error'] = 'Error al crear la cuenta. Inténtalo de nuevo.';
            redirect('login.php');
        }
    }
} else {
    // Si no hay código, redirigir al login
    redirect('login.php');
}
?>