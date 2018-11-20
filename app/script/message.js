require('../plugin/spop/spop.min.js');

export default {
    filters: (value) => {
        return msgs[value];
    },
    error: function (content) {
        this.toPop(this.filters(content), 'error')
    },
    warning: function (content) {
        this.toPop(this.filters(content), 'warning')
    },
    info: function (content) {
        this.toPop(this.filters(content))
    },
    infoWithNoFilter: function (content) {
        this.toPop(content)
    },
    toPop: function (content, style, time = 3000) {

        if (time < 0) {
            time = false;
        }

        spop({
            template: content,
            position: 'bottom-center',
            autoclose: time,
            style: style
        });
    }
}

let msgs = {
    title: "动物王国",
    search: "搜索",
    confirm_no: "算了",
    confirm_yes: "好的",
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
    /*--------------------------------时间------------------------------------*/
    day: "天",
    hour: "时",
    minute: "分",
    second: "秒",
    metempsychosis: "转生",
    metempsychosis_complete: "完成转生",
    metempsychosis_prompt: "一次转世重生的机会,可能转生成为其他物种。确认立刻转生吗？",
    metempsychosis_tip: "使用现世积累的魂值每100点将提高1%转生成为高级物种的几率,剩余魂值每100点转化为1点来世用于增强属性的可分配点数,多余无法使用的魂值将会消散在转世重生的过程中",
    metempsychosis_wait: "轮回完成而未转生的生物,将会逐渐衰老",
    souls_for_metempsychosis: "用于转生的魂值",
    /*-----------------------------------------------------------------------*/
    /*--------------------------------动物------------------------------------*/
    lion: "狮",
    tiger: "虎",
    bear: "熊",
    bison: "野牛",
    leopard: "豹",
    kangaroo: "袋鼠",
    rhinoceros: "犀牛",
    monkey: "猴",
    elephant: "象",
    chimpanzees: "猩猩",
    zebra: "斑马",
    deer: "鹿",
    giraffe: "长颈鹿",
    goat: "山羊",
    hedgehog: "刺猬",
    mantis: "螳螂",
    grasshopper: "蚱蜢",
    ant: "蚂蚁",
    /*-----------------------------------------------------------------------*/
    name: "名字",
    species: "物种",
    health: "生命",
    satiety: "饱食度",
    vigour: "精力",
    prop_vigour: "很多行动会消耗精力,当你用完精力时,只好通过食物补充或者干脆睡一觉",
    strength: "力量",
    prop_strength: "强大的力量可以给予敌人致命伤害,也可以在别人攻击自己时进行强有力的反击",
    intelligence: "智力",
    prop_intelligence: "拥有杰出的智慧会令你更容易探索到新的大陆,发现周围的食物和其他动物",
    agile: "敏捷",
    prop_agile: "灵活的身体可以在被攻击时轻松躲闪掉敌人的攻击",
    speed: "速度",
    prop_speed: "闪电般的移动有机会成功从敌人的攻击中逃脱",
    souls: "魂值",
    prop_souls: "和世界里的其他生物互动将会获得魂值,当你离开这个世界时,魂值有可能让你获得更好的来生",
    metempsychosisCount: "轮回倒计时",
    prop_metempsychosisCount: "当倒计时结束时,你的此生修炼完成,你可以开始一段新的生命",
    point_to_alloc: "有未分配的属性点",
    alloc: "分配",
    point_left: "可用点数",
    no_alloc: "未行进任何分配",
    alloc_complete: "分配完成,你现在更强壮了",
    reset: "重置",
    explore: "探索",
    sleep: "睡眠",
    sleeping: "睡眠中",
    need_awake: "你还在睡眠中...",
    items: "行囊",
    /*--------------------------------大陆------------------------------------*/
    land: "地图",
    enter: "进入地图",
    need_previous_land: "请先进入相邻的大陆",
    land_name: "地名",
    land_move_wait: "您刚来到新的地方,休息片刻再启程吧",
    plant_rate: "植物产出率",
    /*-----------------------------------------------------------------------*/
    not_enough_satiety: "饱食度不足",
    not_enough_vigour: "精力不足",
    back: "返回",
    vigour_recover: "精力恢复",
    satiety_recover: "饱食度恢复",
    satiety_cost: "饱食度消耗",
    vigour_cost: "精力消耗",
    awake: "睡醒了",
    start: "开始",
    res_name: "名称",
    res_function: "用途",
    /*---------------------------植物---------------------------------------*/
    pinecone: "松果",
    watermelon: "西瓜",
    corn: "玉米",
    banana: "香蕉",
    tomato: "番茄",
    /*----------------------------探索---------------------------------------*/
    recover: "恢复",
    exploring: "探索中 ... ",
    start_explore: "开始探索",
    find_nothing: "什么都没有发现",
    find_plant: "发现植物",
    find_animal: "发现动物",
    /*---------------------------提示---------------------------------------*/
    tip: "小贴士",
    explore_tip: "开始探索会清空目前探索到的资源",
    /*-----------------------------------------------------------------------*/
    bag_empty: "空的行囊",
    bag_load: "负重",
    save_to_bag: "已放入背包",
    item_weight: "负重",
    load: "负重",
    bag_full: "行囊过重",
    /*---------------------------行为---------------------------------------*/
    res_operation: "操作",
    action: "行动",
    eat: "食用",
    collect: "收集",
    move_to: "移动到",
    friend: "交友",
    attack: "攻击",
    /*-----------------------------------------------------------------------*/

};
