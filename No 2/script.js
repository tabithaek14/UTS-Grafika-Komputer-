// membuat fungsi idle kotak
export function idle(width, imageDataSaya) {
    for (let i = 0; i < 150; i++) {
        dda_line(width, imageDataSaya, 100, 100 + i, 250, 100 + i, 0, 0, 0)
    }
}

// membuat fungsi active kotak
export function active(width, imageDataSaya) {
    for (let i = 0; i < 150; i++) {
        dda_line(width, imageDataSaya, 100, 100 + i, 250, 100 + i, 255, 0, 0)
    }
    for (let i = 0; i < 110; i++) {
        dda_line(width, imageDataSaya, 120, 120 + i, 230, 120 + i, 0, 0, 0)
    }
}

// fungsi check box
export function check_box(canvasKita, imageDataSaya, ctx) {
    idle(canvasKita.width, imageDataSaya)
    var check = false
    canvasKita.addEventListener('click', function (event) {
        var rect = canvasKita.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        if (x >= 100 && x <= 250 && y >= 100 && y <= 250) {
            if (check == false) {
                active(canvasKita.width, imageDataSaya)
                check = true
            }
            else {
                idle(canvasKita.width, imageDataSaya)
                check = false
            }
        }

        ctx.putImageData(imageDataSaya, 0, 0);
    })
}

// membuat garis yang tebalnya lebih dari 1 pixel
export function garis(canvasKita, imageDataSaya, tebal_pixel) {
    for (let i = 0; i <= tebal_pixel; i++) {
        dda_line(canvasKita.width, imageDataSaya, 50, 330 + i, 350, 330 + i, 0, 0, 0)
    }
}

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

export function lingkaran_polar_obat_nyamuk(width, imageDataTemp, xc, yc, r, g, b) {
    for (let theta = 0; theta < Math.PI * 10; theta += 0.01) {

        let radius = 5 * theta
        let x = xc + radius * Math.cos(theta)
        let y = yc + radius * Math.sin(theta)

        gbr_titik(width, imageDataTemp, x, y, r, g, b)

    }
}

export function lingkaran_polar_bunga(width, imageDataTemp, xc, yc, radius, n , r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
        let x = xc + radius * Math.cos(n * theta) * Math.cos(theta)
        let y = yc + radius * Math.cos(n * theta) * Math.sin(theta)

        gbr_titik(width, imageDataTemp, x, y, r, g, b)

    }
}

export function lingkaran_polar_modifikasi_jam(width, imageDataTemp, xc, yc, radius, r, g, b, i) {
    let itung = 0
    let jam = new Date().getHours();
    if (jam >= 12){
        jam -= 12
    }
    for (let theta = -1.59; theta < Math.PI * 2 - 1.59; theta += i) {
        let x1 = xc + radius * Math.cos(theta)
        let y1 = yc + radius * Math.sin(theta)

        if(itung == jam){
            lingkaran_polar(width, imageDataTemp, x1, y1, 15, 255, 0, 0)
        }
        else{
            lingkaran_polar(width, imageDataTemp, x1, y1, 15, 0, 0, 0)
        }

        itung += 1
        
    }
}

export function lingkaran_polar_modifikasi_menit(width, imageDataTemp, xc, yc, radius, r, g, b, i) {
    let itung = 0
    let menit = new Date().getMinutes();

    console.log(menit)

    if(menit > 0 && menit < 5){
        menit = 0
    }
    else if(menit > 5 && menit < 10){
        menit = 5
    }
    else if(menit > 10 && menit < 15){
        menit = 10
    }
    else if(menit > 15 && menit < 20){
        menit = 15
    }
    else if(menit > 20 && menit < 25){
        menit = 20
    }
    else if(menit > 25 && menit < 30){
        menit = 25
    }
    else if(menit > 30 && menit < 35){
        menit = 30
    }
    else if(menit > 35 && menit < 40){
        menit = 35
    }
    else if(menit > 40 && menit < 45){
        menit = 40
    }
    else if(menit > 45 && menit < 50){
        menit = 45
    }
    else if(menit > 50 && menit < 55){
        menit = 50
    }
    else if(menit > 55 && menit < 60){
        menit = 55
    }


    for (let theta = -1.59; theta < Math.PI * 2 - 1.59; theta += i) {
        let x1 = xc + radius * Math.cos(theta)
        let y1 = yc + radius * Math.sin(theta)

        if(itung == menit){
            lingkaran_polar(width, imageDataTemp, x1, y1, 15, 0, 255, 0)
        }
        else{
            lingkaran_polar(width, imageDataTemp, x1, y1, 15, 0, 0, 0)
        }

        itung+= 5
    }
}

export function lingkaran_polar_segi_banyak(width, imageDataTemp, xc, yc, radius, r, g, b, i) {
    for (let theta = 0; theta < Math.PI * 2; theta += i) {
        let x1 = xc + radius * Math.cos(theta)
        let y1 = yc + radius * Math.sin(theta)
        
        let x2 = xc + radius * Math.cos(theta+i)
        let y2 = yc + radius * Math.sin(theta+i)

        dda_line(width, imageDataTemp, x1, y1, x2, y2, r, g, b)
    }
}

export function ellipse_polar(width, imageDataTemp, xc, yc, radiusX, radiusY, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
        let x = xc + radiusX * Math.cos(theta)
        let y = yc + radiusY * Math.sin(theta)

        gbr_titik(width, imageDataTemp, x, y, r, g, b)

    }
}

