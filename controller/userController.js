const { admin, db } = require('../firebaseConfigLOL');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng có email tương ứng
        const usersRef = db.collection('taikhoan');
        const snapshot = await usersRef.where('email', '==', email).get();

        if (snapshot.empty) {
            return res.status(404).send('User not found');
        }

        let user = null;
        snapshot.forEach(doc => {
            user = doc.data();
        });

        // Kiểm tra mật khẩu
        if (user && user.password === password) {
            // Đăng nhập thành công
            res.status(200).send('Login successful');
        } else {
            // Sai mật khẩu
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        res.status(500).send(`Error logging in: ${error.message}`);
    }
};


exports.register = async (req, res) => {
    const { email, hoten, matkhau, sdt } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const usersRef = db.collection('taikhoan');
        const snapshot = await usersRef.where('email', '==', email).get();

        if (!snapshot.empty) {
            return res.status(400).send('Email already exists');
        }

        // Thêm người dùng mới vào Firestore
        const result = await usersRef.add({ email, hoten, matkhau, sdt });
        res.status(201).send(`User added with ID: ${result.id}`);
    } catch (error) {
        res.status(400).send(`Error registering user: ${error.message}`);
    }
};