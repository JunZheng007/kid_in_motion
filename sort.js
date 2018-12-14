var data_URL = "https://raw.githubusercontent.com/JunZheng007/kid_in_motion/master/data.josn";

var map_URL = "https://raw.githubusercontent.com/JunZheng007/kid_in_motion/master/borough.geojson";

d3.queue()
  .defer(d3.json, data_URL)
  .defer(d3.json, map_URL)
  .await(createChart);

function createChart(error, data, map){
  var canvasSize = [1000, 650],
      svg        = d3.select("svg");
  var g          = svg.append("g");
  
  var projection = d3.geoMercator()
                      .scale(Math.pow(2,10.5 + 5.34))
                      .center([-73.975, 40.7])
                      .translate([canvasSize[0]/3*2,
                                  canvasSize[1]/2]);
  
  var path       = d3.geoPath()
                      .projection(projection);

  g.selectAll(".map")
    .data(map.features)
    .enter().append("path")
      .attr("class", "map")
      .attr("d", path);
  
  var _2018 = data.data.map(obj => [obj[10], obj[8], obj[12],
                                    obj[13], obj[14], obj[15], obj[16],
                                    obj[17], obj[18], obj[19]])
                       .filter(item => {
                        return item[0][3] == "8";
                      })
  
  var count;
  for (var i = 0; i < 7; i++){
    count[i] = _2018.reduce((total, item) => {
                         return total + parseInt(item[i+2]);}, 0);
  }
  
  
  console.log(count);
  
  var x = d3.scaleLinear()
            .domain([0, 70])
            .rangeRound([0,250]);

  var y = d3.scaleBand()
            .domain([0, 10])
            .rangeRound([60,600]);
  
  g.append('g')
    .attr('class', 'axis--y')
    .attr('transform', 'translate(125,-2)')
    .call(d3.axisLeft(y))
  
//   var brooklyn = borough(_2018, "Brooklyn");
//   var bronx = borough(_2018, "Bronx");
//   var manhattan = borough(_2018, "Manhattan");
//   var queens = borough(_2018, "Queens");
//   var staten_island = borough(_2018, "Staten Island");

//   console.log(count(brooklyn));
//   console.log(count(bronx));
//   console.log(count(manhattan));
//   console.log(count(queens));
//   console.log(count(staten_island));
}

function borough(data, name){
  return data.filter(item => {
    return item[1] == name;
  })
}

function count(data){
  return data.reduce(function(cnt) {
    return cnt+1;
  },0);
}