export function polygon(width, imageData, point_array, r,g,b){
    let point1 = point_array[0]

    for (let i = 1; i < point_array.length; i++){
        let point2 = point_array[i]

        dda_line(width,imageData, point1.x, point1.y, point2.x, point2.y, r,g,b)
        point1 = point2
    }

    dda_line(width, imageData, point1.x, point1.y, point_array[0].x,point_array[0].y, r,g,b )
}

export function floodFillNaive(imageData, canvas, x,y, toFlood, color){

    var index = 4 * (x + y * canvas.width)

    var r1 = imageData.data[index]
    var g1 = imageData.data[index+1]
    var b1 = imageData.data[index+2]

    if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
        imageData.data[index] = color.r
        imageData.data[index+1] = color.g
        imageData.data[index+2] = color.b
        imageData.data[index+3] = 255

        floodFillNaive(imageData, canvas, x+1, y, toFlood, color)
        floodFillNaive(imageData, canvas, x, y+1, toFlood, color)
        floodFillNaive(imageData, canvas, x-1, y, toFlood, color)
        floodFillNaive(imageData, canvas, x, y-1, toFlood, color)
    }

}

export function floodFillStack(imageData, canvas, x0,y0, toFlood, color){

    var index = 4 * (x0 + y0 * canvas.width)



    var tumpukan = []
    tumpukan.push({x:x0, y:y0})

    while(tumpukan.length > 0){
        var titik_skrng = tumpukan.pop()
        var index_skrng = 4 * (titik_skrng.x + titik_skrng.y * canvas.width)

        var r1 = imageData.data[index_skrng]
        var g1 = imageData.data[index_skrng + 1]
        var b1 = imageData.data[index_skrng + 2]

        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageData.data[index_skrng] = color.r
            imageData.data[index_skrng+1] = color.g
            imageData.data[index_skrng+2] = color.b
            imageData.data[index_skrng+3] = 255
    
            tumpukan.push({x: titik_skrng.x+1, y: titik_skrng.y})
            tumpukan.push({x: titik_skrng.x-1, y: titik_skrng.y})
            tumpukan.push({x: titik_skrng.x, y: titik_skrng.y+1})
            tumpukan.push({x: titik_skrng.x, y: titik_skrng.y-1})
        }
    }
}

export function translasi(titik_lama, T) {
    let x_baru = titik_lama.x + T.x
    let y_baru = titik_lama.y + T.y

    return {x: x_baru, y: y_baru}
}

export function penskalaan(titik_lama, S){
    let x_baru = titik_lama.x * S.x
    let y_baru = titik_lama.y * S.y

    return {x: x_baru, y: y_baru} 
}

export function rotasi(titik_lama, sudut){
    let x_baru = titik_lama.x * Math.cos(sudut) - titik_lama.y * Math.sin(sudut)
    let y_baru = titik_lama.x * Math.sin(sudut) + titik_lama.y * Math.cos(sudut)

    return {x: x_baru, y: y_baru} 
}

export function rotasi_fp(titik_lama, titik_putar, sudut){
    var p1 = translasi(titik_lama, {x: -titik_putar.x, y: -titik_putar.y})
    var p2 = rotasi(p1, sudut)
    var p3 = translasi(p2, titik_putar)

    return p3
}

export function skala_fp(titik_lama, titik_pusat, S){
    var p1 = translasi(titik_lama, {x: -titik_pusat.x, y: -titik_pusat.y})
    var p2 = penskalaan(p1, S)
    var p3 = translasi(p2, titik_pusat)

    return p3
}


export function createIdentity(){
    var identitas = [
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ]

    return identitas
}

export function multiplyMatrix(m1,m2){
    var hasil = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            for(var k=0;k<3;k++){
                hasil[i][k] += m1[i][j] * m2[j][k]
            }
        }
    }
    return hasil
}

export function createTranslation(Tx, Ty){
    var translasi = [
        [1,0,Tx],
        [0,1,Ty],
        [0,0,1]
    ]

    return translasi
}

export function createScale(Sx, Sy){
    var skala = [
        [Sx,0,0],
        [0,Sy,0],
        [0,0,1]
    ]

    return skala
}

export function createRotation(theta){
    var rotasi = [
        [Math.cos(theta),-Math.sin(theta),0],
        [Math.sin(theta),Math.cos(theta),0],
        [0,0,1]
    ]

    return rotasi
}


export function rotation_fp(xc, yc, theta){
    var m1 = createTranslation(-xc, -yc)
    var m2 = createRotation(theta)
    var m3 = createTranslation(xc, yc)

    var hasil
    hasil = multiplyMatrix(m3, m2)
    hasil = multiplyMatrix(hasil, m1)

    return hasil
}

export function scale_fp(xc, yc, Sx, Sy){
    var m1 = createTranslation(-xc, -yc)
    var m2 = createScale(Sx, Sy)
    var m3 = createTranslation(xc, yc)

    var hasil
    hasil = multiplyMatrix(m3, m2)
    hasil = multiplyMatrix(hasil, m1)

    return hasil
}

export function transform_titik(titik_lama, m){
    var x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2]*1
    var y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2]*1

    return {x:x_baru, y:y_baru}
}

export function transfrom_array(array_titik, m){
    var hasil = []
    for(var i = 0; i < array_titik.length; i++){
        var hasil_titik
        hasil_titik = transform_titik(array_titik[i], m)
        hasil.push(hasil_titik)
    }
    return hasil
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