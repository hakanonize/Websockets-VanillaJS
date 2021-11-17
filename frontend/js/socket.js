const socket = io('http://localhost:3000');

socket.on('message', (payload) => {
  document.getElementById('num').innerHTML = payload;
});

const icrementor = document.getElementById('incrementor');
const decrementor = document.getElementById('decrementor');

icrementor.addEventListener('click', () => {
  const numValue = document.getElementById('num').innerHTML;
  console.log(numValue);
  fetch('http://localhost:3000/increment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ count: parseInt(numValue) }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('num').innerHTML = data.count;
    });
});

decrementor.addEventListener('click', () => {
  const numValue = document.getElementById('num').innerHTML;
  fetch('http://localhost:3000/decrement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ count: parseInt(numValue) }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('num').innerHTML = data.count;
    });
});
