export declare type DeviceBean = {
    productId: string;
    devId: string;
    verSw: string;
    name: string;
    dps: DeviceDps;
};
export declare type DevListenerParams = {
    devId: string;
};
export declare type DevListenerType = 'onDpUpdate' | 'onRemoved' | 'onStatusChanged' | 'onNetworkStatusChanged' | 'onDevInfoUpdate' | 'onFirmwareUpgradeSuccess' | 'onFirmwareUpgradeFailure' | 'onFirmwareUpgradeProgress';
export declare function registerDevListener(params: DevListenerParams, type: DevListenerType, callback: (data: any) => void): void;
export declare function unRegisterAllDevListeners(): void;
export declare type DeviceDpValue = boolean | number | string | Record<string, string | number | boolean>;
export declare type DeviceDps = {
    [dpId: string]: DeviceDpValue;
};
export declare type SendParams = {
    devId: string;
    command: DeviceDps;
};
export declare function send(params: SendParams): any;
export declare type RemoveDeviceParams = {
    devId: string;
};
export declare function removeDevice(params: RemoveDeviceParams): Promise<string>;
export declare type RenameDeviceParams = {
    devId: string;
    name: string;
};
export declare function renameDevice(params: RenameDeviceParams): Promise<string>;
export declare type GetDataPointStatsParams = {
    devId: string;
    DataPointTypeEnum: 'DAY' | 'WEEK' | 'MONTH';
    number: number;
    dpId: string;
    startTime: number;
};
export declare function getDataPointStat(params: GetDataPointStatsParams): Promise<any>;
