// Make connection
const socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


// Emit events
btn.addEventListener('click', (event) => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});


message.addEventListener('keypress', (event) => {
    socket.emit('typing', handle.value);
    console.log('typing')
});


// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    console.log('movida');
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});