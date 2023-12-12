var canvasKita;

import * as LibSaya from "./script.js"

canvasKita = document.querySelector("#canvas1");

var ctx, i, temp, j;

ctx = canvasKita.getContext("2d");
var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

canvasKita.addEventListener('click', function (event) {
    var rect = canvasKita.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    console.log(x, y)

})

function print_to_canvas(array, gap) {
    for (i = 0; i < array.length; i++) {

        if (array[i][0].x < 0) {
            array[i][0].x = 700

            array[i][1].x = gap

            array[i][2].x = gap

            array[i][3].x = 700
        }

        for (j = 0; j < 4; j++) {

            temp = LibSaya.translasi(array[i][j], { x: -5, y: 0 })
            array[i][j].x = temp.x
            array[i][j].y = temp.y

        }
    }

    if (array.length == 9) {
        for (i = 0; i < array.length; i++) {
            LibSaya.polygon(canvasKita.width, imageDataSaya, array[i], 1, 0, 0)
            LibSaya.floodFillStack(imageDataSaya, canvasKita, array[i][0].x + 1, array[i][0].y + 1, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })
        }
    }
    else {
        for (i = 0; i < array.length; i++) {
            LibSaya.polygon(canvasKita.width, imageDataSaya, array[i], 1, 0, 0)
        }
    }


}

function refresh_page() {
    for (let inc = 0; inc < 701; inc++) {
        LibSaya.dda_line(canvasKita.width, imageDataSaya, inc, 0, inc, 700, 255, 255, 255)
    }
}

let road_1 = [
    { x: 0, y: 405 },
    { x: 700, y: 405 },
    { x: 700, y: 410 },
    { x: 0, y: 410 },
]

let road_2 = [
    { x: 0, y: 610 },
    { x: 700, y: 610 },
    { x: 700, y: 615 },
    { x: 0, y: 615 },
]

let line_road = []
let x1 = 0
let x2 = 60
for (i = 0; i < 9; i++) {
    line_road.push([
        { x: x1, y: 510 },
        { x: x2, y: 510 },
        { x: x2, y: 512 },
        { x: x1, y: 512 },
    ]
    )
    x1 = x2 + 40
    x2 = x1 + 60
}

let buildings = []
x1 = 0
x2 = 80
let y1 = [101, 201, 60, 30, 120, 150, 140, 90]
let y2 = 404

for (i = 0; i < 8; i++) {
    buildings.push([
        { x: x1, y: y1[i] },
        { x: x2, y: y1[i] },
        { x: x2, y: y2 },
        { x: x1, y: y2 },
    ])

    x1 = x2 + 1
    x2 = x1 + 80
}

let mirror = []
x1 = 10
x2 = 30
let x3 = 0
let x4 = 0


for (i = 0; i < y1.length; i++) {
    let mirror_y1 = y1[i] + 10
    let mirror_y2 = mirror_y1 + 20

    for (j = 0; j < 4; j++) {
        console.log(x1, x2)
        mirror.push([
            { x: x1, y: mirror_y1 },
            { x: x2, y: mirror_y1 },
            { x: x2, y: mirror_y2 },
            { x: x1, y: mirror_y2 },
        ])

        x3 = x2 + 20
        x4 = x1 + 20

        mirror.push([
            { x: x3, y: mirror_y1 },
            { x: x4, y: mirror_y1 },
            { x: x4, y: mirror_y2 },
            { x: x3, y: mirror_y2 },
        ])

        mirror_y1 += 50
        mirror_y2 = mirror_y1 + 20
    }

    x1 += 81
    x2 = x1 + 20

}

let truk1 = [
    { x: 90, y: 350 },
    { x: 170, y: 350 },
    { x: 170, y: 430 },
    { x: 90, y: 430 },
]
let truk2 = [
    { x: 171, y: 380 },
    { x: 210, y: 380 },
    { x: 210, y: 430 },
    { x: 171, y: 430 },
]

let mobil1 = [
    [
        { x: 480, y: 450 },
        { x: 540, y: 450 },
        { x: 540, y: 490 },
        { x: 480, y: 490 },
    ],
    [
        { x: 540, y: 470 },
        { x: 600, y: 470 },
        { x: 600, y: 490 },
        { x: 540, y: 490 },
    ],
    [
        { x: 420, y: 470 },
        { x: 480, y: 470 },
        { x: 480, y: 490 },
        { x: 420, y: 490 },
    ]
]


