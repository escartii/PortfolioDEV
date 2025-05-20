<?php
require_once 'includes/config.php';
require_once 'includes/db.php';

// Si ya está logueado, redirigir al dashboard
if (is_logged_in()) {
    redirect('dashboard.php');
}

$first_name = $last_name = $email = $phone = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first_name = clean_input($_POST['first_name']);
    $last_name = clean_input($_POST['last_name']);
    $email = clean_input($_POST['email']);
    $phone = clean_input($_POST['phone']);
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];
    
    // Validaciones
    if (empty($first_name)) {
        $errors['first_name'] = 'El nombre es obligatorio';
    }
    
    if (empty($last_name)) {
        $errors['last_name'] = 'Los apellidos son obligatorios';
    }
    
    if (empty($email)) {
        $errors['email'] = 'El correo electrónico es obligatorio';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'El formato del correo electrónico no es válido';
    } else {
        // Verificar si el email ya existe
        $db->query('SELECT id FROM users WHERE email = :email');
        $db->bind(':email', $email);
        if ($db->rowCount() > 0) {
            $errors['email'] = 'Este correo electrónico ya está registrado';
        }
    }
    
    if (empty($password)) {
        $errors['password'] = 'La contraseña es obligatoria';
    } elseif (strlen($password) < 6) {
        $errors['password'] = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if ($password !== $password_confirm) {
        $errors['password_confirm'] = 'Las contraseñas no coinciden';
    }
    
    // Si no hay errores, crear el usuario
    if (empty($errors)) {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        $db->query('INSERT INTO users (first_name, last_name, email, phone, password_hash, role) VALUES (:first_name, :last_name, :email, :phone, :password_hash, "player")');
        $db->bind(':first_name', $first_name);
        $db->bind(':last_name', $last_name);
        $db->bind(':email', $email);
        $db->bind(':phone', $phone);
        $db->bind(':password_hash', $password_hash);
        
        if ($db->execute()) {
            $user_id = $db->lastInsertId();
            
            // Iniciar sesión automáticamente
            $_SESSION['user_id'] = $user_id;
            $_SESSION['name'] = $first_name . ' ' . $last_name;
            $_SESSION['email'] = $email;
            $_SESSION['role'] = 'player';
            
            redirect('dashboard.php');
        } else {
            $errors['db'] = 'Error al crear la cuenta. Inténtalo de nuevo.';
        }
    }
}

$pageTitle = 'Registro - PadelBook';
include 'includes/header.php';
?>

<div class="auth-container">
    <div class="auth-card register-card">
        <div class="auth-header">
            <h2>Crear Cuenta</h2>
            <p>Únete a PadelBook y comienza a gestionar tu club de pádel</p>
        </div>
        
        <?php if (!empty($errors['db'])): ?>
            <div class="alert alert-danger">
                <?php echo $errors['db']; ?>
            </div>
        <?php endif; ?>
        
        <form action="register.php" method="POST" class="auth-form">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="first_name">Nombre</label>
                    <input type="text" id="first_name" name="first_name" value="<?php echo $first_name; ?>" class="form-control <?php echo !empty($errors['first_name']) ? 'is-invalid' : ''; ?>">
                    <?php if (!empty($errors['first_name'])): ?>
                        <div class="invalid-feedback"><?php echo $errors['first_name']; ?></div>
                    <?php endif; ?>
                </div>
                
                <div class="form-group col-md-6">
                    <label for="last_name">Apellidos</label>
                    <input type="text" id="last_name" name="last_name" value="<?php echo $last_name; ?>" class="form-control <?php echo !empty($errors['last_name']) ? 'is-invalid' : ''; ?>">
                    <?php if (!empty($errors['last_name'])): ?>
                        <div class="invalid-feedback"><?php echo $errors['last_name']; ?></div>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" value="<?php echo $email; ?>" class="form-control <?php echo !empty($errors['email']) ? 'is-invalid' : ''; ?>">
                <?php if (!empty($errors['email'])): ?>
                    <div class="invalid-feedback"><?php echo $errors['email']; ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label for="phone">Teléfono (opcional)</label>
                <input type="tel" id="phone" name="phone" value="<?php echo $phone; ?>" class="form-control">
            </div>
            
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" class="form-control <?php echo !empty($errors['password']) ? 'is-invalid' : ''; ?>">
                    <?php if (!empty($errors['password'])): ?>
                        <div class="invalid-feedback"><?php echo $errors['password']; ?></div>
                    <?php endif; ?>
                </div>
                
                <div class="form-group col-md-6">
                    <label for="password_confirm">Confirmar Contraseña</label>
                    <input type="password" id="password_confirm" name="password_confirm" class="form-control <?php echo !empty($errors['password_confirm']) ? 'is-invalid' : ''; ?>">
                    <?php if (!empty($errors['password_confirm'])): ?>
                        <div class="invalid-feedback"><?php echo $errors['password_confirm']; ?></div>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="form-group form-check">
                <input type="checkbox" id="terms" name="terms" class="form-check-input" required>
                <label for="terms" class="form-check-label">Acepto los <a href="terms.php">términos y condiciones</a></label>
            </div>
            
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Crear Cuenta</button>
            </div>
        </form>
        
        <div class="social-login">
            <div class="divider">
                <span>O regístrate con</span>
            </div>
            
            <a href="google_login.php" class="btn btn-google">
                <img src="assets/img/google-icon.svg" alt="Google"> Google
            </a>
        </div>
        
        <div class="auth-footer">
            <p>¿Ya tienes una cuenta? <a href="login.php">Iniciar Sesión</a></p>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>