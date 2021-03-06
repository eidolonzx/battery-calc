const devicesList = [
    {
        id: 0,
        name: "С2000-М",
        defaultAmperage12: 0.06,
        alarmAmperage12: 0.08,
        defaultAmperage24: 0.035,
        alarmAmperage24: 0.045
    }, {
        id: 1,
        name: "С2000-Ethernet",
        defaultAmperage12: 0.09,
        alarmAmperage12: 0.09,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.05
    }, {
        id: 2,
        name: "С2000-РПИ",
        defaultAmperage12: 0.06,
        alarmAmperage12: 0.06,
        defaultAmperage24: 0.04,
        alarmAmperage24: 0.04
    }, {
        id: 3,
        name: "С2000-ПИ",
        defaultAmperage12: 0.12,
        alarmAmperage12: 0.12,
        defaultAmperage24: 0.06,
        alarmAmperage24: 0.06
    }, {
        id: 4,
        name: "Сигнал-20П",
        defaultAmperage12: 0.6,
        alarmAmperage12: 0.65,
        defaultAmperage24: 0.3,
        alarmAmperage24: 0.33
    }, {
        id: 5,
        name: "Сигнал-10",
        defaultAmperage12: 0.31,
        alarmAmperage12: 0.41,
        defaultAmperage24: 0.15,
        alarmAmperage24: 0.2
    }, {
        id: 6,
        name: "С2000-4",
        defaultAmperage12: 0.2,
        alarmAmperage12: 0.26,
        defaultAmperage24: 0.11,
        alarmAmperage24: 0.14
    }, {
        id: 7,
        name: "С2000-ПУ",
        defaultAmperage12: 0.07,
        alarmAmperage12: 0.07,
        defaultAmperage24: 0.07,
        alarmAmperage24: 0.07
    }, {
        id: 8,
        name: "С2000-БИ",
        defaultAmperage12: 0.05,
        alarmAmperage12: 0.2,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.1
    }, {
        id: 9,
        name: "С2000-БИ исп.02",
        defaultAmperage12: 0.05,
        alarmAmperage12: 0.3,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.15
    }, {
        id: 10,
        name: "С2000-БКИ",
        defaultAmperage12: 0.05,
        alarmAmperage12: 0.2,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.1
    }, {
        id: 11,
        name: "С2000-К",
        defaultAmperage12: 0.05,
        alarmAmperage12: 0.05,
        defaultAmperage24: 0.025,
        alarmAmperage24: 0.025
    }, {
        id: 12,
        name: "С2000-КС",
        defaultAmperage12: 0.1,
        alarmAmperage12: 0.1,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.05
    }, {
        id: 13,
        name: "С2000-2",
        defaultAmperage12: 0.12,
        alarmAmperage12: 0.12,
        defaultAmperage24: -1,
        alarmAmperage24: -1
    }, {
        id: 14,
        name: "С2000-КДЛ",
        defaultAmperage12: 0.16,
        alarmAmperage12: 0.16,
        defaultAmperage24: 0.08,
        alarmAmperage24: 0.08
    }, {
        id: 15,
        name: "С2000-ПТ",
        defaultAmperage12: 0.05,
        alarmAmperage12: 0.2,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.1
    }, {
        id: 16,
        name: "Поток-БКИ",
        defaultAmperage12: 0.2,
        alarmAmperage12: 0.2,
        defaultAmperage24: 0.1,
        alarmAmperage24: 0.1
    }, {
        id: 17,
        name: "С2000-ИТ",
        defaultAmperage12: 0.05,
        alarmAmperage12: 0.05,
        defaultAmperage24: 0.05,
        alarmAmperage24: 0.05
    }, {
        id: 18,
        name: "С2000-PGE",
        defaultAmperage12: 0.25,
        alarmAmperage12: 0.25,
        defaultAmperage24: 0.125,
        alarmAmperage24: 0.125
    }, {
        id: 19,
        name: "С2000-СП1",
        defaultAmperage12: 0.02,
        alarmAmperage12: 0.14,
        defaultAmperage24: 0.015,
        alarmAmperage24: 0.07
    }, {
        id: 20,
        name: "С2000-СП1 исп.01",
        defaultAmperage12: 0.02,
        alarmAmperage12: 0.3,
        defaultAmperage24: 0.015,
        alarmAmperage24: 0.15
    }, {
        id: 21,
        name: "С2000-КПБ",
        defaultAmperage12: 0.1,
        alarmAmperage12: 0.1,
        defaultAmperage24: 0.1,
        alarmAmperage24: 0.1
    }, {
        id: 22,
        name: "ОПОП 2-35 12В",
        defaultAmperage12: 0,
        alarmAmperage12: 0.035,
        defaultAmperage24: -1,
        alarmAmperage24: -1
    }, {
        id: 23,
        name: "ОПОП 2-35 24В",
        defaultAmperage12: -1,
        alarmAmperage12: -1,
        defaultAmperage24: 0,
        alarmAmperage24: 0.04
    }, {
        id: 24,
        name: "ОПОП 1-8",
        defaultAmperage12: 0.02,
        alarmAmperage12: 0.02,
        defaultAmperage24: 0.02,
        alarmAmperage24: 0.02
    },
];

