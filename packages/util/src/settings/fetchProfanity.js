export async function fetchProfanity(guild) {
 const client = await clientPromise;
 const db = await client.db();
 const collection = await db.collection("guilds");
 await collection.findOne({ guildID: guild }).then (res => {
  console.log(res)
  return res;
 })
}