import pymongo
from pymongo import MongoClient
import MySQLdb

conn = MySQLdb.connect(host= "buddystaging.cfvxqjolxisb.us-west-2.rds.amazonaws.com",user="Buddy",passwd="dogdogjim123",db="staging")
x = conn.cursor()




client = pymongo.MongoClient()

db = client.staging

x.execute("""DROP TABLE IF EXISTS venue_test""")
x.execute("""CREATE TABLE venue_test (venue_id VARCHAR(50) NOT NULL, name VARCHAR(100) NOT NULL, category VARCHAR(50), verified VARCHAR(10) , address VARCHAR(100), city VARCHAR(100), state VARCHAR(20), zip_code VARCHAR(10), tipCount INT, usersCount INT, checkinsCount INT, latitude FLOAT(30,20), longitude FLOAT(30,20), as_of_date DATETIME) CHARACTER SET = utf8""")
  
for v in db.venues.find():
  if (v['location'].get('address','NULL') != 'NULL') and (v['location'].get('city','NULL') != 'NULL') and (v['location'].get('city','NULL') != 'NULL') and (v['location'].get('state','NULL') != 'NULL')  and (v['location'].get('postalCode','NULL') != 'NULL'):
    x.execute("""INSERT INTO venue_test(venue_id, name, category, verified, address, city, state, zip_code, tipCount, usersCount, checkinsCount, latitude, longitude, as_of_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())""", (v['id'], v['name'].encode("utf-8"), v['categories'][0]['name'], v['verified'],  v['location']['address'], v['location']['city'], v['location']['state'], v['location']['postalCode'], v['stats']['tipCount'], v['stats']['usersCount'], v['stats']['checkinsCount'], v['location']['lat'], v['location']['lng']))
  elif (v['location'].get('city','NULL') != 'NULL') and (v['location'].get('state','NULL') != 'NULL') and (v['stats'].get('usersCount','NULL') != 'NULL') and (v['location'].get('postalCode','NULL') != 'NULL'):
    x.execute("""INSERT INTO venue_test(venue_id, name, category, verified, city, state, zip_code, tipCount, usersCount, checkinsCount,latitude, longitude, as_of_date) VALUES (%s, %s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())""", (v['id'], v['name'].encode("utf-8"), v['categories'][0]['name'], v['verified'],  v['location']['city'], v['location']['state'], v['location']['postalCode'], v['stats']['tipCount'], v['stats']['usersCount'], v['stats']['checkinsCount'], v['location']['lat'], v['location']['lng']))
  elif (v['location'].get('city','NULL') != 'NULL') and (v['location'].get('state','NULL') != 'NULL'):
    x.execute("""INSERT INTO venue_test(venue_id, name, category, verified, city, state, tipCount, usersCount, checkinsCount,latitude, longitude, as_of_date) VALUES (%s, %s, %s,%s, %s, %s, %s, %s, %s, %s, %s, NOW())""", (v['id'], v['name'].encode("utf-8"), v['categories'][0]['name'], v['verified'],  v['location']['city'], v['location']['state'], v['stats']['tipCount'], v['stats']['usersCount'], v['stats']['checkinsCount'], v['location']['lat'], v['location']['lng']))
  elif (v['location'].get('state','NULL') != 'NULL'):
    x.execute("""INSERT INTO venue_test(venue_id, name, category, verified, state, tipCount, usersCount, checkinsCount, latitude, longitude, as_of_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())""", (v['id'], v['name'].encode("utf-8"), v['categories'][0]['name'], v['verified'], v['location']['state'], v['stats']['tipCount'], v['stats']['usersCount'], v['stats']['checkinsCount'], v['location']['lat'], v['location']['lng']))
  else:
    print v['name']
  
conn.commit()
conn.close()
