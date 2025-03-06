package com.tuya.smart.rnsdk.user

import com.facebook.react.bridge.*
import com.thingclips.smart.android.user.api.IBooleanCallback
import com.thingclips.smart.android.user.api.ILoginCallback
import com.thingclips.smart.android.user.api.ILogoutCallback
import com.thingclips.smart.android.user.api.IRegisterCallback
import com.thingclips.smart.android.user.api.IResetPasswordCallback
import com.thingclips.smart.android.user.api.IUidLoginCallback
import com.thingclips.smart.android.user.bean.User
import com.thingclips.smart.home.sdk.ThingHomeSdk
import com.thingclips.smart.sdk.enums.TempUnitEnum
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.ACCESSTOKEN
import com.tuya.smart.rnsdk.utils.Constant.CODE
import com.tuya.smart.rnsdk.utils.Constant.COUNTRYCODE
import com.tuya.smart.rnsdk.utils.Constant.FILEPATH
import com.tuya.smart.rnsdk.utils.Constant.ID
import com.tuya.smart.rnsdk.utils.Constant.KEY
import com.tuya.smart.rnsdk.utils.Constant.NEWPASSWORD
import com.tuya.smart.rnsdk.utils.Constant.PASSWORD
import com.tuya.smart.rnsdk.utils.Constant.REGION
import com.tuya.smart.rnsdk.utils.Constant.SECRET
import com.tuya.smart.rnsdk.utils.Constant.TEMPUNITENUM
import com.tuya.smart.rnsdk.utils.Constant.TOKEN
import com.tuya.smart.rnsdk.utils.Constant.TYPE
import com.tuya.smart.rnsdk.utils.Constant.USERID
import com.tuya.smart.rnsdk.utils.Constant.VALIDATECODE
import com.tuya.smart.rnsdk.utils.Constant.getIResultCallback
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import java.io.File

class TuyaUserModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TuyaUserModule"
    }

    /* 检测是否要升级用户数据 */
    @ReactMethod
    fun checkVersionUpgrade(promise: Promise) {
        promise.resolve(ThingHomeSdk.getUserInstance().checkVersionUpgrade())
    }

    /* 升级账号 */
    @ReactMethod
    fun upgradeVersion(promise: Promise) {
        ThingHomeSdk.getUserInstance().upgradeVersion(getIResultCallback(promise))
    }

    /* 手机验证码登录 */
    @ReactMethod
    fun loginWithPhoneValidateCode(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, VALIDATECODE), params)) {
            ThingHomeSdk.getUserInstance().loginWithPhone(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(VALIDATECODE),
                    getLoginCallback(promise))
        }
    }

    /* 注册手机密码账户*/
    @ReactMethod
    fun registerAccountWithPhone(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD, VALIDATECODE), params)) {
            ThingHomeSdk.getUserInstance().registerAccountWithPhone(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    params.getString(VALIDATECODE),
                    getRegisterCallback(promise))
        }
    }


    /* 手机密码登录 */
    @ReactMethod
    fun loginWithPhonePassword(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD), params)) {
            ThingHomeSdk.getUserInstance().loginWithPhonePassword(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    getLoginCallback(promise))
        }
    }

    /* 手机密码重置 */
    @ReactMethod
    fun resetPhonePassword(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, VALIDATECODE, NEWPASSWORD), params)) {
            ThingHomeSdk.getUserInstance().resetPhonePassword(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(VALIDATECODE),
                    params.getString(NEWPASSWORD),
                    getResetPasswdCallback(promise))
        }
    }

    /* 邮箱密码注册 */
    @ReactMethod
    fun registerAccountWithEmail(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD, VALIDATECODE), params)) {
            ThingHomeSdk.getUserInstance().registerAccountWithEmail(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    params.getString(VALIDATECODE),
                    getRegisterCallback(promise)
            )
        }
    }

    /* 邮箱密码登陆 */
    @ReactMethod
    fun loginWithEmailPassword(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD), params)) {
            ThingHomeSdk.getUserInstance().loginWithEmail(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    getLoginCallback(promise)
            )
        }
    }

    /* 邮箱获取验证码 找密码 */
    @ReactMethod
    fun getValidateCode(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, REGION, ID, TYPE), params)) {
            ThingHomeSdk.getUserInstance().sendVerifyCodeWithUserName(
                    params.getString(ID),
                    params.getString(REGION),
                    params.getString(COUNTRYCODE),
                    params.getInt(TYPE),
                    getIResultCallback(promise)
            )
        }
    }

    @ReactMethod
    fun checkValidateCode(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, REGION, ID, VALIDATECODE, TYPE), params)) {
            ThingHomeSdk.getUserInstance().checkCodeWithUserName(
                    params.getString(ID),
                    params.getString(REGION),
                    params.getString(COUNTRYCODE),
                    params.getString(VALIDATECODE),
                    params.getInt(TYPE),
                    getIResultCallback(promise)
            )
        }
    }

    /* 邮箱重置密码 */
    @ReactMethod
    fun resetEmailPassword(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, VALIDATECODE, NEWPASSWORD), params)) {
            ThingHomeSdk.getUserInstance().resetEmailPassword(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(VALIDATECODE),
                    params.getString(NEWPASSWORD),
                    getResetPasswdCallback(promise)
            )
        }
    }

    /* logout */
    @ReactMethod
    fun logout(promise: Promise) {
        ThingHomeSdk.getUserInstance().logout(object : ILogoutCallback {
            override fun onSuccess() {
                promise.resolve(Constant.SUCCESS)
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }

        })
    }

    /* 注销账户 */
    @ReactMethod
    fun cancelAccount(promise: Promise) {
        ThingHomeSdk.getUserInstance().cancelAccount(getIResultCallback(promise))
    }

    /* 用户uid注册*/
    @ReactMethod
    fun registerAccountWithUid(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD), params)) {
            ThingHomeSdk.getUserInstance().registerAccountWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    getRegisterCallback(promise))
        }
    }

    /* uid 登陆*/
    @ReactMethod
    fun loginWithUid(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD), params)) {
            ThingHomeSdk.getUserInstance().loginWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    getLoginCallback(promise))
        }
    }

    /* uid 登陆和注册合并一个接口*/
    @ReactMethod
    fun loginOrRegisterWithUid(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, ID, PASSWORD), params)) {
            ThingHomeSdk.getUserInstance().loginOrRegisterWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(ID),
                    params.getString(PASSWORD),
                    false, // Do not create default home, do that separately
                    getUidLoginCallback(promise))
        }
    }


    /* Twitter登陆*/
    @ReactMethod
    fun loginByTwitter(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, KEY, SECRET), params)) {
            ThingHomeSdk.getUserInstance().loginByTwitter(
                    params.getString(COUNTRYCODE),
                    params.getString(KEY),
                    params.getString(SECRET),
                    getLoginCallback(promise))
        }
    }


    /* QQ登陆*/
    @ReactMethod
    fun loginByQQ(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, USERID, ACCESSTOKEN), params)) {
            ThingHomeSdk.getUserInstance().loginByQQ(
                    params.getString(COUNTRYCODE),
                    params.getString(USERID),
                    params.getString(ACCESSTOKEN),
                    getLoginCallback(promise))
        }
    }

    /* 微信登陆*/
    @ReactMethod
    fun loginByWechat(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, CODE), params)) {
            ThingHomeSdk.getUserInstance().loginByWechat(
                    params.getString(COUNTRYCODE),
                    params.getString(CODE),
                    getLoginCallback(promise))
        }
    }

    /* Facebook登陆*/
    @ReactMethod
    fun loginByFacebook(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE, TOKEN), params)) {
            ThingHomeSdk.getUserInstance().loginByFacebook(
                    params.getString(COUNTRYCODE),
                    params.getString(TOKEN),
                    getLoginCallback(promise))
        }
    }

    @ReactMethod
    fun getCurrentUser(promise: Promise) {
        if (ThingHomeSdk.getUserInstance().user != null) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(ThingHomeSdk.getUserInstance().user))
        } else {
            promise.resolve(null)
        }
    }


    /* 上传用户头像*/
    @ReactMethod
    fun uploadUserAvatar(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(FILEPATH), params)) {
            ThingHomeSdk.getUserInstance().uploadUserAvatar(
                    File(params.getString(FILEPATH)), getIBooleanCallback(promise))
        }
    }

    /* 设置温度单位*/
    @ReactMethod
    fun setTempUnit(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(TEMPUNITENUM), params)) {
            ThingHomeSdk.getUserInstance().setTempUnit(TempUnitEnum.valueOf(params.getString(TEMPUNITENUM) as String), getIResultCallback(promise))
        }
    }


    fun getLoginCallback(promise: Promise): ILoginCallback? {
        val callback = object : ILoginCallback {
            override fun onSuccess(user: User?) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(user))
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }

        }
        return callback
    }

    fun getUidLoginCallback(promise: Promise): IUidLoginCallback? {
        return object : IUidLoginCallback {
            override fun onSuccess(user: User, homeId: Long) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(user))
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }

    fun getRegisterCallback(promise: Promise): IRegisterCallback? {
        return object : IRegisterCallback {
            override fun onSuccess(user: User?) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(user))
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }

        }
    }

    fun getResetPasswdCallback(promise: Promise): IResetPasswordCallback? {
        return object : IResetPasswordCallback {
            override fun onSuccess() {
                promise.resolve(Constant.SUCCESS)
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }

        }
    }

    fun getIBooleanCallback(promise: Promise): IBooleanCallback? {
        return object : IBooleanCallback {
            override fun onSuccess() {
                promise.resolve(Constant.SUCCESS)
            }

            override fun onError(code: String, error: String) {
                promise.reject(code, error)
            }
        }
    }
}
