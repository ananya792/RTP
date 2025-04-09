class Auth {
    static async login(email, password) {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data.user;
    }
  
    static async logout() {
      localStorage.removeItem('token');
      window.location.href = '/index.html';
    }
  
    static getCurrentUser() {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
      } catch (err) {
        return null;
      }
    }
  }
  
  // Login form handler
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const user = await Auth.login(email, password);
      window.location.href = '/residents.html';
    } catch (err) {
      showError(err.message);
    }
  });
  
  // Logout button
  document.getElementById('logout-btn')?.addEventListener('click', Auth.logout);