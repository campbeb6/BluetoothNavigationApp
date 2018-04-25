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

public class NativePackager implements ReactPackage {
	@Override
	public List<ViewManager> createViewManagers(
		ReactApplicationContext reactContext
	) {
		return Collections.emptyList();
	}

	@Override
	public List<NativeModule> createNativeModules(
		ReactApplicationContext reactContext
	) {
		List<NativeModule> modules = new ArrayList<>();
		modules.add(new AndroidBeacon(reactContext));
		return modules;
	}
}
