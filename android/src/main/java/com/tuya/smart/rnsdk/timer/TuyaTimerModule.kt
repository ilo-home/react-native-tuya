package com.tuya.smart.rnsdk.timer

import com.alibaba.fastjson.JSON
import com.facebook.react.bridge.*
import com.thingclips.smart.android.device.builder.ThingTimerBuilder
import com.thingclips.smart.android.device.enums.TimerDeviceTypeEnum
import com.thingclips.smart.home.sdk.ThingHomeSdk
import com.thingclips.smart.home.sdk.constant.TimerUpdateEnum
import com.thingclips.smart.sdk.api.IGetAllTimerWithDevIdCallback
import com.thingclips.smart.sdk.api.IGetDeviceTimerStatusCallback
import com.thingclips.smart.sdk.api.IGetTimerWithTaskCallback
import com.thingclips.smart.sdk.api.IResultStatusCallback
import com.thingclips.smart.sdk.api.IResultCallback
import com.thingclips.smart.sdk.api.IThingDataCallback
import com.thingclips.smart.sdk.bean.TimerTask
import com.thingclips.smart.sdk.bean.TimerTaskStatus
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.Constant.DPS
import com.tuya.smart.rnsdk.utils.Constant.ISOPEN
import com.tuya.smart.rnsdk.utils.Constant.LOOPS
import com.tuya.smart.rnsdk.utils.Constant.STATUS
import com.tuya.smart.rnsdk.utils.Constant.TASKNAME
import com.tuya.smart.rnsdk.utils.Constant.TIME
import com.tuya.smart.rnsdk.utils.Constant.TIMERID
import com.tuya.smart.rnsdk.utils.JsonUtils
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import java.util.ArrayList


class TuyaTimerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TuyaTimerModule"
    }

    /**
     *   增加定时器 单dp点 默认置为true  支持子设备
     *  @param taskName     定时任务名称
     *  @param loops        循环次数 "0000000", 每一位 0:关闭,1:开启, 从左至右依次表示: 周日 周一 周二 周三 周四 周五 周六
     *  @param devId        设备Id或群组Id
     *  @param dps          dp点键值对，key是dpId，value是dpValue,仅支持单dp点
     *  @param time         定时任务下的定时钟
     *  @param callback     回调
     */
    @ReactMethod
    fun addTimerWithTask(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TASKNAME, LOOPS, DEVID, DPS, TIME), params)) {
            val command = JSON.toJSONString(
                TuyaReactUtils.parseToMap(params.getMap(DPS) as ReadableMap)
            )
            val time = params.getString(TIME) as String

            // Create JSON string manually since command cannot be surrounded by quotes
            val actions = "{\"dps\":${command},\"time\":\"${time}\"}"

            ThingHomeSdk.getTimerInstance().updateTimer(
                ThingTimerBuilder.Builder()
                .taskName(params.getString(TASKNAME))
                .devId(params.getString(DEVID))
                .deviceType(TimerDeviceTypeEnum.DEVICE)
                .actions(actions)
                .loops(params.getString(LOOPS))
                .aliasName(params.getString(TASKNAME))
                .status(1)
                .appPush(false)
                .build(),
                getIResultCallback(promise)
            )
        }
    }

    /*获取某设备下的所有定时任务状态*/
    @ReactMethod
    @Deprecated("Use getAllTimerWithDeviceId instead", ReplaceWith("getAllTimerWithDeviceId(params)"))
    fun getTimerTaskStatusWithDeviceId(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            ThingHomeSdk.getTimerManagerInstance().getTimerTaskStatusWithDeviceId(
                    params.getString(DEVID),
                    getIGetDeviceTimerStatusCallback(promise)
            )
        }
    }

    /*控制定时任务中所有定时器的开关状态*/
    @ReactMethod
    @Deprecated("Use updateTimerStatusWithTask instead", ReplaceWith("updateTimerStatusWithTask(params)"))
    fun updateTimerTaskStatusWithTask(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TASKNAME, DEVID, STATUS), params)) {
            ThingHomeSdk.getTimerManagerInstance().updateTimerTaskStatusWithTask(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    params.getInt(STATUS),
                    getIResultStatusCallback(promise)
            )
        }
    }

    /*控制某个定时器的开关状态*/
    @ReactMethod
    fun updateTimerStatusWithTask(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TASKNAME, DEVID, TIMERID, ISOPEN), params)) {
            val timerIds = ArrayList<String>()
            timerIds.add(params.getString(TIMERID) as String)

            val isOpen = params.getBoolean(ISOPEN)
            if (isOpen) {
                ThingHomeSdk.getTimerInstance().updateTimerStatus(
                    params.getString(DEVID),
                    TimerDeviceTypeEnum.DEVICE,
                    timerIds,
                    TimerUpdateEnum.OPEN,
                    getIResultCallback(promise)
                )
            } else {
                ThingHomeSdk.getTimerInstance().updateTimerStatus(
                    params.getString(DEVID),
                    TimerDeviceTypeEnum.DEVICE,
                    timerIds,
                    TimerUpdateEnum.CLOSE,
                    getIResultCallback(promise)
                )
            }
        }
    }


    /*删除定时器*/
    @ReactMethod
    fun removeTimerWithTask(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TASKNAME, DEVID, TIMERID), params)) {
            val timerIds = ArrayList<String>()
            timerIds.add(params.getString(TIMERID) as String)

            ThingHomeSdk.getTimerInstance().updateTimerStatus(
                params.getString(DEVID),
                TimerDeviceTypeEnum.DEVICE,
                timerIds,
                TimerUpdateEnum.DELETE,
                getIResultCallback(promise)
            )
        }
    }

    /**
     * * 更新定时器的状态
     * @param taskName 定时任务名称
     * @param loops    循环次数 如每周每天传”1111111”
     * @param devId    设备Id或群组Id
     * @param timerId  定时钟Id
     * @param time     定时时间
     * @param isOpen	  是否开启
     * @param callback 回调
     */
    @ReactMethod
    fun updateTimerWithTask(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TASKNAME, LOOPS, DEVID, TIMERID, TIME, ISOPEN), params)) {
            val command = JSON.toJSONString(
              TuyaReactUtils.parseToMap(params.getMap(DPS) as ReadableMap)
            )
            val time = params.getString(TIME) as String

            val actions = "{\"dps\":${command},\"time\":\"${time}\"}"

            var status = 0
            if (params.getBoolean(ISOPEN)) {
                status = 1
            }

            val timerId = params.getString(TIMERID) as String

            ThingHomeSdk.getTimerInstance().updateTimer(
                ThingTimerBuilder.Builder()
                    .taskName(params.getString(TASKNAME))
                    .devId(params.getString(DEVID))
                    .deviceType(TimerDeviceTypeEnum.DEVICE)
                    .timerId(timerId.toLong())
                    .actions(actions)
                    .loops(params.getString(LOOPS))
                    .aliasName(params.getString(TASKNAME))
                    .status(status)
                    .appPush(false)
                    .build(),
                getIResultCallback(promise)
            )
        }
    }

    /*获取定时任务下所有定时器*/
    @ReactMethod
    fun getTimerWithTask(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TASKNAME, DEVID), params)) {
            ThingHomeSdk.getTimerInstance().getTimerList(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    TimerDeviceTypeEnum.DEVICE,
                    getIGetTimerWithTaskCallback(promise))
        }
    }

    /*获取设备所有定时任务下所有定时器*/
    @ReactMethod
    fun getAllTimerWithDeviceId(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            ThingHomeSdk.getTimerInstance().getAllTimerList(
                    params.getString(DEVID),
                    TimerDeviceTypeEnum.DEVICE,
                    getIGetAllTimerWithDevIdCallback(promise))
        }
    }

    private fun getIGetAllTimerWithDevIdCallback(promise: Promise): IThingDataCallback<List<TimerTask>> {
        return object : IThingDataCallback<List<TimerTask>> {
            override fun onSuccess(result: List<TimerTask>?) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(result!!)))
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }

    private fun getIGetTimerWithTaskCallback(promise: Promise): IThingDataCallback<TimerTask> {
        return object : IThingDataCallback<TimerTask> {
            override fun onSuccess(result: TimerTask?) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(result))
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }

    private fun getIGetDeviceTimerStatusCallback(promise: Promise): IGetDeviceTimerStatusCallback {
        return object : IGetDeviceTimerStatusCallback {
            override fun onSuccess(p0: ArrayList<TimerTaskStatus>?) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(p0!!)))
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }

    private fun getIResultStatusCallback(promise: Promise): IResultStatusCallback {
        return object : IResultStatusCallback {
            override fun onSuccess() {
                promise.resolve(Constant.SUCCESS)
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }

    private fun getIResultCallback(promise: Promise): IResultCallback {
        return object : IResultCallback {
            override fun onSuccess() {
                promise.resolve(Constant.SUCCESS)
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }
}
