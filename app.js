function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
        // Create array to hold all names (all ID names)
        var names = data.samples.map(x=>x.id)
        // Append an option in the dropdown
        names.forEach(function(name) {
            d3.select('#selDataset')
                .append('option')
                .text(name)
            });
        
        
        // Display the Demographic Info for 1st ID
        var first_id = data.names[0]
        console.log(first_id);
        buildMetadata(first_id)
        updateCharts(first_id);  
        });
    }; 
    
      function buildMetadata(sample) {
        d3.json("samples.json").then((data) => {
          const metadata = data.metadata;
          // Filter the data for the object with the desired sample number
          const resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
          const result = resultArray[0];
          // Use d3 to select the panel with id of `#sample-metadata`
          const PANEL = d3.select("#sample-metadata");
      
          // Use `.html("") to clear any existing metadata
          PANEL.html("");
      
          
          for (const [key, value] of Object.entries(result)) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
          }
        });
      }  

      function updateCharts(sample) {    
        d3.json("samples.json").then((data) => {
          var samples = data.samples;
          var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
          var result = filterArray[0];
          var sample_values = result.sample_values;
          var otu_ids = result.otu_ids;
          var otu_labels = result.otu_labels;  

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
            size: sample_values,
            color: otu_ids,
            colorscale:"YlGnBu"
            }
        };
        var data = [trace2];
        var layout = {
            title: '<b>Bubble Chart</b>',
            automargin: true,
            autosize: true,
            showlegend: false,
            margin: {l: 150,
              r: 50,
              b: 50,
              t: 50,
              pad: 4 }
        };
        Plotly.newPlot('bubble', data, layout); 
        var trace1 = {
          x: sample_values.slice(0,10).reverse(),
          y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
          text: otu_labels.slice(0,10).reverse(),
          name: "Greek",
          type: "bar",
          orientation: "h",marker: {
            color: 'blue',
              
            line: {
              
              width: 1.5
            }
          }
          
      };
      var data = [trace1];
      var layout = {
          title: "Top 10 OTU for sample " +sample,
          automargin: true,
          autosize: true,
          margin: {l: 150, r: 50, t: 50, b: 50,pad: 4},
          
      };
      var config = {responsive:true}
      Plotly.newPlot("bar", data, layout); 
        });
      }

      function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        buildMetadata(newSample);
        updateCharts(newSample)
      } 
    init();                   