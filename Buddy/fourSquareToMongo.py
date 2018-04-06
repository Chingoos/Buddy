import urllib2
import json
import time
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient()
db=client.staging
db.venues.drop()

current_date = time.strftime('%Y%m%d')
client_id= "JZUIY4ACNQZ4WYZRSLTDQSMXGVK5NCBCT2JEP1GTXY1TVSMF"
client_secret = "RJA1XMUUCC4RP21CAQJREG3YOTNY4PTE2NEKUWR0GVVTLZPY"
city = "SF"
latitude = "37.722046"
longitude = "-122.45329"
categoryId = "4d4b7105d754a06374d81259"
n=37.8
e=-122.35
s=37.6
w=-122.55


venues = []
count = 0



def addToList(east,west,south,north):
    global count
    southWest = str(south)+","+str(west)
    northEast = str(north)+","+str(east)
    url = "https://api.foursquare.com/v2/venues/search?sw="+southWest+"&ne="+northEast+"&categoryId="+categoryId+"&client_id="+client_id+"&intent=browse&limit=50&client_secret="+client_secret+"&v="+current_date
    count+=1
    obj = urllib2.urlopen(url)
    data=json.load(obj)
    if len(data['response']['venues'])==50:
        addToList(east,(west+east)/2,(south+north)/2,north)
        addToList((east+west)/2,west,(south+north)/2,north)
        addToList((east+west)/2,west,south,(south+north)/2)
        addToList(east,(east+west)/2,south,(south+north)/2)
    else:
        for i in data['response']['venues']:
            nameAddress = [i['name'].encode('ascii', 'ignore').decode('ascii'), i['location']['lat']]
            if nameAddress not in venues:
                venues.append(nameAddress)
                db.venues.insert(i)

addToList(e,w,s,n)
print "count=" + str(count)
print len(venues)
