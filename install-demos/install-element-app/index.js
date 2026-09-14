const images = ["fox1", "fox2", "fox3", "fox4"];
const imgElem = document.querySelector("img");

function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(() => {
  const randomChoice = randomValueFromArray(images);
  imgElem.src = `images/${randomChoice}.jpg`;
}, 2000);

// Register service worker to control making site work offline

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/pwa-examples/a2hs/sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

// Install button test

const installElem = document.querySelector("install");
console.log(installElem.manifestId);
console.log(installElem.manifest);
console.log(installElem.isValid);
console.log(installElem.invalidReason);

installElem.addEventListener("installresult", (e) => {
  console.log(`Install result: ${e.result}`);
});

installElem.addEventListener("validationstatuschange", (e) => {
  console.log(e.isTrusted);
});
