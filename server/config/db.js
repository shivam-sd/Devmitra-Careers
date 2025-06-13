const mongoose = require("mongoose");

// console.log("Connecting to MongoDB..." , process.env.MONGODB_URL);

const ConnectTODB = () => {
	mongoose
		.connect(process.env.MONGODB_URL)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};

module.exports = ConnectTODB;