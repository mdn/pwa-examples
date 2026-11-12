const apps = {
  awesomefox: {
    manifest: "https://mdn.github.io/pwa-examples/a2hs/manifest.webmanifest",
    manifestId: "https://mdn.github.io/pwa-examples/a2hs/index.html",
  },
  cycletracker: {
    manifest:
      "https://mdn.github.io/pwa-examples/cycletracker/service_workers/cycletracker.json",
    manifestId:
      "https://mdn.github.io/pwa-examples/cycletracker/service_workers/",
  },
  pwinter: {
    manifest: "https://diek.us/pwinter/manifest.json",
    manifestId: "https://diek.us/pwinter/index.html?randomize=true",
  },
};

const installBtns = document.querySelectorAll(".install");
for (const btn of installBtns) {
  const app = apps[btn.id];
  btn.addEventListener("click", () => {
    navigator
      .install({
        manifest: app.manifest,
        manifestId: app.manifestId,
      })
      .then(() => {
        console.log("Installation successful");
      })
      .catch((e) => {
        console.log(`Error: ${e}`);
      });
  });
}
