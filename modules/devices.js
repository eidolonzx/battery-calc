import {
    devicesList
} from "./deviceslist.js";

import {
    currentVoltage,
    alarmHours
} from "./parameters.js"

const devices = {
    init: function() {
        this._devices = [];
        this._counter = 0;
    },

    getAllDevices: function() {
        return this._devices;
    },

    isEmpty: function() {
        if (this._devices.length > 0) {
            return false;
        }
        return true;
    },

    getDeviceAmperage: function(id, type, voltage) {
        return getAmperage(id, type, voltage);
    },

    addDevice: function(id, quantity) {
        this._devices.push({
            deviceNumber: this._counter,
            id,
            quantity
        });
        this._counter += 1;
    },

    removeDevice: function(id) {
        const idOfRemovedDevice = this._devices.findIndex(e => e.deviceNumber === id);
        this._devices.splice(idOfRemovedDevice, 1);
    },

    getSumNormal: function() {
        let sum = 0;
        for (let i = 0; i < this._devices.length; i += 1) {
            sum += getAmperage(this._devices[i].id, "default", currentVoltage) * this._devices[i].quantity;
        }
        return sum;
    },

    getSumAlarm: function() {
        let sum = 0;
        for (let i = 0; i < this._devices.length; i += 1) {
            sum += getAmperage(this._devices[i].id, "alarm", currentVoltage) * this._devices[i].quantity;
        }
        return sum;
    },

    getCalculatedCapacity: function() {
        return this.getSumNormal(currentVoltage) * 24 + this.getSumAlarm(currentVoltage) * alarmHours;
    },

    getFactCapacity: function() {
        const batteries = [4.5, 7, 9, 12, 14, 18, 24, 26, 32, 40, 52, 80];
        for (let value of batteries) {
            if (value >= this.getCalculatedCapacity(alarmHours, currentVoltage)) return value;
        }
        return -1;
    }
}

const getAmperage = (deviceId, type, voltage) => {
    let amperage = -1;
    if (type === "default") {
        if (voltage === 12) {
            amperage = devicesList[deviceId].defaultAmperage12;
        } else if (voltage === 24) {
            amperage = devicesList[deviceId].defaultAmperage24;
        }
    } else if (type === "alarm") {
        if (voltage === 12) {
            amperage = devicesList[deviceId].alarmAmperage12;
        } else if (voltage === 24) {
            amperage = devicesList[deviceId].alarmAmperage24;
        }
    }
    if (amperage === -1) {
        $(".service-message").html(`<span class="error">Невозможно выполнить правильный расчёт, одно из устройств<br>не предназначено для работы при выбранном напряжении.</span>`);
        amperage = 0;
    }

    return amperage;
}

export {
    devices
};
