const { admin, db } = require("../firebaseConfigLOL");

exports.addDish = async (req, res) => {
  try {
    const dish = req.body;
    console.log("Dish:", dish);

    // Kiểm tra dữ liệu đầu vào
    if (
      !dish.name ||
      !dish.description ||
      !dish.price ||
      !dish.imageUrl ||
      !dish.category
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Thêm thời gian tạo
    const newDish = {
      ...dish,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Thêm món ăn vào Firestore và lấy doc ID
    const docRef = await db.collection("dishes").add(newDish);
    console.log("Dish added with ID: ", docRef.id); // Kiểm tra ID trả về từ Firestore

    // Kiểm tra số lượng món ăn trong Firestore
    const dishesSnapshot = await db.collection("dishes").get();
    const totalDishes = dishesSnapshot.size;

    // Trả về phản hồi có chứa ID của tài liệu mới và tổng số món ăn
    return res.status(201).json({
      message: "Dish created successfully.",
      dish: { ...newDish, id: docRef.id }, // Thêm id vào kết quả
      totalDishes: totalDishes, // Trả về tổng số món ăn đã được thêm vào Firestore
    });
  } catch (error) {
    console.error("Error creating dish:", error);
    return res
      .status(500)
      .json({ error: `Error creating dish: ${error.message}` }); // Return error in JSON format
  }
};


exports.updateDish = async (req, res) => {
  try {
    const { id } = req.params; // Get the dish ID from URL parameters
    const updatedDishData = req.body; // Get updated dish data from the request body

    // Kiểm tra dữ liệu đầu vào
    if (
      !updatedDishData.name ||
      !updatedDishData.description ||
      !updatedDishData.price ||
      !updatedDishData.imageUrl ||
      !updatedDishData.category
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Lấy món ăn hiện tại từ Firestore
    const dishRef = db.collection("dishes").doc(id);
    const dishSnapshot = await dishRef.get();

    if (!dishSnapshot.exists) {
      return res.status(404).json({ error: "Dish not found." });
    }

    // Cập nhật thời gian sửa đổi
    const updatedDish = {
      ...updatedDishData,
      updatedAt: new Date().toISOString(), // Set updated time
    };

    // Cập nhật món ăn trong Firestore
    await dishRef.update(updatedDish);

    return res
      .status(200)
      .json({ message: "Dish updated successfully.", dish: updatedDish }); // Send JSON response with updated data
  } catch (error) {
    console.error("Error updating dish:", error);
    return res
      .status(500)
      .json({ error: `Error updating dish: ${error.message}` }); // Return error in JSON format
  }
};

exports.deleteDish = async (req, res) => {
    try {
        const { id } = req.params; // Get the dish ID from URL parameters
        const dishRef = db.collection("dishes").doc(id); // Get the document reference
        const dishSnapshot = await dishRef.get(); // Get the document snapshot
        
        if (!dishSnapshot.exists) {
            return res.status(404).json({ error: "Dish not found." });
        }
        
        await dishRef.delete(); // Delete the document from Firestore
        
        return res.status(200).json({ message: "Dish deleted successfully." }); // Send JSON response with success message
    }
    catch (error) {
        console.error("Error deleting dish:", error);
        return res.status(500).json({ error: `Error deleting dish: ${error.message}` }); // Return error in JSON format
    }
}

exports.getDishes = async (req, res) => {
    try {
        const dishesRef = db.collection("dishes"); // Get the dishes collection reference
        const snapshot = await dishesRef.get(); // Get all documents in the collection

        const dishes = []; // Create an empty array to store dishes
        snapshot.forEach((doc) => {
            dishes.push({ id: doc.id, ...doc.data() }); // Add each document to the dishes array
        });
        return res.status(200).json(dishes); // Send JSON response with the dishes array
    }
    catch (error) {
        console.error("Error getting dishes:", error);
        return res.status(500).json({ error: `Error getting dishes: ${error.message}` }); // Return error in JSON format
    }
}


exports.getDishToday = async (req, res) => {
  try {
    const dishesTodayRef = db.collection("DishesToday"); // Get the DishesToday collection reference
    const snapshot = await dishesTodayRef.get(); // Get all documents in the collection

    const dishesToday = []; // Create an empty array to store dishes
    snapshot.forEach((doc) => {
      dishesToday.push({ id: doc.id, ...doc.data() }); // Add each document to the dishes array
    });

    return res.status(200).json(dishesToday); // Send JSON response with the dishes array
  } catch (error) {
    console.error("Error getting dishes today:", error);
    return res
      .status(500)
      .json({ error: `Error getting dishes today: ${error.message}` }); // Return error in JSON format
  }

}

exports.addDishToday = async (req, res) => {
  try {
    const { dishes } = req.body;
    console.log("Dish IDs:", dishes);

    if (!dishes || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).json({ error: "Dishes array is required." });
    }

    // Lấy thông tin các món ăn từ collection 'dishes' dựa trên các ID
    const dishDocs = await Promise.all(
      dishes.map((dishId) => db.collection("dishes").doc(dishId).get())
    );

    console.log("Dish docs:", dishDocs);

    // Kiểm tra xem tất cả các món ăn có tồn tại không
    const dishData = dishDocs.map((doc) => {
      if (!doc.exists) {
        throw new Error(`Dish with ID ${doc.id} not found.`);
      }
      return doc.data();
    });

    // Thêm tất cả thông tin các món ăn vào collection 'DishesToday'
    const batch = db.batch();
    dishData.forEach((dish) => {
      const docRef = db.collection("DishesToday").doc(); // Tạo tài liệu mới trong DishesToday
      batch.set(docRef, dish);
    });

    // Commit batch
    await batch.commit();

    return res.status(201).json({
      message: "Món ăn đã được thêm vào ngày hôm nay.",
      dishes: dishData, // Trả lại danh sách các món ăn đã thêm
    });
  } catch (error) {
    console.error("Error adding dishes today:", error);
    return res.status(500).json({ error: `Error adding dishes: ${error.message}` });
  }
};

exports.deleteDishToday = async (req, res) => {
  try {
    const { id } = req.params; // Get the dish ID from URL parameters
    const dishRef = db.collection("DishesToday").doc(id); // Get the document reference
    const dishSnapshot = await dishRef.get(); // Get the document snapshot

    if (!dishSnapshot.exists) {
      return res.status(404).json({ error: "Dish not found." });
    }

    await dishRef.delete(); // Delete the document from Firestore

    return res.status(200).json({ message: "Dish deleted successfully." }); // Send JSON response with success message
  } catch (error) {
    console.error("Error deleting dish:", error);
    return res
      .status(500)
      .json({ error: `Error deleting dish: ${error.message}` }); // Return error in JSON format
  }
}