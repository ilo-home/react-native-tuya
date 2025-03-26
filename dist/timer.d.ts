import { DeviceDps } from './device';
export declare type AddTimerWithTaskDpsParams = {
    devId: string;
    taskName: string;
    loops: string;
    time: string;
    dps: DeviceDps;
};
export declare function addTimerWithTask(params: AddTimerWithTaskDpsParams): Promise<any>;
export declare type UpdateTimerWithTaskParams = AddTimerWithTaskDpsParams & {
    timerId: string;
    isOpen: boolean;
};
export declare function updateTimerWithTask(params: UpdateTimerWithTaskParams): Promise<any>;
export declare type GetTimerTaskStatusWithDeviceIdParams = {
    devId: string;
};
export declare function getTimerTaskStatusWithDeviceId(params: GetTimerTaskStatusWithDeviceIdParams): Promise<any>;
export declare type GetAllTimerWithDeviceIdParams = {
    devId: string;
};
export declare type TimerTask = {
    timerList: {
        timerId: string;
        loops: string;
        time: string;
        status: number;
        open: boolean;
        value: string;
    }[];
    timerTaskStatus: {
        open: boolean;
        timerName: string;
    };
};
export declare type GetAllTimerWithDeviceIdResponse = TimerTask[];
export declare function getAllTimerWithDeviceId(params: GetAllTimerWithDeviceIdParams): Promise<GetAllTimerWithDeviceIdResponse>;
export declare type GetTimerWithTaskParams = {
    devId: string;
    taskName: string;
};
export declare type GetTimerWithTaskResponse = TimerTask[];
export declare function getTimerWithTask(params: GetTimerWithTaskParams): Promise<GetTimerWithTaskResponse>;
export declare type RemoveTimerWithTaskParams = {
    devId: string;
    taskName: string;
    timerId: string;
};
export declare function removeTimerWithTask(params: RemoveTimerWithTaskParams): Promise<any>;
export declare type UpdateTimerStatusWithTaskParams = {
    devId: string;
    taskName: string;
    timerId: string;
    isOpen: boolean;
};
export declare function updateTimerStatusWithTask(params: UpdateTimerStatusWithTaskParams): Promise<any>;
