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

public class NativeTest
	extends ReactContextBaseJavaModule implements ReactPackage {

	// constructor
	public NativeTest(ReactApplicationContext rctAppContext) {
		super(rctAppContext);
	}

	// mandatory getName() in order to access at React.NativeModules.NAME
	// e.g. this class will be React.NativeModules.NativeTest
	@Override
	public String getName() {
		return "NativeTest";
	}
	// must prefix with @ReactMethod, can only communicate with callback or event
	@ReactMethod
	public void test(Callback fn) {
		fn.invoke("testing native module");
	}

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
		modules.add(new NativeTest(reactContext));
		return modules;
	}
}
