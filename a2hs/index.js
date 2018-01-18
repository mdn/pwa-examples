const images = ['fox1','fox2','fox3','fox4'];
const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  let randomNo =  Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(function() {
  let randomChoice = randomValueFromArray(images);
  imgElem.src = 'images/' + randomChoice + '.jpg';
}, 2000)

// Register service worker to control making site work offline

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/pwa-examples/a2hs/sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}
