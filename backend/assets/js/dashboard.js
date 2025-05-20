document.addEventListener('DOMContentLoaded', function() {
  // Gráficas para el dashboard
  const bookingChartEl = document.getElementById('booking-chart');
  const occupancyChartEl = document.getElementById('occupancy-chart');
  
  if (bookingChartEl) {
    // Gráfica de reservas por día
    const ctx = bookingChartEl.getContext('2d');
    
    // Obtener datos de la API
    fetch('api/analytics/bookings.php')
      .then(response => response.json())
      .then(data => {
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'Reservas',
              data: data.values,
              backgroundColor: '#10B981',
              borderColor: '#0d9669',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al cargar datos de reservas:', error);
      });
  }
  
  if (occupancyChartEl) {
    // Gráfica de ocupación por pista
    const ctx = occupancyChartEl.getContext('2d');
    
    // Obtener datos de la API
    fetch('api/analytics/occupancy.php')
      .then(response => response.json())
      .then(data => {
        const chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.labels,
            datasets: [{
              data: data.values,
              backgroundColor: [
                '#10B981',
                '#3B82F6',
                '#8B5CF6',
                '#F59E0B',
                '#EF4444'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right'
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al cargar datos de ocupación:', error);
      });
  }
  
  // Funcionalidad para torneos
  const tournamentDrawEl = document.getElementById('tournament-draw');
  
  if (tournamentDrawEl) {
    const tournamentId = tournamentDrawEl.dataset.tournamentId;
    
    // Cargar emparejamientos del torneo
    fetch(`api/tournaments/matches.php?tournament_id=${tournamentId}`)
      .then(response => response.json())
      .then(data => {
        // Renderizar el cuadro del torneo
        renderTournamentBracket(tournamentDrawEl, data);
      })
      .catch(error => {
        console.error('Error al cargar datos del torneo:', error);
        tournamentDrawEl.innerHTML = '<div class="alert alert-danger">Error al cargar el cuadro del torneo</div>';
      });
  }
  
  // Función para renderizar cuadro de torneo
  function renderTournamentBracket(container, data) {
    // Crear estructura base
    container.innerHTML = '';
    
    // Agrupar por rondas
    const rounds = {};
    
    data.matches.forEach(match => {
      if (!rounds[match.round_id]) {
        rounds[match.round_id] = {
          name: match.round_name,
          matches: []
        };
      }
      
      rounds[match.round_id].matches.push(match);
    });
    
    // Ordenar rondas
    const sortedRounds = Object.keys(rounds)
      .sort((a, b) => data.round_order[a] - data.round_order[b])
      .map(id => rounds[id]);
    
    // Crear elementos para cada ronda
    const bracketEl = document.createElement('div');
    bracketEl.className = 'tournament-bracket';
    
    sortedRounds.forEach(round => {
      const roundEl = document.createElement('div');
      roundEl.className = 'bracket-round';
      
      // Título de la ronda
      const roundTitle = document.createElement('h3');
      roundTitle.className = 'bracket-round-title';
      roundTitle.textContent = round.name;
      roundEl.appendChild(roundTitle);
      
      // Emparejamientos
      round.matches.forEach(match => {
        const matchEl = document.createElement('div');
        matchEl.className = 'bracket-match';
        
        // Equipos
        const team1El = document.createElement('div');
        team1El.className = `bracket-team ${match.winner_team === 1 ? 'winner' : ''}`;
        team1El.innerHTML = `
          <span class="team-name">${match.team1_name || 'Por determinar'}</span>
          ${match.team1_score !== null ? `<span class="team-score">${match.team1_score}</span>` : ''}
        `;
        
        const team2El = document.createElement('div');
        team2El.className = `bracket-team ${match.winner_team === 2 ? 'winner' : ''}`;
        team2El.innerHTML = `
          <span class="team-name">${match.team2_name || 'Por determinar'}</span>
          ${match.team2_score !== null ? `<span class="team-score">${match.team2_score}</span>` : ''}
        `;
        
        matchEl.appendChild(team1El);
        matchEl.appendChild(team2El);
        
        // Información adicional
        if (match.date || match.court_name) {
          const matchInfoEl = document.createElement('div');
          matchInfoEl.className = 'match-info';
          
          if (match.date) {
            const dateEl = document.createElement('div');
            dateEl.className = 'match-date';
            dateEl.textContent = match.date;
            matchInfoEl.appendChild(dateEl);
          }
          
          if (match.court_name) {
            const courtEl = document.createElement('div');
            courtEl.className = 'match-court';
            courtEl.textContent = match.court_name;
            matchInfoEl.appendChild(courtEl);
          }
          
          matchEl.appendChild(matchInfoEl);
        }
        
        roundEl.appendChild(matchEl);
      });
      
      bracketEl.appendChild(roundEl);
    });
    
    container.appendChild(bracketEl);
  }
  
  // Tooltips y popovers
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});