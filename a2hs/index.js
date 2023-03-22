const images = ['fox1', 'fox2', 'fox3', 'fox4'];
const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(() => {
  const randomChoice = randomValueFromArray(images);
  imgElem.src = `images/${randomChoice}.jpg`;
}, 2000);

// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwa-examples/a2hs/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
