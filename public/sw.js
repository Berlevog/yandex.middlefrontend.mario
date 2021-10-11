self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll([
        "/music/",
        "/music/world01.ogg",
        "/music/killed.ogg",
        "/music/game-over.ogg",
        "/images/",
        "/images/brick.png",
        "/images/cloud.png",
        "/images/error-mushroom.png",
        "/images/frog.png",
        "/images/game-end.png",
        "/images/game-start.png",
        "/images/luigi.png",
        "/images/pipe.png",
        "/images/player.png",
        "/images/world.png",
        "/assets/",
        "/assets/mario-background.jpeg",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request)
          .then(function (response) {
            // response may be used only once
            // we need to save clone to put one copy in cache
            // and serve second one
            let responseClone = response.clone();

            caches.open("v1").then(function (cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function () {
            throw new Error("You're offline now");
          });
      }
    })
  );
});
