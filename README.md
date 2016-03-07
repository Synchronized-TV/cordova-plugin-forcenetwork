# cordova-plugin-forcenetwork

iOS and Android only at the moment.

Ensure we always have WiFi available and invite user to change its settings if not.

This plugin use cordova [network-information](https://github.com/apache/cordova-plugin-network-information) and [dialogs](https://github.com/apache/cordova-plugin-dialogs) plugins.

Connexion status is checked on : online, offline, resume

:warning: plugin should add a `CFBundleURLTypes` in the app `plist` file. Make sure it is.

## Installation

Install the plugin :

`cordova plugin add --save https://github.com/Synchronized-TV/cordova-plugin-forcenetwork.git`

## Usage

#### `cordova.plugins.ForceNetwork.init(options)`

Initialize the plugins with options and performs a first connection check.

options :

 - `confirmTitle` : title of the confirm window when no connexion
 - `confirmMessage` : title of the confirm message when no connexion
 - `confirmButtonTitle` : title of the button to open settings when no connexion


#### `cordova.plugins.ForceNetwork.getConnectionType()`

return a string representing current connection type


#### `cordova.plugins.ForceNetwork.isConnected()`

return boolean indicating if we have any internet

#### `cordova.plugins.ForceNetwork.openNetworkSettings()`

open iOS network settings panel (iOS>=8 only)

#### `cordova.plugins.ForceNetwork.ensureNetworkConnection()`

Check if any connection available, and if not, display a dialog to invite user to change its network settings.

## Todo :

 - iOS<=8 solution
 - configurable start/resume/offline listeners
 - configurable connections types

## Licence MIT

Code distributed under MIT licence. Contributions welcome.
