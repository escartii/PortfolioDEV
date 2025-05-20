document.addEventListener('DOMContentLoaded', function() {
  // Calendario de reservas
  const calendarEl = document.getElementById('booking-calendar');
  
  if (calendarEl) {
    // Obtener el ID de la pista desde el atributo data
    const courtId = calendarEl.dataset.courtId;
    
    // Inicializar variables para la API
    let selectedDate = new Date();
    let selectedSlot = null;
    
    // Función para cargar disponibilidad
    function loadAvailability(date, courtId) {
      // Formatear fecha para la API
      const formattedDate = date.toISOString().split('T')[0];
      
      // Mostrar spinner de carga
      const loadingEl = document.getElementById('calendar-loading');
      const slotsEl = document.getElementById('time-slots');
      
      if (loadingEl) loadingEl.style.display = 'block';
      if (slotsEl) slotsEl.innerHTML = '';
      
      // Realizar petición AJAX
      fetch(`api/availability.php?court_id=${courtId}&date=${formattedDate}`)
        .then(response => response.json())
        .then(data => {
          if (loadingEl) loadingEl.style.display = 'none';
          
          // Comprobar si hay horarios definidos
          if (!data.schedules || data.schedules.length === 0) {
            if (slotsEl) {
              slotsEl.innerHTML = '<div class="no-slots">No hay horarios disponibles para esta fecha</div>';
            }
            return;
          }
          
          // Generar slots de tiempo
          const slots = generateTimeSlots(data.schedules, data.bookings);
          
          if (slotsEl) {
            // Limpiar contenedor
            slotsEl.innerHTML = '';
            
            // Crear elementos de slot
            slots.forEach(slot => {
              const slotEl = document.createElement('div');
              slotEl.className = `slot-item ${slot.booked ? 'booked' : ''}`;
              
              if (!slot.booked) {
                slotEl.addEventListener('click', () => selectSlot(slot));
              }
              
              slotEl.innerHTML = `
                <span class="slot-time">${slot.start} - ${slot.end}</span>
                ${slot.booked 
                  ? '<span class="booked-label">Ocupado</span>' 
                  : `<span class="price-label">${slot.price.toFixed(2)}€</span>`}
              `;
              
              slotsEl.appendChild(slotEl);
            });
          }
        })
        .catch(error => {
          console.error('Error al cargar disponibilidad:', error);
          if (loadingEl) loadingEl.style.display = 'none';
          if (slotsEl) {
            slotsEl.innerHTML = '<div class="no-slots">Error al cargar disponibilidad</div>';
          }
        });
    }
    
    // Función para generar slots de tiempo
    function generateTimeSlots(schedules, bookings) {
      const slots = [];
      
      // Usar el primer horario (asumiendo que solo hay uno por día)
      const schedule = schedules[0];
      
      // Parsear horas
      const openTime = schedule.open_time.split(':');
      const closeTime = schedule.close_time.split(':');
      
      let currentHour = parseInt(openTime[0]);
      let currentMinute = parseInt(openTime[1]);
      const endHour = parseInt(closeTime[0]);
      const endMinute = parseInt(closeTime[1]);
      
      const slotDuration = schedule.slot_duration || 90; // minutos
      
      // Generar slots hasta la hora de cierre
      while (
        currentHour < endHour || 
        (currentHour === endHour && currentMinute < endMinute)
      ) {
        const startTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
        
        // Calcular hora de fin del slot
        let slotEndHour = currentHour;
        let slotEndMinute = currentMinute + slotDuration;
        
        if (slotEndMinute >= 60) {
          slotEndHour += Math.floor(slotEndMinute / 60);
          slotEndMinute = slotEndMinute % 60;
        }
        
        const endTime = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`;
        
        // Comprobar si el slot está dentro del horario de apertura
        if (
          slotEndHour > endHour ||
          (slotEndHour === endHour && slotEndMinute > endMinute)
        ) {
          break;
        }
        
        // Verificar si está reservado
        const isBooked = bookings.some(booking => {
          const bookingStart = booking.start_time.substr(0, 5);
          const bookingEnd = booking.end_time.substr(0, 5);
          
          return (
            (startTime >= bookingStart && startTime < bookingEnd) ||
            (endTime > bookingStart && endTime <= bookingEnd) ||
            (startTime <= bookingStart && endTime >= bookingEnd)
          );
        });
        
        // Añadir slot
        slots.push({
          start: startTime,
          end: endTime,
          booked: isBooked,
          price: schedule.price_per_slot
        });
        
        // Avanzar al siguiente slot
        currentMinute += slotDuration;
        if (currentMinute >= 60) {
          currentHour += Math.floor(currentMinute / 60);
          currentMinute = currentMinute % 60;
        }
      }
      
      return slots;
    }
    
    // Función para seleccionar un slot
    function selectSlot(slot) {
      selectedSlot = slot;
      
      // Actualizar UI
      document.querySelectorAll('.slot-item').forEach(el => {
        el.classList.remove('selected');
      });
      
      event.currentTarget.classList.add('selected');
      
      // Actualizar formulario oculto
      document.getElementById('booking_start_time').value = slot.start;
      document.getElementById('booking_end_time').value = slot.end;
      
      // Habilitar botón
      document.getElementById('continue_booking').disabled = false;
    }
    
    // Inicializar calendario
    const datepicker = new Datepicker(document.getElementById('booking_date'), {
      autohide: true,
      todayHighlight: true,
      minDate: new Date(),
      maxDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      language: 'es',
      format: 'dd/mm/yyyy'
    });
    
    // Cargar disponibilidad al cambiar fecha
    datepicker.element.addEventListener('changeDate', function(e) {
      selectedDate = e.detail.date;
      loadAvailability(selectedDate, courtId);
    });
    
    // Cargar disponibilidad inicial
    loadAvailability(selectedDate, courtId);
  }
  
  // Funcionalidad para jugadores adicionales
  const playerSelector = document.getElementById('player_selector');
  const selectedPlayers = document.getElementById('selected_players');
  
  if (playerSelector && selectedPlayers) {
    playerSelector.addEventListener('change', function() {
      const playerId = this.value;
      
      if (playerId) {
        const playerText = this.options[this.selectedIndex].text;
        
        // Crear elemento para el jugador seleccionado
        const playerEl = document.createElement('div');
        playerEl.className = 'selected-player';
        playerEl.dataset.id = playerId;
        
        playerEl.innerHTML = `
          <span>${playerText}</span>
          <button type="button" class="remove-player">×</button>
          <input type="hidden" name="players[]" value="${playerId}">
        `;
        
        // Añadir a la lista
        selectedPlayers.appendChild(playerEl);
        
        // Resetear selector
        this.value = '';
        
        // Actualizar contador
        updatePlayerCount();
      }
    });
    
    // Eliminar jugador al hacer clic en el botón
    selectedPlayers.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-player')) {
        e.target.parentNode.remove();
        updatePlayerCount();
      }
    });
    
    // Actualizar contador de jugadores
    function updatePlayerCount() {
      const count = selectedPlayers.querySelectorAll('.selected-player').length;
      document.getElementById('player_count').textContent = count;
    }
  }
});