const powerSupplyList = [
    {
        id: 0,
        name: 'ИВЭПР 12/1,2 1x4',
        amperage: 1.2,
        voltage: 12,
        capacity: 4,
        type: 'rubezhNA',
        addBlocks: false
    }, {
        id: 1,
        name: 'ИВЭПР 12/1,5 1x7 -Р',
        amperage: 1.5,
        voltage: 12,
        capacity: 7,
        type: 'rubezhNA',
        addBlocks: false
    }, {
        id: 0,
        name: 'ИВЭПР 12/2 1x7 -Р',
        amperage: 1.2,
        voltage: 12,
        capacity: 7,
        type: 'rubezhNA',
        addBlocks: false
    }, {
        id: 0,
        name: 'ИВЭПР 12/2 2x7 -Р',
        amperage: 1.2,
        voltage: 12,
        capacity: 14,
        type: 'rubezhNA',
        addBlocks: false
    }, {
        id: 0,
        name: 'ИВЭПР 12/2 2x12 -Р БР',
        amperage: 1.2,
        voltage: 12,
        capacity: 24,
        type: 'rubezhNA',
        addBlocks: true
    }, {
        id: 0,
        name: 'ИВЭПР 12/3,5 2x7 -Р',
        amperage: 1.2,
        voltage: 12,
        capacity: 14,
        type: 'rubezhNA',
        addBlocks: false
    }, {
        id: 0,
        name: 'ИВЭПР 12/3,5 2x12 -Р БР',
        amperage: 1.2,
        voltage: 12,
        capacity: 24,
        type: 'rubezhNA',
        addBlocks: true
    }, {
        id: 0,
        name: 'ИВЭПР 12/3,5 2x17 -Р БР',
        amperage: 1.2,
        voltage: 12,
        capacity: 34,
        type: 'rubezhNA',
        addBlocks: true
    }, {
        id: 0,
        name: 'ИВЭПР 12/5 2x7 -Р',
        amperage: 1.2,
        voltage: 12,
        capacity: 14,
        type: 'rubezhNA',
        addBlocks: false
    }, {
        id: 0,
        name: 'ИВЭПР 12/5 2x12 -Р БР',
        amperage: 1.2,
        voltage: 12,
        capacity: 24,
        type: 'rubezhNA',
        addBlocks: true
    }, {
        id: 0,
        name: 'ИВЭПР 12/5 2x17 -Р БР',
        amperage: 1.2,
        voltage: 12,
        capacity: 34,
        type: 'rubezhNA',
        addBlocks: true
    }, {
        id: 0,
        name: 'ИВЭПР 12/5 2x40 -Р БР с АКБ 2х26',
        amperage: 1.2,
        voltage: 12,
        capacity: 52,
        type: 'rubezhNA',
        addBlocks: true
    }, {
        id: 0,
        name: 'ИВЭПР 12/5 2x40 -Р БР',
        amperage: 1.2,
        voltage: 12,
        capacity: 80,
        type: 'rubezhNA',
        addBlocks: true
    }
];

export { devicesList, powerSupplyList };