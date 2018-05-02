package com.myapp.nativepackage;

// import path: BluetoothNavigationApp\node_modules\react-native\ReactAndroid\src\main\java\com\facebook\react

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.ReactMethod;

import org.altbeacon.beacon.AltBeacon;
import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;


import java.util.ArrayList;
import java.util.List;
import java.util.Collection;
import java.util.Collections;

import android.content.Intent;
import android.content.Context;
import android.content.ServiceConnection;
import android.os.RemoteException;
import android.util.Log;

// https://medium.com/mindorks/how-to-use-native-modules-in-react-native-android-hybrid-apps-62b67a2cc7ca
// https://facebook.github.io/react-native/docs/native-modules-android.html

public class AndroidBeacon extends ReactContextBaseJavaModule implements BeaconConsumer {
	// constructor
	private ReactApplicationContext rac;
	private BeaconManager beaconManager;
	private static final String TAG = "AndroidBeacon";

	public AndroidBeacon(ReactApplicationContext rctAppContext) {
		super(rctAppContext);
		this.rac = rctAppContext;
		//https://altbeacon.github.io/android-beacon-library/javadoc/org/altbeacon/beacon/BeaconManager.html#getInstanceForApplication-android.content.Context-
		this.beaconManager = BeaconManager.getInstanceForApplication(this.rac);
		this.beaconManager.bind(this);
	}

	// mandatory getName() in order to access at React.NativeModules.NAME
	// e.g. this class will be React.NativeModules.AndroidBeacon
	@Override
	public String getName() {
		return "AndroidBeacon";
	}

	// must prefix with @ReactMethod, can only communicate with callback or event
	@ReactMethod
	public void test(Callback fn) {
		// remember, cannot return directly to ReactNative: must use callback
		fn.invoke("starting beacon manager...");
		Log.d(TAG,"(android) starting beacon manager...");
	}

	// BeaconConsumer interface method
	@Override
    public void onBeaconServiceConnect() {
		Log.d(TAG,"onBeaconServiceConnect() beginning...");
        beaconManager.setRangeNotifier(new RangeNotifier() {
           @Override
           public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
              if (beacons.size() > 0) {
                 Beacon firstBeacon = beacons.iterator().next();
                 String logMsg = "The first beacon " + firstBeacon.toString() + " is about " + firstBeacon.getDistance() + " meters away.";
				 Log.d(TAG,logMsg);
			  }
           }
        });

        try {
            beaconManager.startRangingBeaconsInRegion(new Region("myRangingUniqueId", null, null, null));
        } catch (RemoteException e) {   }
    }

	// NOT RECOMMENDED: override the unbind and bindService methods
	@Override
	public boolean bindService(
		Intent intent,
        ServiceConnection connection,
        int mode) {
		// STUB
		return true;
	}
	// NOT RECOMMENDED: override the unbind and bindService methods
	@Override
	public void unbindService(ServiceConnection connection) {
		// STUB
		return;
	}
	@Override
	public Context getApplicationContext() {
		return rac;
	}
}
