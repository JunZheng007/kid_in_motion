var data_URL = "https://raw.githubusercontent.com/JunZheng007/kid_in_motion/master/data.josn";

d3.queue()
    .defer(d3.json, data_URL)
    .await(createChart);

function createChart(error, data) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var canvasSize = [1000, 650],
        svg = d3.select("svg");
    var g = svg.append("g");

    var _2018 = data.data.map(obj => [obj[10], obj[8], obj[9], obj[12],
            obj[13], obj[14], obj[15], obj[16],
            obj[17], obj[18], obj[19]
        ])
        .filter(item => {
            return item[0][3] == "8";
        })

    var brooklyn = borough(_2018, "Brooklyn");
    var bronx = borough(_2018, "Bronx");
    var manhattan = borough(_2018, "Manhattan");
    var queens = borough(_2018, "Queens");
    var staten_island = borough(_2018, "Staten Island");

    console.log(count(_2018));
    console.log(count(brooklyn));
    console.log(count(bronx));
    console.log(count(manhattan));
    console.log(count(queens));
    console.log(count(staten_island));
}

function borough(data, name) {
    return data.filter(item => {
        return item[1] == name;
    })
}

function count(data) {
    return data.reduce(function (cnt) {
        return cnt + 1;
    }, 0);
}