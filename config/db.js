const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://" +
			process.env.DB_USER_PASS +
			"@cluster0.067i7.mongodb.net/bacefook",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((e) => console.log("Failed to Connect to MongoDB", e));
