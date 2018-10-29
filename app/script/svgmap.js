import svg from 'svg'

let mouseDown = false
let mouseDownPos = {x: 0, y: 0}
let canvasOffset = {left: 0, top: 0}
let canvasCenter = {x: 0, y: 0}
let oneMapSize = {x: 80, y: 80}
let canvasHeight;
let canvasWidth;
let lineLength = 40;
let drawMaps = [];
let draw;
let mapFunction;
let maps;
let mapColor = '#5bc0de';
let mapNameColor = '#fff';
let mapLineColor = '#2c3e50';
let mapCurrentColor = '#2c3e50';
let mapChooseLineWidth = 5;
let mapUnChooseLineWidth = 1;
let mapMoveZone = {x: {min: 0, max: 0}, y: {min: 0, max: 0}};

export default {
    drawMap: function (frame, canvasId, mapsData, mapInfoFunction, resize) {
        if (!resize) {
            draw = svg(canvasId)
        }
        mapFunction = mapInfoFunction;
        maps = mapsData;
        drawMaps = [];

        let maxMapNumber = maps.discoveredMaps[maps.discoveredMaps.length - 1].id;
        let maxLoop = loopName(maxMapNumber);

        let canvas = $("#" + canvasId);
        addEvents(frame, canvas);

        let minMapSizeForDraw = maxLoop * (oneMapSize.x + lineLength) * 2 + oneMapSize.x * 2;
        canvasHeight = minMapSizeForDraw < frame.height() ? frame.height() : minMapSizeForDraw;
        canvasWidth = minMapSizeForDraw < frame.width() ? frame.width() : minMapSizeForDraw;

        canvas.height(canvasHeight);
        canvas.width(canvasWidth);
        //将地图移动到中心位置
        canvasOffset.left = frame.width() / 2 - canvasWidth / 2;
        canvasOffset.top = frame.height() / 2 - canvasHeight / 2;
        canvas.css('left', canvasOffset.left);
        canvas.css('top', canvasOffset.top);

        let xOffset = (canvasWidth - frame.width()) / 2;
        let yOffset = (canvasHeight - frame.height()) / 2;
        mapMoveZone.x.min = canvasOffset.left - xOffset;
        mapMoveZone.x.max = canvasOffset.left + xOffset;
        mapMoveZone.y.min = canvasOffset.top - yOffset;
        mapMoveZone.y.max = canvasOffset.top + yOffset;

        canvasCenter.x = canvasWidth / 2;
        canvasCenter.y = canvasHeight / 2;

        drawMap();
    },
    reachable: function (toMap) {
        return round(maps.current.id).includes(toMap) && maps.current.id !== toMap;
    }
}

function drawMap() {
    //中心地图为当前所在地图
    let centerMap = {x: canvasCenter.x - oneMapSize.x / 2, y: canvasCenter.y - oneMapSize.y / 2};
    //先画中心地图
    drawMaps.push(maps.current.id);
    drawOneMap(centerMap, maps.current);
}

function drawOneMap(pos, map) {

    let rect = draw.rect(oneMapSize.x, oneMapSize.y)
        .style('cursor', 'pointer')
        .attr({fill: mapColor})
        .move(pos.x, pos.y)
        .click(function () {
            rectChoose(this, map.id)
            mapFunction(map)
        })

    let text = draw.text(map.name + "")
        .font({
            family: 'Microsoft YaHei',
            weight: 'bold',
            size: 15
        }).fill(mapNameColor).style('cursor', 'pointer').click(function () {
            rectChoose(rect, map.id)
            mapFunction(map)
        });

    text.move(pos.x + (oneMapSize.x - text.length()) / 2, pos.y + (oneMapSize.y) / 2 - 10);

    if (map.id === maps.current.id) {
        text.fill(mapCurrentColor)
        rect.stroke({color: mapLineColor, width: mapChooseLineWidth})
    } else {
        rect.stroke({color: mapLineColor, width: mapUnChooseLineWidth})
    }

    //获得该节点四周节点
    let roundMaps = round(map.id);

    if (mapHasDiscovered(roundMaps[0])) {
        drawLine(0, 0, 0, lineLength, {x: pos.x + oneMapSize.x / 2, y: pos.y - lineLength})
        if (!drawMaps.includes(roundMaps[0])) {
            drawMaps.push(roundMaps[0]);
            drawOneMap({x: pos.x, y: pos.y - lineLength - oneMapSize.y}, mapHasDiscovered(roundMaps[0]));
        }
    }
    if (mapHasDiscovered(roundMaps[1])) {
        drawLine(0, 0, lineLength, 0, {x: pos.x + oneMapSize.x, y: pos.y + oneMapSize.y / 2})
        if (!drawMaps.includes(roundMaps[1])) {
            drawMaps.push(roundMaps[1]);
            drawOneMap({x: pos.x + oneMapSize.y + lineLength, y: pos.y}, mapHasDiscovered(roundMaps[1]));
        }
    }
    if (mapHasDiscovered(roundMaps[2])) {
        if (!drawMaps.includes(roundMaps[2])) {
            drawMaps.push(roundMaps[2]);
            drawOneMap({x: pos.x, y: pos.y + lineLength + oneMapSize.y}, mapHasDiscovered(roundMaps[2]));
        }
    }
    if (mapHasDiscovered(roundMaps[3])) {
        if (!drawMaps.includes(roundMaps[3])) {
            drawMaps.push(roundMaps[3]);
            drawOneMap({x: pos.x - oneMapSize.x - lineLength, y: pos.y}, mapHasDiscovered(roundMaps[3]));
        }
    }
}

