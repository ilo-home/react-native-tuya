import { DeviceBean } from './device';
import { DeviceDetailResponse } from './home';
export declare function openNetworkSettings(): any;
export declare enum ActivatorType {
    AP = "THING_AP",
    EZ = "THING_EZ",
    AP_4G_GATEWAY = "THING_4G_GATEWAY",
    QR = "THING_QR"
}
export declare type InitActivatorParams = {
    homeId: number;
    ssid: string;
    password: string;
    time: number;
    type: ActivatorType;
};
export interface InitBluetoothActivatorParams {
    deviceId?: string;
    homeId: number;
    ssid: string;
    password: string;
}
export declare function initActivator(params: InitActivatorParams): Promise<DeviceDetailResponse>;
export declare function stopConfig(): any;
export declare function startBluetoothScan(): any;
export declare function initBluetoothDualModeActivator(params: InitBluetoothActivatorParams): Promise<DeviceBean>;
export declare function getCurrentWifi(success: (ssid: string) => void, error: () => void): any;
