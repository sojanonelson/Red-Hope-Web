const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bloodRoutes = require('./routes/blood');
const paymentRoutes = require('./routes/payment');
const appointmentRoutes = require('./routes/appoinment');
const userRoutes = require('./routes/user')
const serviceRoutes = require('./routes/service')
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/service', serviceRoutes);


// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('notify-donor', (data) => {
    io.emit(`donor-${data.donorId}`, { message: 'New appointment request' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
const HOST = "192.168.120.30";
const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

