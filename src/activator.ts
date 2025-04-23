import { DeviceBean } from './device';
import { NativeModules, Platform } from 'react-native';
import { DeviceDetailResponse } from './home';

const tuya = NativeModules.TuyaActivatorModule;
const tuyaBLEActivator = NativeModules.TuyaBLEActivatorModule;
const tuyaBLEScanner = NativeModules.TuyaBLEScannerModule;

export function openNetworkSettings() {
  return tuya.openNetworkSettings({});
}

export enum ActivatorType {
  AP = 'THING_AP',
  EZ = 'THING_EZ',
  AP_4G_GATEWAY = 'THING_4G_GATEWAY',
  QR = 'THING_QR',
}

export type InitActivatorParams = {
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

export async function initActivator(
  params: InitActivatorParams
): Promise<DeviceDetailResponse> {
  const device = await tuya.initActivator(params);
  
  // Tuya's Android SDK uses different property names and has different types than the iOS SDK...
  if (Platform.OS === 'android') {
    device.homeId = parseInt(device.ownerId);
    device.category = device.deviceCategory;
  }

  return device;
}

export function stopActivator() {
  return tuya.stopActivator();
}

export function destroyActivator() {
  return tuya.destroyActivator();
}

export function startBluetoothScan() {
  if (Platform.OS === 'ios') {
    return tuyaBLEScanner.startBluetoothScan();
  }
  return tuya.startBluetoothScan();
}

export function initBluetoothDualModeActivator(
  params: InitBluetoothActivatorParams
): Promise<DeviceBean> {
  if (Platform.OS === 'ios') {
    return tuyaBLEActivator.initActivator(params);
  }
  return tuya.initBluetoothDualModeActivator(params);
}

export function getCurrentWifi(
  success: (ssid: string) => void,
  error: () => void
) {
  // We need the Allow While Using App location permission to use this.
  return tuya.getCurrentWifi({}, success, error);
}
