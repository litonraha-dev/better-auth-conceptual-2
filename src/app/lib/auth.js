import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI);
const db = client.db('better-auth-conceptual2');

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});

// 40fd1fhYdv3avwhr
//mongodb://<db_username>:<db_password>@ac-knsodps-shard-00-00.aa4efdl.mongodb.net:27017,ac-knsodps-shard-00-01.aa4efdl.mongodb.net:27017,ac-knsodps-shard-00-02.aa4efdl.mongodb.net:27017/?ssl=true&replicaSet=atlas-irgokt-shard-0&authSource=admin&appName=Cluster0
