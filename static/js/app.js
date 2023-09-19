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

        var sample_values = data.samples.map(x=> x.sample_values);
        var otu_ids = data.samples.map(x=> x.otu_ids);
        var otu_label = data.samples.map(x=> x.otu_labels);

        var sorted_test = sample_values.sort(function(a, b){return b-a});
        var top_ten = sorted_test.map(x => x.slice(0,10));
        var sorted_ids = otu_ids.sort(function(a, b){return b-a});
        var top_ids = sorted_ids.map(x =>x.slice(0,10));
        var sorted_labels = otu_label.sort(function(a, b){return b-a});
        var top_labels = sorted_labels.map(x =>x.slice(0,10));
        // Data for Bar Chart
        var trace1 = {
            x : top_ten[0],
            y : top_ids[0].map(x => "OTU " + x),
            text : top_labels[0],
            type : 'bar',
            orientation : 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending',
              }],
            marker: {
              color: 'blue',
                
              line: {
                
                width: 1.5
              }
            }
        };
        // layout for bar chart
        var layout1 = {
            title : '<b>Top 10 OTU</b>',
            automargin: true,
            autosize: true,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4      
    }
        };
      
        // Draw the bar chart
        var data = [trace1];
        var config = {responsive:true}
        Plotly.newPlot('bar', data, layout1,config);

        // Data for bubble graph
        var trace2 = {
            x : otu_ids[0],
            y : sample_values[0],
            text : otu_label[0],
            
            mode : 'markers',
            marker : {
                color : otu_ids[0],
                size : sample_values[0],
                colorscale: 'YlGnBu'
            }
            
        };
      
        // layout for bubble graph
        var layout2 = {
            title: '<b>Bubble Chart</b>',
            automargin: true,
            autosize: true,
            showlegend: false,
                margin: {
                    l: 150,
                    r: 50,
                    b: 50,
                    t: 50,
                    pad: 4      
        }};
      
        // Draw the bubble graph
        var data2 = [trace2];
        var config = {responsive:true}
        Plotly.newPlot('bubble',data2,layout2,config);

        
                
          

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
      function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        buildMetadata(newSample);
        
      } 
    init();                   