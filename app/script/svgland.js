let mouseDown = false;
let mouseDownPos = {x: 0, y: 0};
let canvasOffset = {left: 0, top: 0};
let canvasCenter = {x: 0, y: 0};
let oneLandSize = {x: 80, y: 80};
let canvasHeight;
let canvasWidth;
let lineLength = 40;
let drawLands = [];
let draw;
let landFunction;
let lands;
let landColor = '#5bc0de';
let landNameColor = '#fff';
let landLineColor = '#2c3e50';
let landCurrentColor = '#2c3e50';
let landChooseLineWidth = 5;
let landUnChooseLineWidth = 1;
let currentOffset = {x: 0, y: 0};
let centerLand = {x: 0, y: 0};

export default {
    drawLand: function (frame, canvasId, landsData, landInfoFunction, resize) {
        if (!resize) {
            import(/* webpackChunkName: "svg" */ 'svg').then(svg => {
                draw = svg.default(canvasId);
                doDraw(landInfoFunction, landsData, canvasId, frame);
            });
        } else {
            draw.clear();
            doDraw(landInfoFunction, landsData, canvasId, frame);
        }
    },
    reachable: function (toLand) {
        return round(lands.current.id).includes(toLand) && lands.current.id !== toLand;
    }
}

function doDraw(landInfoFunction, landsData, canvasId, frame) {
    landFunction = landInfoFunction;
    lands = landsData;
    drawLands = [];

    let maxLandNumber = lands.discoveredLands[lands.discoveredLands.length - 1].id;
    let maxLoop = loopName(maxLandNumber);

    let canvas = $("#" + canvasId);
    addEvents(frame, canvas);

    let minLandSizeForDraw = maxLoop * (oneLandSize.x + lineLength) * 2 + oneLandSize.x * 2;
    canvasHeight = minLandSizeForDraw < frame.height() ? frame.height() : minLandSizeForDraw;
    canvasWidth = minLandSizeForDraw < frame.width() ? frame.width() : minLandSizeForDraw;

    canvas.height(canvasHeight);
    canvas.width(canvasWidth);

    canvasCenter.x = canvasWidth / 2;
    canvasCenter.y = canvasHeight / 2;

    drawLand();

    //move current to center
    canvasOffset.left = frame.width() / 2 - canvasWidth / 2 - (currentOffset.x - centerLand.x);
    canvasOffset.top = frame.height() / 2 - canvasHeight / 2 - (currentOffset.y - centerLand.y);
    canvas.css('left', canvasOffset.left);
    canvas.css('top', canvasOffset.top);
}

function drawLand() {
    centerLand = {x: canvasCenter.x - oneLandSize.x / 2, y: canvasCenter.y - oneLandSize.y / 2};
    drawLands.push(lands.discoveredLands[0].id);
    drawOneLand(centerLand, lands.discoveredLands[0]);
}

function drawOneLand(pos, land) {
    let rect = draw.rect(oneLandSize.x, oneLandSize.y)
        .style('cursor', 'pointer')
        .attr({fill: landColor})
        .move(pos.x, pos.y)
        .click(function () {
            rectChoose(this, land.id);
            landFunction(land)
        });

    let text = draw.text(land.name + '')
        .font({
            family: 'Microsoft YaHei',
            weight: 'bold',
            size: 15
        }).fill(landNameColor).style('cursor', 'pointer').click(function () {
            rectChoose(rect, land.id);
            landFunction(land)
        });

    text.move(pos.x + (oneLandSize.x - text.length()) / 2, pos.y + (oneLandSize.y) / 2 - 10);

    if (land.id === lands.current.id) {
        currentOffset.x = pos.x;
        currentOffset.y = pos.y;
        text.fill(landCurrentColor);
        rect.stroke({color: landLineColor, width: landChooseLineWidth})
    } else {
        rect.stroke({color: landLineColor, width: landUnChooseLineWidth})
    }

    let roundLands = round(land.id);

    if (landHasDiscovered(roundLands[0])) {
        drawLine(0, 0, 0, lineLength, {x: pos.x + oneLandSize.x / 2, y: pos.y - lineLength})
        if (!drawLands.includes(roundLands[0])) {
            drawLands.push(roundLands[0]);
            drawOneLand({x: pos.x, y: pos.y - lineLength - oneLandSize.y}, landHasDiscovered(roundLands[0]));
        }
    }
    if (landHasDiscovered(roundLands[1])) {
        drawLine(0, 0, lineLength, 0, {x: pos.x + oneLandSize.x, y: pos.y + oneLandSize.y / 2})
        if (!drawLands.includes(roundLands[1])) {
            drawLands.push(roundLands[1]);
            drawOneLand({x: pos.x + oneLandSize.y + lineLength, y: pos.y}, landHasDiscovered(roundLands[1]));
        }
    }
    if (landHasDiscovered(roundLands[2])) {
        if (!drawLands.includes(roundLands[2])) {
            drawLands.push(roundLands[2]);
            drawOneLand({x: pos.x, y: pos.y + lineLength + oneLandSize.y}, landHasDiscovered(roundLands[2]));
        }
    }
    if (landHasDiscovered(roundLands[3])) {
        if (!drawLands.includes(roundLands[3])) {
            drawLands.push(roundLands[3]);
            drawOneLand({x: pos.x - oneLandSize.x - lineLength, y: pos.y}, landHasDiscovered(roundLands[3]));
        }
    }
}

function rectChoose(rect) {
    draw.select('rect').stroke({color: landLineColor, width: landUnChooseLineWidth})
    rect.stroke({color: landLineColor, width: landChooseLineWidth})
}

function landHasDiscovered(landId) {
    for (let land of lands.discoveredLands) {
        if (land.id === landId) {
            return land;
        }
    }
    return false;
}

function drawLine(x1, y1, x2, y2, move) {
    draw.line(x1, y1, x2, y2)
        .stroke({color: landLineColor, width: 5})
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
        mouseDownPos.y = e.touches[0].clientY;
        e.stopPropagation();
    });

    frame.on("touchmove", function (e) {
        let xMove = e.touches[0].clientX - mouseDownPos.x;
        let yMove = e.touches[0].clientY - mouseDownPos.y;
        moveCanvas(canvas, {left: xMove, top: yMove});
        e.stopPropagation();
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
    canvas.css('left', move.left + canvasOffset.left);
    canvas.css('top', move.top + canvasOffset.top);
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