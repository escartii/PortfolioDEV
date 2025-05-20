<?php
require_once 'includes/config.php';
require_once 'includes/db.php';

// Proteger página - solo usuarios logueados
if (!is_logged_in()) {
    redirect('login.php');
}

$user_id = $_SESSION['user_id'];

// Obtener datos del usuario
$db->query('SELECT * FROM users WHERE id = :id');
$db->bind(':id', $user_id);
$user = $db->single();

// Obtener próximas reservas
$db->query('SELECT b.*, c.name as court_name 
           FROM bookings b 
           JOIN courts c ON b.court_id = c.id 
           WHERE b.user_id = :user_id 
           AND b.date >= CURDATE() 
           AND b.status IN ("pending", "confirmed") 
           ORDER BY b.date ASC, b.start_time ASC 
           LIMIT 5');
$db->bind(':user_id', $user_id);
$upcoming_bookings = $db->resultSet();

// Obtener torneos inscritos
$db->query('SELECT t.*, tr.status as registration_status 
           FROM tournaments t 
           JOIN tournament_registrations tr ON t.id = tr.tournament_id 
           WHERE tr.user_id = :user_id 
           AND t.end_date >= CURDATE()
           ORDER BY t.start_date ASC 
           LIMIT 3');
$db->bind(':user_id', $user_id);
$tournaments = $db->resultSet();

$pageTitle = 'Dashboard - PadelBook';
$activeNav = 'dashboard';
include 'includes/header.php';
?>

<div class="dashboard-container">
    <?php include 'includes/sidebar.php'; ?>
    
    <div class="dashboard-content">
        <div class="dashboard-header">
            <h1>Bienvenido, <?php echo htmlspecialchars($user['first_name']); ?></h1>
            <p>Gestiona tus reservas, torneos y más desde este panel</p>
        </div>
        
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                    <h3>Próximas Reservas</h3>
                    <?php
                    $db->query('SELECT COUNT(*) as count FROM bookings WHERE user_id = :user_id AND date >= CURDATE() AND status IN ("pending", "confirmed")');
                    $db->bind(':user_id', $user_id);
                    $booking_count = $db->single()['count'];
                    ?>
                    <p class="stat-number"><?php echo $booking_count; ?></p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-content">
                    <h3>Torneos Inscritos</h3>
                    <?php
                    $db->query('SELECT COUNT(*) as count FROM tournament_registrations WHERE user_id = :user_id AND status IN ("pending", "confirmed")');
                    $db->bind(':user_id', $user_id);
                    $tournament_count = $db->single()['count'];
                    ?>
                    <p class="stat-number"><?php echo $tournament_count; ?></p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-history"></i>
                </div>
                <div class="stat-content">
                    <h3>Historial Reservas</h3>
                    <?php
                    $db->query('SELECT COUNT(*) as count FROM bookings WHERE user_id = :user_id AND (date < CURDATE() OR status = "completed")');
                    $db->bind(':user_id', $user_id);
                    $history_count = $db->single()['count'];
                    ?>
                    <p class="stat-number"><?php echo $history_count; ?></p>
                </div>
            </div>
        </div>
        
        <div class="dashboard-widgets">
            <div class="widget bookings-widget">
                <div class="widget-h