let mobil = [
    [
        { x: 480, y: 530 },
        { x: 540, y: 530 },
        { x: 540, y: 570 },
        { x: 480, y: 570 },
    ],
    [
        { x: 430, y: 540 },
        { x: 480, y: 540 },
        { x: 480, y: 570 },
        { x: 430, y: 570 },
    ],
    [
        { x: 540, y: 550 },
        { x: 610, y: 550 },
        { x: 610, y: 570 },
        { x: 540, y: 570 },
    ]

]




function time() {
    refresh_page()

    LibSaya.polygon(canvasKita.width, imageDataSaya, road_1, 1, 0, 0)
    LibSaya.floodFillStack(imageDataSaya, canvasKita, 1, 406, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })

    LibSaya.polygon(canvasKita.width, imageDataSaya, road_2, 1, 0, 0)
    LibSaya.floodFillStack(imageDataSaya, canvasKita, 1, 611, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })

    LibSaya.polygon(canvasKita.width, imageDataSaya, truk1, 1, 0, 0)
    LibSaya.floodFillStack(imageDataSaya, canvasKita, 91, 351, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })
    LibSaya.floodFillStack(imageDataSaya, canvasKita, 91, 429, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })

    LibSaya.polygon(canvasKita.width, imageDataSaya, truk2, 1, 0, 0)
    LibSaya.floodFillStack(imageDataSaya, canvasKita, 172, 429, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })
    LibSaya.floodFillStack(imageDataSaya, canvasKita, 172, 381, { r: 255, g: 255, b: 255 }, { r: 200, g: 200, b: 200 })

    for (i = 0; i < mobil.length; i++) {

        if (mobil[i][0].x < 0) {
            mobil[i][0].x = 700

            mobil[i][1].x = 758

            mobil[i][2].x = 758

            mobil[i][3].x = 700
        }

        for (j = 0; j < 4; j++) {

            temp = LibSaya.translasi(mobil[i][j], { x: -3, y: 0 })
            mobil[i][j].x = temp.x
            mobil[i][j].y = temp.y



        }
    }

    for (i = 0; i < mobil.length; i++) {
        LibSaya.polygon(canvasKita.width, imageDataSaya, mobil[i], 1, 0, 0)
        LibSaya.floodFillStack(imageDataSaya, canvasKita, mobil[i][0].x + 1, mobil[i][0].y + 1, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })
    }

    LibSaya.lingkaran_polar(canvasKita.width, imageDataSaya, mobil[1][0].x + 25, 570, 15, 1, 0, 0)
    LibSaya.lingkaran_polar(canvasKita.width, imageDataSaya, mobil[2][0].x + 30, 570, 15, 1, 0, 0)

    for (i = 0; i < mobil1.length; i++) {

        if (mobil1[i][0].x > 700) {
            mobil1[i][0].x = 0

            mobil1[i][1].x = -58

            mobil1[i][2].x = -58

            mobil1[i][3].x = 0
        }

        for (j = 0; j < 4; j++) {

            temp = LibSaya.translasi(mobil1[i][j], { x: +3, y: 0 })
            mobil1[i][j].x = temp.x
            mobil1[i][j].y = temp.y



        }
    }

    for (i = 0; i < mobil.length; i++) {
        LibSaya.polygon(canvasKita.width, imageDataSaya, mobil1[i], 1, 0, 0)
        // LibSaya.floodFillStack(imageDataSaya, canvasKita, mobil1[i][0].x + 1, mobil1[i][0].y + 1, { r: 255, g: 255, b: 255 }, { r: 1, g: 0, b: 0 })
    }

    LibSaya.lingkaran_polar_fill(canvasKita.width, imageDataSaya, mobil1[1][0].x - 30, 490, 15, 1, 0, 0)
    LibSaya.lingkaran_polar_fill(canvasKita.width, imageDataSaya, mobil1[2][0].x - 30, 490, 15, 1, 0, 0)

    // LibSaya.polygon(canvasKita.width, imageDataSaya, mobil1, 1, 0, 0)
    // LibSaya.polygon(canvasKita.width, imageDataSaya, mobil2, 1, 0, 0)
    // LibSaya.polygon(canvasKita.width, imageDataSaya, mobil3, 1, 0, 0)
    


    LibSaya.lingkaran_polar(canvasKita.width, imageDataSaya, 115, 430, 15, 1, 0, 0)
    LibSaya.lingkaran_polar(canvasKita.width, imageDataSaya, 190, 430, 15, 1, 0, 0)

    print_to_canvas(buildings, 780)
    print_to_canvas(mirror, 720)
    print_to_canvas(line_road, 740)


    ctx.putImageData(imageDataSaya, 0, 0);

    requestAnimationFrame(time)

}

time()

ctx.putImageData(imageDataSaya, 0, 0);