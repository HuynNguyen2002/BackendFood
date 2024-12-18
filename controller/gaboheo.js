const {admin, db} = require('../firebaseConfigLOL');

exports.getAllGaboHeo = async (req, res) => {
    try {
        const snapshot = await db.collection('gaboheo').get();
        const gaboheo = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            gaboheo.push(data);
        });
        return res.status(200).json(gaboheo);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.getGaboHeoById = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await db.collection('gaboheo').doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({message: 'Gabo heo not found'});
        }
        return res.status(200).json(doc.data());
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.createGaboHeo = async (req, res) => {
    const { ten, gia, mota, hinhanh } = req.body;
    console.log(req.body);

    try {
        const result = await db.collection('gaboheo').add({ ten, gia, mota, hinhanh });
        return res.status(201).json(`Gabo heo added with ID: ${result.id}`);
    } catch (error) {
        return res.status(400).json(`Error adding gabo heo: ${error.message}`);
    }
}

exports.updateGaboHeo = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, price, description, image} = req.body;
        const updateGaboHeo = {
            name,
            price,
            description,
            image
        };
        await db.collection('gaboheo').doc(id).update(                                       );
        const doc = await db.collection('gaboheo').doc(id).get();
        return res.status(200).json({
            id: doc.id,
            data: doc.data()
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.deleteGaboHeo = async (req, res) => {
    try {
        const id = req.params.id;
        await db.collection('gaboheo').doc(id).delete();
        return res.status(200).json({message: 'Gabo heo deleted'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}