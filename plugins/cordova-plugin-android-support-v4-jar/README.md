# Android Support Library v4

revision 23.2.1, `1422188 bytes`

## Contents

This package contains the latest `android-support-v4.jar` file from Android SDK.

## Install

```
cordova plugin add cordova-plugin-android-support-v4-jar
```

## How to upgrade

Upgrade Android SDK support library

- start Android SDK Manager with running command `android`
- check item `Extras` / `Android Support Library`
- upgrade if available
- write down the latest revision number

If the revision number is greater than the jar file of this plugin, it is upgradeable.

Check file size and overwrite the jar file to the plugin library

```
ls -l /usr/local/var/lib/android-sdk/extras/android/support/v4/android-support-v4.jar
copy /usr/local/var/lib/android-sdk/extras/android/support/v4/android-support-v4.jar .
```

Modify the version number of `plugin.xml` and save.
