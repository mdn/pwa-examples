const installBtn = document.querySelector("#install");

installBtn.addEventListener("click", () => {
  navigator
    .install()
    .then(() => {
      console.log("Installation successful");
    })
    .catch((e) => {
      console.log(`Error: ${e}`);
    });
});
