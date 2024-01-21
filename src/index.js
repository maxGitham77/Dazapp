import app from "./app.js";
import logger from "./config/logger.config.js";

// env variables
const PORT = process.env.PORT || 8009;

let server;

server = app.listen(PORT, () => {
	logger.info(`Server is listening at ${PORT}`);
	//throw new Error("error in server");
	console.log("process id", process.pid);
});

// handle server errors
const exitHandler = () => {
	if (server) {
		logger.info("Server closed.");
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledrejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
	if (server) {
		logger.info("Server closed.");
		process.exit(1);
	}
});
