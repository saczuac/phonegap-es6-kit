const Config = {
    init() {
            this.serverUrl = 'http://localhost:8000' // URL where server app is running
            this.timeout = 3 // Number of seconds before a timeout function is triggered
            this.connTries = 3
            this.validStorage = 1800 //Number of seconds the caché storage from APIs is valid
            this.resources = [
                // 'resources',
                // 'from',
                // 'server',
                'notification',
            ]

            this.search = false
            this.hasNotifications = false
            this.lockOrientation = true
            this.productionJSPath = '/home/sac/.dpgd/template-app/build'
    },
};

export default Config