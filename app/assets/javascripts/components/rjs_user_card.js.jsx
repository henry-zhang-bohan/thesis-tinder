var UserCard = React.createClass({
	render: function () {
		return (
			<div className="card">
				<div className="card-block">
					<h4 className="card-title">{this.props.title}</h4>
					<h6 className="card-subtitle text-muted">{this.props.subtitle}</h6>
				</div>
				<img alt={this.props.title} src={this.props.imageURL}
				style={{ width: "100%", height: 200, objectFit: "cover" }} />
				<div className="card-block">
					<p className="card-text">{this.props.text}</p>
					<a href={this.props.link} className="card-link" target="_blank">Link</a>
				</div>
			</div>
		);
	}
});