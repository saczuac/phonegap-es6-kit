export default {
	samePage: (first, second) => first.page.name == second.page.name,
	showLoader: () => $('#loader').show(),
    hideLoader: () => $("#loader").hide(),
    openSocialNetwork: (url) => window.open(url, "_system"),
    scrollUp: () =>  $('body').scrollTop(0),

    calculatePosition: (onSuccess, onError) => {
        navigator.geolocation.getCurrentPosition(
            (position) => onSuccess(position),
            (error) => onError(error),
            {timeout: 15000, enableHighAccuracy: true}
        );
    },

    showAlert: (message="", cb) => {
        navigator.notification.alert(message, cb, 'Aviso', 'Reintentar');
    },
};

