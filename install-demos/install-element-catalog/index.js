const installBtns = document.querySelectorAll("install");
for (const btn of installBtns) {
  const idNum = btn.id.slice(-1);
  const arrayNum = idNum - 1;

  btn.addEventListener("click", () => {
    console.log(btn.manifestId);
    console.log(btn.manifest);
    console.log(btn.isValid);
    console.log(btn.invalidReason);

    btn.addEventListener("installresult", (e) => {
      console.log(`Install result: ${e.result}`);
    });

    btn.addEventListener("validationstatuschange", (e) => {
      console.log(e.isTrusted);
    });
  });
}
