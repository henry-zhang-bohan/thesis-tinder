var ThesisTinderInput = React.createClass({
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
	keyPressHandler: function (e) {
		if (e.which == 13) {
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
		return (
			<div className={div_class}>
				<label className="form-control-label"><b>{this.props.data.label}</b></label>
				<input type="text" className={input_class} value={this.props.data.content} onChange={this.updateHandler} name={this.props.data.name} onKeyPress={this.keyPressHandler} ref="input" />
				<div className="form-control-feedback"><small>{this.props.data.message}</small></div>
			</div>
		);
	}
});