// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { Resend } from "resend";

// const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI);
// const db = client.db("better-auth-conceptual2");
// const resend = new Resend(process.env.RESEND_API_KEY);

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: true,
//     sendResetPassword: async ({ user, url, token }, request) => {
//       void resend.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: user.email,
//         subject: "reset your password",
//         html:`
//         <h4> Reset Your Password</h4>
//         Click the link to reset your password: ${url}
//         <p>Ignore this email If you haven't requested a password</p>
//         `
//       });
//     },
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
//     },
//   },
//   emailVerification: {
//     sendVerificationEmail: async ({ user, url, token }, request) => {
//       void resend.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: user.email,
//         subject: "Verify Email",
//         html: `<p> Clcik the link to verify your email: ${url}</p>`,
//       });
//     },
//     sendOnSignUp: true,
//     autoSignInAfterVerification: true,
//     expiresIn: 60 * 5,
//   },
//   database: mongodbAdapter(db, {
//     // Optional: if you don't provide a client, database transactions won't be enabled.
//     client,
//   }),
// });

// 40fd1fhYdv3avwhr
//mongodb://<db_username>:<db_password>@ac-knsodps-shard-00-00.aa4efdl.mongodb.net:27017,ac-knsodps-shard-00-01.aa4efdl.mongodb.net:27017,ac-knsodps-shard-00-02.aa4efdl.mongodb.net:27017/?ssl=true&replicaSet=atlas-irgokt-shard-0&authSource=admin&appName=Cluster0
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';


const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');
const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: "Reset your password",
        html: `
        <h4>Reset your password</h4>
        Click the link to reset your password: ${url}
        <p>Ignore this email if you haven't requested a password reset.</p>
        `,
      })
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `
        <h1>Please Verify your email address</h1>
        Click <a href="${url}">here</a> to verify your email.
        `,
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 7 * 24 * 3600 // 7 days
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET
    }
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});