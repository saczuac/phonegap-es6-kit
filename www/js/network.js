function checkConnection() {
      var networkState = navigator.connection.type;
      states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';
      if (connFlag) {
        if (states[networkState] == 'Cell 2G connection'  || states[networkState] == 'Cell generic connection') {
          app.onSlowNetwork();
          connFlag = false;
        }
      } else {
          if (states[networkState] == 'Cell 3G connection'  || states[networkState] == 'Cell 4G connection') {
            connFlag = true;
          }
      }
}
