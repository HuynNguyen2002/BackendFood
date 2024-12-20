const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const apiRoutes = require('./routes/api');

const app = express();

// Cấu hình CORS
app.use(cors({
  origin: "http://localhost:3000", // Cho phép nguồn từ frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
  credentials: true, // Cho phép gửi cookie và header xác thực
}));

// Middleware để xử lý JSON
app.use(bodyParser.json());

// Sử dụng các routes API
app.use('/api', apiRoutes);

// Bắt đầu server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
