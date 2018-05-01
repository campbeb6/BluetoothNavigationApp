package com.myapp.nativepackage;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;

import org.altbeacon.beacon.AltBeacon;
import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.Collection;
// import java.rmi.RemoteException;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.util.Log;

// following instructions from here:
// https://brightinventions.pl/blog/write-native-in-react-native/

// another example:
// https://github.com/mmazzarolo/react-native-beacons-android/blob/master/android/src/main/java/com/mmazzarolo/beaconsandroid/BeaconsAndroidModule.java

public class AndroidBeacon extends ReactContextBaseJavaModule implements BeaconConsumer, LifecycleEventListener {
	private final String TAG = "AndroidBeacon";
	private ReactApplicationContext rctAppContext;
	private BeaconManager beaconMgr;
	private final String REGION_UUID = "B9407F30-F5F8-466E-AFF9-25556B57FE6D";

	// constructor
	public AndroidBeacon(ReactApplicationContext rctAppContext) {
		super(rctAppContext);
		this.rctAppContext = rctAppContext;
		this.beaconMgr = BeaconManager.getInstanceForApplication(this.rctAppContext);
		beaconMgr.bind(this);
		Log.d(TAG, "ctor");
	}

	// mandatory getName() in order to access at React.NativeModules.NAME
	// e.g. this class will be React.NativeModules.AndroidBeacon
	@Override
	public String getName() {
		return "AndroidBeacon";
	}

	@Override
	public void onBeaconServiceConnect() {
		Log.d(TAG,"onBeaconServiceConnect()");
		// beaconMgr.setRangeNotifier(new RangeNotifier() {
		// 	@Override
		// 	public void didRangeBeaconsInRegion(Collection beacons, Region region) {
		// 		if (beacons.size() > 0) {
		// 			Log.d(TAG, ""+beacons.iterator().next());
		// 		}
		// 	}
		// });
		// try {
		// 	Log.d(TAG,"starting ranging...");
		// 	beaconMgr.startRangingBeaconsInRegion(new Region(REGION_UUID, null, null, null));
		// } catch (Exception e) {
		// 	Log.d(TAG,"ranging failed");
		// 	// RemoteException
		// 	e.printStackTrace();
		// }
	}

	// must prefix with @ReactMethod, can only communicate with callback or event
	@ReactMethod
	public void test(Callback fn) {
		// remember, cannot return directly to ReactNative: must use callback
		fn.invoke("testing native module");
	}

	// BeaconConsumer interface methods
	@Override
	public boolean bindService(
		Intent intent, ServiceConnection connection, int mode
	){
		Log.d(TAG,"bindService()");
		return this.rctAppContext.bindService(intent, connection, mode);
	}
	@Override
	public Context getApplicationContext() {
		Log.d(TAG,"getApplicationContext()");
		return this.rctAppContext;
	}
	@Override
	public void unbindService(ServiceConnection connection) {
		Log.d(TAG,"unbindService()");
		this.rctAppContext.unbindService(connection);
	}

	// LifecycleEventListener interface methods
	@Override
	public void onHostResume() {
		Log.d(TAG,"onHostResume()");
	}
	@Override
	public void onHostPause() {
		Log.d(TAG,"onHostPause()");
	}
	@Override
	public void onHostDestroy() {
		Log.d(TAG,"onHostDestroy()");
	}
}
