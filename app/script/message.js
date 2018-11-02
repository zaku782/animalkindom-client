import Toastr from '../plugin/toastr/toastr.min'

Toastr.options = {
    "positionClass": "toast-bottom-right",
}

export default {
    filters: (value) => {
        return msgs[value];
    },
    error: function (content) {
        Toastr.error(this.filters(content));
    },
    warning: function (content) {
        Toastr.warning(this.filters(content));
    },
    info: function (content) {
        Toastr.info(this.filters(content));
    },
    infoWithNoFilter: function (content) {
        Toastr.info(content);
    }
}

let msgs = {
    title: "动物王国",
    search: "搜索",
    confirm_no: "否",
    confirm_yes: "是",
    your_name: "昵称",
    password: "密码",
    sign_out: "离开",
    server_error: "服务器通讯异常",
    login_status_error: "未登陆",
    sign_in: "登陆",
    sign_up: "注册",
    login_account_error: "账户信息错误",
    account_invalid: "昵称已被使用 ~",
    signing: "进入中...",
    loading: "加载中...",
    lion: "狮子",
    tiger: "老虎",
    name: "名字",
    species: "物种",
    health: "生命",
    satiety: "饱食度",
    vigour: "精力",
    strength: "力量",
    intelligence: "智力",
    agile: "敏捷",
    speed: "速度",
    grow_level: "成长",
    explore: "探索",
    sleep: "睡眠",
    sleeping: "睡眠中",
    inventory: "仓库",
    map: "地图",
    enter: "进入地图",
    need_previous_map: "请先进入前一张地图",
    mapName: "地名",
    map_move_wait: "您刚来到新的地方,休息片刻再启程吧",
    not_enough_satiety: "饱食度不足",
    not_enough_vigour: "精力不足",
    back: "返回",
    vigour_recover: "精力恢复",
    satiety_cost: "饱食度消耗",
    vigour_cost: "精力消耗",
    move_to: "移动到",
    awake: "睡醒了"
};
