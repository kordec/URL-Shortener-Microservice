const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient()
const url = process.env.MONGODB_URI;
var collection


function insert(value, cb) {
  try {
    collection.insert(value, function(err, inserted){
      if(err) {
        console.log(err)
      } else {
        cb(inserted.ops[0])  
      }
       
    })
  } catch (ex) {
   console.log(ex) 
  }
}

function get(key, cb) {
  try {
    collection.findOne(key, function(err, data) {
      if(err) {
        console.log(err)
      } else {
        cb(data)
      }
    })
  } catch (ex) {
    console.log(ex)
  }
}

function nextId(cb) {
  try {
    collection.find().count().then(c => cb(c.toString()))
  } catch (ex) {
    console.log(ex)
  }
}

function connect() {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err)
    } else {
      collection = db.collection(process.env.COLLECTION)
    }
  }); 
}

module.exports = {
  connect,
  insert,
  get,
  nextId,
}