const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the .env file
const envFile = process.env.NODE_ENV === 'production' ? '../.env.production' : '../.env.local';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

const app = express();

app.use(cors());
app.use(express.json());

const subscriptionRoutes = require('./routes/subscriptions');
const bulkCreateRoutes = require('./routes/subscriptions/bulkCreate');

app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/subscriptions', bulkCreateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
