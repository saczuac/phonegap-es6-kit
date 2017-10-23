import Store from 'lib/store';

const Notifications = {
    name: 'Notifications',

    init() {
        Store.notifications().then(notifications => {
            notifications.map((notification) => {
                var CurrentDate = new Date();
                var dateString = notification.date;
                var timeString = notification.time;
                var dateObj = new Date(dateString + ' ' + timeString);

                if (dateObj > CurrentDate) {
                    cordova.plugins.notification.local.schedule({
                        id: notification.pk,
                        title: notification.title,
                        message: notification.description,
                        at: dateObj,
                        data: { meetingId:"123#fg8" }
                    });
                }
            })
        })
    },

};

export default Notifications;