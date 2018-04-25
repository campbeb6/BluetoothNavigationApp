package com.myapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;

import java.util.Arrays;
import java.util.List;

import com.myapp.nativepackage.*;
import com.estimote.proximity_sdk.proximity.*;
import java.util.function.*;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
		return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
		  new SvgPackage(),
		  new NativePackager()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

	// ========================== BEACON SDK
	// create credentials object
	EstimoteCloudCredentials cloudCredentials =
		new EstimoteCloudCredentials(
			"isa406-fsb-nav-i48", // app id
			"9d5cb164fdea698577ef4565a7c86be7" // app token
		);
	// create proximity observer
	ProximityObserver proximityObserver = new ProximityObserverBuilder(
		getApplicationContext(),
		cloudCredentials
	)
		.withBalancedPowerMode()
		.withOnErrorAction(new Function<Throwable, Unit>() {
			@Override
			public Unit invoke(Throwable throwable) {
				return null;
			}
		})
		.build();
  }
}
