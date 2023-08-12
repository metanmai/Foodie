import React from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>THE BEST PLACE FOR THE BEST FOOD</h1>
			<p className={styles.desc}>
				Fulfill your comfort food cravings. <br /> Where every flavor tells a
				story.
				<br />
				Fun.Fast.Tasty.Delicious.
			</p>
			<div className={styles.wrapper}>
				{productList.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductList;
