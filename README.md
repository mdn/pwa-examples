# PWA Examples

Examples for progressive web apps.

In this repo, we currently have:

- [CycleTracker](cycletracker): A basic app for tracking menstrual cycles. The app's HTML includes a form to add a period cycle start and end dates. The JavaScript app functionality sorts the dates and saves them to local storage. It also displays the dates retrieved from local storage below the form. The app includes a manifest file with three icons, color scheme, etc. The app also includes a service worker to handle asset caching.

- [a2hs](a2hs): An example set up to show how Add to home screen (A2HS) works. [See it live here](https://mdn.github.io/pwa-examples/a2hs/). This includes an icon and [manifest file](a2hs/manifest.webmanifest) for allowing the app to be added to home screen, and a [simple service worker](a2hs/sw.js) for making the site work offline.

- [js13kpwa](js13kpwa): A list of A-Frame entries submitted to the js13kGames 2017 competition, used as an example for the MDN articles about Progressive Web Apps. The js13kPWA have the App Shell structure, works offline with the Service Worker, is installable thanks to the Manifest file and Add to Homescreen feature, and is re-engageable by using Notifications and Push. [See it live here](https://mdn.github.io/pwa-examples/js13kpwa/).

- [Custom titlebar demo](custom-titlebar): A basic demo that shows how to create a custom draggable app titlebar using [window controls overlay](https://developer.mozilla.org/docs/Web/API/Window_Controls_Overlay_API#browser_compatibility) features such as `titlebar-area-*` [`env()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/env) variables and the [`window-drag`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/window-drag) property. [See it live here](https://mdn.github.io/pwa-examples/custom-titlebar/).
