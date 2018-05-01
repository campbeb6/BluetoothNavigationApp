package com.myapp.nativepackage;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

import android.content.Intent;
import android.util.Log;

// following instructions from here:
// https://brightinventions.pl/blog/write-native-in-react-native/

public class AndroidBeacon extends ReactContextBaseJavaModule implements LifecycleEventListener {
	private final String TAG = "AndroidBeacon";
	private ReactApplicationContext rctAppContext;
	// constructor
	public AndroidBeacon(ReactApplicationContext rctAppContext) {
		super(rctAppContext);
		this.rctAppContext = rctAppContext;
		Log.d(TAG, "ctor");
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
		fn.invoke("testing native module");
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
