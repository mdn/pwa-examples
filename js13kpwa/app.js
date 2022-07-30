// Generating content based on the template
const template = `<article>
  <ul>
  <li><strong>ACT_NAME</strong></li>
  <li>TYPE</li>
  <li><span>FROM</span> - <span>TO</span></li>
  <li><span>More:</span> <a href='MFW_LINK'>MMM</a></li>
  </ul>
</article>`;
let content = '';
for (let i = 0; i < acts.length; i++) {
  let entry = template.replace(/POS/g, (i + 1))
    .replace(/ACT_NAME/g, acts[i].name)
    .replace(/TYPE/g, acts[i].style)
    .replace(/MFW_LINK/g, acts[i].mfwLink)
    .replace(/FROM/g, moment.unix(acts[i].start).format("HH:mm"))
    .replace(/TO/g, moment.unix(acts[i].end).format("HH:mm"));
    
  entry = entry.replace('<a href=\'http:///\'></a>', '-');
  content += entry;
}
document.getElementById('content').innerHTML = content;
console.log("test");
console.log(moment().format());

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// Requesting permission for Notifications after clicking on the button
const button = document.getElementById('notifications');
button.addEventListener('click', () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      randomNotification();
    }
  });
});

// Setting up random Notification
function randomNotification() {
  const randomItem = Math.floor(Math.random() * games.length);
  const notifTitle = games[randomItem].name;
  const notifBody = `Created by ${games[randomItem].author}.`;
  const notifImg = `data/img/${games[randomItem].slug}.jpg`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

// Progressive loading images
const imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}
