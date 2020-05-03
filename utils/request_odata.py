import requests, json


# get station-level information (locations, etc.)
station_res = requests.get('https://cmc.vims.edu/odata/Stations')
json.loads(station_res.content)

# filter stations
station_res = requests.get('https://cmc.vims.edu/odata/Stations?$filter=Code%20eq%20%27ACB%27')
json.loads(station_res.content)

# get the summary statistics shown below the map
homestats_res = requests.get('https://cmc.vims.edu/odata/GetHomeStats')
json.loads(homestats_res.content)

benthicrichness_res = requests.get('https://cmc.vims.edu/odata/GetBenthicStationRichness')
json.loads(benthicrichness_res.content)

# get parameter data (not sure how this differs from the next request)
odata_res = requests.get('https://cmc.vims.edu/odata/Groups?$expand=CmcMemberUser,CmcMemberUser2,CmcMemberUser3,ParameterGroups($select=Parameter,LabId,DetectionLimit;$expand=Parameter)&$orderby=Name')
data = json.loads(odata_res.content)['value']


# get sample data from a specific station (StationId)
json.loads(requests.get('https://cmc.vims.edu/odata/PublicSamples?%3F$expand[]=Event($expand%3DStation,Group),Parameter&$filter[]=Event%2FStationId+eq+2041+and+QaFlagId+eq+2').content)

