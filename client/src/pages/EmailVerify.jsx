import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { emailVerifyRoute } from "../utils/ApiRoutes";



const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			console.log("hello");
			console.log(param.id, param.token);
			
			try {
				const url = `${emailVerifyRoute}/${param.id}/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<div>
			{validUrl ? (
				<div className="">
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className=" bg-green-500">Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);
};

export default EmailVerify;