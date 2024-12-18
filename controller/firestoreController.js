const admin = require('firebase-admin');

// Khởi tạo Firebase Admin SDK
const serviceAccount = require('../utils/firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://appfood-c7bf3.firebaseio.com' // Thay thế bằng URL cơ sở dữ liệu của bạn
});

const db = admin.firestore();

exports.addDocument = async (req, res) => {
  try {
    const data = req.body;
    const result = await db.collection('your-collection-name').add(data);
    res.status(201).send(`Document added with ID: ${result.id}`);
  } catch (error) {
    res.status(400).send(`Error adding document: ${error.message}`);
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const snapshot = await db.collection('LOL').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error getting documents: ${error.message}`);
  }
};