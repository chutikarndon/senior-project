const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore, initializeFirestore } = require("firebase-admin/firestore")

const serviceAccount = require('./cred.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

module.exports = { db }