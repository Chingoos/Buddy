import pymongo
from pymongo import MongoClient
import MySQLdb

conn = MySQLdb.connect(host= "buddystaging.cfvxqjolxisb.us-west-2.rds.amazonaws.com",user="Buddy",passwd="dogdogjim123",db="staging")
x = conn.cursor()




client = pymongo.MongoClient()

db = client.staging

x.execute("""DROP TABLE IF EXISTS places_test""")
x.execute("""CREATE TABLE places_test (place_id VARCHAR(50) NOT NULL, name VARCHAR(100) NOT NULL, address VARCHAR(100), city VARCHAR(100), state VARCHAR(20), zip_code VARCHAR(10), country VARCHAR(20), district VARCHAR(30), phone_number VARCHAR (20), yelp_id VARCHAR(50), latitude FLOAT(30,20), longitude FLOAT(30,20), as_of_date DATETIME) CHARACTER SET = utf8""")
  
for v in db.places_detail.find():
  x.execute("""INSERT INTO places_test(place_id, name, latitude, longitude, as_of_date) VALUES (%s,%s, %s, %s NOW())""", (v['placeId'], v['name'], v['location']['position'][0], v['location']['position'][1]))
  if (v['location'].get('address', 'Null') != 'Null'):
    if (v['location']['address'].get('house','Null') != 'Null') and (v['location']['address'].get('street','Null') != 'Null'):
      x.execute("""UPDATE places_test SET address = %s WHERE place_id = %s)""", (v['location']['address']['house'] + v['location']['address']['street'], v['placeId']))
      if v['location']['address'].get('postalCode','Null') != 'Null':
        x.execute("""UPDATE places_test SET zip_code = %s WHERE place_id = %s)""", (v['location']['address']['postalCode'], v['placeId']))
        if v['location']['address'].get('city','Null') != 'Null':
          x.execute("""UPDATE places_test SET city = %s WHERE place_id = %s)""", (v['location']['address']['city'], v['placeId']))
          if v['location']['address'].get('district','Null') != 'Null':
            x.execute("""UPDATE places_test SET state = %s WHERE place_id = %s)""", (v['location']['address']['state'], v['placeId']))
          else:
            print("NO DISTRICT" + v['name'])
        else:
          print("NO CITY" + v['name'])
      else: 
        print("NO STREET" + v['name'])
    else:
      print("NO STREET" + v['name'])
  else:
    print("NO STREET" + v['name'])

  
conn.commit()
conn.close()
