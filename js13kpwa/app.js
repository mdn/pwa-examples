// Generating content based on the template
const fragment = document.createDocumentFragment();
games.forEach((item,i) => {
  const article = document.createElement("article");

  const image = document.createElement("img");
  image.src = "data/img/placeholder.png";
  image.setAttribute('data-src', `data/img/${item?.slug || "SLUG"}.jpg`);
  image.alt = item?.name || "NAME";
  article.appendChild(image);

  const h3 = document.createElement("h3");
  h3.textContent = `#${i + 1}. ${item.name}`;
  article.appendChild(h3);

  const list = document.createElement('ul');

  const createListItem = (label, node) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = label;
    li.appendChild(span);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(node);
    return li;
  }

  const author = document.createElement('strong');
  author.textContent = item.author || '-';
  list.appendChild(createListItem('Author:', author));

  const twitter = item.twitter
    ? (() => {
      const a = document.createElement('a');
      a.href = `https://twitter.com/${item.twitter}`;
      a.textContent = `@${item.twitter}`;
      return a;
    })()
    : document.createTextNode('-');

  list.appendChild(createListItem('Twitter:', twitter));


  const website = item.website
    ? (() => {
      const a = document.createElement('a');
      a.href = `http://${item.website}/`;
      a.textContent = item.website;
      return a;
    })()
    : document.createTextNode('-');

  list.appendChild(createListItem('Website:', website));

  const github = item.github
    ? (() => {
      const a = document.createElement('a');
      a.href = `https://${item.github}`;
      a.textContent = item.github;
      return a;
    })()
    : document.createTextNode('-');

  list.appendChild(createListItem('GitHub:', github));

  const moreLink = document.createElement('a');
  moreLink.href = `http://js13kgames.com/entries/${item.slug}`;
  moreLink.textContent = `js13kgames.com/entries/${item.slug}`;

  list.appendChild(createListItem('More:', moreLink));

  article.appendChild(list);
  fragment.appendChild(article);
});
document.getElementById('content').replaceChildren(fragment);

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
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
