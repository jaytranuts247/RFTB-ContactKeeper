import React, { Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = (props) => {
	return (
		<Fragment>
			{props.contacts.map((contact) => (
				<ContactItem key={contact.id} contact={contact} />
			))}
		</Fragment>
	);
};

export default Contacts;
