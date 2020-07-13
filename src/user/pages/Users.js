import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
	const USERS = [
		{
			id: "u1",
			name: "Alexis Castellanos",
			image:
				"https://vignette.wikia.nocookie.net/catscratch/images/0/03/Gomez.png/revision/latest?cb=20180104165830",
			places: 3,
		},
	];

	return <UsersList items={USERS} />;
};
export default Users;
