import { NativeModules, Platform } from 'react-native';

const tuya = NativeModules.TuyaHomeManagerModule;

export type CreateHomeParams = {
  name: string;
  geoName: string;
  lon: number;
  lat: number;
  rooms: string[];
};

export function createHome(params: CreateHomeParams): Promise<string> {
  return tuya.createHome(params);
}

export type HomeDetailsResponse = {
  name: string;
  admin: boolean;
  background: string;
  dealStatus: 1 | 2 | 3; // 1 = unaccepted, 2 = accepted, 3 = rejected
  displayOrder: number;
  geoName: string;
  gid: number;
  role: -1 | 0 | 1 | 2 | 999; // -1 = custom, 0 = member, 1 = admin, 2 = owner, -999 = invalid
  homeId: number;
  lat: number;
  lon: number;
};

export type QueryHomeListResponse = HomeDetailsResponse[];

export async function queryHomeList(): Promise<QueryHomeListResponse> {
  let homes = await tuya.queryHomeList();

  // Tuya's Android SDK uses different property names than the iOS SDK...
  if (Platform.OS === 'android') {
    homes = homes.map((m: any) => ({
      ...m,
      dealStatus: m.homeStatus,
    }));
  }
  
  return homes;
}

export type JoinFamilyParams = {
  homeId: number;
  action: boolean;
};

export function joinFamily(params: JoinFamilyParams) {
  return tuya.joinFamily(params);
}
