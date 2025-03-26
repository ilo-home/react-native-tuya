import { NativeModules } from 'react-native';
import { DeviceDps } from './device';

const tuya = NativeModules.TuyaTimerModule;

export type AddTimerWithTaskDpsParams = {
  devId: string;
  taskName: string;
  loops: string; // Number of cycles "0000000", each 0: off, 1: on, from left to right: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
  time: string; // e.g. 14:29
  dps: DeviceDps;
};

export function addTimerWithTask(
  params: AddTimerWithTaskDpsParams
): Promise<any> {
  return tuya.addTimerWithTask(params);
}

export type UpdateTimerWithTaskParams = AddTimerWithTaskDpsParams & {
  timerId: string;
  isOpen: boolean;
};

export function updateTimerWithTask(
  params: UpdateTimerWithTaskParams
): Promise<any> {
  return tuya.updateTimerWithTask(params);
}

export type GetTimerTaskStatusWithDeviceIdParams = {
  devId: string;
};

export function getTimerTaskStatusWithDeviceId(
  params: GetTimerTaskStatusWithDeviceIdParams
): Promise<any> {
  return tuya.getTimerTaskStatusWithDeviceId(params);
}

export type GetAllTimerWithDeviceIdParams = {
  devId: string;
};

export type TimerTask = {
  timerList: {
    timerId: string;
    loops: string;
    time: string;
    status: number;
    open: boolean;
    value: string; // DeviceDps in stringified form
  }[];
  timerTaskStatus: { open: boolean; timerName: string };
};

export type GetAllTimerWithDeviceIdResponse = TimerTask[];

export async function getAllTimerWithDeviceId(
  params: GetAllTimerWithDeviceIdParams
): Promise<GetAllTimerWithDeviceIdResponse> {
  const timers = await tuya.getAllTimerWithDeviceId(params);
  timers.forEach((t: any) => {
    t.timerTaskStatus.open = !!t.timerTaskStatus.open;
  });
  return timers;
}

export type GetTimerWithTaskParams = {
  devId: string;
  taskName: string;
};

export type GetTimerWithTaskResponse = TimerTask[];

export async function getTimerWithTask(
  params: GetTimerWithTaskParams
): Promise<GetTimerWithTaskResponse> {
  const timers = await tuya.getTimerWithTask(params);
  timers.forEach((t: any) => {
    t.timerTaskStatus.open = !!t.timerTaskStatus.open;
  });
  return timers;
}

export type RemoveTimerWithTaskParams = {
  devId: string;
  taskName: string;
  timerId: string;
};

export function removeTimerWithTask(
  params: RemoveTimerWithTaskParams
): Promise<any> {
  return tuya.removeTimerWithTask(params);
}

export type UpdateTimerStatusWithTaskParams = {
  devId: string;
  taskName: string;
  timerId: string;
  isOpen: boolean;
};

export function updateTimerStatusWithTask(
  params: UpdateTimerStatusWithTaskParams
): Promise<any> {
  return tuya.updateTimerStatusWithTask(params);
}

export type UpdateTimerTaskStatusWithTaskParams = {
  devId: string;
  taskName: string;
  status: number; // 1 - open, 2 - close, 3 - delete
};

export function updateTimerTaskStatusWithTask(
  params: UpdateTimerTaskStatusWithTaskParams
): Promise<any> {
  return tuya.updateTimerTaskStatusWithTask(params);
}
