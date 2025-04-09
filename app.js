document.addEventListener('DOMContentLoaded', () => {
    const currentUser = Auth.getCurrentUser();
    
    if (currentUser) {
      document.getElementById('login-view').classList.add('hidden');
      document.getElementById('dashboard-view').classList.remove('hidden');
      loadDashboard();
    } else {
      document.getElementById('login-view').classList.remove('hidden');
      document.getElementById('dashboard-view').classList.add('hidden');
    }
  });
  
  async function loadDashboard() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to load dashboard');
      
      const data = await response.json();
      renderDashboard(data);
    } catch (err) {
      showError(err.message);
    }
  }
  
  function renderDashboard(data) {
    const dashboard = document.getElementById('dashboard-view');
    dashboard.innerHTML = `
      <h1>Welcome to EverCare</h1>
      <div class="dashboard">
        <div class="card" onclick="navigateTo('residents')">
          <div class="card-icon" style="background: #f3e8ff; color: #9f7aea;">
            <i class="fas fa-user-friends"></i>
          </div>
          <h3>Residents</h3>
          <p>${data.residentsCount} active residents</p>
        </div>
        <!-- Add other dashboard cards similarly -->
      </div>
    `;
  }
  
  function showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    document.body.appendChild(errorEl);
    setTimeout(() => errorEl.remove(), 3000);
  }