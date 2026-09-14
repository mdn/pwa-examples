const manifests = [
  "https://mdn.github.io/pwa-examples/a2hs/manifest.webmanifest",
  "https://mdn.github.io/pwa-examples/cycletracker/service_workers/cycletracker.json",
  "https://diek.us/pwinter/manifest.json",
];
const manifestIds = [
  "https://mdn.github.io/pwa-examples/a2hs/index.html",
  "https://mdn.github.io/pwa-examples/cycletracker/service_workers/",
  "https://diek.us/pwinter/index.html?randomize=true",
];

const installBtns = document.querySelectorAll(".install");
for (const btn of installBtns) {
  const idNum = btn.id.slice(-1);
  const arrayNum = idNum - 1;

  btn.addEventListener("click", () => {
    navigator
      .install({
        manifest: manifests[arrayNum],
        manifestId: manifestIds[arrayNum],
      })
      .then(() => {
        console.log("Installation successful");
      })
      .catch((e) => {
        console.log(`Error: ${e}`);
      });
  });
}
