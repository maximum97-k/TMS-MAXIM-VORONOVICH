import React from "react";
import MovieCard from "./MovieCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modal from "./Modal";

export const MovieList = props =>
	!props.loaded ? (
		<div>Loading...</div>
	) : (
		<Router>
			<div className="list-container">
				<div className="list-wrap">
					{props.data.map((el, i) => (
						<Link key={i} to={`/film/${el.id}`}>
							<MovieCard payload={el} />
						</Link>
					))}
				</div>
			</div>
			<Switch>
				<Route
					path="/film/:id"
					render={({ match }) => (
						<Modal id={match.params.id} payload={props.data.find(el => el.id === +match.params.id)}></Modal>
					)}
				/>
			</Switch>
		</Router>
	);

export default MovieList;
