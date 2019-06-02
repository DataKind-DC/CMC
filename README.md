# Chesapeake Monitoring Cooperative (CMC)

The Chesapeake Monitoring Cooperative (CMC) 

DataKind DC (DKDC) hopes to use the data collected and standardized by CMC to help the organization better understand monitoring activities. This analysis might include identifying impactful patterns in the data which would encourage more scientists and states to use the data and understanding any gaps in data collection} so they can continue to build this useful open data resource for future scientific efforts. 

## How to get involved
* Attend DKDC DataJams to meet the team and learn about the project
* Feel free to contribute to the GitHub repository anytime

## Project Overview
April 2019: At the April DKDC DataDive, participants worked with CMC partners to develop an interactive web app to allow users to explore the data collected through CMC's efforts. CMC would like the data to be more easily available for filtering and downloading. 

The current app is available at https://cmc-data-explorer.herokuapp.com/

The interactive map is built using Plotly's Dash package and the website is currently freely deployed and hosted on Heroku. 

### Next Steps for the app
#### Data Integration
  - [ ] Add the station (site location) API endpoint
#### Parameters for filtering data
  - [ ] add data range selection
  - [ ] add "Benthic" as an option to show any sites with benthic macroinvertebrate data
#### Visualizations and Summary Statistics
  - [ ] Add simple statistics about select parameters at the top of the page
  - [ ] Add units to all plot y-axes
  - [ ] Change all plots to line graphs to better see progress over time 
  - [ ] Integrate depth profiles in plots. Some parameters are collected at multiple depths at the same time and location. Chemical data points have an associated depth value. Options for integrating depth: color code points by depth or connect points at the same depth, recognizing that depth will not be the same from one sampling event to the next.
  - [ ] Add color shading or horizontal lines dividing "normal" values from extreme values. This will require threshold values for each parameter (see "Research and Analysis" section below).
  - [ ] Add a plot for Index of Benthic Indicators (IBI), which is a calculation from the benthic data.
#### Page Layout
  - [ ] Add a header between the map and first row of plots. The header should include: name of the selected site (code and full site name, though some sites only have a code), name of the group collecting data at the site, the first and last dates of data collection
#### Research and Analysis
  - [ ] Determine the appropriate threshold values to use for each parameter (dissolved oxygen: oxic, hypoxic, anoxic; for E. coli: above/below EPA swimming limit)


