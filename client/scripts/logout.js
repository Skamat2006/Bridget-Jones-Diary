console.log("Logout loaded!")
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.assign('./index.html');
})