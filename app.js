import {
    devicesList
} from './devices.js';

$(document).ready(function () {
    const devices = [];
    let currentVoltage = 12;
    let alarmHours = 1;
    let deviceCounter = 0;
    let rowCounter = 0;
    const results = {
        sumNormal: 0,
        sumAlarm: 0,
        calculatedCapacity: function () {
            return this.sumNormal * 24 + this.sumAlarm * alarmHours;
        },
        factCapacity: function () {
            const batteries = [4.5, 7, 9, 12, 14, 18, 24, 26, 32, 40, 52, 80];
            for (let value of batteries) {
                if (value >= this.calculatedCapacity()) return value;
            }
            return -1;
        }
    }



    const table = `<table class="selected-devices">
    <caption>Таблица устройств</caption>
    <thead>
        <tr>
            <th rowspan="2" width="20%">Устройство</th>
            <th rowspan="2" width="10%">Кол.</th>
            <th colspan="2" width="30%">Потребляемый ток<br /> в дежурном режиме, А</th>
            <th colspan="2" width="30%">Потребляемый ток<br /> в режиме тревоги, А</th>
            <th width="10%" class="without-borders">&nbsp;</th>
        </tr>
        <tr>
            <th width="15%">Ед.</th>
            <th width="15%">Суммарно</th>
            <th width="15%">Ед.</th>
            <th width="15%">Суммарно</th>
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
            <th colspan="4">Требуемая ёмкость АКБ</th>
            <th colspan="2" id="calculated-capacity">0</th>
            <th class="without-borders"></th>
        </tr>
        <tr class="result-row">
            <th colspan="4">Фактическая ёмкость АКБ</th>
            <th colspan="2" id="fact-capacity">0</th>
            <th class="without-borders"></th>
        </tr>
    </tfoot>
</table>`;

    const getInputDevice = (device) => {
        return devicesList.filter((e) => e.name === device)[0];
    }

    const makeDataList = (devicesList) => {
        for (let device of devicesList) {
            $("#devices-list").append(`<option value="${device.name}"></option>`);
        }
    }

    const clearServiceMessage = () => {
        $(".service-message").html("");
    }

    const addZeroMessage = () => {
        $(".service-message").html("<br>Добавьте хотя бы одно устройство для расчёта.");
        $(".selected-devices").css("display", "none");
    }

    const removeZeroMessage = () => {
        clearServiceMessage();
        $(".selected-devices").css("display", "table");
    }

    const clearInputs = () => {
        $('input[name="input-device"]').val("");
        $('input[name="input-quantity"]').val(1);
        if (rowCounter === 0) {
            addZeroMessage();
        } else {
            clearServiceMessage();
        }
    }

    const setStartState = () => {
        $('#voltage12').prop('checked', true);
        $('#voltage24').prop('checked', false);
        $('#time241').prop('checked', true);
        $('#time243').prop('checked', false);
        clearInputs();
    }

    const getPowerSupply = (capacity) => {
        const batteries = [4.5, 7, 9, 12, 14, 18, 24, 26, 32, 40, 52, 80];
        for (let value of batteries) {
            if (value >= capacity) return value;
        }
        return -1;
    }

    const calculate = () => {
        results.sumNormal = 0;
        results.sumAlarm = 0;
        for (let i = 0; i < devices.length; i += 1) {
            results.sumNormal += getAmperage(devices[i].id, "default", currentVoltage) * devices[i].quantity;
            results.sumAlarm += getAmperage(devices[i].id, "alarm", currentVoltage) * devices[i].quantity;
        }
        // results.calculatedCapacity = (24 * results.sumNormal + alarmHours * results.sumAlarm) / 0.7;
        // results.factCapacity = getPowerSupply(results.calculatedCapacity);
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
            $(".service-message").html(`<br><span style="color: red;">Данное устройство не рассчитано на работу от источника ${currentVoltage}В.</span>`);
            amperage = 0;
        }
       
        return amperage;
    }

    const generateTable = () => {
        clearServiceMessage();
        if (rowCounter === 0) {
            addZeroMessage();
        } else {
            calculate();
            let row;
            $(".table-container").html(table);
            for (let device of devices) {
                row = `<tr id="dev-${device.deviceNumber}"><td>${devicesList[device.id].name}</td><td>${device.quantity}</td>`;
                row += `<td>${getAmperage(devicesList[device.id].id, "default", currentVoltage).toFixed(3)}</td><td>${(getAmperage(devicesList[device.id].id, "default", currentVoltage) * device.quantity).toFixed(3)}</td>`;
                row += `<td>${getAmperage(devicesList[device.id].id, "alarm", currentVoltage).toFixed(3)}</td><td>${(getAmperage(devicesList[device.id].id, "alarm", currentVoltage) * device.quantity).toFixed(3)}</td>`;
                row += `<td class="without-borders"><button class="remove-device" id="remove-${device.deviceNumber}"><i class="fas fa-minus-circle"></i></button></td></tr>`;
                $("#devices-for-calculate").append(row);
                $(`#remove-${device.deviceNumber}`).on("click", function (e) {
                    removeDevice(e);
                });
            }

            $("#sum-normal").html(results.sumNormal.toFixed(3));
            $("#sum-alarm").html(results.sumAlarm.toFixed(3));
            $("#calculated-capacity").html(results.calculatedCapacity().toFixed(3));

            if (results.factCapacity === -1) {
                $("#fact-capacity").html('<span style="color: red;">>80</span>');
                $(".service-message").html("<br>Расчётная ёмкость превышает 80 Ач. Добавьте дополнительный источник питания или батарейный блок.");
            } else {
                $("#fact-capacity").html(results.factCapacity());
            }
        }
    }

    const addDevice = () => {

        // Читаем данные из поля ввода
        const inputDevice = $('input[name="input-device"]').val();
        const quantityOfDevices = parseInt($('input[name="input-quantity"]').val());
        clearInputs();

        // Получаем объект, соответствующий введённому устройству
        const device = getInputDevice(inputDevice);
        const deviceId = device.id;

        // Если ввод корректный, и устройство есть в базе
        if (device !== undefined) {
            if (rowCounter === 0) {
                removeZeroMessage();
            }

            // Добавляем объект в базу
            devices.push({
                deviceNumber: deviceCounter,
                id: deviceId,
                quantity: quantityOfDevices
            });

            // Изменяем счётчики
            deviceCounter += 1;
            rowCounter += 1;

            // Рендерим таблицу
            generateTable();


        } else if (inputDevice.length === 0) {
            $(".service-message").html('<br><span style="color: red;">Введите название устройства.</span>');
            $(".device-name").addClass("uncorrect");
        } else {
            $(".service-message").html('<br><span style="color: red;">Введённое устройство не найдено в базе данных программы.</span>');
            $(".device-name").addClass("uncorrect");
        }
    }

    const removeDevice = (e) => {
        let devId = e.target.id.slice(7);
        devId = parseInt(devId);

        const indexOfRemovedDevice = devices.findIndex(e => e.deviceNumber === devId);
        devices.splice(indexOfRemovedDevice, 1);

        rowCounter -= 1;
        generateTable();
    }

    const setupEventHandlers = () => {
        $("#add-device").on("click", function () {
            addDevice();
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

    const start = () => {
        makeDataList(devicesList);
        generateTable();
        addZeroMessage();
        setStartState();
        setupEventHandlers();
    }

    start();
});