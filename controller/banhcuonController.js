const { admin, db } = require('../firebaseConfigLOL');

exports.getAllBanhCuon = async (req, res) => {
    try {
        const snapshot = await db.collection('banhcuon').get();
        let banhcuon = [];
        snapshot.forEach(doc => {
            banhcuon.push(doc.data());
        });
        res.status(200).send(banhcuon);
    } catch (error) {
        res.status(500).send(`Error getting banh cuon: ${error.message}`);
    }
}

exports.addBanhCuon = async (req, res) => {
    try {
        const banhcuon = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        };
        const result = await db.collection('banhcuon').add(banhcuon);
        res.status(201).send(`Banh cuon added with ID: ${result.id}`);
    }
    catch (error) {
        res.status(400).send(`Error adding banh cuon: ${error.message}`);
    }
}

exports.updateBanhCuon = async (req, res) => {
    const id = req.params.id;
    console.log("ID bánh cuốn:", id);

    try {
        // Kiểm tra sự tồn tại của tài liệu với ID cụ thể
        const docRef = db.collection('banhcuon').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send('Banh cuon not found');
        }

        // Tạo đối tượng bánh cuốn mới từ dữ liệu yêu cầu
        const banhcuon = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        };

        // Thực hiện cập nhật tài liệu
        await docRef.set(banhcuon, { merge: true });
        res.status(200).send(`Banh cuon updated with ID: ${id}`);
    } catch (error) {
        res.status(400).send(`Error updating banh cuon: ${error.message}`);
    }
};

exports.deleteBanhCuon = async (req, res) => {
    const id = req.params.id;
    console.log("ID bánh cuốn:", id);
    try {
        // Kiểm tra sự tồn tại của tài liệu với ID cụ thể
        const docRef = db.collection('banhcuon').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send('Banh cuon not found');
        }

        // Thực hiện xóa tài liệu
        await docRef.delete();
        res.status(200).send(`Banh cuon deleted with ID: ${id}`);
    } catch (error) {
        res.status(400).send(`Error deleting banh cuon: ${error.message}`);
    }
}

exports.getBanhCuonById = async (req, res) => {
    const id = req.params.id;
    console.log("ID bánh cuốn:", id);
    try {
        // Kiểm tra sự tồn tại của tài liệu với ID cụ thể
        const docRef = db.collection('banhcuon').doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).send('Banh cuon not found');
        }
        res.status(200).send(doc.data());
    }
    catch (error) {
        res.status(400).send(`Error getting banh cuon: ${error.message}`);
    }
};