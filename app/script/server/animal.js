import Net from './net.js'

export default {
    getInfo: function () {
        return Net.get('/animal/getInfo/');
    },
    explore: function () {
        return Net.get('/animal/explore/');
    },
    sleep: function () {
        return Net.get('/animal/sleep/');
    },
    isExploring: function () {
        return Net.get('/animal/isExploring/');
    },
    getFindPlants: function () {
        return Net.get('/animal/getFindPlants/');
    },
    eatAtOnce: function (plantName) {
        return Net.get('/animal/eatAtOnce/' + plantName + '/');
    },
    getBagLoad: function () {
        return Net.get('/animal/getBagLoad/');
    },
    getBagItems: function () {
        return Net.get('/animal/getBagItems/');
    },
    eatFromBag: function (itemId) {
        return Net.get('/animal/eatFromBag/' + itemId + '/');
    },
    collectPlant: function (plantName) {
        return Net.get('/animal/collectPlant/' + plantName + '/');
    },
    metempsychosis: function (useSouls) {
        return Net.get('/animal/metempsychosis/' + useSouls + '/');
    },
    addPoint: function (pointAdd) {
        return Net.post('/animal/addPoint/', pointAdd);
    }
}
