const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };

self.addEventListener("Install", (event) => {
    event.waitUnitl(
        addResourcesToCache([
            "icons/ic_launcher.png",
            "icons/playstore.png",
            "index.html",
            "manifest.json",
            "script.js",
            "style.css",
            "sw.js"
        ])
    )
})