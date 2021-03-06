export default {
	samePage: (first, second) => first.page.name == second.page.name,
	showLoader: () => $('#loader').show(),
    hideLoader: () => $("#loader").hide(),
    sanitizeStyles: styles => styles.replace(/\s+/g, '.'),
    openSocialNetwork: url => window.open(url, "_system"),
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
    showToast:(message="Aviso") => {
          window.plugins.toast.showWithOptions(
            {
              message: message,
              duration: 3000,
              position: "bottom",
              addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            },
            null, // optional (onSucess cb)
            null    // optional (onError cb)
          )
    },
};

