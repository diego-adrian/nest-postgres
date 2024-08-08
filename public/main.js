window.addEventListener('load', function () {
  const listado = document.querySelector('#listado');

  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('msgToClient', (data) => {
    console.log('Message from server:', data);
    const names = Object.values(data);
    listado.innerHTML = '';
    names.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      listado.appendChild(li);
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  // Función para enviar los datos del formulario
  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();
    if (data.access_token) {
      socket.emit('msg', {
        user: username
      });
    }
  });
})