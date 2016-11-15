var ThesisTinderInput = React.createClass({
	updateHandler: function (e) {
		var data = e.target.value;
		this.props.onchange(data);
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
				<input type="text" className={input_class} value={this.props.data.content} onChange={this.updateHandler} />
				<div className="form-control-feedback"><small>{this.props.data.message}</small></div>
			</div>
		);
	}
});