import {
    devices
} from "./devices.js"

import {
    devicesList
} from "./deviceslist.js"

import {
    currentVoltage
} from "./parameters.js"

const table = `<table class="selected-devices">
    <thead>
        <tr>
            <th rowspan="2" width="25%">Устройство</th>
            <th rowspan="2" width="5%">Кол.</th>
            <th colspan="2" width="30%">Потребляемый ток<br /> в дежурном режиме, А</th>
            <th colspan="2" width="30%">Потребляемый ток<br /> в режиме тревоги, А</th>
            <th width="10%" class="without-borders">&nbsp;</th>
        </tr>
        <tr>
            <th width="15%">Ед.</th>
            <th width="15%">Сумм.</th>
            <th width="15%">Ед.</th>
            <th width="15%">Сумм.</th>
            <th class="without-borders">&nbsp;</th>
        </tr>
    </thead>
    <tbody id="devices-for-calculate">
    </tbody>
    <tfoot>
        <tr class="result-row">
            <th colspan="2">Итого</th>
            <th colspan="2" id="sum-normal">0</th>
            <th colspan="2" id="sum-alarm">0</th>
            <th class="without-borders"></th>
        </tr>
        <tr class="result-row">
            <th colspan="4">Требуемая ёмкость АКБ, Ач</th>
            <th colspan="2" id="calculated-capacity">0</th>
            <th class="without-borders"></th>
        </tr>
        <tr class="result-row">
            <th colspan="4">Фактическая ёмкость АКБ, Ач</th>
            <th colspan="2" id="fact-capacity">0</th>
            <th class="without-borders"></th>
        </tr>
    </tfoot>
</table><div class="recomended-power-supply"></div>`;

let rowCounter = 0;

// Собираем список устройств, которые будут показываться пользователю при вводе названия устройства
const makeDataList = (devicesList) => {
    for (let device of devicesList) {
        $("#devices-list").append(`<option value="${device.name}"></option>`);
    }
}

// Внутр. функция. Возвращает id устройства по введённому пользователем названию. Если не находит, то -1
const getInputDevice = () => {
    // Читаем данные из поля ввода
    const inputDevice = $('input[name="input-device"]').val();

    // Получаем объект, соответствующий введённому устройству
    const device = devicesList.filter((e) => e.name === inputDevice)[0];
    if (device) {
        return device.id;
    } else {
        return -1;
    }
}

// Возвращаем количество устройств
const getQuantity = () => {
    const quantityOfDevices = parseInt($('input[name="input-quantity"]').val());
    if (quantityOfDevices > 0) {
        return quantityOfDevices;
    }
    else {
        return -1;
    }
}

// Внутр. функция. Очищает сервисную строку
const clearServiceMessage = () => {
    $(".service-message").html("");
}

// Выводим сервисное сообщение
const setServiceMessage = (text) => {
    $(".service-message").html(text);
}

// Когда не введено ни одного устройства отображает сервисное сообщение и убирает таблицу
const hideTable = () => {
    setServiceMessage("Добавьте хотя бы одно устройство для расчёта.");
    $(".selected-devices").css("display", "none");
}

// Внутренняя функция. Когда есть хотя бы одно устройство, убирает сервисное сообщение и отображает таблицу
const showTable = () => {
    clearServiceMessage();
    $(".selected-devices").css("display", "table");
}

// Внутренняя функция. Очищает поля ввода
const clearInputs = () => {
    $('input[name="input-device"]').val("");
    $('input[name="input-quantity"]').val(1);
    if (rowCounter === 0) {
        hideTable();
    } else {
        clearServiceMessage();
    }
}

// Задаёт начальное состояние инпутов
const setStartState = () => {
    $('#voltage12').prop('checked', true);
    $('#voltage24').prop('checked', false);
    $('#time241').prop('checked', true);
    $('#time243').prop('checked', false);
    clearInputs();
}

