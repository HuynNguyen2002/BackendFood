const {admin, db} = require('../firebaseConfigLOL');

exports.getAllHaisan = async (req, res) => {
    try {
        const snapshot = await db.collection('haisan').get();
        let haisan = [];
        snapshot.forEach(doc => {
            haisan.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.status(200).send({
            message: "Success",
            data: haisan
        });
        
    } catch (error) {
        console.error('Error getting documents: ', error);
        res.status(500).send('Error getting documents');
    }
}

exports.getHaisanById = async (req, res) => {
    const id = req.params.id;
    console.log("Getting haisan with id: ", id);
    try {
        const docRef = db.collection('haisan').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).send('Haisan not found');
        }
        res.status(200).send({
            message: "Success",
            data: doc.data()
        });
    } catch (error) {
        console.error('Error getting document: ', error);
        res.status(500).send('Error getting document');
    }
}

exports.addHaisan = async (req, res) => {
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);
    try {
        const result = await db.collection('haisan').add({ ten, gia, mota, hinhanh });
        res.status(201).send(`Haisan added with ID: ${result.id}`);
    } catch (error) {
        res.status(400).send(`Error adding haisan: ${error.message}`);
    }
}

exports.updateHaisan = async (req, res) => {
    const { id } = req.params;
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);
    if (!ten || !gia || !mota || !hinhanh) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await db.collection('haisan').doc(id).set({ ten, gia, mota, hinhanh });
        res.status(200).send(`Haisan with ID: ${id} updated`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.deleteHaisan = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting haisan with id: ", id);

    try {
        await db.collection('haisan').doc(id).delete();
        res.status(200).send(`Haisan with ID: ${id} deleted`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}