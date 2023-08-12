import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
	const {
		method,
		query: { id },
		cookies,
	} = req;
	const token = cookies.token;
	dbConnect();

	if (method === "GET") {
		try {
			const products = await Product.findById(id);
			res.status(200).json(products);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (method === "PUT") {
		if (!token || token !== process.env.NEXT_PUBLIC_TOKEN) {
			return res.status(401).send("Not Authenticated");
		}
		try {
			const product = await Product.create(req.body);
			res.status(201).json(product);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (method === "DELETE") {
		if (!token || token !== process.env.NEXT_PUBLIC_TOKEN) {
			return res.status(401).send("Not Authenticated");
		}
		try {
			await Product.findByIdAndDelete(id);
			return res.status(200).send("Deleted successfully");
		} catch (err) {
			return res.status(500).send("Api error");
		}
	}
}
