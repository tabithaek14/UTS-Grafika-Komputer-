// fungsi gambar titik
export function gbr_titik(width, imageDataTemp, x, y, r, g, b) {
    var index;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * width));
    imageDataTemp.data[index] = r;
    imageDataTemp.data[index + 1] = g;
    imageDataTemp.data[index + 2] = b;
    imageDataTemp.data[index + 3] = 255;
}

// fungsi dda line
export function dda_line(width, imageData, x1, y1, x2, y2, r, g, b) {

    var dx = x2 - x1; // bisa positif dan negatif

    var dy = y2 - y1; // bisa positif dan negarif

    if (Math.abs(dx) > Math.abs(dy)) {
        // akan jalan di x
        if (x2 > x1) {
            //jalan ke kanan
            y = y1
            for (var x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx) // 1/m
                gbr_titik(width, imageData, x, y, r, g, b);
            }
        }
        else {
            //jalan ke kiri
            y = y1
            for (var x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx) // 1/m
                gbr_titik(width, imageData, x, y, r, g, b);
            }
        }

    }
    else {
        // akan jalan di y
        if (y2 > y1) {
            //jalan ke kanan
            x = x1
            for (var y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy) // m
                gbr_titik(width, imageData, x, y, r, g, b);
            }
        }
        else {
            //jalan ke kiri
            x = x1
            for (var y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy) // m
                gbr_titik(width, imageData, x, y, r, g, b);
            }
        }
    }

}

export function gbr_lingkaran(width, imageDataTemp, xc, yc, radius, r, g, b) {

    for (let x = xc - radius; x < xc + radius; x++) {

        let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2)) // akar dari r2 - (x-xc)2
        gbr_titik(width, imageDataTemp, x, y, r, g, b)

        y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2)) // akar dari r2 - (x-xc)2
        gbr_titik(width, imageDataTemp, x, y, r, g, b)
    }

    for (let x = xc - radius; x < xc + radius; x++) {

        let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2)) // akar dari r2 - (x-xc)2
        gbr_titik(width, imageDataTemp, y, x, r, g, b)

        y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2)) // akar dari r2 - (x-xc)2
        gbr_titik(width, imageDataTemp, y, x, r, g, b)
    }
}

export function lingkaran_polar(width, imageDataTemp, xc, yc, radius, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
        let x = xc + radius * Math.cos(theta)
        let y = yc + radius * Math.sin(theta)

        gbr_titik(width, imageDataTemp, x, y, r, g, b)

    }
}

export function lingkaran_polar_pie_chart(width, imageDataTemp, xc, yc, radius, persentase) {
    let i = 0
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        let x = xc + radius * Math.cos(theta)
        let y = yc + radius * Math.sin(theta)
        if (i < persentase.male) {
            dda_line(width, imageDataTemp, xc, yc, x, y, 255, 0, 0)
        } else {
            dda_line(width, imageDataTemp, xc, yc, x, y, 0, 255, 0)
        }
        i++
    }
    console.log(i)
}

export function lingkaran_polar_fill(width, imageDataTemp, xc, yc, radius, r,g,b) {
    let i = 0
    for (let theta = 0; theta < Math.PI * 2; theta += 0.1) {
        let x = xc + radius * Math.cos(theta)
        let y = yc + radius * Math.sin(theta)
        dda_line(width, imageDataTemp, xc, yc, x, y, r, g, b)
        i++
    }
}


export function polygon(width, imageData, point_array, r, g, b) {
    let point1 = point_array[0]

    for (let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i]

        dda_line(width, imageData, point1.x, point1.y, point2.x, point2.y, r, g, b)
        point1 = point2
    }

    dda_line(width, imageData, point1.x, point1.y, point_array[0].x, point_array[0].y, r, g, b)
}

export function polygon_linechart(canvas, imageData, point_array, r, g, b) {

    let point1 = point_array[0]
    lingkaran_polar_fill(canvas.width, imageData, point1.x, point1.y, 5, 1,0,0)
    // lingkaran_polar(canvas.width, imageData, point1.x, point1.y, 5, 1, 0, 0)
    // floodFillStack(imageData, canvas, point1.x, point1.y, {r:255, g:255, b:255}, {r:1, g:0, b:0})

    for (let i = 1; i < point_array.length; i++) {

        let point2 = point_array[i]
        lingkaran_polar_fill(canvas.width, imageData, point2.x, point2.y, 5, 1,0,0)
        // lingkaran_polar(canvas.width, imageData, point2.x, point2.y, 5, 1, 0, 0)
        // floodFillStack(imageData, canvas, point2.x, point2.y, {r:255, g:255, b:255}, {r:1, g:0, b:0})
        dda_line(canvas.width, imageData, point1.x, point1.y, point2.x, point2.y, r, g, b)
        point1 = point2

    }

}

export function floodFillNaive(imageData, canvas, x, y, toFlood, color) {

    var index = 4 * (x + y * canvas.width)

    var r1 = imageData.data[index]
    var g1 = imageData.data[index + 1]
    var b1 = imageData.data[index + 2]

    if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
        imageData.data[index] = color.r
        imageData.data[index + 1] = color.g
        imageData.data[index + 2] = color.b
        imageData.data[index + 3] = 255

        floodFillNaive(imageData, canvas, x + 1, y, toFlood, color)
        floodFillNaive(imageData, canvas, x, y + 1, toFlood, color)
        floodFillNaive(imageData, canvas, x - 1, y, toFlood, color)
        floodFillNaive(imageData, canvas, x, y - 1, toFlood, color)
    }

}

export function floodFillStack(imageData, canvas, x0, y0, toFlood, color) {

    var index = 4 * (x0 + y0 * canvas.width)
    var tumpukan = []
    tumpukan.push({ x: x0, y: y0 })

    while (tumpukan.length > 0) {
        var titik_skrng = tumpukan.pop()
        var index_skrng = 4 * (titik_skrng.x + titik_skrng.y * canvas.width)

        var r1 = imageData.data[index_skrng]
        var g1 = imageData.data[index_skrng + 1]
        var b1 = imageData.data[index_skrng + 2]

        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageData.data[index_skrng] = color.r
            imageData.data[index_skrng + 1] = color.g
            imageData.data[index_skrng + 2] = color.b
            imageData.data[index_skrng + 3] = 255

            tumpukan.push({ x: titik_skrng.x + 1, y: titik_skrng.y })
            tumpukan.push({ x: titik_skrng.x - 1, y: titik_skrng.y })
            tumpukan.push({ x: titik_skrng.x, y: titik_skrng.y + 1 })
            tumpukan.push({ x: titik_skrng.x, y: titik_skrng.y - 1 })
        }
    }
}

