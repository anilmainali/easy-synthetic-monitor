const fetch = require('node-fetch');

const webhookURL = 'https://chat.googleapis.com/v1/spaces/AAAAnm1bXD8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=cDs7zo8VxXvi1d_3zU4qeMa1-t66rGtOzjXzpdoCH5A%3D';

const data = JSON.stringify({
  'text': 'Hello from a Node script!',
});

fetch(webhookURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: data,
}).then((response) => {
  console.log(response);
});