import app from "./app.js";
import logger from "./config/logger.config.js";

// env variables
const PORT = process.env.PORT || 8009;

app.listen(PORT, () => {
	logger.info(`Server is listening at ${PORT}`);
});
