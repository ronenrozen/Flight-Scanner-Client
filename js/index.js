function goToUsersPage() {
  location.href = "usersRest.html";
}
function goToElementsPage() {
  location.href = "elementsRest.html";
}

role = localStorage.role;
if (role === "undefined")
  localStorage.role = '';
else if (role === 'ADMIN')
  window.location.href = './admin.html';
else if (role === 'MANAGER')
  window.location.href = './manager.html';
else if (role === 'PLAYER')
  window.location.href = './player.html';