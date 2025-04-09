import { Platform, NativeModules, NativeEventEmitter } from 'react-native';

var tuya = NativeModules.TuyaActivatorModule;
var tuyaBLEActivator = NativeModules.TuyaBLEActivatorModule;
var tuyaBLEScanner = NativeModules.TuyaBLEScannerModule;
function openNetworkSettings() {
  return tuya.openNetworkSettings({});
}
var ActivatorType;
(function (ActivatorType) {
  ActivatorType["AP"] = "THING_AP";
  ActivatorType["EZ"] = "THING_EZ";
  ActivatorType["AP_4G_GATEWAY"] = "THING_4G_GATEWAY";
  ActivatorType["QR"] = "THING_QR";
})(ActivatorType || (ActivatorType = {}));
function initActivator(params) {
  return tuya.initActivator(params);
}
function stopActivator() {
  return tuya.stopActivator();
}
function destroyActivator() {
  return tuya.destroyActivator();
}
function startBluetoothScan() {
  if (Platform.OS === 'ios') {
    return tuyaBLEScanner.startBluetoothScan();
  }
  return tuya.startBluetoothScan();
}
function initBluetoothDualModeActivator(params) {
  if (Platform.OS === 'ios') {
    return tuyaBLEActivator.initActivator(params);
  }
  return tuya.initBluetoothDualModeActivator(params);
}
function getCurrentWifi(success, error) {
  // We need the Allow While Using App location permission to use this.
  return tuya.getCurrentWifi({}, success, error);
}

var GROUPLISTENER = 'groupListener';
var HARDWAREUPGRADELISTENER = 'hardwareUpgradeListener';
var DEVLISTENER = 'devListener';
var SUBDEVLISTENER = 'subDevListener';
var HOMESTATUS = 'homeStatus';
var HOMECHANGE = 'homeChange';
var SINGLETRANSFER = 'SingleTransfer';
var eventEmitter = /*#__PURE__*/new NativeEventEmitter(NativeModules.TuyaRNEventEmitter);
function addEvent(eventName, callback) {
  return eventEmitter.addListener(eventName, callback);
}
var bridge = function bridge(key, id) {
  return key + "//" + id;
};

var tuya$1 = NativeModules.TuyaDeviceModule;
var devListenerSubs = {};
function registerDevListener(params, type, callback) {
  tuya$1.registerDevListener(params);
  var sub = addEvent(bridge(DEVLISTENER, params.devId), function (data) {
    if (data.type === type) {
      callback(data);
    }
  });
  devListenerSubs[params.devId] = sub;
}
function unRegisterAllDevListeners() {
  for (var devId in devListenerSubs) {
    var sub = devListenerSubs[devId];
    sub.remove();
    tuya$1.unRegisterDevListener({
      devId: devId
    });
  }
  devListenerSubs = {};
}
function send(params) {
  return tuya$1.send(params);
}
function removeDevice(params) {
  return tuya$1.removeDevice(params);
}
function renameDevice(params) {
  return tuya$1.renameDevice(params);
}
function getDataPointStat(params) {
  return tuya$1.getDataPointStat(params);
}

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

var tuya$2 = NativeModules.TuyaHomeModule;
function queryRoomList(params) {
  return tuya$2.queryRoomList(params);
}
function getHomeDetail(params) {
  var home = tuya$2.getHomeDetail(params);
  // Tuya's Android SDK uses different property names and has different types than the iOS SDK...
  if (Platform.OS === 'android') {
    home.deviceList = home.deviceList.map(function (device) {
      return _extends({}, device, {
        homeId: parseInt(device.ownerId),
        category: device.deviceCategory
      });
    });
  }
  return home;
}
function updateHome(params) {
  return tuya$2.updateHome(params);
}
function dismissHome(params) {
  return tuya$2.dismissHome(params);
}
function sortRoom(params) {
  return tuya$2.sortRoom(params);
}

var tuya$3 = NativeModules.TuyaHomeDataManagerModule;
function getRoomDeviceList(params) {
  return tuya$3.getRoomDeviceList(params);
}

