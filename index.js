
const registerSW = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations()

  for(let registration of registrations) {
    await registration.unregister();
  }
  return navigator.serviceWorker.register(
    "service-worker.js",
    {
      scope: "./",
    }
  );
}

window.addEventListener('DOMContentLoaded', async () => {

  const swRegistration = await registerSW();

  const subscribeBtn = document.getElementById('subscribe-to-push');

  subscribeBtn.addEventListener('click', async () => {
    const grantedResult = await window.Notification.requestPermission();

    if (grantedResult === 'granted') {
      const inputText = document.getElementById('input').value;
      void swRegistration.showNotification('Hi there !'), {
        body: inputText,
      }
      navigator.setAppBadge(123)
    }
  })

})


