import { NativeModules, Platform } from 'react-native';
import { DeviceDps } from './device';

const tuya = NativeModules.TuyaHomeModule;

export type QueryRoomListParams = {
  homeId?: number;
};
export type QueryRoomListResponse = {
  name: string;
  displayOrder: number;
  id: number;
  roomId: number;
}[];

export function queryRoomList(
  params: QueryRoomListParams
): Promise<QueryRoomListResponse> {
  return tuya.queryRoomList(params);
}

export type GetHomeDetailParams = {
  homeId: number;
};
export type DeviceDetailResponse = {
  homeId: number;
  isOnline: boolean;
  isLocalOnline: boolean; 
  cloudOnline: boolean;
  productId: string;
  category: string; // e.g. "dj"
  categoryCode: string; // e.g. "wf_ble_dj"
  devId: string;
  iconUrl: string;
  verSw: string;
  name: string;
  dps: DeviceDps;
  homeDisplayOrder: number;
  roomId: number;
};
export type GetHomeDetailResponse = {
  deviceList: DeviceDetailResponse[];
  groupList: any[];
  meshList: any[];
  sharedDeviceList: any[];
  sharedGroupList: any[];
};

export async function getHomeDetail(
  params: GetHomeDetailParams
): Promise<GetHomeDetailResponse> {
  const home = await tuya.getHomeDetail(params);

  // Tuya's Android SDK uses different property names and has different types than the iOS SDK...
  if (Platform.OS === 'android') {
    home.deviceList = home.deviceList.map((device: any) => ({
      ...device,
      homeId: parseInt(device.ownerId),
      category: device.deviceCategory
    }));
  }

  return home;
}

export type UpdateHomeParams = {
  homeId: number;
  name: string;
  geoName: string;
  lon: number;
  lat: number;
};

export function updateHome(params: UpdateHomeParams): Promise<string> {
  return tuya.updateHome(params);
}

export type DismissHomeParams = {
  homeId: number;
};

export function dismissHome(params: DismissHomeParams): Promise<string> {
  return tuya.dismissHome(params);
}

export type SortRoomsParams = {
  idList: number[];
  homeId: number;
};

export function sortRoom(params: SortRoomsParams): Promise<string> {
  return tuya.sortRoom(params);
}
