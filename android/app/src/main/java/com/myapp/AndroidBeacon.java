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

// https://medium.com/mindorks/how-to-use-native-modules-in-react-native-android-hybrid-apps-62b67a2cc7ca
// https://facebook.github.io/react-native/docs/native-modules-android.html

public class AndroidBeacon extends ReactContextBaseJavaModule {
	// constructor
	public AndroidBeacon(ReactApplicationContext rctAppContext) {
		super(rctAppContext);
	}

	// mandatory getName() in order to access at React.NativeModules.NAME
	// e.g. this class will be React.NativeModules.AndroidBeacon
	@Override
	public String getName() {
		return "AndroidBeacon";
	}

	@ReactMethod
	public void startAndroidBeaconActivity() {
		ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, AndroidBeaconActivity.class);
        context.startActivity(intent);
	}

	// must prefix with @ReactMethod, can only communicate with callback or event
	@ReactMethod
	public void test(Callback fn) {
		// remember, cannot return directly to ReactNative: must use callback
		fn.invoke("testing native module");
	}
}
