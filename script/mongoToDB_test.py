import pymongo
from pymongo import MongoClient
import MySQLdb

conn = MySQLdb.connect(host= "buddystaging.cfvxqjolxisb.us-west-2.rds.amazonaws.com",user="Buddy",passwd="dogdogjim123",db="staging")
x = conn.cursor()




client = pymongo.MongoClient()

db = client.staging

x.execute("""DROP TABLE IF EXISTS places_test""")
x.execute("""CREATE TABLE places_test (place_id VARCHAR(50) NOT NULL, name VARCHAR(100) NOT NULL, address VARCHAR(100), city VARCHAR(100), state VARCHAR(20), zip_code VARCHAR(10), country VARCHAR(20), district VARCHAR(20), phone_number VARCHAR (20), yelp_id VARCHAR(50), latitude FLOAT(30,20), longitude FLOAT(30,20), as_of_date DATETIME) CHARACTER SET = utf8""")
  
for v in db.places_detail.find():
  try:
    x.execute("""INSERT INTO places_test(place_id, name, address, city, state, zip_code, country, district,  latitude, longitude, as_of_date) VALUES (%s, %s, %s, %s, NOW())""", (v['placeId'], v['name'], (v['location']['address']['house'] + v['location']['address']['street'], v['location']['address']['city'],  v['location']['address']['state'],  v['location']['address']['postalCode'],  v['location']['address']['country'],  v['location']['address']['district'], v['location']['position'][0], v['location']['position'][1]))
  except:
    print v['title']

  
conn.commit()
conn.close()
