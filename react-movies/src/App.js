import React, { Component } from "react";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: {
				searchBy: null,
				sortBy: null,
				search: "",
				sortOrder: "desc"
			},
			data: [],
			total: 0,
			loaded: false
		};
		this.setFilterField = this.setFilterField.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	render() {
		return (
			<div className="App">
				<Filter
					payload={{ total: this.state.total, filter: this.state.filter }}
					handlers={{
						setFilterField: this.setFilterField,
						handleFilter: this.handleFilter
					}}
				></Filter>
				<MovieList loaded={this.state.loaded} data={this.state.data}></MovieList>
			</div>
		);
	}

	getQueryString(params) {
		var esc = encodeURIComponent;
		return Object.keys(params)
			.map(k => esc(k) + "=" + esc(params[k]))
			.join("&");
	}

	async getMovies() {
		this.setState({ loaded: false });
		const temp = await (
			await fetch(`https://reactjs-cdp.herokuapp.com/movies?${this.getQueryString(this.state.filter)}`)
		).json();
		this.setState({ ...temp, loaded: true });
	}

	async componentDidMount() {
		this.getMovies();
	}

	setFilterField(field, newValue) {
		const value = this.state.filter[field] === newValue ? null : newValue;
		this.setState({ filter: { ...this.state.filter, [field]: value } });
	}

	handleFilter() {
		this.getMovies();
	}
}

export default App;
