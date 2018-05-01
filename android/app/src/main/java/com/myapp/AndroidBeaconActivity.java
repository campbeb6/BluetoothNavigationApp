package com.myapp.nativepackage;

import java.util.Collection;

import android.app.Activity;
import android.os.Bundle;
import android.os.RemoteException;
import android.util.Log;
import android.widget.EditText;

import org.altbeacon.beacon.AltBeacon;
import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;

// import path: BluetoothNavigationApp\node_modules\react-native\ReactAndroid\src\main\java\com\facebook\react
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;

// integrating with react native references:
// https://facebook.github.io/react-native/docs/integration-with-existing-apps.html
// https://stackoverflow.com/questions/42253397/call-android-activity-from-react-native-code
// https://facebook.github.io/react-native/docs/communication-android.html

public class AndroidBeaconActivity extends Activity implements BeaconConsumer {
    protected static final String TAG = "AndroidBeaconActivity";
    private BeaconManager beaconManager = BeaconManager.getInstanceForApplication(this);
	private ReactRootView mReactRootView;
	private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		Log.d(TAG,"ctor");
		mReactRootView = new ReactRootView(this);
		mReactInstanceManager = ReactInstanceManager.builder()
			.setApplication(getApplication())
			.setBundleAssetName("index.android.bundle")
			// example code used setJSMainModuleName() instead, did not compile
			.setJSMainModulePath("index.android")
			.addPackage(new MainReactPackage())
			// hard-code to true for now
			.setUseDeveloperSupport(true)
			.setInitialLifecycleState(LifecycleState.RESUMED)
			.build();
		mReactRootView.startReactApplication(mReactInstanceManager, "HelloWorld", null);
		setContentView(mReactRootView);

		// bind to beacon manager
        beaconManager.bind(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        beaconManager.unbind(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (beaconManager.isBound(this)) beaconManager.setBackgroundMode(true);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (beaconManager.isBound(this)) beaconManager.setBackgroundMode(false);
    }

    @Override
    public void onBeaconServiceConnect() {
        beaconManager.setRangeNotifier(new RangeNotifier() {
           @Override
           public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
              if (beacons.size() > 0) {
                 Beacon firstBeacon = beacons.iterator().next();
                 String logMsg = "The first beacon " + firstBeacon.toString() + " is about " + firstBeacon.getDistance() + " meters away.";
              }
           }

        });

        try {
            beaconManager.startRangingBeaconsInRegion(new Region("myRangingUniqueId", null, null, null));
        } catch (RemoteException e) {   }
    }
}
