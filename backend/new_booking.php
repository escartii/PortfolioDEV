<?php
require_once 'includes/config.php';
require_once 'includes/db.php';

// Proteger página - solo usuarios logueados
if (!is_logged_in()) {
    redirect('login.php');
}

$user_id = $_SESSION['user_id'];
$step = isset($_GET['step']) ? intval($_GET['step']) : 1;
$errors = [];
$success = false;

// Obtener todos los clubes (si son varios)
$db->query('SELECT * FROM clubs WHERE status = "active" ORDER BY name');
$clubs = $db->resultSet();

// Si hay POST y estamos en el paso 3, significa que estamos confirmando la reserva
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $step === 3) {
    $court_id = $_POST['court_id'];
    $date = $_POST['date'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $player_ids = isset($_POST['players']) ? $_POST['players'] : [];
    
    // Validaciones básicas
    if (empty($court_id) || empty($date) || empty($start_time) || empty($end_time)) {
        $errors[] = 'Todos los campos son obligatorios';
    }
    
    // Verificar disponibilidad
    if (empty($errors)) {
        $db->query("SELECT * FROM bookings WHERE court_id = :court_id AND date = :date AND 
                   ((start_time <= :start_time AND end_time > :start_time) OR 
                    (start_time < :end_time AND end_time >= :end_time) OR 
                    (start_time >= :start_time AND end_time <= :end_time)) AND 
                   status IN ('pending', 'confirmed')");
        $db->bind(':court_id', $court_id);
        $db->bind(':date', $date);
        $db->bind(':start_time', $start_time);
        $db->bind(':end_time', $end_time);
        
        $existing_bookings = $db->resultSet();
        
        if (count($existing_bookings) > 0) {
            $errors[] = 'La pista ya está reservada en ese horario';
        }
    }
    
    // Calcular precio
    if (empty($errors)) {
        $db->query("SELECT cs.price_per_slot FROM court_schedules cs 
                   WHERE cs.court_id = :court_id AND cs.day_of_week = WEEKDAY(:date)");
        $db->bind(':court_id', $court_id);
        $db->bind(':date', $date);
        $price_info = $db->single();
        
        if (!$price_info) {
            $errors[] = 'No se ha podido calcular el precio para este horario';
        } else {
            $price_per_slot = $price_info['price_per_slot'];
            
            // Calcular duración en minutos
            $start_dt = new DateTime($start_time);
            $end_dt = new DateTime($end_time);
            $duration_minutes = ($end_dt->getTimestamp() - $start_dt->getTimestamp()) / 60;
            
            $standard_slot = 90; // minutos (asumiendo que un slot estándar es de 90 minutos)
            $total_price = ($duration_minutes / $standard_slot) * $price_per_slot;
        }
    }
    
    // Crear la reserva si no hay errores
    if (empty($errors)) {
        $db->query("INSERT INTO bookings (court_id, user_id, date, start_time, end_time, total_price, status, payment_status, created_at) 
                   VALUES (:court_id, :user_id, :date, :start_time, :end_time, :total_price, 'pending', 'pending', NOW())");
        $db->bind(':court_id', $court_id);
        $db->bind(':user_id', $user_id);
        $db->bind(':date', $date);
        $db->bind(':start_time', $start_time);
        $db->bind(':end_time', $end_time);
        $db->bind(':total_price', $total_price);
        
        $db->execute();
        $booking_id = $db->lastInsertId();
        
        // Añadir jugadores adicionales si hay
        if (!empty($player_ids)) {
            foreach ($player_ids as $player_id) {
                $db->query("INSERT INTO booking_players (booking_id, user_id) VALUES (:booking_id, :player_id)");
                $db->bind(':booking_id', $booking_id);
                $db->bind(':player_id', $player_id);
                $db->execute();
            }
        }
        
        $success = true;
    }
}

$pageTitle = 'Nueva Reserva - PadelBook';
$activeNav = 'bookings';
include 'includes/header.php';
?>

<div class="dashboard-container">
    <?php include 'includes/sidebar.php'; ?>
    
    <div class="dashboard-content">
        <div class="booking-container">
            <div class="booking-header">
                <h1>Reserva de Pista</h1>
                <div class="booking-steps">
                    <div class="step <?php echo $step >= 1 ? 'active' : ''; ?>">
                        <div class="step-number">1</div>
                        <div class="step-title">Club y Fecha</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step <?php echo $step >= 2 ? 'active' : ''; ?>">
                        <div class="step-number">2</div>
                        <div class="step-title">Pista y Hora</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step <?php echo $step >= 3 ? 'active' : ''; ?>">
                        <div class="step-number">3</div>
                        <div class="step-title">Confirmación</div>
                    </div>
                </div>
            </div>
            
            <?php if (!empty($errors)): ?>
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo $error; ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>
            
            <?php if ($success): ?>
                <div class="booking-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>¡Reserva Confirmada!</h2>
                    <p>Tu reserva se ha realizado correctamente.</p>
                    <div class="booking-details">
                        <?php
                        // Obtener detalles de la reserva recién creada
                        $db->query("SELECT b.*, c.name as court_name, cl.name as club_name 
                                   FROM bookings b 
                                   JOIN courts c ON b.court_id = c.id 
                                   JOIN clubs cl ON c.club_id = cl.id 
                                   WHERE b.id = :id");
                        $db->bind(':id', $booking_id);
                        $booking = $db->single();
                        ?>
                        
                        <div class="detail-item">
                            <div class="detail-label">Club:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($booking['club_name']); ?></div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Pista:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($booking['court_name']); ?></div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Fecha:</div>
                            <div class="detail-value"><?php echo date('d/m/Y', strtotime($booking['date'])); ?></div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Hora:</div>
                            <div class="detail-value">
                                <?php echo substr($booking['start_time'], 0, 5); ?> - <?php echo substr($booking['end_time'], 0, 5); ?>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Precio:</div>
                            <div class="detail-value"><?php echo number_format($booking['total_price'], 2); ?>€</div>
                        </div>
                    </div>
                    
                    <div class="success-actions">
                        <a href="dashboard.php" class="btn btn-primary">Volver al Dashboard</a>
                        <a href="booking_detail.php?id=<?php echo $booking_id; ?>" class="btn btn-outline-primary">Ver Detalles</a>
                    </div>
                </div>
            <?php elseif ($step === 1): ?>
                <!-- Paso 1: Seleccionar Club y Fecha -->
                <div class="booking-step-content">
                    <form action="new_booking.php?step=2" method="GET" id="step1Form">
                        <input type="hidden" name="step" value="2">
                        
                        <div class="form-group">
                            <label for="club_id">Club</label>
                            <select id="club_id" name="club_id" class="form-control" required>
                                <option value="">Selecciona un club</option>
                                <?php foreach ($clubs as $club): ?>
                                    <option value="<?php echo $club['id']; ?>"><?php echo htmlspecialchars($club['name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="booking_date">Fecha</label>
                            <input type="date" id="booking_date" name="date" class="form-control" 
                                  min="<?php echo date('Y-m-d'); ?>" 
                                  max="<?php echo date('Y-m-d', strtotime('+30 days')); ?>" 
                                  required>
                        </div>
                        
                        <div class="form-buttons">
                            <button type="submit" class="btn btn-primary">Continuar <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </form>
                </div>
                
            <?php elseif ($step === 2): ?>
                <!-- Paso 2: Seleccionar Pista y Hora -->
                <?php
                $club_id = isset($_GET['club_id']) ? intval($_GET['club_id']) : 0;
                $date = isset($_GET['date']) ? $_GET['date'] : date('Y-m-d');
                
                // Validar fecha
                $today = date('Y-m-d');
                $max_date = date('Y-m-d', strtotime('+30 days'));
                
                if ($date < $today || $date > $max_date) {
                    $date = $today;
                }
                
                // Obtener pistas disponibles para el club
                $db->query("SELECT c.* FROM courts c WHERE c.club_id = :club_id AND c.status = 'active'");
                $db->bind(':club_id', $club_id);
                $courts = $db->resultSet();
                
                // Obtener reservas para la fecha seleccionada
                $db->query("SELECT b.* FROM bookings b 
                           JOIN courts c ON b.court_id = c.id 
                           WHERE c.club_id = :club_id AND b.date = :date AND b.status IN ('pending', 'confirmed')");
                $db->bind(':club_id', $club_id);
                $db->bind(':date', $date);
                $existing_bookings = $db->resultSet();
                
                // Mapear reservas por pista para fácil referencia
                $bookings_by_court = [];
                foreach ($existing_bookings as $booking) {
                    if (!isset($bookings_by_court[$booking['court_id']])) {
                        $bookings_by_court[$booking['court_id']] = [];
                    }
                    $bookings_by_court[$booking['court_id']][] = $booking;
                }
                
                // Obtener horarios de apertura para el día seleccionado
                $day_of_week = date('N', strtotime($date)) - 1; // 0 (lunes) a 6 (domingo)
                
                $db->query("SELECT cs.* FROM court_schedules cs 
                           JOIN courts c ON cs.court_id = c.id 
                           WHERE c.club_id = :club_id AND cs.day_of_week = :day_of_week");
                $db->bind(':club_id', $club_id);
                $db->bind(':day_of_week', $day_of_week);
                $schedules = $db->resultSet();
                
                // Mapear horarios por pista
                $schedules_by_court = [];
                foreach ($schedules as $schedule) {
                    $schedules_by_court[$schedule['court_id']] = $schedule;
                }
                ?>
                
                <div class="booking-step-content">
                    <div class="booking-date-navigation">
                        <a href="new_booking.php?step=2&club_id=<?php echo $club_id; ?>&date=<?php echo date('Y-m-d', strtotime($date . ' -1 day')); ?>" class="btn btn-sm btn-outline-secondary <?php echo $date <= $today ? 'disabled' : ''; ?>">
                            <i class="fas fa-chevron-left"></i> Día anterior
                        </a>
                        
                        <h3><?php echo date('d M, Y', strtotime($date)); ?></h3>
                        
                        <a href="new_booking.php?step=2&club_id=<?php echo $club_id; ?>&date=<?php echo date('Y-m-d', strtotime($date . ' +1 day')); ?>" class="btn btn-sm btn-outline-secondary <?php echo $date >= $max_date ? 'disabled' : ''; ?>">
                            Día siguiente <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                    
                    <div class="courts-container">
                        <?php if (count($courts) > 0): ?>
                            <?php foreach ($courts as $court): ?>
                                <div class="court-card">
                                    <div class="court-header">
                                        <h3><?php echo htmlspecialchars($court['name']); ?></h3>
                                        <span class="court-type badge badge-info">
                                            <?php echo $court['type'] === 'indoor' ? 'Cubierta' : 'Exterior'; ?>
                                        </span>
                                    </div>
                                    
                                    <?php if (isset($schedules_by_court[$court['id']])): ?>
                                        <?php
                                        $schedule = $schedules_by_court[$court['id']];
                                        $open_time = $schedule['open_time'];
                                        $close_time = $schedule['close_time'];
                                        $slot_duration = $schedule['slot_duration'];
                                        
                                        // Generar slots de tiempo
                                        $slots = [];
                                        $current_time = strtotime("1970-01-01 $open_time");
                                        $end_time = strtotime("1970-01-01 $close_time");
                                        
                                        while ($current_time < $end_time) {
                                            $slot_start = date('H:i', $current_time);
                                            $current_time += $slot_duration * 60;
                                            $slot_end = date('H:i', $current_time);
                                            
                                            $slots[] = [
                                                'start' => $slot_start,
                                                'end' => $slot_end,
                                                'booked' => false
                                            ];
                                        }
                                        
                                        // Marcar slots ocupados
                                        if (isset($bookings_by_court[$court['id']])) {
                                            foreach ($bookings_by_court[$court['id']] as $booking) {
                                                $booking_start = substr($booking['start_time'], 0, 5);
                                                $booking_end = substr($booking['end_time'], 0, 5);
                                                
                                                foreach ($slots as &$slot) {
                                                    if (($slot['start'] >= $booking_start && $slot['start'] < $booking_end) ||
                                                        ($slot['end'] > $booking_start && $slot['end'] <= $booking_end) ||
                                                        ($slot['start'] <= $booking_start && $slot['end'] >= $booking_end)) {
                                                        $slot['booked'] = true;
                                                    }
                                                }
                                            }
                                        }
                                        ?>
                                        
                                        <div class="time-slots">
                                            <?php foreach ($slots as $slot): ?>
                                                <label class="slot-item <?php echo $slot['booked'] ? 'booked' : ''; ?>">
                                                    <input type="radio" name="time_slot" 
                                                           value="<?php echo $court['id']; ?>|<?php echo $slot['start']; ?>|<?php echo $slot['end']; ?>" 
                                                           <?php echo $slot['booked'] ? 'disabled' : ''; ?>>
                                                    <span class="slot-time"><?php echo $slot['start']; ?> - <?php echo $slot['end']; ?></span>
                                                    <?php if ($slot['booked']): ?>
                                                        <span class="booked-label">Ocupado</span>
                                                    <?php else: ?>
                                                        <span class="price-label"><?php echo number_format($schedule['price_per_slot'], 2); ?>€</span>
                                                    <?php endif; ?>
                                                </label>
                                            <?php endforeach; ?>
                                        </div>
                                    <?php else: ?>
                                        <div class="court-closed">
                                            <p>No hay horarios disponibles para esta pista en la fecha seleccionada</p>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="no-courts">
                                <p>No hay pistas disponibles para este club</p>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <form action="new_booking.php?step=3" method="GET" id="step2Form">
                        <input type="hidden" name="step" value="3">
                        <input type="hidden" name="club_id" value="<?php echo $club_id; ?>">
                        <input type="hidden" name="date" value="<?php echo $date; ?>">
                        <input type="hidden" id="selected_court" name="court_id" value="">
                        <input type="hidden" id="selected_start" name="start_time" value="">
                        <input type="hidden" id="selected_end" name="end_time" value="">
                        
                        <div class="form-buttons">
                            <a href="new_booking.php?step=1" class="btn btn-outline-secondary">
                                <i class="fas fa-arrow-left"></i> Atrás
                            </a>
                            <button type="submit" class="btn btn-primary" id="continueBtn" disabled>
                                Continuar <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const slotRadios = document.querySelectorAll('input[name="time_slot"]');
                        const courtInput = document.getElementById('selected_court');
                        const startInput = document.getElementById('selected_start');
                        const endInput = document.getElementById('selected_end');
                        const continueBtn = document.getElementById('continueBtn');
                        
                        slotRadios.forEach(radio => {
                            radio.addEventListener('change', function() {
                                if (this.checked) {
                                    // El valor está en formato "court_id|start_time|end_time"
                                    const [courtId, startTime, endTime] = this.value.split('|');
                                    
                                    courtInput.value = courtId;
                                    startInput.value = startTime;
                                    endInput.value = endTime;
                                    continueBtn.disabled = false;
                                }
                            });
                        });
                    });
                </script>
                
            <?php elseif ($step === 3): ?>
                <!-- Paso 3: Confirmar Reserva -->
                <?php
                $club_id = isset($_GET['club_id']) ? intval($_GET['club_id']) : 0;
                $court_id = isset($_GET['court_id']) ? intval($_GET['court_id']) : 0;
                $date = isset($_GET['date']) ? $_GET['date'] : '';
                $start_time = isset($_GET['start_time']) ? $_GET['start_time'] : '';
                $end_time = isset($_GET['end_time']) ? $_GET['end_time'] : '';
                
                // Obtener información del club y pista
                $db->query("SELECT c.name as court_name, c.type as court_type, cl.name as club_name
                           FROM courts c 
                           JOIN clubs cl ON c.club_id = cl.id 
                           WHERE c.id = :court_id");
                $db->bind(':court_id', $court_id);
                $court_info = $db->single();
                
                // Obtener precio
                $db->query("SELECT cs.price_per_slot FROM court_schedules cs 
                           WHERE cs.court_id = :court_id AND cs.day_of_week = WEEKDAY(:date)");
                $db->bind(':court_id', $court_id);
                $db->bind(':date', $date);
                $price_info = $db->single();
                
                if ($price_info) {
                    $price_per_slot = $price_info['price_per_slot'];
                    
                    // Calcular duración en minutos
                    $start_dt = new DateTime($start_time);
                    $end_dt = new DateTime($end_time);
                    $duration_minutes = ($end_dt->getTimestamp() - $start_dt->getTimestamp()) / 60;
                    
                    $standard_slot = 90; // minutos
                    $total_price = ($duration_minutes / $standard_slot) * $price_per_slot;
                } else {
                    $total_price = 0;
                }
                
                // Obtener amigos (para invitar)
                $db->query("SELECT id, first_name, last_name FROM users 
                           WHERE id != :user_id AND status = 'active' 
                           ORDER BY first_name, last_name");
                $db->bind(':user_id', $user_id);
                $friends = $db->resultSet();
                ?>
                
                <div class="booking-step-content">
                    <div class="booking-summary">
                        <h3>Resumen de tu Reserva</h3>
                        
                        <div class="summary-details">
                            <div class="detail-item">
                                <div class="detail-label">Club:</div>
                                <div class="detail-value"><?php echo htmlspecialchars($court_info['club_name']); ?></div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">Pista:</div>
                                <div class="detail-value">
                                    <?php echo htmlspecialchars($court_info['court_name']); ?>
                                    <span class="badge badge-info">
                                        <?php echo $court_info['court_type'] === 'indoor' ? 'Cubierta' : 'Exterior'; ?>
                                    </span>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">Fecha:</div>
                                <div class="detail-value"><?php echo date('d/m/Y', strtotime($date)); ?></div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">Hora:</div>
                                <div class="detail-value"><?php echo $start_time; ?> - <?php echo $end_time; ?></div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">Precio:</div>
                                <div class="detail-value"><?php echo number_format($total_price, 2); ?>€</div>
                            </div>
                        </div>
                    </div>
                    
                    <form action="new_booking.php?step=3" method="POST" id="confirmForm">
                        <input type="hidden" name="court_id" value="<?php echo $court_id; ?>">
                        <input type="hidden" name="date" value="<?php echo $date; ?>">
                        <input type="hidden" name="start_time" value="<?php echo $start_time; ?>">
                        <input type="hidden" name="end_time" value="<?php echo $end_time; ?>">
                        
                        <div class="form-group">
                            <label>Invitar Jugadores (opcional)</label>
                            <div class="invited-players">
                                <?php if (count($friends) > 0): ?>
                                    <?php foreach (array_slice($friends, 0, 3) as $friend): ?>
                                        <div class="player-checkbox">
                                            <input type="checkbox" name="players[]" id="player_<?php echo $friend['id']; ?>" value="<?php echo $friend['id']; ?>">
                                            <label for="player_<?php echo $friend['id']; ?>">
                                                <?php echo htmlspecialchars($friend['first_name'] . ' ' . $friend['last_name']); ?>
                                            </label>
                                        </div>
                                    <?php endforeach; ?>
                                    
                                    <?php if (count($friends) > 3): ?>
                                        <div class="player-more">
                                            <a href="#" id="showMorePlayers">Mostrar más</a>
                                            
                                            <div id="morePlayers" style="display: none;">
                                                <?php foreach (array_slice($friends, 3) as $friend): ?>
                                                    <div class="player-checkbox">
                                                        <input type="checkbox" name="players[]" id="player_<?php echo $friend['id']; ?>" value="<?php echo $friend['id']; ?>">
                                                        <label for="player_<?php echo $friend['id']; ?>">
                                                            <?php echo htmlspecialchars($friend['first_name'] . ' ' . $friend['last_name']); ?>
                                                        </label>
                                                    </div>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    <?php endif; ?>
                                <?php else: ?>
                                    <p>No tienes amigos para invitar</p>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <div class="form-buttons">
                            <a href="new_booking.php?step=2&club_id=<?php echo $club_id; ?>&date=<?php echo $date; ?>" class="btn btn-outline-secondary">
                                <i class="fas fa-arrow-left"></i> Atrás
                            </a>
                            <button type="submit" class="btn btn-primary">
                                Confirmar Reserva <i class="fas fa-check"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const showMoreBtn = document.getElementById('showMorePlayers');
                        const morePlayers = document.getElementById('morePlayers');
                        
                        if (showMoreBtn) {
                            showMoreBtn.addEventListener('click', function(e) {
                                e.preventDefault();
                                morePlayers.style.display = morePlayers.style.display === 'none' ? 'block' : 'none';
                                showMoreBtn.textContent = morePlayers.style.display === 'none' ? 'Mostrar más' : 'Mostrar menos';
                            });
                        }
                    });
                </script>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>