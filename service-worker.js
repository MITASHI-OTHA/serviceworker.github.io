self.addEventListerner('install', event=> {
    self.skipWaiting()
    console.log('service worker installer')
})
self.addEventListerner('activate', event=> {
    console.log('service worker activé')
})
self.addEventListerner('push', event=> {
    console.log('notification reçu ', event)
    const data = event.data.json()
    const options= {
        body: data.body,
        icon: data.icon?data.icon: '',
        image: data.image?data.image:''
    }
    event.waitingUntil(
            Promise.all([
                self.registration.showNotification(data.title, options)])
        )
})