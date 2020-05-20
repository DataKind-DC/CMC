# Chesapeake Monitoring Cooperative (CMC)

DataKind DC (DKDC) hopes to use the data collected and standardized by CMC to help the organization better understand monitoring activities. This analysis might include identifying impactful patterns in the data which would encourage more scientists and states to use the data and understanding any gaps in data collection} so they can continue to build this useful open data resource for future scientific efforts. 

## How to get involved
* Attend DKDC DataJams and Project Nights to meet the team and learn about the project
* Feel free to contribute to the GitHub repository anytime

## Current Project

CMC would like to better understand how their volunteers' data collection fills in the gaps in water quality understanding. 
Volunteers will use data available from various Federal and state agencies, including the US Geological Survey (USGS) and Environmental Protection Agency (EPA), to develop visual products that highlight areas where CMC volunteers are contributing to scientific knowledge that otherwise would be unavailable. 

We are building an interactive web application that allows CMC and its partners to explore the data citizen scientists collect. 
The web application is currently hosted on [Heroku](https://cmcwebapp.herokuapp.com/).

### Getting Started 

run the following snippet to clone the repo, install all npm dependencies, and start the app in development mode.

```
git clone https://github.com/DataKind-DC/CMC.git
npm install 
npm run dev
```

You will also need to install a browser plug-in to enable cross-origin resource sharing (CORS). This will allow your browser to communicate with the CMC database API. On Chrome, you can use [this plugin](https://mybrowseraddon.com/access-control-allow-origin.html). 

We are tracking bugs that need to be fixed and new features using the GitHub issues feature.

## Previous Projects

DataKind has developed other visualizations and analyses to support CMC.

* April 2019: At the April DKDC DataDive, participants worked with CMC partners to develop an interactive web app to allow users to explore the data collected through CMC's efforts. CMC would like the data to be more easily available for filtering and downloading. The interactive [map](https://cmc-data-explorer.herokuapp.com/) is built using Plotly's Dash package and the website is currently freely deployed and hosted on Heroku. This project is archived in [google drive](https://drive.google.com/open?id=17TwpkiUyWlIp8IOh72huhSUZYg9h_JMo): 
* October 2019: Participants built an interactive map for users to see CMC benthic and water data collection in relation to culverts in Maryland and Virginia. The [map](https://datakind-dc.github.io/CMC/) is live and hosted by GitHub. The index file for this webpage is still in this repo to allow hosting.
