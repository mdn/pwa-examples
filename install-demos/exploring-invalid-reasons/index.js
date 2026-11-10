const installElem = document.querySelector("install");
const coverElem = document.querySelector("#cover");
const reasonElem = document.querySelector("#reason");
const selectElem = document.querySelector("select");

selectElem.addEventListener("input", () => {
  installElem.className = selectElem.value;
});

reasonElem.textContent = `Invalid reason: ${installElem.invalidReason}`;

installElem.addEventListener("validationstatuschange", () => {
  if (installElem.isValid) {
    reasonElem.textContent = `<install> element is valid`;
  } else {
    reasonElem.textContent = `Invalid reason: ${installElem.invalidReason}`;
  }
});
