export declare type CreateHomeParams = {
    name: string;
    geoName: string;
    lon: number;
    lat: number;
    rooms: string[];
};
export declare function createHome(params: CreateHomeParams): Promise<string>;
export declare type HomeDetailsResponse = {
    name: string;
    admin: boolean;
    background: string;
    dealStatus: 1 | 2 | 3;
    displayOrder: number;
    geoName: string;
    gid: number;
    role: -1 | 0 | 1 | 2 | 999;
    homeId: number;
    lat: number;
    lon: number;
};
export declare type QueryHomeListResponse = HomeDetailsResponse[];
export declare function queryHomeList(): Promise<QueryHomeListResponse>;
export declare type JoinFamilyParams = {
    homeId: number;
    action: boolean;
};
export declare function joinFamily(params: JoinFamilyParams): any;
