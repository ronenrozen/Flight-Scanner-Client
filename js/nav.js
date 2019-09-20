document.addEventListener('DOMContentLoaded', function (event) {
  role = localStorage.role;
  console.log(role);
  if (role !== '')
    document.getElementById('logout').style.display = 'block';
})

const home = document.getElementById('homeLink').addEventListener('click', () => {
  if (role === "undefined") {
    localStorage.role = '';
    window.location.href = './index.html';
  }
  else if (role === 'ADMIN')
    window.location.href = './admin.html';
  else if (role === 'MANAGER')
    window.location.href = './manager.html';
  else if (role === 'PLAYER')
    window.location.href = './player.html';
  else 
    window.location.href = './index.html';
})

const logout = document.getElementById('logout').addEventListener('click', () => {
  // localStorage.role = '';
  localStorage.clear();
  window.location.href = './index.html';
})


