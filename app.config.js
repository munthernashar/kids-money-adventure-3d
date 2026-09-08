export default {
  expo: {
    name: "Geld-Abenteuer",
    slug: "kids-money-adventure-3d",
    version: "1.0.0",
    sdkVersion: "57.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    assetBundlePatterns": ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.munthernashar.kidsmoneyadventure",
      buildConfiguration: {
        simple: true
      }
    },
    android: {
      package: "com.munthernashar.kidsmoneyadventure",
      adaptiveIcon: {
        foregroundImage: undefined,
        backgroundColor: "#ffffff"
      }
    }
  }
};