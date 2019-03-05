import {
    devicesList
} from './devices.js';

const tableHeader = `<table class="selected-devices">
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
</thead>`;

const tableBody = `<tbody id="devices-for-calculate"></tbody>`;

const tableFooter = `<tfoot>
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

// Собираем список для элемента datalist
const makeDataList = () => {
    $(document).ready(function () {
        for (let device of devicesList) {
            $("#devices-list").append(`<option value="${device.name}"></option>`);
        }
    });
}

// Собираем таблицу для расчёта
const createTable = () => {
    $(document).ready(function () {
        $(".table-container").html(tableHeader + tableBody + tableFooter);
    });
}

// Очищаем поля ввода
const clearInputs = () => {
    $(document).ready(function () {
        $('input[name="input-device"]').val("");
        $('input[name="input-quantity"]').val(1);
    });
}





const screenInit = () => {
    makeDataList();
    createTable();
    clearInputs();
}

export {
    screenInit
}