function rectChoose(rect) {
    draw.select('rect').stroke({color: mapLineColor, width: mapUnChooseLineWidth})
    rect.stroke({color: mapLineColor, width: mapChooseLineWidth})
}

function mapHasDiscovered(mapId) {
    for (let map of maps.discoveredMaps.values()) {
        if (map.id === mapId) {
            return map;
        }
    }
    return false;
}

function drawLine(x1, y1, x2, y2, move) {
    draw.line(x1, y1, x2, y2)
        .stroke({color: mapLineColor, width: 5})
        .move(move.x, move.y)
}

function addEvents(frame, canvas) {
    //mouse-----------------------------------------------------------------
    frame.mouseenter(function () {
        canvas.css('cursor', 'move')
    });

    frame.mouseleave(function () {
        canvas.css('cursor', '')
    });

    frame.mousedown(function (e) {
        mouseDown = true;
        mouseDownPos.x = e.pageX;
        mouseDownPos.y = e.pageY;
    });
    frame.mouseup(function () {
        mouseDown = false;
        recordCanvasOffset(canvas)
    });
    frame.mousemove(function (e) {
        if (mouseDown) {
            let xMove = e.pageX - mouseDownPos.x;
            let yMove = e.pageY - mouseDownPos.y;
            moveCanvas(canvas, {left: xMove, top: yMove});
        }
    });
    frame.mouseleave(function () {
        frame.trigger('mouseup')
    });

    //touch---------------------------------------------------------------------------------
    frame.on("touchstart", function (e) {
        mouseDownPos.x = e.touches[0].clientX;
        mouseDownPos.y = e.touches[0].clientY
    });

    frame.on("touchmove", function (e) {
        let xMove = e.touches[0].clientX - mouseDownPos.x;
        let yMove = e.touches[0].clientY - mouseDownPos.y;
        moveCanvas(canvas, {left: xMove, top: yMove});
    });

    frame.on("touchend", function () {
        recordCanvasOffset(canvas)
    })
}

function recordCanvasOffset(canvas) {
    canvasOffset.left = canvas.position().left;
    canvasOffset.top = canvas.position().top;
}

function moveCanvas(canvas, move) {
    canvas.css('left', Math.max(Math.min(move.left + canvasOffset.left, mapMoveZone.x.max), mapMoveZone.x.min));
    canvas.css('top', Math.max(Math.min(move.top + canvasOffset.top, mapMoveZone.y.max), mapMoveZone.y.min));
}


function loop2Count(loop) {
    return Math.pow(3 + 2 * (loop - 1), 2)
}

function loopName(number) {
    let loop = 1;
    while (loop2Count(loop) < number) {
        loop++
    }
    return loop;
}

function loopCorner(loop) {
    if (loop === 0) {
        return [0, 0, 0, 0]
    }
    let max = loop2Count(loop) - 1;
    return [max, max - loop * 2, max - loop * 4, max - loop * 6]
}

function moveDirection(number) {
    let corner = loopCorner(loopName(number));

    if (corner.includes(number)) {
        if (number === corner[0]) {
            return "leftUp"
        } else if (number === corner[1]) {
            return "leftDown"
        } else if (number === corner[2]) {
            return "rightDown"
        } else {
            return "rightUp"
        }
    } else {
        if (number > corner[1]) {
            return "up"
        } else if (number < corner[1] && number > corner[2]) {
            return "left"
        } else if (number < corner[2] && number > corner[3]) {
            return "down"
        } else {
            return "right"
        }
    }
}

function round(number) {

    if (number === 0) {
        return [1, 3, 5, 7]
    }

    let direction = moveDirection(number);
    let loop = loopName(number);
    let corner = loopCorner(loop);
    let outLoopCorner = loopCorner(loop + 1);
    let inLoopCorner = loopCorner(loop - 1);

    let bias = 0;

    switch (direction) {
        case "leftUp":
            return [number + 1, inLoopCorner[0] + 1, number - 1, outLoopCorner[3] - 1];
        case "rightUp":
            return [outLoopCorner[3] - 1, outLoopCorner[3] + 1, number + 1, number - 1];
        case "rightDown":
            return [number - 1, outLoopCorner[2] - 1, outLoopCorner[2] + 1, number + 1];
        case "leftDown":
            return [number + 1, number - 1, outLoopCorner[1] - 1, outLoopCorner[1] + 1];
        case "up":
            bias = corner[0] - number;
            return [number + 1, inLoopCorner[0] - (bias - 1), number - 1, outLoopCorner[0] - (bias + 1)];
        case "down":
            bias = corner[2] - number;
            return [number - 1, outLoopCorner[2] - (bias + 1), number + 1, inLoopCorner[2] - (bias - 1)];
        case "left":
            bias = corner[1] - number;
            return [inLoopCorner[1] - (bias - 1), number - 1, outLoopCorner[1] - (bias + 1), number + 1];
        case "right":
            bias = corner[3] - number;
            return [outLoopCorner[3] - (bias + 1), number + 1, inLoopCorner[3] - (bias - 1), number - 1];
        default:
            return [];
    }
}