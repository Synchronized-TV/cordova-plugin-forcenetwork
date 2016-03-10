var exec = require("cordova/exec");

var ForceNetwork = function(){};

ForceNetwork.prototype.getConnectionType = function () {
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return states[navigator.connection.type];
};

ForceNetwork.prototype.isConnected = function () {
    return (navigator.connection.type === Connection.WIFI);
};

ForceNetwork.prototype.openNetworkSettings = function () {
    cordova.exec(function() {}, function() {}, "CDVForceNetwork", "openNetworkSettings", []);
};

ForceNetwork.prototype.ensureNetworkConnection = function () {
    // ensure network is available and invite user to open settings
    var that = this;
    if (!this.isConnected()) {
        setTimeout(function() {
            // second check after timeout
            if (!that.isConnected()) {
                if (!that.confirmWindow) {
                  that.confirmWindow = true;
                  navigator.notification.confirm(that.options.confirmMessage, function(buttonIndex) {
                      console.log('buttonIndex', buttonIndex);
                      that.confirmWindow = false;
                      if (buttonIndex === 1) {
                        // ok
                        that.openNetworkSettings();
                      } else {
                        // cancel : try again
                        setTimeout(function() {
                          that.ensureNetworkConnection();
                        }, that.options.timeoutDelay);
                      }
                  }, that.options.confirmTitle, [that.options.confirmButtonTitle, that.options.cancelButtonTitle]);
                }
            }
        }, that.options.timeoutDelay);
    } else {
      navigator.notification.close();
      that.confirmWindow = false;
    }
};
ForceNetwork.prototype.onOnline = function() {
  navigator.notification.close();
  this.confirmWindow = false;
}
ForceNetwork.prototype.onOffline = function() {
  this.ensureNetworkConnection();
}
ForceNetwork.prototype.onResume = function() {
  this.ensureNetworkConnection();
}
ForceNetwork.prototype.init = function(options) {
    options = options || {};
    this.options = {
        timeoutDelay: 5000
    };
    this.options.confirmTitle = options.confirmTitle || 'Network access';
    this.options.confirmMessage = options.confirmMessage || 'Internet connexion is not available';
    this.options.cancelButtonTitle = options.cancelButtonTitle || 'Cancel';
    this.options.confirmButtonTitle = options.confirmButtonTitle || 'Open settings';

    document.addEventListener("online", this.onOnline.bind(this), false);
    document.addEventListener("offline", this.onOffline.bind(this), false);
    document.addEventListener("resume", this.onResume.bind(this), false);
};


module.exports = new ForceNetwork();
