module.exports = {
	type: "mongodb",
	url: process.env.MONGODB_URI,
	useUnifiedTopology: true,
	useNewUrlParser: true,
	ssl: true,
	synchronize: true,
	logging: true,
	entities: ["src/entity/*.*"],
};
