document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }
  
  // Sidebar toggle for dashboard
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }
  
  // Inicializar recaptcha si existe
  if (typeof grecaptcha !== 'undefined' && document.querySelector('.g-recaptcha')) {
    grecaptcha.ready(function() {
      grecaptcha.execute('your-recaptcha-site-key', {action: 'submit'}).then(function(token) {
        document.getElementById('g-recaptcha-response').value = token;
      });
    });
  }
  
  // Mostrar/ocultar contraseña
  const passwordToggles = document.querySelectorAll('.password-toggle');
  
  passwordToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      const passwordInput = toggle.previousElementSibling;
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Cambiar icono
      toggle.querySelector('i').classList.toggle('fa-eye');
      toggle.querySelector('i').classList.toggle('fa-eye-slash');
    });
  });
  
  // Animación de scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Inicializar autocompletar para direcciones si existe
  const addressInputs = document.querySelectorAll('.address-autocomplete');
  
  if (addressInputs.length > 0 && typeof google !== 'undefined') {
    addressInputs.forEach(function(input) {
      const autocomplete = new google.maps.places.Autocomplete(input);
      
      autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        
        if (place.geometry) {
          // Llenar campos relacionados
          document.getElementById('city').value = place.address_components.find(c => c.types.includes('locality'))?.long_name || '';
          document.getElementById('postal_code').value = place.address_components.find(c => c.types.includes('postal_code'))?.long_name || '';
          document.getElementById('country').value = place.address_components.find(c => c.types.includes('country'))?.long_name || '';
        }
      });
    });
  }
});