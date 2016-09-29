/**
 * 
 */
console.log('Started', self);
self.addEventListener('install', function(event)
{
    self.skipWaiting();
    console.log('Installed', event);
});
self.addEventListener('activate', function(event)
{
    console.log('Activated', event);
});
self.addEventListener('push', function(event)
{
    console.log('Push message received ', event);
    console.log('Push message data ', event.data);
    console.log('Push message data.text ', event.data.text());
    console.log('Push message data.json ', event.data.json());
    var jsonReponse = event.data.json();

    event.waitUntil(self.registration.showNotification(jsonReponse.title, {
        'body' : jsonReponse.message,
        'icon' : jsonReponse.icon,
        'data' : {
            'url' : jsonReponse.url,
        }
    }));
});
self.addEventListener('notificationclick', function(event)
{
    console.log('Notification click: tag ', event.notification.tag);
    console.log('Notification click: ', event.notification);
    event.notification.close();
    var url = event.notification.data.url;
    event.waitUntil(clients.matchAll({
        type : 'window'
    }).then(function(windowClients)
    {
        for (var i = 0; i < windowClients.length; i++)
        {
            var client = windowClients[i];
            if (client.url === url && 'focus' in client)
            {
                return client.focus();
            }
        }
        if (clients.openWindow)
        {
            return clients.openWindow(url);
        }
    }));
});