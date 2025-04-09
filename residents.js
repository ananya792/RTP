document.addEventListener('DOMContentLoaded', async () => {
    if (!Auth.getCurrentUser()) {
      window.location.href = '/index.html';
      return;
    }
  
    try {
      await loadResidents();
    } catch (err) {
      console.error('Failed to load residents:', err);
      showError('Failed to load residents');
    }
  });
  
  async function loadResidents() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/residents', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch residents');
    
    const residents = await response.json();
    renderResidents(residents);
  }
  
  function renderResidents(residents) {
    const container = document.getElementById('residents-container');
    container.innerHTML = residents.map(resident => `
      <div class="resident-card">
        <h3>${resident.first_name} ${resident.last_name}</h3>
        <p>Room: ${resident.room_number}</p>
        <p>Status: ${resident.status}</p>
        <button onclick="viewResident(${resident.resident_id})" class="btn btn-primary">
          View Details
        </button>
      </div>
    `).join('');
  }
  
  async function viewResident(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/residents/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch resident details');
    
    const resident = await response.json();
    showResidentModal(resident);
  }