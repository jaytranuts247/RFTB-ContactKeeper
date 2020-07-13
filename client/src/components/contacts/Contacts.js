import React, { Fragment, useContext, useEffect } from "react";
// import { Transition } from "react-spring/renderprops";
import Spinner from "../layout/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = (props) => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>;
	}
	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<AnimatePresence>
					{filtered !== null
						? filtered.map((contact) => (
								<motion.div
									positionTransition
									key={contact._id}
									animate={{ opacity: 1 }}
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
								>
									<ContactItem contact={contact} />
								</motion.div>
						  ))
						: contacts.map((contact) => (
								<motion.div
									positionTransition
									key={contact._id}
									animate={{ opacity: 1 }}
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
								>
									<ContactItem contact={contact} />
								</motion.div>
						  ))}
				</AnimatePresence>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;

/*

{filtered !== null
				? filtered.map((contact) => <ContactItem contact={contact} />)
				: contacts.map((contact) => <ContactItem contact={contact} />)}

*/

/*
<Transition
				items={filtered}
				from={{ opacity: 0 }}
				enter={{ opacity: 1 }}
				leave={{ opacity: 0 }}
			>
				{(filtered) =>
					filtered !== null
						? (props) => (
								<Transition
									items={filtered}
									keys={(item) => item.id}
									from={{ opacity: 0 }}
									enter={{ opacity: 1 }}
									leave={{ opacity: 0 }}
								>
									{(item) => (props) => (
										<ContactItem style={props} contact={item} />
									)}
								</Transition>
						  )
						: (props) => (
								<Transition
									items={contacts}
									keys={(item) => item.id}
									from={{ opacity: 0 }}
									enter={{ opacity: 1 }}
									leave={{ opacity: 0 }}
								>
									{(item) => (props) => (
										<ContactItem style={props} contact={item} />
									)}
								</Transition>
						  )
				}
			</Transition>
*/
