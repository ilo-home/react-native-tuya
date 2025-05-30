export declare const GROUPLISTENER = "groupListener";
export declare const HARDWAREUPGRADELISTENER = "hardwareUpgradeListener";
export declare const DEVLISTENER = "devListener";
export declare const SUBDEVLISTENER = "subDevListener";
export declare const HOMESTATUS = "homeStatus";
export declare const HOMECHANGE = "homeChange";
export declare const SINGLETRANSFER = "SingleTransfer";
export declare function addEvent(eventName: string, callback: (data: any) => any): import("react-native").EmitterSubscription;
export declare const bridge: (key: string, id: string | number) => string;
