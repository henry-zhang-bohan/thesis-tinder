var ThesisTinderFileInput = React.createClass({
	updateHandler: function (e) {
		var self = this;
		if (e.target.files && e.target.files[0]) {
			console.log(e.target.files[0]);
			var reader = new FileReader();
			reader.onload = function (event) {
				self.props.onchange(event.target.result);
			};
			reader.readAsDataURL(e.target.files[0]);
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
				<input type="file" className={input_class} onChange={this.updateHandler} name={this.props.data.name} />
				<div className="form-control-feedback"><small>{this.props.data.message}</small></div>
			</div>
		);
	}
});