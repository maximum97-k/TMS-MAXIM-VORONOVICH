import React from "react";

export const MovieCard = props => {
	const releaseYear = props.payload.release_date.split("-")[0];
	const genres = props.payload.genres.join(" & ");
	return (
		<div className="card-wrap">
			<img src={props.payload.poster_path} alt="poster"></img>
			<div>{props.payload.title}</div>
			<div className="card-year">{releaseYear}</div>
			<div className="genres">{genres}</div>
		</div>
	);
};

export default MovieCard;
