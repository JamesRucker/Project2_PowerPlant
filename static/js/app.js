// Plan

// init function 
// 1) Fill out dropdown with all of the ids
// 2) Calls a buildPage function that draws the chart and the panel for the first one

// buildPage function 
// 1) That takes one parameter, which is the subject ID
// 2) Draws our plotly charts and fills the panel

// Need an event listener for the dropdown
// optionChanged function
// - That takes as a parameter the user selection


function buildPage(year){

    d3.csv("./data/global-primary-energy.csv").then((data) => {
  
      //console.log(year);
      //console.log(data);

      function filterByYear(testData) {
        return testData.Year == year;
      }
      //var samples = data.samples;
      //console.log(samples);
      var filteredSample = data.filter(filterByYear);
      console.log(filteredSample);
  
      
      var panel = d3.select("#sample-metadata");
  
      panel.html("");
      var keyArray = [];
      var valueArray = [];  

       var table = panel.append("table");
      Object.entries(filteredSample[0]).forEach(([key, value]) => {
        // One idea is to append header elements (h5 or h6) of the key: value
        //console.log(key);
        //console.log(value);
        if (key != "Year"){
            keyArray.push(key);
            valueArray.push(parseInt(value));
        }

        var row = table.append("tr");
        var cell1 = row.append("td");
        //cell1 = row.append("b");
        cell1.text(key);
        var cell2 = row.append("td");
        cell2.text(value);
      })
      //console.log(keyArray);
      //console.log(valueArray);

    // Create Pie Chart

      // Create the Trace
      var trace1 = {
        values: valueArray,
        labels: keyArray,
        type: "pie",
      };
  
      // Create the data array for the plot
      var data1 = [trace1];
  
      // Define the plot layout
      var layout1 = {
        title: `Primary Energy by Type [${year}]`,
        height: 400,
        width: 700,
        paper_bgcolor: "#2b3752",
        font: {color: '#9f9f9f'}
      };
  
      // Plot the chart to a div tag with id "bar"
      Plotly.newPlot("pie", data1, layout1);





      //Plot Bubble Chart
  
      var otuIds2 = otuIdList[0].reverse();
      var otuSamples2 = otuSamplesList[0].reverse();
      var otuIdLabelsList2 = filteredSample.map(sample => sample.otu_labels);
  
  
      var trace2 = {
        x: otuIds2,
        y: otuSamples2,
        mode: 'markers',
        marker: {
          color: otuIds2,
          //opacity: [1, 0.8, 0.6, 0.4],
          size: otuSamples2
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'Sample Bubble Chart',
        xaxis: { title: "OTU IDs" },
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', data2, layout2);
  
      //Gage Chart
      var washFreq = filteredPanel[0].wfreq;
      console.log(washFreq);
  
      // var data3 = [
      //   {
      //     name: "Scrubs/Week",
      //     type: "indicator",
      //     mode: "gauge+number",
      //     value: washFreq,
      //     textposition: "inside",
      //     title: { text: "Belly Button Washing Frequency", font: { size: 20 } },
      //     gauge: {
      //       axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
      //       bar: { color: "gray" },
      //       bgcolor: "white",
      //       borderwidth: 0,
            
      //       bordercolor: "gray",
      //       steps: [
      //         { range: [0, 1], color: 'rgb(0, 255, 0)'},
      //         { range: [1, 2], color: 'rgb(0, 225, 0)'},
      //         { range: [2, 3], color: 'rgb(0, 200, 0)'},
      //         { range: [3, 4], color: 'rgb(0, 175, 0)'},
      //         { range: [4, 5], color: 'rgb(0, 150, 0)'},
      //         { range: [5, 6], color: 'rgb(0, 125, 0)'},
      //         { range: [6, 7], color: 'rgb(0, 100, 0)'},
      //         { range: [7, 8], color: 'rgb(0, 50, 0)'},
      //         { range: [8, 9], color: 'rgb(0, 0, 0)'}
      //       ],
      //       threshold: {
      //         line: { color: "red", width: 4 },
      //         thickness: 0.75,
      //         value: 9
      //       }
      //     }
      //   }
      // ];
  
      // Second approach
      var trace3 = {
        type: 'pie',
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        values: [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 90],
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        direction: 'clockwise',
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: ['','','','','','','','','','white'],
          labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
          hoverinfo: 'label'
        }
      }
      var data3 = [trace3];
      // needle
      var degrees = 20 * washFreq 
      var radius = 0.25
      var radians = degrees * Math.PI / 180
      var x = 0.5 - (radius * Math.cos(radians))
      var y = 0.5 + (radius * Math.sin(radians))
  
      var layout3 = {
        width: 450,
        height: 450,
        shapes: [{
          type: 'line',
          x0: 0.5,
          y0: 0.5,
          x1: x,
          y1: y,
          line: {
            color: 'black',
            width: 3
          }}],
        annotations: [{
            font: {
              size: 20
            },
            showarrow: false,
            text: washFreq,
            x: 0.5,
            y: 0.4
          }],
        title: { text: "Belly Button Washing Frequency", font: { size: 20 }},
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [-1, 1]}
      }
      
      // var layout3 = {
      //   width: 350,
      //   height: 300,
      //   margin: { t: 25, r: 25, l: 25, b: 25 },
      //   paper_bgcolor: "white",
      //   font: { color: "gray", family: "Arial" }
      // };
      
      Plotly.newPlot('gauge', data3, layout3);
    })
  }
  
  
  function init() {
  
    // Fill dropdown with IDs
    // Get firstOne id and call buildPage with that id
  
    d3.csv("./data/global-primary-energy.csv").then((data) => {
  
      var selector = d3.select("#selDataset");
  
      //console.log(data);
      var count = 0;

      data.forEach((year) => {
        year['Year'] = +year['Year'];
        //console.log(year['Year'])
        count +=1;
        selector
          .append("option")
          .text(year['Year'])
          .property("value", year['Year'])
          .property("selected",year['Year'])
      })

      console.log(count);
      firstOne = data[count-1]['Year'];
  
      buildPage(firstOne);
  
    })
  }
  
  function optionChanged(selection) {
  
    buildPage(selection);
  }
  
  
  init()