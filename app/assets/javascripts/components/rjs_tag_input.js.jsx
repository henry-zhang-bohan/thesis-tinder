var ThesisTinderTagInput = React.createClass({
	componentDidMount: function () {
		var self = this;
		if (this.props.autocompleteURL !== undefined && this.props.autocompleteURL !== null) {
			$(this.refs.input).autocomplete({
				source: this.props.autocompleteURL,
				select: function (e, ui) {
					self.props.onchange(ui.item.value);
				}
			});
		}
	},
	updateHandler: function (e) {
		var data = e.target.value;
		this.props.onchange(data);
	},
	addHandler: function (e) {
		this.props.onadd(this.props.data.content);
	},
	keyPressHandler: function (e) {
		if (e.which == 13) {
			this.props.onadd(this.props.data.content);
			e.preventDefault();
		}
	},
	determineStatus: function (status) {
		if (status === "success") {
			var div_class = "form-group has-success";
			var input_class = "form-control form-control-success";
		}
		else if (status === "warning") {
			var div_class = "form-group has-warning";
			var input_class = "form-control form-control-warning";
		}
		else if (status === "danger") {
			var div_class = "form-group has-danger";
			var input_class = "form-control form-control-danger";
		}
		else {
			var div_class = "form-group";
			var input_class = "form-control";
		}
		return [div_class, input_class];
	},
	render: function () {
		var status = this.determineStatus(this.props.data.status);
		var div_class = status[0];
		var input_class = status[1];
		var tags = this.props.data.tags;
		var thesis_tinder_tags = [];
		for (var i = 0; i < tags.length; i ++) {
			thesis_tinder_tags.push(<ThesisTinderTag text={tags[i]} onremove={this.props.onremove} key={tags[i]} canremove="true" />);
		}
		return (
			<div className={div_class}>
				<div>{thesis_tinder_tags}</div>
				<div style={{ height: 10 }}></div>
				<div className="input-group">
					<input type="text" className={input_class} value={this.props.data.content} onChange={this.updateHandler} onKeyPress={this.keyPressHandler} ref="input" />
					<span className="input-group-btn">
						<button className="btn btn-secondary" type="button" onClick={this.addHandler}>{"Add " + this.props.data.label}</button>
					</span>
				</div>
				<div className="form-control-feedback"><small>{this.props.data.message}</small></div>
				<input type="hidden" value={this.props.data.tags} name={this.props.data.name} />
			</div>
		);
	}
});

var ThesisTinderTag = React.createClass({
	removeComponent: function (e) {
		this.props.onremove(this.props.text);
	},
	render: function () {
		if (this.props.canremove === "true") {
			return (
				<span className="tt-tag-container">
					<span className="tt-tag">
						<span className="tt-tag-text">{this.props.text}</span>
					</span>
					<span className="tt-tag-close" onClick={this.removeComponent}>×</span>
				</span>
			);
		}
		else {
			return (
				<span className="tt-tag-container">
					<span className="tt-tag no-close">
						<span className="tt-tag-text">{this.props.text}</span>
					</span>
				</span>
			);
		}
	}
});