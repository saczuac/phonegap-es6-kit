const Config = {
    init() {
        this.serverUrl = 'http://localhost:8000' // URL where server app is running
        this.timeout = 3 // Number of seconds before a timeout function is triggered
        this.connTries = 3
        this.validStorage = 1800 //Number of seconds the caché storage from APIs is valid
        this.resources = [ // Resources to binding the APIs
            // 'resources',
            // 'from',
            // 'server',
            'notification',
        ]

        this.pages = [ // The name of page must be the same of the folder and the js page file, example if you put 'Search' as a page here, module will lookup for pages/Search/Search.js
            'Search',
        ]

        this.search = false
        this.hasNotifications = false // If has notifications this app will trigger the notifications API
        this.aside = true // shows menu aside
        this.lockOrientation = true // Lock orientation of device or not
        this.productionJSPath = '/home/user/projects/template-app/build' // Path to build assets "npm run build:production"
        this.recordsPerPage = 3 // Paginator Conf
    },
};

export default Config