var queryHomeList = function queryHomeList() {
  try {
    return Promise.resolve(tuya$4.queryHomeList()).then(function (homes) {
      // Tuya's Android SDK uses different property names than the iOS SDK...
      if (Platform.OS === 'android') {
        homes = homes.map(function (m) {
          return _extends({}, m, {
            dealStatus: m.homeStatus
          });
        });
      }
      return homes;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var tuya$4 = NativeModules.TuyaHomeManagerModule;
function createHome(params) {
  return tuya$4.createHome(params);
}
function joinFamily(params) {
  return tuya$4.joinFamily(params);
}

var queryMemberList = function queryMemberList(params) {
  try {
    return Promise.resolve(tuya$5.queryMemberList(params)).then(function (members) {
      // Tuya's Android SDK uses different property names than the iOS SDK...
      if (Platform.OS === 'android') {
        members = members.map(function (m) {
          return {
            admin: m.admin,
            username: m.account,
            id: m.memberId,
            dealStatus: m.memberStatus
          };
        });
      }
      return members;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var tuya$5 = NativeModules.TuyaHomeMemberModule;
function addMember(params) {
  return tuya$5.addMember(params);
}
function removeMember(params) {
  return tuya$5.removeMember(params);
}

var tuya$6 = NativeModules.TuyaDeviceModule;
function startOta(params, onSuccess, onFailure, onProgress) {
  tuya$6.startOta(params);
  return addEvent(bridge(HARDWAREUPGRADELISTENER, params.devId), function (data) {
    if (data.type === 'onSuccess') {
      onSuccess(data);
    } else if (data.type === 'onFailure') {
      onFailure(data);
    } else if (data.type === 'onProgress') {
      onProgress(data);
    }
  });
}
function getOtaInfo(params) {
  return tuya$6.getOtaInfo(params);
}

var getTimerWithTask = function getTimerWithTask(params) {
  try {
    return Promise.resolve(tuya$7.getTimerWithTask(params)).then(function (timers) {
      timers.forEach(function (t) {
        t.timerTaskStatus.open = !!t.timerTaskStatus.open;
      });
      return timers;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getAllTimerWithDeviceId = function getAllTimerWithDeviceId(params) {
  try {
    return Promise.resolve(tuya$7.getAllTimerWithDeviceId(params)).then(function (timers) {
      timers.forEach(function (t) {
        t.timerTaskStatus.open = !!t.timerTaskStatus.open;
        // Tuya's Android SDK uses different property names and has different types than the iOS SDK...
        if (Platform.OS === 'android') {
          t.timerList = t.timerList.map(function (timer) {
            return _extends({}, timer, {
              status: !!timer.status,
              dps: JSON.parse(timer.value)
            });
          });
        }
      });
      return timers;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var tuya$7 = NativeModules.TuyaTimerModule;
function addTimerWithTask(params) {
  return tuya$7.addTimerWithTask(params);
}
function updateTimerWithTask(params) {
  return tuya$7.updateTimerWithTask(params);
}
function getTimerTaskStatusWithDeviceId(params) {
  return tuya$7.getTimerTaskStatusWithDeviceId(params);
}
function removeTimerWithTask(params) {
  return tuya$7.removeTimerWithTask(params);
}
function updateTimerStatusWithTask(params) {
  return tuya$7.updateTimerStatusWithTask(params);
}
function updateTimerTaskStatusWithTask(params) {
  return tuya$7.updateTimerTaskStatusWithTask(params);
}

var getCurrentUser = function getCurrentUser() {
  try {
    return Promise.resolve(tuya$8.getCurrentUser()).then(function (user) {
      // The iOS SDK returns an empty user model but the Android one doesn't.
      return user ? user : null;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var tuya$8 = NativeModules.TuyaUserModule;
function loginOrRegisterWithUid(params) {
  return tuya$8.loginOrRegisterWithUid(params);
}
function registerAccountWithEmail(params) {
  return tuya$8.registerAccountWithEmail(params);
}
function loginWithEmailPassword(params) {
  return tuya$8.loginWithEmailPassword(params);
}
function getValidateCode(params) {
  return tuya$8.getValidateCode(params);
}
function checkValidateCode(params) {
  return tuya$8.checkValidateCode(params);
}
function resetEmailPassword(params) {
  return tuya$8.resetEmailPassword(params);
}
function logout() {
  return tuya$8.logout();
}
function cancelAccount() {
  return tuya$8.cancelAccount();
}
var ValidateCodeType;
(function (ValidateCodeType) {
  ValidateCodeType[ValidateCodeType["REGISTER"] = 1] = "REGISTER";
  ValidateCodeType[ValidateCodeType["LOGIN"] = 2] = "LOGIN";
  ValidateCodeType[ValidateCodeType["RESET_PASSWORD"] = 3] = "RESET_PASSWORD";
})(ValidateCodeType || (ValidateCodeType = {}));

export { ActivatorType, DEVLISTENER, GROUPLISTENER, HARDWAREUPGRADELISTENER, HOMECHANGE, HOMESTATUS, SINGLETRANSFER, SUBDEVLISTENER, ValidateCodeType, addEvent, addMember, addTimerWithTask, bridge, cancelAccount, checkValidateCode, createHome, destroyActivator, dismissHome, getAllTimerWithDeviceId, getCurrentUser, getCurrentWifi, getDataPointStat, getHomeDetail, getOtaInfo, getRoomDeviceList, getTimerTaskStatusWithDeviceId, getTimerWithTask, getValidateCode, initActivator, initBluetoothDualModeActivator, joinFamily, loginOrRegisterWithUid, loginWithEmailPassword, logout, openNetworkSettings, queryHomeList, queryMemberList, queryRoomList, registerAccountWithEmail, registerDevListener, removeDevice, removeMember, removeTimerWithTask, renameDevice, resetEmailPassword, send, sortRoom, startBluetoothScan, startOta, stopActivator, unRegisterAllDevListeners, updateHome, updateTimerStatusWithTask, updateTimerTaskStatusWithTask, updateTimerWithTask };
//# sourceMappingURL=react-native-tuya.esm.js.map
