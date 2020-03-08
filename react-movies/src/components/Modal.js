import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payload: {
				genres: []
			},
			loaded: false,
			redirect: false,
			success: false
		};
		document.addEventListener("click", ev => {
			if (!ev.path.map(el => el.tagName).includes("ASIDE")) this.setState({ redirect: true });
		});
	}

	async componentDidMount() {
		const payload = this.props.payload
			? this.props.payload
			: await (await fetch(`https://reactjs-cdp.herokuapp.com/movies/${this.props.id}`)).json();
		this.setState({ payload, loaded: true, success: JSON.stringify({}) !== JSON.stringify(payload) });
	}

	componentWillUnmount() {
		document.removeEventListener("click", () => {
			/**/
		});
	}

	render() {
		return this.state.redirect ? (
			<Redirect to="/"></Redirect>
		) : (
			<div className="modal-wrap">
				<aside
					id="modalBody"
					className="modal-body"
					style={{
						backgroundImage: `url(${this.state.payload.poster_path})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat"
					}}
				>
					<div className="modal-content">
						{!this.state.loaded ? (
							<h2>Loading...</h2>
						) : this.state.success ? (
							<>
								<h2>{this.state.payload.title}</h2>
								<div>{this.state.payload.genres.join(" & ")}</div>
								<div>{this.state.payload.overview}</div>
								<div>Popularity: {this.state.payload.vote_average}</div>
								<div>Budget: {this.state.payload.budget}$</div>
							</>
						) : (
							<h2>404, Movie not found</h2>
						)}
					</div>
				</aside>
			</div>
		);
	}
}

export default Modal;
