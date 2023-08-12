import Image from "next/image";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div className={styles.callButton}>
					<Image
						src="/img/telephone.png"
						alt="phone icon"
						width="32"
						height="32"
					/>
				</div>
				<div className={styles.texts}>
					<div className={styles.text}>ORDER NOW!</div>
					<div className={styles.text}>0123456789</div>
				</div>
			</div>
			<div className={styles.item}>
				<ul className={styles.list}>
					<Link href="/">
						<li className={styles.listItem}>Homepage</li>
					</Link>
					<Link href="/">
						<li className={styles.listItem}>Products</li>
					</Link>
					<Link href="/admin">
						<li className={styles.listItem}>Admin</li>
					</Link>
				</ul>
			</div>
			<div className={styles.item}>
				<Link href="/cart" passHref>
					<div className={styles.cart}>
						<Image
							src="/img/cart.png"
							alt="cart icon"
							width="30px"
							height="30px"
						/>
						<div className={styles.counter}>{quantity}</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
