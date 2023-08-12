import React, { useState } from "react";
import styles from "../styles/Cart.module.css";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Head from "next/head";

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [cash, setCash] = useState(false);

	const createOrder = async (data) => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
				data
			);

			if (res.status === 201) {
				dispatch(reset());
				router.push(`/orders/${res.data._id}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleCheckout = () => {
		setOpen(false);
		createOrder({
			customer: "John Doe",
			address: "PES University,BSK 3rd Stage",
			total: cart.total,
			method: 1,
		});
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Cart | FoodDe</title>
			</Head>
			<div className={styles.left}>
				<table className={styles.table}>
					<thead>
						<tr className={styles.trTitle}>
							<th>Product</th>
							<th>Name</th>
							<th>Extras</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{cart.products.map((product) => (
							<tr
								className={styles.tr}
								key={`${product._id}${Math.random() * 10}}`}
							>
								<td
									className={styles.imgContainer}
									style={{ textAlign: "center" }}
								>
									<Image
										src={product.img}
										layout="fill"
										objectFit="cover"
										alt=""
									/>
								</td>
								<td className={styles.name} style={{ textAlign: "center" }}>
									{product.title}
								</td>
								<td className={styles.extras} style={{ textAlign: "center" }}>
									{product.extras.map((extra) => (
										<span key={extra}>{extra},</span>
									))}
								</td>
								<td className={styles.price} style={{ textAlign: "center" }}>
									₹{product.price}
								</td>
								<td className={styles.quantity} style={{ textAlign: "center" }}>
									{product.quantity}
								</td>
								<td className={styles.total} style={{ textAlign: "center" }}>
									₹{product.quantity * product.price}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Subtotal:</b>₹{cart.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>₹0
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Total:</b>₹{cart.total}
					</div>
					{open ? (
						<button className={styles.payButton} onClick={() => setCash(true)}>
							CASH ON DELIVERY
						</button>
					) : (
						<button className={styles.button} onClick={() => setOpen(true)}>
							CHECKOUT NOW!
						</button>
					)}
				</div>
			</div>
			{cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
		</div>
	);
};

export default Cart;
