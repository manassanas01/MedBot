package com.medbot

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.graphics.Color;
import android.os.Build;

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)
  
    private fun createNotificationChannel() {
      val notificationChannelID = getString(R.string.primary_notification_channel_id)
      
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          val name: CharSequence = getString(R.string.primary_notification_channel_name)
          val description: String = getString(R.string.primary_notification_channel_desc)
          val importance: Int = NotificationManager.IMPORTANCE_HIGH
          val channel = NotificationChannel(notificationChannelID, name, importance)
          
          // Set channel description directly when initializing the channel
          channel.description = description
          
          // Set channel color properly (alpha value between 0 and 255)
          channel.lightColor = Color.argb(255, 74, 71, 167)
          
          // Set vibration pattern if needed
          channel.enableVibration(true)
          channel.vibrationPattern = longArrayOf(400, 400)
          
          val notificationManager = getSystemService(NotificationManager::class.java)
          notificationManager.createNotificationChannel(channel)
      }
  }
  

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }
}
