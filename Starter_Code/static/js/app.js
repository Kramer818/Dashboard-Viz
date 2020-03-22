// d3.json('samples.json').then((data) => {

//     console.log(data)
//     var values = data.samples;
//     console.log(values[0].sample_values);
//     var sorted = values.sort(function sortFunction(a, b) {

//       return b[0].sample_values - a[0].sample_values;
//     })
//     console.log(sorted)
//     // var sortedbyVals = data.samples.sample_values.sort((a, b) => b.data.samples.sample_values - a.data.samples.sample_values);

//     var slicedData = sorted.slice(0, 10);

//     var reversedData = slicedData.reverse();
    
    
    // var trace1 = {
    //     x: reversedData.map(object => object.sample_values),
    //     y: reversedData.map(object => object.otu_ids),
    //     type: "bar",
    //     orientation: "h",
    //     // text: data.samples.otu_labels
    // };
    // var test = [trace1];
    // Plotly.newPlot("plot", test);


function init() {

  var info = d3.select("#selDataset");
  d3.json("samples.json").then((name) => {
    var sampleNames = name.names;
    sampleNames.forEach(x => {
      info.append("option").text(x).property("value", x);
    });
    var firstSample = sampleNames[0];
    demoTable(firstSample);
    buildPlot(firstSample);
  });
}
function demoTable(sample) {
  var metadata = d3.select("#sample-metadata");
  d3.json("samples.json").then((a) => {
    var metadataInfo = a.metadata;
    var filteredData = metadataInfo.filter(x => x.id == sample);
    console.log(filteredData);
    var filterD = filteredData[0];
    metadata.html("");
    Object.entries(filterD).forEach(function([key, value]) {
      console.log(key,value);
      var row = metadata.append("tr");
      row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
      row.append('td').html(`<font size ='1'>${value}</font>`);
    });
  });
};

function buildPlot(sample) {
  d3.json("samples.json").then((data) => {
    var sampleData = data.samples;
    var filterSamples = sampleData.filter(x => x.id == sample);
    var filteredSamp = filterSamples[0];
    // Object.entries(filteredSamp).forEach(function([key, value]) {
      var sliceData = filteredSamp.sample_values.slice(0,10);
      // console.log(sliceData)
      var vals = filteredSamp.otu_ids;
      var sliceVals = vals.slice(0,10);
      var labels = filteredSamp.otu_labels;
      var sliceLabels = labels.slice(0,10);
      
      newVals = sliceVals.forEach(a => `OTU-${sliceVals}`)
      console.log(newVals)
      var trace1 = [{
        x: sliceData,
        y: newVals,
        type: "bar",
        orientation: "h",
        text: sliceLabels,
        width: 1
      }]
      var layout = [
        // width = 100
      ];
      Plotly.newPlot("plot", trace1, layout);
  });
};

function optionChanged(newSample) {
  demoTable(newSample);
  buildPlot(newSample);
};
init();
