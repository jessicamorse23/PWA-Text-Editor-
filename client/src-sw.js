const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
// NU Module 19.28 - miniproject
// The precacheAndRoute() method takes an array of URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
// Set up asset cache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);
 // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
// TODO: Implement asset caching

new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [ // This plugin will cache responses with these headers to a maximum-age of 30 days
  new CacheableResponsePlugin({
    statuses: [0, 200],
  }),
  // new ExpirationPlugin({
  //   maxEntries: 60,
  //   maxAgeSeconds: 30 * 24 * 60 * 60,
    // https://developer.chrome.com/docs/workbox/modules/workbox-expiration/ #Restrict the Age of Cached Entries
    // https://ashton.codes/set-cache-control-max-age-1-year/#:~:text=It's%20standard%20practice%20to%20set,seconds%2C%20which%20is%20one%20year.
    // Interesting: https://www.cdnetworks.com/knowledge-center/what_is_cache_control/#:~:text=Cache%2Dcontrol%3A%20max%2Dage,-The%20max%2Dage&text=It%20is%20the%20maximum%20amount,can%20be%20available%20for%20reuse.
  // })
  ],
})
registerRoute();
