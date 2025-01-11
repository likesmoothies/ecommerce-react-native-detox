# React Native

-keep class com.facebook.react.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.soloader.** { *; }
-keep class com.facebook.jni.** { *; }

# JavaScriptCore (JSC)

-keep class org.webkit.** { *; }

# Firebase

-keep class com.google.firebase.** { *; }

# Keep enums

-keepclassmembers enum * {
    *;
}

# Keep classes that extend or implement specific classes

-keep class * extends java.lang.Enum {
    *;
}

-keep public class * extends android.app.Service {
    public *;
}

-keep public class * extends android.content.BroadcastReceiver {
    public *;
}

-keep public class * extends android.content.ContentProvider {
    public *;
}

-keep public class * extends android.app.Activity {
    public *;
}

-keep public class * extends android.support.v4.app.Fragment {
    public *;
}

-keep public class * extends android.app.Application {
    public *;
}

# Keep interfaces for OnClickListener

-keep public interface * extends android.view.View$OnClickListener {
    public *;
}

# Keep native methods

-keepclassmembers class * {
    native <methods>;
}

# Keep React Native's native methods

-keepclassmembers class com.facebook.react.** {
    native <methods>;
}