import React, { useContext, useEffect } from "react";
import _ from "lodash";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";
// import PropTypes from "prop-types";

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, user } = authContext;

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<div className="grid-2" style={{ margin: "0 auto" }}>
			<div>
				<ContactForm />
			</div>
			<div>
				{user && (
					<div>
						<h2 className="text-primary">{`${_.upperFirst(
							user.name
						)}'s Contacts`}</h2>
					</div>
				)}
				<ContactFilter />
				<Contacts />
			</div>
		</div>
	);
};

export default Home;
