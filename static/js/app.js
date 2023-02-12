function init(){
    // grab ref to dropdown selection box
    var selector = d3.select("#selDataset");

    // use the list of sample names to populate the select option
    d3.json("samples.json").then((data) => {
        var listSamples = data.names;
        //console.log(listSamples);
        //add samples to dropdown menu
        listSamples.forEach((sample) => {
            selector.append("option").text(sample).property("value", sample);
            
        });

        var firstSample = listSamples[0];
        buildmetadata(firstSample);
        buildChart(firstSample);
    });
}

// Initialising the dashboard on the page
init;

function optionChanged(newSelection){
    buildmetadata(newSelection);
    buildChart(newSelection);
}

// display information on the demographics panel
function buildmetadata(sample) {
    //console.log(sample);
    // Read "metadata" from json file for each subject and assign it to a variable
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;

        //filter the data for the required sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id==sample);
        var result = resultArray[0];

        // used d3 to select the id of sample-metadata
        var PANEL = d3.select("#sample-metadata");

        // used html to clear any other existing metadata 
        PANEL.html("");

        // used Object.enteries to add each key and value to the panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

        });
    });
}


function buildChart(sample){
    // Used d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Created a variable that holds the samples array. 
    var samples = data.samples;
    // Created a variable that holds the metadata array. 
    var metadata = data.metadata;

    // Created a variable that filters the samples for the required sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //a variable is created that filters the metadata array for the required sample number.
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

    //  A variable that holds the first sample from the samples array.
    var firstSample = sampleArray[0];
    // A variable that holds the first sample in the metadata array.
    var result = metadataArray[0];


    // These variables hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels; 
    var otuSampleValues = firstSample.sample_values;

    //Here I have created a variable that holds the washing frequency.
     var wFreq = result.wfreq; 

     function intToFloat(num, decPlaces) { 
        return num + '.' + Array(decPlaces + 1).join('0');
       }
     var floatWashingFreq = intToFloat(wFreq,1);

    //  yticks are created for the bar chart.
    // object to hold the 3 variables in order to sort them 
    // all in a descending way and then slice the last 10 values of each one

   var charts = Array();

    for(var i=0; i<firstSample.otu_ids.length; i++) {
      charts.push({ 
        id:firstSample.otu_ids[i], 
        label: firstSample.otu_labels[i], 
        value: firstSample.sample_values[i] 
      });
    }
    
    //console.log('Charts');
    //console.log(charts.map(c => c.value));

    //Sorting by values 
    var chartsSorted = charts.sort((p1,p2)=> { 
      return p1.value - p2.value;
      });

      //console.log('Sorted Values are');
      //console.log(sortedCharts.map(c => c.value));
  
      //Slicing top 10 values 
      var x = (chartsSorted.map(c => c.value)).slice(-10);
      var yID = (chartsSorted.map(c => c.id)).slice(-10);
      var hoverText = (chartsSorted.map(c => c.label)).slice(-10);

      //Create yticks values 
      var yticks = yID.map(a=> 'OTU '+ a);
      //console.log(yID);
      //console.log(yticks);

    // creating the trace for the bar chart.   
    var barData = [{
      x: x,
      y: yticks,
      text: hoverText,
      type: 'bar',
      orientation: 'h' 
     }];

    // creating the layout for the bar chart. 
    var barLayout = {
     paper_bgcolor: '#FFFFFF57',
     title: 'Top 10 Bacteria Cultures Discovered'
    };

    // used Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);

   // Bar and Bubble charts
    // created the trace for the bubble chart.
    console.log(otuIDs.filter((item,
      index) => otuIDs.indexOf(item) === index));
    var bubbleData = [{
      x: otuIDs,
      y: otuSampleValues,
      text: otuLabels,
      mode:'markers',
      marker: {
        color: otuIDs.map(id => numberToColour(id*1000)),
        size: otuSampleValues
      }
   }];
   console.log(otuIDs);

    // created the layout for the bubble chart.
    var bubbleLayout = {
      paper_bgcolor: '#FFFFFF57',
      xaxis: {title:'OTU ID'},
      width: 1184,
      showlegend: false
    };

    // Used Plotly to plot the data 
    Plotly.newPlot('bubble', bubbleData, bubbleLayout ); 

    // created the trace for the gauge chart.
    var gaugeData = [{ 
      title: {
        text:'<b>Belly Button Washing Frequency</b><br>Scrubs per week',
      },
      domain: { x: [0, 1], y: [0, 1] },
      value: floatWashingFreq,
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 380 },
      gauge: {
        axis: { range: [null, 9] },
        bar: { color: "#FFC300" },
        borderwidth: 2,
        bordercolor: "white",
        steps: [
          {range: [0, 1], color: "#F0EAD6"},
          {range: [1, 2], color: "#ECFFDC"},
          {range: [2, 3], color: "#9FE2BF"},
          {range: [3, 4], color: "#98FB98"},
          {range: [4, 5], color: "#0BDA51"},
          {range: [5, 6], color: "#AFE1AF"},
          {range: [6, 7], color: "#93C572"},
          {range: [7, 8], color: "#2E8B57"},
          {range: [8, 9], color: "#40826D"}
       
          
        ] 
      }
    }];
  
    //  gauge chart layout.
    var gaugeLayout = {
      paper_bgcolor: '#FFFFFF57',
      width: 500,
      height: 450,
    };

    // used Plotly to plot the gauge data and layout.
    // var PANEL = d3.select("#col-md-5");
    // PANEL.append("h5").text('Belly Button Washing Frequency');
    // PANEL.append("h6").text('Scrubs per week');

    // Render the plot to the div tag with id 'gauge'
    Plotly.newPlot('gauge',gaugeData, gaugeLayout);


  });
};

function numberToColour(number) {
  const r = (number & 0xff0000) >> 16;
  const g = (number & 0x00ff00) >> 8;
  const b = (number & 0x0000ff);
  
  return 'rgb('+r+', '+g+', '+b+')';
}


init();