// Генерируем таблицу
const generateTable = () => {
    // Очищаем сервисное сообщение
    clearServiceMessage();

    // Если нет устройств, то выставляем нулевое состояние
    // TODO: посмотреть как можно избавиться от rowCounter и deviceCounter, т.к. это число привязано к размеру базы
    // Вероятно, можно будет сделать отдельную функцию, возвращающую размер базы
    if (devices.isEmpty()) {
        hideTable();
    } else {
        // Если устройства есть, то можно генерировать табличку
        let row, defaultA, alarmA;
        $(".table-container").html(table);
        const devicesArray = devices.getAllDevices();
        for (let device of devicesArray) {
            // В ячейку дефолтного ампеража выводим devices.getDeviceAmperage(device.)
            defaultA = devices.getDeviceAmperage(device.id, "default", currentVoltage);
            alarmA = devices.getDeviceAmperage(device.id, "alarm", currentVoltage);
            row = `<tr id="dev-${device.deviceNumber}"><td>${devicesList[device.id].name}</td><td>${device.quantity}</td>`;
            row += `<td>${defaultA.toFixed(3)}</td><td>${(defaultA * device.quantity).toFixed(3)}</td>`;
            row += `<td>${alarmA.toFixed(3)}</td><td>${(alarmA * device.quantity).toFixed(3)}</td>`;
            row += `<td class="without-borders"><button class="remove-device" id="remove-${device.deviceNumber}"><i class="fas fa-minus-circle"></i></button></td></tr>`;
            $("#devices-for-calculate").append(row);
            if (alarmA === 0) {
                $(`#dev-${device.deviceNumber}`).addClass("error");
            }
            $(`#remove-${device.deviceNumber}`).on("click", function (e) {
                removeDevice(e);
            });
        }

        $("#sum-normal").html(devices.getSumNormal().toFixed(3));
        $("#sum-alarm").html(devices.getSumAlarm().toFixed(3));
        $("#calculated-capacity").html(devices.getCalculatedCapacity().toFixed(3));
        // $(".recomended-power-supply").html('Рекомендуемый источник питания');

        if (devices.getFactCapacity() === -1) {
            $("#fact-capacity").html('<span class="error">>80</span>');
            setServiceMessage("<br>Расчётная ёмкость превышает 80 Ач, добавьте батарейный блок.");
        } else {
            $("#fact-capacity").html(devices.getFactCapacity());
        }
    }
}

const removeDevice = (e) => {
    let devId = parseInt(e.target.id.slice(7));
    rowCounter -= 1;
    devices.removeDevice(devId);
    generateTable();
}

const setupEventHandlers = () => {
    $("#add-device").on("click", function () {
        const deviceId = getInputDevice(); // считываем устройство, которое ввел пользователь
        const quantity = getQuantity(); // считываем количество устройств
        clearInputs();  // очищаем поля ввода

        if (deviceId === -1) {
            // Если некорректное устройство, то вывести сервисное сообщение
            setServiceMessage('<br><span style="color: red;">Введённое устройство не найдено в базе данных программы.</span>');
            $(".device-name").addClass("uncorrect");
        } else {
            // Если всё нормально, то добавляем устройства в базу и в таблицу
            devices.addDevice(deviceId, quantity);
            if (rowCounter === 0) {
                showTable();
            }
            rowCounter += 1;
            generateTable();
        }
    });
    $(".device-name").on("focus", function () {
        $(".device-name").removeClass("uncorrect");
        clearServiceMessage();
    });
    $("input:radio[name=voltage]").change(function () {
        if (this.value == '12V') {
            currentVoltage = 12;
        } else if (this.value == '24V') {
            currentVoltage = 24;
        }
        generateTable();
    });
    $("input:radio[name=time]").change(function () {
        if (this.value == '241') {
            alarmHours = 1;
        } else if (this.value == '243') {
            alarmHours = 3;
        }
        generateTable();
    });
}

export {
    makeDataList,
    setStartState,
    generateTable,
    setupEventHandlers
}