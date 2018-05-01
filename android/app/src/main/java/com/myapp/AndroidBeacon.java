package com.myapp.nativepackage;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

import android.content.Intent;
import android.util.Log;

// https://medium.com/mindorks/how-to-use-native-modules-in-react-native-android-hybrid-apps-62b67a2cc7ca
// https://facebook.github.io/react-native/docs/native-modules-android.html

public class AndroidBeacon extends ReactContextBaseJavaModule {
	private final String TAG = "AndroidBeacon";
	private ReactApplicationContext rctAppContext;
	// constructor
	public AndroidBeacon(ReactApplicationContext rctAppContext) {
		super(rctAppContext);
		this.rctAppContext = rctAppContext;
		Log.d(TAG,"ctor");
	}

	// mandatory getName() in order to access at React.NativeModules.NAME
	// e.g. this class will be React.NativeModules.AndroidBeacon
	@Override
	public String getName() {
		return "AndroidBeacon";
	}

	@ReactMethod
	public void startAndroidBeaconActivity() {
		Log.d(TAG,"startAndroidBeaconActivity()");
		ReactApplicationContext context = this.rctAppContext; //getReactApplicationContext();
		// get class name from AndroidBeaconActivity.class: does not run
		Intent intent = new Intent(context, AndroidBeaconActivity.class);

		// set this flag as a workaround to avoid runtime error, not recommended
		intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		context.startActivity(intent);
	}

	// must prefix with @ReactMethod, can only communicate with callback or event
	@ReactMethod
	public void test(Callback fn) {
		// remember, cannot return directly to ReactNative: must use callback
		fn.invoke("testing native module");
	}
}
