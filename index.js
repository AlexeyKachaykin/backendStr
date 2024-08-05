const express = require('express');
const dotenv = require('dotenv');
const { validateEnv } = require('./src/utils/envValidator');
const { connectDB } = require('./src/data-access/database');
const logger = require('./src/utils/logger');
const routes = require('./src/routes');
const { errorHandler } = require('./src/middleware/errorHandler');

dotenv.config();

validateEnv();

const app = express();

app.use(express.json());
app.use(logger.requestLogger);

app.use('/', routes);

app.use(errorHandler);

const server = app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = { app, server };