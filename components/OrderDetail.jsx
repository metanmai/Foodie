import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
	const [customer, setCustomer] = useState("");
	const [address, setAddress] = useState("");

	const handleClick = () => {
		createOrder({ customer, address, total, method: 0 });
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1
					className={styles.title}
				>{`You will pay ₹${total} after delivery.`}</h1>
				<div className={styles.item}>
					<label className={styles.label}>Name</label>
					<input
						type="text"
						className={styles.input}
						onChange={(e) => setCustomer(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Phone Number</label>
					<input type="text" className={styles.input} />
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Address</label>
					<textarea
						rows={5}
						type="text"
						className={styles.textarea}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<button className={styles.button} onClick={handleClick}>
					Order
				</button>
			</div>
		</div>
	);
};

export default OrderDetail;
