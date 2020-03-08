import React from "react";

export const Filter = props => (
	<div className="filter-wrap">
		<div className="filter-text">
			<input
				type="text"
				placeholder="Search query"
				onInput={ev => props.handlers.setFilterField("search", ev.target.value)}
			></input>
			<button onClick={() => props.handlers.handleFilter()}>Search</button>
		</div>
		<div>
			<div className="filter-sort">
				Search by
				<div>
					<button
						onClick={() => props.handlers.setFilterField("searchBy", "title")}
						className={props.payload.filter.searchBy === "title" ? "btn-active" : null}
					>
						Title
					</button>
					<button
						onClick={() => props.handlers.setFilterField("searchBy", "genres")}
						className={props.payload.filter.searchBy === "genres" ? "btn-active" : null}
					>
						Genres
					</button>
				</div>
			</div>
			<div className="filter-sort">
				Sort by
				<div>
					<button
						onClick={() => props.handlers.setFilterField("sortBy", "release_date")}
						className={props.payload.filter.sortBy === "release_date" ? "btn-active" : null}
					>
						Release date
					</button>
					<button
						onClick={() => props.handlers.setFilterField("sortBy", "vote_average")}
						className={props.payload.filter.sortBy === "vote_average" ? "btn-active" : null}
					>
						Rating
					</button>
				</div>
			</div>
		</div>
		<div>Movies found: {props.payload.total}</div>
	</div>
);

export default Filter;
