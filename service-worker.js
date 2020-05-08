self.addEventListener('install', event => {
    self.skipWaiting()
    console.log('worker installed', event)
})

self.addEventListener('activate', event => {
    console.log('worker activated', event)
})

self.addEventListener('push', event => {
    console.log('push fired', event)

    const data = event.data.json()

    const options = {
        body: data.body,
        icon: data.icon ? data.icon : '',
        image: data.image ? data.image : '',
        data: {
            url: data.url
        }
    }

    if (data.actions)
        options.actions = data.actions

    event.waitUntil(
        Promise.all([
            self.registration.showNotification(data.title, options)
        ])
    )
})