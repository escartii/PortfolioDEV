<?php
require_once './includes/config.php';
require_once './includes/db.php';
$pageTitle = 'PadelBook - Gestión de Reservas para Pistas de Pádel';
include './includes/header.php';
?>

<div class="hero-section">
    <div class="hero-content">
        <h1>Gestiona tu club de <span class="text-gradient">pádel</span></h1>
        <p class="hero-subtitle">Reservas online, gestión de pistas, torneos y estadísticas. Todo en una sola plataforma.</p>
        <div class="hero-buttons">
            <a href="register.php" class="btn btn-primary btn-lg">Comenzar prueba gratuita</a>
            <a href="#features" class="btn btn-outline btn-lg">Ver características</a>
        </div>
    </div>
    <div class="hero-image">
        <img src="assets/img/hero-image.png" alt="PadelBook Dashboard">
    </div>
</div>

<section id="features" class="section features-section">
    <div class="container">
        <h2 class="section-title">Funcionalidades Que Transforman Tu <span class="text-primary">Club</span></h2>
        <p class="section-description">Herramientas avanzadas diseñadas específicamente para centros de pádel, que mejoran la experiencia de jugadores y gestores 🎾</p>
        
        <div class="features-grid">
            <!-- Reservas simplificadas -->
            <div class="feature-card">
                <h3>Reservas simplificadas</h3>
                <p>Sistema intuitivo de reserva de pistas que permite a los usuarios ver disponibilidad en tiempo real y hacer reservas en segundos.</p>
                <div class="feature-image">
                    <img src="assets/img/features/reservas.png" alt="Reservas simplificadas">
                    <div class="feature-badge">¡Pista 3 reservada!</div>
                </div>
                <a href="features/reservas.php" class="feature-link">Ver demo <i class="fas fa-arrow-right"></i></a>
            </div>
            
            <!-- Gestión de torneos -->
            <div class="feature-card">
                <h3>Gestión de torneos</h3>
                <p>Organiza competiciones con facilidad. Gestiona inscripciones, emparejamientos y resultados para mantener a tus jugadores comprometidos.</p>
                <div class="feature-image">
                    <img src="assets/img/features/torneos.png" alt="Gestión de torneos">
                    <div class="feature-detail">
                        <span class="badge badge-primary">24-26 Mayo</span>
                        <div class="price-tag">25€ por pareja</div>
                    </div>
                </div>
                <a href="features/torneos.php" class="feature-link">Explorar <i class="fas fa-arrow-right"></i></a>
            </div>
            
            <!-- Análisis Avanzado -->
            <div class="feature-card">
                <h3>Análisis Avanzado</h3>
                <p>Obtén datos detallados sobre la ocupación de tus pistas, preferencias de los usuarios y tendencias para optimizar tu negocio.</p>
                <div class="feature-image">
                    <img src="assets/img/features/analytics.png" alt="Análisis Avanzado">
                    <div class="stats-preview">
                        <div class="stat-item">
                            <div class="stat-label">Reservas</div>
                            <div class="stat-value">438</div>
                            <div class="stat-change positive">+24%</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Ocupación</div>
                            <div class="stat-value">76%</div>
                            <div class="stat-change positive">+8%</div>
                        </div>
                    </div>
                </div>
                <a href="features/analytics.php" class="feature-link">Ver analytics <i class="fas fa-arrow-right"></i></a>
            </div>
            
            <!-- App para jugadores -->
            <div class="feature-card">
                <h3>App para jugadores</h3>
                <p>Ofrece a tus clientes una experiencia premium con una app móvil intuitiva para reservas, pagos y notificaciones.</p>
                <div class="feature-image">
                    <img src="assets/img/features/app.png" alt="App para jugadores">
                    <div class="mobile-preview">
                        <div class="mobile-screen">
                            <div class="mobile-header">
                                <div class="mobile-title">Reservar</div>
                            </div>
                            <div class="mobile-content">
                                <div class="mobile-court">Pista 4 • Disponible</div>
                                <div class="mobile-time">17:00 - 18:30</div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="./features/app.php" class="feature-link">Ver funciones <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>
