import React from "react";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
			</div>
			<div className={styles.item}>
				<div className={styles.card}>
					<h2 className={styles.motto}>Foodie, THE BEST RESTAURANT.</h2>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
					<p className={styles.text}>
						1234 BSK 3rd Stage.
						<br /> Bengaluru, 580062
						<br /> 987654321
					</p>
					<p className={styles.text}>
						2356 Jaynagar.
						<br /> Bengaluru, 580065
						<br /> 987654321
					</p>
					<p className={styles.text}>
						1614 Charminar road.
						<br /> Hyderabad, 650072
						<br /> 987654321
					</p>
					<p className={styles.text}>
						7890 IIT Bombay road.
						<br /> Mumbai, 780092
						<br /> 987654321
					</p>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>WORKING HOURS</h1>
					<p className={styles.text}>
						MONDAY UNTIL FRIDAY
						<br /> 9:00AM – 10:00PM
					</p>
					<p className={styles.text}>
						SATURDAY - SUNDAY
						<br /> 12:00PM – 12:00AM
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
