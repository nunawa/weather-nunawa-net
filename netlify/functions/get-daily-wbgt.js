const { MongoClient } = require('mongodb')

exports.handler = async event => {
  const query = event.queryStringParameters
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true })

  try {
    const data = await client.db("weather").collection("wbgt").find({id: query.q}, {projection: {_id: 0, dist: 0, ave: 0}}).toArray()
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
