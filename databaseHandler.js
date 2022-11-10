const async = require('hbs/lib/async');
const { MongoClient, ObjectId } = require('mongodb');

// const URL = 'mongodb+srv://1670ASM:1411@cluster0.6pxwq.mongodb.net/test';
const URL = 'mongodb://localhost:27017';
const DATABASE_NAME = "QM-E"

async function getDB() {
    const client = await MongoClient.connect(URL)
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}


async function insertObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function checkUserRole(nameI, passI) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ userName: nameI, password: passI });
    if (user == null) {
        return "-1"
    } else {
        console.log(user)
        return user.role;
    }
}


async function DeleteStudent(username) {
    const dbo = await getDB();
    await dbo.collection("Students").deleteOne({ userName: username })
    await dbo.collection("Users").deleteOne({ userName: username })
}

async function DeleteTeacher(username) {
    const dbo = await getDB();
    await dbo.collection("Teachers").deleteOne({ userName: username })
    await dbo.collection("Users").deleteOne({ userName: username })
}

async function DeleteClass(className) {
    const dbo = await getDB();
    await dbo.collection("Classes").deleteOne({ className: className })

}

module.exports = {
    getDB,
    insertObject,
    checkUserRole,
    DeleteStudent,
    DeleteTeacher,
    DeleteClass,
    ObjectId,
}