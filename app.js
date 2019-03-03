import {
    devicesList
} from './devices.js';

$(document).ready(function () {
    let deviceCounter = 0;
    let rowCounter = 0;
    const defaultAmperages = [];
    const alarmAmperages = [];

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

    const sumOfArrayNumbers = (array) => {
        return array.reduce(function (sum, current) {
            return sum + current;
        }, 0);
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

    const getPowerSupply = (capacity) => {
        const batteries = [4.5, 7, 9, 12, 14, 18, 24, 26, 32, 40, 52, 80];
        for (let value of batteries) {
            if (value >= capacity) return value;
        }
        return -1;
    }

    const calculate = () => {


        const sumDefaultAmperages = sumOfArrayNumbers(defaultAmperages);
        const sumAlarmAmperages = sumOfArrayNumbers(alarmAmperages);

        const calculatedCapacity = (24 * sumDefaultAmperages + sumAlarmAmperages) / 0.7;
        $("#sum-normal").html(sumDefaultAmperages.toFixed(3));
        $("#sum-alarm").html(sumAlarmAmperages.toFixed(3));
        $("#calculated-capacity").html(calculatedCapacity.toFixed(3));
        // $("#fact-capacity").html(getBatteryCapacity(calculatedCapacity).toFixed(3));
        $("#fact-capacity").html(getPowerSupply(calculatedCapacity));
    }

    const addDevice = () => {

        // 1. Читаем данные из поля ввода
        const inputDevice = $('input[name="input-device"]').val();
        const quantityOfDevices = $('input[name="input-quantity"]').val();
        clearInputs();

        // 2. Получаем объект, соответствующий введённому устройству
        const device = getInputDevice(inputDevice);

        if (device !== undefined) {

            if (rowCounter === 0) {
                removeZeroMessage();
            }

            // 3. Добавляем объект в таблицу
            const id = `#remove-${deviceCounter}`;

            $("#devices-for-calculate").append(`<tr id="dev-${deviceCounter}"><td>${device.name}</td><td>${quantityOfDevices}</td><td>${device.defaultAmperage.toFixed(3)}</td><td>${(device.defaultAmperage * quantityOfDevices).toFixed(3)}</td><td>${device.alarmAmperage.toFixed(3)}</td><td>${(device.alarmAmperage * quantityOfDevices).toFixed(3)}</td><td class="without-borders"><button class="remove-device" id="remove-${deviceCounter}"><i class="fas fa-minus-circle"></i></button></td></tr>`)

            $(id).on("click", function (e) {
                removeDevice(e);
            });

            // 4. Добавляем токи объекта в расчёт
            defaultAmperages[deviceCounter] = device.defaultAmperage * quantityOfDevices;
            alarmAmperages[deviceCounter] = device.alarmAmperage * quantityOfDevices;

            // 5. Делаем пересчёт
            calculate();

            // 6. Изменяем счётчики
            deviceCounter += 1;
            rowCounter += 1;
        } else if (inputDevice.length === 0) {
            $(".service-message").html('<br><span style="color: red;">Введите название устройства.</span>');
            $(".device-name").addClass("uncorrect");
        } else {
            $(".service-message").html('<br><span style="color: red;">Введённое устройство не найдено в базе данных программы.</span>');
            $(".device-name").addClass("uncorrect");
        }
    }

    const removeDevice = (e) => {
        const devId = e.target.id.slice(7);
        const rowId = `#dev-${devId}`;
        $(rowId).remove();
        defaultAmperages[parseInt(devId)] = 0;
        alarmAmperages[parseInt(devId)] = 0;
        calculate();
        rowCounter -= 1;
        if (rowCounter === 0) {
            addZeroMessage();
        }
    }

    const setupEventHandlers = () => {
        $("#add-device").on("click", function () {
            addDevice();
        });
        $(".device-name").on("focus", function () {
            $(".device-name").removeClass("uncorrect");
            clearServiceMessage();
        });
    }

    const start = () => {
        makeDataList(devicesList);
        $(".table-container").html(table);
        addZeroMessage();
        clearInputs();
        setupEventHandlers();
    }

    start();
});