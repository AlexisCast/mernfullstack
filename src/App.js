import React, {useState, useCallback} from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
// import "./App.css";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from './user/pages/Auth';
import {AuthContext} from './shared/context/auth-context';

const App=()=>{
	const [isLoggedIn,setIsLoogedIn]=useState(false);

	const login=useCallback(()=>{
		setIsLoogedIn(true);
	},[]);

	const logout=useCallback(()=>{
		setIsLoogedIn(false);
	},[]);
	
	let routes;
	if(isLoggedIn){
		routes=(
			routes=(
				<Switch>
					<Route path="/" exact component={Users} />
					<Route path="/:userId/places" exact component={UserPlaces} />
					<Route path="/auth" exact component={Auth} />
					<Route path="/places/new" exact component={NewPlace} />
					<Route path="/places/:placeId" exact component={UpdatePlace} />
					<Redirect to="/" />
				</Switch>
			)
		);
	}else{
		routes=(
			<Switch>
				<Route path="/" exact component={Users} />
				<Route path="/:userId/places" exact component={UserPlaces} />
				<Route path="/auth" exact component={Auth} />
				<Redirect to="/auth" />
			</Switch>
		)
	}

	return (
		<AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}>
			<Router>
				<MainNavigation />
				<main>
					
						{routes}
						{/*<Switch>
						<Route path="/" exact component={Users} />
						<Route path="/:userId/places" exact component={UserPlaces} />
						<Route path="/places/new" exact component={NewPlace} />
						<Route path="/places/:placeId" exact component={UpdatePlace} />
						<Route path="/auth" exact component={Auth} />
						<Redirect to="/" /> 
						</Switch>*/}
					
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
