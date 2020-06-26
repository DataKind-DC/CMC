import requests, json
import sys

# get station-level information (locations, etc.)
station_res = requests.get('https://cmc.vims.edu/odata/Stations?$select=Id,Code,Name,NameLong,Lat,Long,CityCounty,Fips,State,WaterBody,CreatedDate,ModifiedDate')
out = json.loads(station_res.content)
sys.getsizeof(out)




# filter stations
station_res = requests.get('https://cmc.vims.edu/odata/Stations?$top=5')
json.loads(station_res.content)


# get the summary statistics shown below the map
homestats_res = requests.get('https://cmc.vims.edu/odata/GetHomeStats')
json.loads(homestats_res.content)

benthicrichness_res = requests.get('https://cmc.vims.edu/odata/GetBenthicStationRichness')
json.loads(benthicrichness_res.content)

# get parameter data (not sure how this differs from the next request)
odata_res = requests.get('https://cmc.vims.edu/odata/Groups?$expand=ParameterGroups($select=Parameter;$expand=Parameter($select=Name))&$select=Id,Code')
data = json.loads(odata_res.content)['value']
data

odata_res = requests.get('https://cmc.vims.edu/odata/Groups?$expand=CmcMemberUser,CmcMemberUser2,CmcMemberUser3,ParameterGroups($select=Parameter,LabId,DetectionLimit;$expand=Parameter)&$orderby=Name')
data = json.loads(odata_res.content)['value']
data

# get sample data from a specific station (StationId)
json.loads(requests.get('https://cmc.vims.edu/odata/PublicSamples?%3F$expand[]=Event($expand%3DStation,Group),Parameter&$filter[]=Event%2FStationId+eq+2041+and+QaFlagId+eq+2').content)

#json.loads(requests.get('https://cmc.vims.edu/odata/PublicSamples?$apply=groupby((ParameterId))').content)


groups = json.loads(requests.get('https://cmc.vims.edu/odata/Groups?$expand=ParameterGroups($select=Parameter,LabId,DetectionLimit;$expand=Parameter)&$orderby=Name').content)
groups
after = json.loads(requests.get("https://cmc.vims.edu/odata/Groups?$filter=Id eq 176").content)
after
# get specific group attributes
after = json.loads(requests.get("https://cmc.vims.edu/odata/Groups?$select=Id,Code,Name,State").content)
after
len(groups['value'])



# what they do
json.loads(requests.get('https://cmc.vims.edu/odata/PublicSamples?$expand=Event($expand=Station,Group),Parameter&$filter=Event/StationId%20eq%202362%20%20and%20QaFlagId%20eq%202&$top=1').content)

# get number of samples at a given station
json.loads(requests.get('https://cmc.vims.edu/odata/PublicSamples?$expand=Event($expand=Station($select=Id,Code,NameLong),Group($select=Id)),Parameter&$filter=Event/StationId eq 2330 and QaFlagId eq 2').content)

json.loads(requests.get('https://cmc.vims.edu/odata/PublicSamples?$expand=Parameter($select=Id,Code,Name,Units,Tier)&$filter=Event/StationId eq 2330 and QaFlagId eq 2&$count=true&$select=CreatedDate,Depth,Parameter,Id,Value').content)
