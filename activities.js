document.addEventListener('DOMContentLoaded', async () => {
    if (!Auth.getCurrentUser()) {
      window.location.href = '/index.html';
      return;
    }
  
    await loadActivities();
  });
  
  async function loadActivities() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/activities', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to load activities');
    
    const activities = await response.json();
    renderActivities(activities);
  }
  
  function renderActivities(activities) {
    const container = document.getElementById('activities-container');
    container.innerHTML = activities.map(activity => `
      <div class="activity-card">
        <h3>${activity.title}</h3>
        <p>${new Date(activity.start_time).toLocaleString()}</p>
        <p>Type: ${activity.activity_type}</p>
      </div>
    `).join('');
  }