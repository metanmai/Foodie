import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddButton from "../../components/AddButton";
import Add from "../../components/Add";

const Index = ({ orders, products }) => {
	const [productList, setProductList] = useState(products);
	const [orderList, setOrderList] = useState(orders);
	const status = ["preparing", "on the way", "delivered"];
	const [close, setClose] = useState(true);

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
			);
			setProductList(productList.filter((pizza) => pizza._id !== id));
		} catch (err) {
			console.log(err);
		}
	};

	const handleEdit = async (id) => {};

	const handleStatus = async (id) => {
		const item = orderList.filter((order) => order._id === id)[0];
		const currentStatus = item.status;

		try {
			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`,
				{
					status: currentStatus + 1,
				}
			);
			setOrderList([
				res.data,
				...orderList.filter((order) => order._id !== id),
			]);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Admin | FoodDe</title>
			</Head>

			<div className={styles.item}>
				<AddButton setClose={setClose}></AddButton>
				<h1 className={styles.title}>Products</h1>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Image</th>
							<th>Id</th>
							<th>Title</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</tbody>
					{productList.map((product) => (
						<tbody key={product._id}>
							<tr className={styles.trTitle}>
								<td>
									<Image
										src={product.img}
										width={50}
										height={50}
										objectFit="cover"
										alt=""
									/>
								</td>
								<td>{product._id.slice(0, 5)}...</td>
								<td>{product.title}</td>
								<td>₹{product.price}</td>
								<td>
									{/* <button
										className={styles.button}
										onClick={() => handleEdit(product._id)}
									>
										Edit
									</button> */}
									<button
										className={styles.button}
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className={styles.item}>
				<h1 className={styles.title}>Orders</h1>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Id</th>
							<th>Customer</th>
							<th>Total</th>
							<th>Payment</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</tbody>
					{orderList.map((order) => (
						<tbody key={order._id}>
							<tr className={styles.trTitle}>
								<td>{order._id.slice(0, 5)}...</td>
								<td>{order.customer}</td>
								<td>${order.total}</td>
								<td>
									{order.method === 0 ? <span>cash</span> : <span>paid</span>}
								</td>
								<td>{status[order.status]}</td>
								<td>
									<button onClick={() => handleStatus(order._id)}>
										Next Stage
									</button>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			{!close && <Add setClose={setClose} />}
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || "";

	if (myCookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
		return {
			redirect: {
				destination: "/admin/login",
				permanent: false,
			},
		};
	}

	const productRes = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
	);
	const orderRes = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`
	);

	return {
		props: {
			orders: orderRes.data,
			products: productRes.data,
		},
	};
};

export default Index;
