import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.config.js";

// env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8009;

// exit on mongodb error
mongoose.connection.on("error", (err) => {
	logger.error(`Mongodb connection error : ${err}`);
	process.exit(1);
});

// mongodb debug mode
if (process.env.NODE_ENV !== "production") {
	mongoose.set("debug", true);
}

// mongodb connection
mongoose.connect(DATABASE_URL, {
	//useNewUrlParser: true,
	//useUnifiedTopology: true
}).then(() => {
	logger.info("Connected to Mongodb.")
});


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
