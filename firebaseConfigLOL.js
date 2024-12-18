const admin = require('firebase-admin');

let app;

if (admin.apps.length === 0) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://appfood-c7bf3.firebaseio.com' // Thay thế bằng URL cơ sở dữ liệu của bạn
  });
} else {
  app = admin.app(); // Sử dụng ứng dụng Firebase mặc định đã tồn tại
}

const db = admin.firestore();

module.exports = { admin, db };