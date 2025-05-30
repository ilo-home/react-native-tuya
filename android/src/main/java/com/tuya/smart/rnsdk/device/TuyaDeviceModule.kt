package com.tuya.smart.rnsdk.device

import com.alibaba.fastjson.JSON
import com.facebook.react.bridge.*
import com.thingclips.smart.android.device.api.IGetDataPointStatCallback
import com.thingclips.smart.android.device.bean.DataPointStatBean
import com.thingclips.smart.android.device.enums.DataPointTypeEnum
import com.thingclips.smart.home.sdk.ThingHomeSdk
import com.thingclips.smart.sdk.api.IDevListener
import com.thingclips.smart.sdk.api.IThingDevice
import com.tuya.smart.rnsdk.utils.BridgeUtils
import com.tuya.smart.rnsdk.utils.Constant.COMMAND
import com.tuya.smart.rnsdk.utils.Constant.DATAPOINTTYPEENUM
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.Constant.DPID
import com.tuya.smart.rnsdk.utils.Constant.NAME
import com.tuya.smart.rnsdk.utils.Constant.NUMBER
import com.tuya.smart.rnsdk.utils.Constant.STARTTIME
import com.tuya.smart.rnsdk.utils.Constant.getIResultCallback
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils


class TuyaDeviceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    var device: IThingDevice? = null

    override fun getName(): String {
        return "TuyaDeviceModule"
    }

    @ReactMethod
    fun getDevice(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(getDevice(params.getString(DEVID) as String)))
        }
    }

    @ReactMethod
    fun getDeviceData(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(ThingHomeSdk.getDataInstance().getDeviceBean(params.getString(DEVID))))
        }
    }

    @ReactMethod
    fun registerDevListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            device = getDevice(params.getString(DEVID) as String)
            device?.registerDevListener(object : IDevListener {
                override fun onDpUpdate(devId: String, dpStr: String) {
                    //dp数据更新:devId 和相应dp数据
                    val map = Arguments.createMap()
                    map.putString("devId", devId)
                    map.putString("dpStr", dpStr)
                    map.putString("type", "onDpUpdate");
                    BridgeUtils.devListener(reactApplicationContext, map, params.getString(DEVID) as String)
                }

                override fun onRemoved(devId: String) {
                    //设备被移除
                    val map = Arguments.createMap()
                    map.putString("devId", devId)
                    map.putString("type", "onRemoved");
                    BridgeUtils.devListener(reactApplicationContext, map, params.getString(DEVID) as String)
                }

                override fun onStatusChanged(devId: String, online: Boolean) {
                    //设备在线状态，online
                    val map = Arguments.createMap()
                    map.putString("devId", devId)
                    map.putBoolean("online", online)
                    map.putString("type", "onStatusChanged");
                    BridgeUtils.devListener(reactApplicationContext, map, params.getString(DEVID) as String)
                }

                override fun onNetworkStatusChanged(devId: String, status: Boolean) {
                    //网络状态监听
                    val map = Arguments.createMap()
                    map.putString("devId", devId)
                    map.putBoolean("status", status)
                    map.putString("type", "onNetworkStatusChanged");

                    BridgeUtils.devListener(reactApplicationContext, map, params.getString(DEVID) as String)
                }

                override fun onDevInfoUpdate(devId: String) {
                    //设备信息变更，目前只有设备名称变化，会调用该接口
                    val map = Arguments.createMap()
                    map.putString("devId", devId)
                    map.putString("type", "onDevInfoUpdate");
                    BridgeUtils.devListener(reactApplicationContext, map, params.getString(DEVID) as String)
                }
            })

        }
    }

    @ReactMethod
    fun unRegisterDevListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            if (device != null) {
                device!!.unRegisterDevListener()
            }
        }
    }

    @ReactMethod
    fun onDestroy(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            getDevice(params.getString(DEVID) as String)?.onDestroy()
        }
    }


    @ReactMethod
    fun send(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID, COMMAND), params)) {
            getDevice(params.getString(DEVID) as String)?.publishDps(
                JSON.toJSONString(TuyaReactUtils.parseToMap(params.getMap(COMMAND) as ReadableMap)),
                getIResultCallback(promise)
            )
        }
    }


    @ReactMethod
    fun getDp(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID, DPID), params)) {
            promise.resolve(getDevice(params.getString(DEVID) as String)?.getDp(
                    params.getString(DPID),
                    getIResultCallback(promise)
            ))
        }
    }

    @ReactMethod
    fun renameDevice(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID, NAME), params)) {
            getDevice(params.getString(DEVID) as String)?.renameDevice(params.getString(NAME), getIResultCallback(promise))
        }
    }

    @ReactMethod
    fun getDataPointStat(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID, DATAPOINTTYPEENUM, NUMBER, DPID, STARTTIME), params)) {
            getDevice(params.getString(DEVID) as String)?.getDataPointStat(DataPointTypeEnum.valueOf(params.getString(DATAPOINTTYPEENUM) as String),
                    params.getDouble(STARTTIME).toLong(),
                    params.getInt(NUMBER),
                    params.getString(DPID),
                    getIGetDataPointStatCallback(promise)
            )
        }
    }

    @ReactMethod
    fun removeDevice(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            getDevice(params.getString(DEVID) as String)?.removeDevice(getIResultCallback(promise))
        }
    }

    fun getIGetDataPointStatCallback(promise: Promise): IGetDataPointStatCallback {
        return object : IGetDataPointStatCallback {

            override fun onSuccess(p0: DataPointStatBean?) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(p0))
            }


            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }


    fun getDevice(devId: String): IThingDevice {
        return ThingHomeSdk.newDeviceInstance(devId);
    }

}
