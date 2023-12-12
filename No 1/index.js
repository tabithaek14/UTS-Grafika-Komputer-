import * as LibSaya from "./script.js"

function checking_dda_line(i, arr, maks_month, canvas, imageData, x1, x2) {
    if (i > arr) {
        if (arr == maks_month) {
            LibSaya.dda_line(canvas.width, imageData, x1, i, x2, i, 200, 200, 200)
        }
        else {
            LibSaya.dda_line(canvas.width, imageData, x1, i, x2, i, 50, 50, 50)
        }

    }
}

function line() {
    for (let i = 300; i > 0; i--) {
        if (i % 20 != 0 && i > 10) {
            LibSaya.dda_line(canvas1.width, imageData1, 640, i, 645, i, 1, 0, 0)

        } else if (i % 20 == 0 && i > 10) {
            LibSaya.dda_line(canvas1.width, imageData1, 0, i, 645, i, 1, 0, 0)
        }
    }


}

function line1() {
    for (let i = 300; i > 0; i--) {
        if (i % 30 != 0 && i > 10) {
            LibSaya.dda_line(canvas2.width, imageData2, 160, i, 165, i, 1, 0, 0)

        } else if (i % 30 == 0 && i > 10) {
            LibSaya.dda_line(canvas2.width, imageData2, 0, i, 165, i, 1, 0, 0)
        }
    }
}

function refresh_page() {
    for (let inc = 0; inc < 640; inc++) {
        LibSaya.dda_line(canvas1.width, imageData1, inc, 0, inc, 301, 255, 255, 255)
    }
}
function refresh_page1() {
    for (let inc = 0; inc < 159; inc++) {
        LibSaya.dda_line(canvas2.width, imageData2, inc, 0, inc, 301, 255, 255, 255)
    }
}

const csvFilePath = 'Health_AnimalBites.csv';
var barchart = document.querySelector("#barchart")
var linechart = document.querySelector("#linechart")
var button1 = document.querySelector("#button1")

var canvas1, canvas2


canvas1 = document.querySelector("#canvas1");
canvas2 = document.querySelector("#canvas2");

var ctx1, ctx2
ctx1 = canvas1.getContext("2d");
var imageData1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height)

ctx2 = canvas2.getContext("2d")
var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height)

canvas1.addEventListener('click', function (event) {
    var rect = canvas1.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    console.log(x, y)

})

canvas2.addEventListener('click', function (event) {
    var rect = canvas2.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    console.log(x, y)

})

let array = [
    { x: 0, y: 300 },
    { x: 645, y: 300 },
    { x: 645, y: 310 },
    { x: 0, y: 310 },

]

LibSaya.polygon(canvas1.width, imageData1, array, 1, 0, 0)
LibSaya.floodFillStack(imageData1, canvas1, 10, 305, { r: 0, g: 0, b: 0 }, { r: 1, g: 0, b: 0 })

let array1 = [
    { x: 0, y: 300 },
    { x: 165, y: 300 },
    { x: 165, y: 310 },
    { x: 0, y: 310 },
]

LibSaya.polygon(canvas2.width, imageData2, array1, 1, 0, 0)
LibSaya.floodFillStack(imageData2, canvas2, 1, 301, { r: 0, g: 0, b: 0 }, { r: 1, g: 0, b: 0 })

line()
line1()

fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
        Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                const data = results.data;


                function sorting(input_year) {
                    let arr_cheking = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    let arr = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300]
                    data.forEach(row => {
                        let bite_date = String(row['bite_date'])
                        let year_string = bite_date.substring(0, 4)
                        let month_string = bite_date.substring(5, 8)
                        let year_integer = parseInt(year_string)
                        let month_integer = parseInt(month_string)

                        if (year_integer == input_year.value) {
                            if (month_integer == 1) {
                                arr[0] -= 2
                                arr_cheking[0] += 1
                            }
                            else if (month_integer == 2) {
                                arr[1] -= 2
                                arr_cheking[1] += 1
                            }
                            else if (month_integer == 3) {
                                arr[2] -= 2
                                arr_cheking[2] += 1
                            }
                            else if (month_integer == 4) {
                                arr[3] -= 2
                                arr_cheking[3] += 1
                            }
                            else if (month_integer == 5) {
                                arr[4] -= 2
                                arr_cheking[4] += 1
                            }
                            else if (month_integer == 6) {
                                arr[5] -= 2
                                arr_cheking[5] += 1
                            }
                            else if (month_integer == 7) {
                                arr[6] -= 2
                                arr_cheking[6] += 1
                            }
                            else if (month_integer == 8) {
                                arr[7] -= 2
                                arr_cheking[7] += 1
                            }
                            else if (month_integer == 9) {
                                arr[8] -= 2
                                arr_cheking[8] += 1
                            }
                            else if (month_integer == 10) {
                                arr[9] -= 2
                                arr_cheking[9] += 1
                            }
                            else if (month_integer == 11) {
                                arr[10] -= 2
                                arr_cheking[10] += 1
                            }
                            else if (month_integer == 12) {
                                arr[11] -= 2
                                arr_cheking[11] += 1
                            }
                        }
                    });
                    console.log(arr_cheking)
                    return arr
                }

                function sorting1(input_year) {
                    let gender_list = [300, 300]
                    let gender_checking = [0, 0]
                    data.forEach(row => {
                        let gender = String(row['GenderIDDesc'])
                        let bite_date = String(row['bite_date'])
                        let year_string = bite_date.substring(0, 4)
                        let year_integer = parseInt(year_string)
                        if (year_integer == input_year.value) {
                            if (gender == "MALE") {
                                gender_list[0] -= 0.5
                                gender_checking[0] += 1
                            } else if (gender == "FEMALE") {
                                gender_list[1] -= 0.5
                                gender_checking[1] += 1
                            }
                        }
                    });
                    console.log(gender_checking)
                    return gender_list

                }


                barchart.addEventListener('click', () => {
                    var input_year = document.querySelector("#input_year")
                    refresh_page()
                    refresh_page1()
                    line()
                    line1()

                    let arr_month = sorting(input_year)
                    let maks_month = Math.min(...arr_month)

                    let arr_gender = sorting1(input_year)
                    let maks_gender = Math.min(...arr_gender)
                    let i = 300
                    function year_inteval() {

                        checking_dda_line(i, arr_month[0], maks_month, canvas1, imageData1, 15, 55)
                        checking_dda_line(i, arr_month[1], maks_month, canvas1, imageData1, 65, 105)
                        checking_dda_line(i, arr_month[2], maks_month, canvas1, imageData1, 115, 155)
                        checking_dda_line(i, arr_month[3], maks_month, canvas1, imageData1, 165, 205)
                        checking_dda_line(i, arr_month[4], maks_month, canvas1, imageData1, 215, 255)
                        checking_dda_line(i, arr_month[5], maks_month, canvas1, imageData1, 265, 305)
                        checking_dda_line(i, arr_month[6], maks_month, canvas1, imageData1, 315, 355)
                        checking_dda_line(i, arr_month[7], maks_month, canvas1, imageData1, 365, 405)
                        checking_dda_line(i, arr_month[8], maks_month, canvas1, imageData1, 415, 455)
                        checking_dda_line(i, arr_month[9], maks_month, canvas1, imageData1, 465, 505)
                        checking_dda_line(i, arr_month[10], maks_month, canvas1, imageData1, 515, 555)
                        checking_dda_line(i, arr_month[11], maks_month, canvas1, imageData1, 565, 605)
                        checking_dda_line(i, arr_month[11], maks_month, canvas1, imageData1, 565, 605)

                        checking_dda_line(i, arr_gender[0], maks_gender, canvas2, imageData2, 15, 65)
                        checking_dda_line(i, arr_gender[1], maks_gender, canvas2, imageData2, 95, 145)

                        i--

                        ctx2.putImageData(imageData2, 0, 0);
                        ctx1.putImageData(imageData1, 0, 0);
                        requestAnimationFrame(year_inteval)
                    }
                    year_inteval()
                })

                linechart.addEventListener('click', () => {
                    var input_year = document.querySelector("#input_year")
                    refresh_page()
                    refresh_page1()
                    line()
                    line1()

                    let arr_month = sorting(input_year)
                    let dot = []
                    let x = 35

                    for (let i = 0; i < 12; i++) {
                        dot.push({ x: x, y: arr_month[i] })
                        x += 50
                    }

                    let arr_gender = sorting1(input_year)
                    let dot1 = []
                    x = 45
                    for (let i = 0; i < 2; i++) {
                        dot1.push({ x: x, y: arr_gender[i] })
                        x += 65
                    }

                    LibSaya.polygon_linechart(canvas1, imageData1, dot, 150, 150, 150)
                    
                    LibSaya.dda_line(canvas2.width, imageData2, dot1[0].x, dot1[0].y, dot1[1].x, dot1[1].y, 150, 150, 150)
                    LibSaya.lingkaran_polar_fill(canvas2.width, imageData2, dot1[0].x, dot1[0].y, 5, 1, 0, 0)
                    LibSaya.lingkaran_polar_fill(canvas2.width, imageData2, dot1[1].x, dot1[1].y, 5, 1, 0, 0)


                    ctx2.putImageData(imageData2, 0, 0);
                    ctx1.putImageData(imageData1, 0, 0);

                })
            }
        });
    })
    .catch(error => {
        console.error('Error fetching CSV file:', error);
    });
ctx1.putImageData(imageData1, 0, 0);
ctx2.putImageData(imageData2, 0, 0);

