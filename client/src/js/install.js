const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// code sourced from NU Module 19.28 miniproject
window.addEventListener('beforeinstallprompt', (event) => {
console.log('hello')
console.log("hello again" + event)
event.preventDefault();
// store the triggered event
window.deferredPrompt = event;
// remove the hidden class from the button
butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  console.log(promptEvent)
  if (!promptEvent) {
    return;
  }
// show prompt
promptEvent.prompt();
// Reset the deferred prompt variable, it can only be used once.
 butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // clear prompt
  window.deferredPrompt = null;
});
