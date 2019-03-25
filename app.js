import {
    devicesList
} from './modules/deviceslist.js';

import {
    devices
} from './modules/devices.js';

import {
    makeDataList,
    setStartState,
    generateTable,
    setupEventHandlers,
} from './modules/ui.js';

$(document).ready(function () {
    makeDataList(devicesList);
    devices.init();
    generateTable();
    setStartState();
    setupEventHandlers();
});