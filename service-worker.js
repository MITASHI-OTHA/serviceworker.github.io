self.addEventListener('install', event=> {
    self.skipWaiting()
    console.log('service worker installer')
})
self.addEventListener('activate', event=> {
    console.log('service worker activé')
})
self.addEventListener('push', event=> {
    console.log('notification reçu ', event)
   // const data = event.data.json()
    // const options= {
    //     body: data.body,
    //     icon: data.icon?data.icon: '',
    //     image: data.image?data.image:''
    // }
    event.waitUntil(
            Promise.all([
                self.registration.showNotification("salut")])
        )
})
self.addEventListener('notificationclick', event=> {
    console.log('notification cliqué ', event)
    event.notification.close()
    event.notification.data.url= 'https://yahshoua.github.io/serviceworker.github.io/' //url de votre site
    var clickResponsePromise = Promise.resolve()
    if(event.notification.data.url) {
        clickResponsePromise = clients.openWindow(event.notification.data.url)
        event.waitingUntil(
            Promise.all([
                clickResponsePromise
                ]))
    }
})