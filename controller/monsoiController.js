const {admin, db} = require('../firebaseConfigLOL');

exports.getAllMonSoi = async (req, res) => {
    try {
        const snapshot = await db.collection('mon soi').get();
        let monsoi = [];
        snapshot.forEach(doc => {
            monsoi.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.status(200).send(monsoi);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

 exports.getMonSoiById = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const doc = await db.collection('mon soi').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Mon soi not found');
        }
        res.status(200).send({
            id: doc.id,
            data: doc.data()
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.addMonSoi = async (req, res) => {
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);
    try {
        const result = await db.collection('mon soi').add({ ten, gia, mota, hinhanh });
        res.status(201).send(`Mon soi added with ID: ${result.id}`);
    } catch (error) {
        res.status(400).send(`Error adding mon soi: ${error.message}`);
    }
}

exports.updateMonSoi = async (req, res) => {
    const { id } = req.params;
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);
    if (!ten || !gia || !mota || !hinhanh) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await db.collection('mon soi').doc(id).set({ ten, gia, mota, hinhanh });
        res.status(200).send(`Mon soi with ID: ${id} updated`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.deleteMonSoi = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('mon soi').doc(id).delete();
        res.status(200).send(`Mon soi with ID: ${id} deleted`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}