</section>

<section class="section pricing-section bg-light">
    <div class="container">
        <h2 class="section-title">Planes <span class="text-primary">Sencillos</span></h2>
        <p class="section-description">Precios transparentes que escalan con tu club. Sin sorpresas ni comisiones ocultas.</p>
        
        <div class="pricing-cards">
            <!-- Plan básico -->
            <div class="pricing-card">
                <div class="pricing-header">
                    <h3>Starter</h3>
                    <div class="pricing-price">
                        <span class="price">49€</span>
                        <span class="period">/mensual</span>
                    </div>
                    <p class="pricing-description">Perfecto para clubs pequeños con hasta 3 pistas</p>
                </div>
                <div class="pricing-features">
                    <ul>
                        <li><i class="fas fa-check"></i> Hasta 3 pistas de pádel</li>
                        <li><i class="fas fa-check"></i> Reservas ilimitadas</li>
                        <li><i class="fas fa-check"></i> Calendario básico</li>
                        <li><i class="fas fa-check"></i> Análisis básico de ocupación</li>
                        <li><i class="fas fa-check"></i> Soporte por email</li>
                    </ul>
                </div>
                <div class="pricing-action">
                    <a href="register.php?plan=starter" class="btn btn-outline btn-block">Comenzar prueba gratis</a>
                </div>
            </div>
            
            <!-- Plan Premium -->
            <div class="pricing-card popular">
                <div class="popular-badge">Más popular</div>
                <div class="pricing-header">
                    <h3>Premium</h3>
                    <div class="pricing-price">
                        <span class="price">99€</span>
                        <span class="period">/mensual</span>
                    </div>
                    <p class="pricing-description">Ideal para clubs medianos con mayor afluencia</p>
                </div>
                <div class="pricing-features">
                    <ul>
                        <li><i class="fas fa-check"></i> Hasta 10 pistas de pádel</li>
                        <li><i class="fas fa-check"></i> Reservas ilimitadas</li>
                        <li><i class="fas fa-check"></i> Calendario avanzado</li>
                        <li><i class="fas fa-check"></i> Análisis detallado</li>
                        <li><i class="fas fa-check"></i> Integración con pagos</li>
                        <li><i class="fas fa-check"></i> Soporte prioritario</li>
                        <li><i class="fas fa-check"></i> Sistema de torneos</li>
                    </ul>
                </div>
                <div class="pricing-action">
                    <a href="register.php?plan=premium" class="btn btn-primary btn-block">Probar 14 días gratis</a>
                </div>
            </div>
            
            <!-- Plan Enterprise -->
            <div class="pricing-card">
                <div class="pricing-header">
                    <h3>Enterprise</h3>
                    <div class="pricing-price">
                        <span class="price">199€</span>
                        <span class="period">/mensual</span>
                    </div>
                    <p class="pricing-description">Para grandes clubs y cadenas con múltiples sedes</p>
                </div>
                <div class="pricing-features">
                    <ul>
                        <li><i class="fas fa-check"></i> Pistas ilimitadas</li>
                        <li><i class="fas fa-check"></i> Multi-sede</li>
                        <li><i class="fas fa-check"></i> Sistema de torneos avanzado</li>
                        <li><i class="fas fa-check"></i> API personalizada</li>
                        <li><i class="fas fa-check"></i> Panel de administración avanzado</li>
                        <li><i class="fas fa-check"></i> Soporte 24/7</li>
                        <li><i class="fas fa-check"></i> App personalizada</li>
                    </ul>
                </div>
                <div class="pricing-action">
                    <a href="contact.php?plan=enterprise" class="btn btn-outline btn-block">Contactar ventas</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include './includes/footer.php'; ?>