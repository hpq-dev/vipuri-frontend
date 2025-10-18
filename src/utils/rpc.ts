import { useCommonStore } from "@/stores"; 
 

export class RPCManager {
  public static registerApp(appName: string, closable = false) {
    const commonStore = useCommonStore.getState();

    if (closable) {
      commonStore.addAppToClosable(appName);
    }

  }

  public static unregisterApp(appName: string) { 
  }
}
