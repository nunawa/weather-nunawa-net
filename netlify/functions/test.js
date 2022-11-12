const { MongoClient } = require('mongodb')

exports.handler = async function (event, context) {
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true })
  const db = client.db("weather")

  try {
    const data = await db.collection("amedas").find({ "spec.rainfall": false }).toArray()
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
