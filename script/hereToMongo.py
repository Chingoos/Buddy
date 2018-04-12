import urllib2
import json
import time
import pymongo
import sys
from pymongo import MongoClient
client = pymongo.MongoClient()
db=client.staging
db.places.drop()
db.places_detail.drop()
sys.setrecursionlimit(5000)
current_date = time.strftime('%Y%m%d')
app_id= "FKQUy8ihG2cJTLDAmn01"
app_code = "knOkVBEoB0DIdFMnPzdTeg"
latitude = "37.722046"
longitude = "-122.45329"
categoryId = "eat-drink"
n=37.808
e=-122.3663
s=37.657841
w=-122.495495


places = []
places_detail = []
count = 0
firstCounter = 0

def addToList(east,west,south,north):
    global count
    global firstCounter
    southWest = str(south)+","+str(west)
    northEast = str(north)+","+str(east)
    url = "https://places.cit.api.here.com/places/v1/browse?app_id="+app_id+"&app_code="+app_code+"&in="+str(round(west,5))+","+str(round(south,5))+","+str(round(east,5))+","+str(round(north,5))+"&cat="+categoryId+"&size=100&drilldown=true&show_refs=opentable,yelp,tripadvisor,facebook"
    print("west"+str(round(west,5))+"south"+str(round(south,5))+"east"+str(round(east,5))+"north"+str(round(north,5)))
    count+=1
    obj = urllib2.urlopen(url)
    data=json.load(obj)
    if (len(data['results']['items'])>=100) or (firstCounter == 0):
        print("HOW MANY RETURNED" + str(len(data['results']['items'])))
        firstCounter+=1
        print (firstCounter)
        addToList(east,(west+east)/2,(south+north)/2,north)
        addToList((east+west)/2,west,(south+north)/2,north)
        addToList((east+west)/2,west,south,(south+north)/2)
        addToList(east,(east+west)/2,south,(south+north)/2)
        
    else:
        print("HOW MANY RETURNED" + str(len(data['results']['items'])))
        for i in data['results']['items']:
            nameAddress = [i['title'].encode('ascii', 'ignore').decode('ascii'), i['position']]
            if nameAddress not in places:
                places.append(nameAddress)
                db.places.insert(i)
                addDetails(i['href'])
def addDetails(link):
    url = link
    obj=urllib2.urlopen(url)
    data=json.load(obj)
    name = data['name']
    places_detail.append(name)
    db.places_detail.insert(data)
addToList(e,w,s,n)
print "count number of calls=" + str(count)
print "total places added" + str(len(places))
print "total places_details added" + str(len(places_detail))
