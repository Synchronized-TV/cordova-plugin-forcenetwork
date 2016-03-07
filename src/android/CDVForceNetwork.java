
package tv.s10d.cordova.forcenetwork;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import android.content.Context;
import android.app.Activity;
import android.content.Intent;

public class CDVForceNetwork extends CordovaPlugin {

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArray of arguments for the plugin.
     * @param callbackContext   The callback context used when calling back into JavaScript.
     * @return                  True when the action was valid, false otherwise.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("openNetworkSettings")) {
            this.openNetworkSettings();
        }
        else {
            return false;
        }

        return true;
    }

    //--------------------------------------------------------------------------
    // LOCAL METHODS
    //--------------------------------------------------------------------------


    public void openNetworkSettings() {
        Context context =  this.cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(android.provider.Settings.ACTION_WIFI_SETTINGS);

        this.cordova.startActivityForResult(this, intent, 0);
    }

}