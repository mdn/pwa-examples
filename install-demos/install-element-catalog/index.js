const installBtns = document.querySelectorAll("install");
for (const btn of installBtns) {
  btn.addEventListener("click", () => {
    console.log(`manifestId: ${btn.manifestId}`);
    console.log(`manifest: ${btn.manifest}`);
    console.log(`isValid: ${btn.isValid}`);
    if (!btn.isValid) {
      console.log(`invalidReason: ${btn.invalidReason}`);
    }

    btn.addEventListener("installresult", (e) => {
      console.log(`Install result: ${e.result}`);
    });

    btn.addEventListener("validationstatuschange", (e) => {
      console.log(`isTrusted: ${e.isTrusted}`);
    });
  });
}
