<?php
require_once 'includes/config.php';
require_once 'includes/db.php';

// Si ya está logueado, redirigir al dashboard
if (is_logged_in()) {
    redirect('dashboard.php');
}

$email = $password = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = clean_input($_POST['email']);
    $password = $_POST['password'];
    
    // Validar email
    if (empty($email)) {
        $errors['email'] = 'El correo electrónico es obligatorio';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'El formato del correo electrónico no es válido';
    }
    
    // Validar contraseña
    if (empty($password)) {
        $errors['password'] = 'La contraseña es obligatoria';
    }
    
    // Si no hay errores, proceder con la autenticación
    if (empty($errors)) {
        $db->query('SELECT * FROM users WHERE email = :email AND status = "active"');
        $db->bind(':email', $email);
        $user = $db->single();
        
        if ($user && password_verify($password, $user['password_hash'])) {
            // Iniciar sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['name'] = $user['first_name'] . ' ' . $user['last_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            
            // Actualizar último login
            $db->query('UPDATE users SET last_login = NOW() WHERE id = :id');
            $db->bind(':id', $user['id']);
            $db->execute();
            
            // Redirigir según el rol
            if ($user['role'] === 'admin' || $user['role'] === 'club_admin') {
                redirect('admin/dashboard.php');
            } else {
                redirect('dashboard.php');
            }
        } else {
            $errors['login'] = 'Credenciales inválidas';
        }
    }
}

$pageTitle = 'Iniciar Sesión - PadelBook';
include 'includes/header.php';
?>

<div class="auth-container">
    <div class="auth-card">
        <div class="auth-header">
            <h2>Iniciar Sesión</h2>
            <p>Bienvenido de nuevo a PadelBook</p>
        </div>
        
        <?php if (!empty($errors['login'])): ?>
            <div class="alert alert-danger">
                <?php echo $errors['login']; ?>
            </div>
        <?php endif; ?>
        
        <form action="login.php" method="POST" class="auth-form">
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" value="<?php echo $email; ?>" class="form-control <?php echo !empty($errors['email']) ? 'is-invalid' : ''; ?>">
                <?php if (!empty($errors['email'])): ?>
                    <div class="invalid-feedback"><?php echo $errors['email']; ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" class="form-control <?php echo !empty($errors['password']) ? 'is-invalid' : ''; ?>">
                <?php if (!empty($errors['password'])): ?>
                    <div class="invalid-feedback"><?php echo $errors['password']; ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group form-check">
                <input type="checkbox" id="remember" name="remember" class="form-check-input">
                <label for="remember" class="form-check-label">Recordar sesión</label>
                <a href="forgot_password.php" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión</button>
            </div>
        </form>
        
        <div class="social-login">
            <div class="divider">
                <span>O continúa con</span>
            </div>
            
            <a href="google_login.php" class="btn btn-google">
                <img src="assets/img/google-icon.svg" alt="Google"> Google
            </a>
        </div>
        
        <div class="auth-footer">
            <p>¿No tienes una cuenta? <a href="register.php">Regístrate</a></p>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>