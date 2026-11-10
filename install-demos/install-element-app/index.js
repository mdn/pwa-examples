const images = ["fox1", "fox2", "fox3", "fox4"];
const imgElem = document.querySelector("img");

function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

function changeImage() {
  const randomChoice = randomValueFromArray(images);
  imgElem.src = `images/${randomChoice}.jpg`;
}

document.body.addEventListener("click", changeImage);
document.body.addEventListener("keydown", changeImage);

// Register service worker to control making site work offline

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

// Install button test

const installElem = document.querySelector("install");

installElem.addEventListener("installresult", (e) => {
  console.log(`Install result: ${e.result}`);

  console.log(`manifestId: ${installElem.manifestId}`);
  console.log(`manifest: ${installElem.manifest}`);
  console.log(`isValid: ${installElem.isValid}`);
  if (!installElem.isValid) {
    console.log(`invalidReason: ${installElem.invalidReason}`);
  }
});

installElem.addEventListener("validationstatuschange", (e) => {
  console.log(`isTrusted: ${e.isTrusted}`);
});
