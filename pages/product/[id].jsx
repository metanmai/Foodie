import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Head from "next/head";

const Product = ({ product }) => {
	const [price, setPrice] = useState(product.price);
	const [extras, setExtras] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const changePrice = (num) => {
		setPrice(price + num);
	};
	const handleChange = (e, option) => {
		const checked = e.target.checked;

		if (checked) {
			changePrice(option.price);
			setExtras([...extras, option.text]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter((item) => item !== option.text));
		}
	};

	const handleAddToCart = () => {
		dispatch(addProduct({ ...product, extras, price, quantity }));
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{product.title} | FoodDe</title>
			</Head>
			<div className={styles.left}>
				<div className={styles.imgContainer}>
					<Image src={product.img} objectFit="contain" layout="fill" alt="" />
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{product.title}</h1>
				<span className={styles.price}>₹{price}</span>
				<p className={styles.desc}>{product.desc}</p>
				{product.extraOptions.length ? (
					<h3 className={styles.choose}>Choose additional ingredients</h3>
				) : (
					<></>
				)}
				<div className={styles.ingredients}>
					{product.extraOptions.map((option) => (
						<div className={styles.option} key={option._id}>
							<input
								type="checkbox"
								id={option.text}
								name={option.text}
								className={styles.checkbox}
								onChange={(e) => handleChange(e, option)}
							/>
							<label htmlFor="double">{option.text}</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<input
						type="number"
						defaultValue={1}
						className={styles.quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<button className={styles.button} onClick={handleAddToCart}>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`
	);

	return {
		props: {
			product: res.data,
		},
	};
};

export default Product;
