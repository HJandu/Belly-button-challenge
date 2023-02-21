# <p align="center"> <ins>Belly Button Biodiversity</ins>

## <ins>Background</ins> 

In this assignment, I have built an interactive dashboard to explore the Belly Button Biodiversity dataset Links to an external site, which catalogues the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### <ins>Files I worked with.</ins> 
* `index.html`
* `samples.json` - Used the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
* `static/js` folder that contains my `app.js` code.

Before I began to write up the code, I created the skeleton for each `function`.

## <ins>Charts created</ins>

I created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. To do this: 

- I used the `sample_values` as the values for the bar chart.
- I used `otu_ids` as the labels for the bar chart.
- I used `otu_labels` as the hovertext for the chart.

  <ins>Plotly Horizontal Bar chart</ins>
  
![Screen Shot 2023-02-12 at 15 36 17](https://user-images.githubusercontent.com/116304118/218320742-acba0b34-57b6-435d-bfd8-27631e7adbd5.png)


I also created a bubble chart that displays each sample. To do this:

- I used `otu_ids` for the x values.
- I used `sample_values` for the y values.
- I used `sample_values` for the marker size.
- I used `otu_ids` for the marker colors.
- I used `otu_labels` for the text values.
  
  <ins>Plotly Bubble Chart</ins>
  
![Screen Shot 2023-02-12 at 15 46 42](https://user-images.githubusercontent.com/116304118/218321344-df75c3f1-967b-49f2-8b42-dc38c3b68c90.png)

  
The above bubble chart displays the sample metadata, i.e., an individual's demographic information. It also displays each key-value pair from the metadata JSON object on the page.
  
  
  <ins>Gauge Chart</ins> 

In addition to the above charts, I also created a gauge chart that plots the weekly washing frequency of the individual.

![Screen Shot 2023-02-12 at 16 15 52](https://user-images.githubusercontent.com/116304118/218322908-ce43afb2-1d2c-456e-ba15-af40e6805456.png)
  
  

  <ins>Interactive Dashboard</ins>
  
All the plots are updated when a new sample is selected from the Demographic Info. See image of the overall dashboard layout below. 
  
  ![Screen Shot 2023-02-12 at 17 02 09](https://user-images.githubusercontent.com/116304118/218325592-9e7727bb-d315-4d56-99a7-475246d0326a.png)



  <ins>Deployment</ins>
  
This app was deployed public on GitHub Pages. Click on the following link to see what the page looks like. 

https://hjandu.github.io/Belly-button-challenge/






