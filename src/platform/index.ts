export type PlatformTarget = "web" | "pwa" | "ios" | "android";

export interface PlatformCapabilities {
  hasHaptics: boolean;
  hasNativeNotifications: boolean;
  isStandalone: boolean;
  platform: PlatformTarget;
}

export class PlatformBridge {
  public static getTarget(): PlatformTarget {
    if (typeof window === "undefined") return "web";
    
    // Capacitor / Native Container Detection
    const capacitorObj = (window as unknown as { Capacitor?: { getPlatform: () => string } }).Capacitor;
    if (capacitorObj) {
      const p = capacitorObj.getPlatform();
      if (p === "ios") return "ios";
      if (p === "android") return "android";
    }

    // PWA Standalone Mode Detection
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
      return "pwa";
    }

    return "web";
  }

  public static getCapabilities(): PlatformCapabilities {
    const target = this.getTarget();
    return {
      platform: target,
      isStandalone: target !== "web",
      hasHaptics: target === "ios" || target === "android",
      hasNativeNotifications: typeof window !== "undefined" && "Notification" in window
    };
  }
}
