var UserCard = React.createClass({
	getInitialState: function () {
		return {
			detail: "Show Details",
			expanded: false,
			display: "none"
		};
	},
	detailHandler: function (e) {
		if (this.state.expanded === false) {
			this.setState({
				detail: "Hide Details",
				expanded: true,
				display: "block"
			});
		}
		else {
			this.setState({
				detail: "Show Details",
				expanded: false,
				display: "none"
			});
		}
		e.preventDefault();
		e.target.blur();
	},
	likeHandler: function (e) {
		if ((this.props.onlike !== undefined && this.props.identifier !== undefined) && this.props.like === false) {
			this.props.onlike(this.props.index);
		}
		else if ((this.props.onlike !== undefined && this.props.identifier !== undefined) && this.props.like === true) {
			this.props.dislike(this.props.index);
		}
	},
	render: function () {
		var skill_tags = [];
		for (var i = 0; i < this.props.skill_tags.length; i++) {
			skill_tags.push(<ThesisTinderTag text={this.props.skill_tags[i]} canremove="false" key={this.props.skill_tags[i]} />);
		}
		var keyword_tags = [];
		for (var i = 0; i < this.props.keyword_tags.length; i++) {
			keyword_tags.push(<ThesisTinderTag text={this.props.keyword_tags[i]} canremove="false" key={this.props.keyword_tags[i]} color="rgb(210,210,210)" />);
		}
		if (this.props.like !== undefined && this.props.like == true) {
			var heart_class = "float-xs-right tt-heart-liked";
		}
		else {
			var heart_class = "float-xs-right tt-heart";
		}
		return (
			<div className="card">
				<div className="card-block">
					<h4 className="card-title">{this.props.title}</h4>
					<h6 className="card-subtitle text-muted">{this.props.subtitle}</h6>
				</div>
				<img alt={this.props.title} src={this.props.imageURL}
				style={{ width: "100%", height: 200, objectFit: "cover" }} />
				<div className="card-block">
					<p className="card-text" style={{ height: "6rem", overflow: "hidden" }}>{this.props.text}</p>
					<hr />
					<div className="card-text" style={{ display: this.state.display, margin: 0 }}>{keyword_tags}<hr />{skill_tags}<hr /></div>
					<a href={this.props.link} className="card-link" target="_blank">Link</a>
					<a href="#" className="card-link" onClick={this.detailHandler}>{this.state.detail}</a>
					<span className={heart_class} onClick={this.likeHandler}>♥</span>
				</div>
			</div>
		);
	}
});