const { MongoClient } = require('mongodb')

exports.handler = async event => {
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true })

  try {
    const data = await client.db("weather").collection("wbgt").find({}, {projection: {_id: 0, dist: 0, pref: 0, max_min: 0}}).toArray()
    client.close()
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: "Please try again later."
    }
  }
}
