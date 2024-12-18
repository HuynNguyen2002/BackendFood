const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.json());

// Sử dụng các routes API
app.use('/api', apiRoutes);

// Bắt đầu server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});