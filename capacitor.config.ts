import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.unitedolympics.sports",
  appName: "United Olympics Sports",
  webDir: "dist",
  server: {
    androidScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#05070a",
      showSpinner: false
    }
  }
};

export default config;
