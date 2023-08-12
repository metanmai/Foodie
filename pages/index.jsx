import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import AddButton from "../components/AddButton";
import { useState } from "react";
import Add from "../components/Add";

export default function Home({ productList, admin }) {
	const [close, setClose] = useState(true);
	return (
		<div className={styles.container}>
			<Head>
				<title>FoodDe</title>
				<meta name="description" content="Online Food Ordering Website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Featured />
			{admin && <AddButton setClose={setClose} />}
			<ProductList productList={productList} />
			{!close && <Add setClose={setClose} />}
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || "";
	let admin = false;
	if (myCookie.token === process.env.NEXT_PUBLIC_TOKEN) {
		admin = true;
	}
	const test = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`
	);
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
	);

	return {
		props: {
			productList: res.data,
			admin,
		},
	};
};
