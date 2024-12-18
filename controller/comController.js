const {admin, db} = require('../firebaseConfigLOL');

exports.getAllCom = async (req, res) => {
    try {
        const snapshot = await db.collection('com').get();
        let com = [];
        snapshot.forEach(doc => {
            com.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.status(200).send(com);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.addCom = async (req, res) => {
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);
    try {
        const result = await db.collection('com').add({ ten, gia, mota, hinhanh });
        res.status(201).send(`Com added with ID: ${result.id}`);
    } catch (error) {
        res.status(400).send(`Error adding com: ${error.message}`);
    }
}

exports.getComById = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const doc = await db.collection('com').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Com not found');
        }
        res.status(200).send({
            id: doc.id,
            data: doc.data()
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.updateCom = async (req, res) => {
    const { id } = req.params;
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);
    if (!ten || !gia || !mota || !hinhanh) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await db.collection('com').doc(id).set({ ten, gia, mota, hinhanh });
        res.status(200).send(`Com with ID: ${id} updated`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.deleteCom = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting com with id: ", id);

    try {
        await db.collection('com').doc(id).delete();
        res.status(200).send(`Com with ID: ${id} deleted`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
