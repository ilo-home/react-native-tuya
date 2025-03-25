'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactNative = require('react-native');

var tuya = reactNative.NativeModules.TuyaActivatorModule;
var tuyaBLEActivator = reactNative.NativeModules.TuyaBLEActivatorModule;
var tuyaBLEScanner = reactNative.NativeModules.TuyaBLEScannerModule;
function openNetworkSettings() {
  return tuya.openNetworkSettings({});
}
(function (ActivatorType) {
  ActivatorType["AP"] = "THING_AP";
  ActivatorType["EZ"] = "THING_EZ";
  ActivatorType["AP_4G_GATEWAY"] = "THING_4G_GATEWAY";
  ActivatorType["QR"] = "THING_QR";
})(exports.ActivatorType || (exports.ActivatorType = {}));
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
  if (reactNative.Platform.OS === 'ios') {
    return tuyaBLEScanner.startBluetoothScan();
  }
  return tuya.startBluetoothScan();
}
function initBluetoothDualModeActivator(params) {
  if (reactNative.Platform.OS === 'ios') {
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
var eventEmitter = /*#__PURE__*/new reactNative.NativeEventEmitter(reactNative.NativeModules.TuyaRNEventEmitter);
function addEvent(eventName, callback) {
  return eventEmitter.addListener(eventName, callback);
}
var bridge = function bridge(key, id) {
  return key + "//" + id;
};

var tuya$1 = reactNative.NativeModules.TuyaDeviceModule;
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

var tuya$2 = reactNative.NativeModules.TuyaHomeModule;
function queryRoomList(params) {
  return tuya$2.queryRoomList(params);
}
function getHomeDetail(params) {
  return tuya$2.getHomeDetail(params);
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

var tuya$3 = reactNative.NativeModules.TuyaHomeDataManagerModule;
function getRoomDeviceList(params) {
  return tuya$3.getRoomDeviceList(params);
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

var queryHomeList = function queryHomeList() {
  try {
    return Promise.resolve(tuya$4.queryHomeList()).then(function (homes) {
      // Tuya's Android SDK uses different property names than the iOS SDK...
      if (reactNative.Platform.OS === 'android') {
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
var tuya$4 = reactNative.NativeModules.TuyaHomeManagerModule;
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
      if (reactNative.Platform.OS === 'android') {
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
var tuya$5 = reactNative.NativeModules.TuyaHomeMemberModule;
function addMember(params) {
  return tuya$5.addMember(params);
}
function removeMember(params) {
  return tuya$5.removeMember(params);
}

var tuya$6 = reactNative.NativeModules.TuyaDeviceModule;
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
      });
      return timers;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var tuya$7 = reactNative.NativeModules.TuyaTimerModule;
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
var tuya$8 = reactNative.NativeModules.TuyaUserModule;
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
(function (ValidateCodeType) {
  ValidateCodeType[ValidateCodeType["REGISTER"] = 1] = "REGISTER";
  ValidateCodeType[ValidateCodeType["LOGIN"] = 2] = "LOGIN";
  ValidateCodeType[ValidateCodeType["RESET_PASSWORD"] = 3] = "RESET_PASSWORD";
})(exports.ValidateCodeType || (exports.ValidateCodeType = {}));

exports.DEVLISTENER = DEVLISTENER;
exports.GROUPLISTENER = GROUPLISTENER;
exports.HARDWAREUPGRADELISTENER = HARDWAREUPGRADELISTENER;
exports.HOMECHANGE = HOMECHANGE;
exports.HOMESTATUS = HOMESTATUS;
exports.SINGLETRANSFER = SINGLETRANSFER;
exports.SUBDEVLISTENER = SUBDEVLISTENER;
exports.addEvent = addEvent;
exports.addMember = addMember;
exports.addTimerWithTask = addTimerWithTask;
exports.bridge = bridge;
exports.cancelAccount = cancelAccount;
exports.checkValidateCode = checkValidateCode;
exports.createHome = createHome;
exports.destroyActivator = destroyActivator;
exports.dismissHome = dismissHome;
exports.getAllTimerWithDeviceId = getAllTimerWithDeviceId;
exports.getCurrentUser = getCurrentUser;
exports.getCurrentWifi = getCurrentWifi;
exports.getDataPointStat = getDataPointStat;
exports.getHomeDetail = getHomeDetail;
exports.getOtaInfo = getOtaInfo;
exports.getRoomDeviceList = getRoomDeviceList;
exports.getTimerTaskStatusWithDeviceId = getTimerTaskStatusWithDeviceId;
exports.getTimerWithTask = getTimerWithTask;
exports.getValidateCode = getValidateCode;
exports.initActivator = initActivator;
exports.initBluetoothDualModeActivator = initBluetoothDualModeActivator;
exports.joinFamily = joinFamily;
exports.loginOrRegisterWithUid = loginOrRegisterWithUid;
exports.loginWithEmailPassword = loginWithEmailPassword;
exports.logout = logout;
exports.openNetworkSettings = openNetworkSettings;
exports.queryHomeList = queryHomeList;
exports.queryMemberList = queryMemberList;
exports.queryRoomList = queryRoomList;
exports.registerAccountWithEmail = registerAccountWithEmail;
exports.registerDevListener = registerDevListener;
exports.removeDevice = removeDevice;
exports.removeMember = removeMember;
exports.removeTimerWithTask = removeTimerWithTask;
exports.renameDevice = renameDevice;
exports.resetEmailPassword = resetEmailPassword;
exports.send = send;
exports.sortRoom = sortRoom;
exports.startBluetoothScan = startBluetoothScan;
exports.startOta = startOta;
exports.stopActivator = stopActivator;
exports.unRegisterAllDevListeners = unRegisterAllDevListeners;
exports.updateHome = updateHome;
exports.updateTimerStatusWithTask = updateTimerStatusWithTask;
exports.updateTimerWithTask = updateTimerWithTask;
//# sourceMappingURL=react-native-tuya.cjs.development.js.map
