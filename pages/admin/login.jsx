import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
				username,
				password,
			});
			router.push("/admin");
		} catch (err) {
			setError(true);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Admin | FoodDe</title>
			</Head>
			<div className={styles.wrapper}>
				<h1>Admin Dashboard</h1>
				<input
					placeholder="username"
					className={styles.input}
					onChange={(e) => setUsername(e.target.value)}
					id="admin-uname"
				/>
				<input
					placeholder="password"
					type="password"
					className={styles.input}
					onChange={(e) => setPassword(e.target.value)}
					id="admin-pass"
				/>
				<button
					onClick={handleClick}
					className={styles.button}
					id="admin-signin-button"
				>
					Sign In
				</button>
				{error && (
					<span className={styles.error} id="admin-login-error">
						Wrong Credentials!
					</span>
				)}
			</div>
		</div>
	);
};

export default Login;
