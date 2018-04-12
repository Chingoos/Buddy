import urllib2
import json
import time
import pymongo
import sys
from pymongo import MongoClient
client = pymongo.MongoClient()
db=client.staging
db.places.drop()
sys.setrecursionlimit(5000)
current_date = time.strftime('%Y%m%d')
app_id= "3FfCo1NGjLGCVbbvhemM"
app_code = "sW7ZTnFFJLiYlqRTxzKOjA"
latitude = "37.722046"
longitude = "-122.45329"
categoryId = "eat-drink"
n=38.726
e=-121.038
s=36.547
w=-122.7


places = []
count = 0
firstCounter = 0

def addToList(east,west,south,north):
    global count
    global firstCounter
    southWest = str(south)+","+str(west)
    northEast = str(north)+","+str(east)
    url = "https://places.cit.api.here.com/places/v1/browse?app_id="+app_id+"&app_code="+app_code+"&in="+str(w)+","+str(s)+","+str(e)+","+str(n)+"&cat="+categoryId
    count+=1
    obj = urllib2.urlopen(url)
    data=json.load(obj)
    if (len(data['results']['items'])==50) or (firstCounter == 0):
        firstCounter+=1
        print (firstCounter)
        addToList(east,(west+east)/2,(south+north)/2,north)
        addToList((east+west)/2,west,(south+north)/2,north)
        addToList((east+west)/2,west,south,(south+north)/2)
        addToList(east,(east+west)/2,south,(south+north)/2)
        
        
    else:
        for i in data['results']['items']:
            nameAddress = [i['title'].encode('ascii', 'ignore').decode('ascii'), i['position']]
            if nameAddress not in places:
                places.append(nameAddress)
                db.places.insert(i)
  
addToList(e,w,s,n)
print "count number of calls=" + str(count)
print "total places added" + str(len(places))
