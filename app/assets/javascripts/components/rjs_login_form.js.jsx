var ThesisTinderLoginForm = React.createClass({
	getInitialState: function () {
		return {
			token: $("meta[name=csrf-token]").attr("content"),
			email: {
				content: "",
				label: "Email",
				status: "",
				message: "",
				name: "email"
			},
			identity: "Student"
		};	
	},
	validateEmail: function (email) {
		if (email.indexOf("@") !== -1) {
			if (email.indexOf("utoronto.ca") !== -1) {
				var status = "success";
				var message = "Your email address looks good.";
			}
			else {
				var status = "warning";
				var message = "You should use a utoronto.ca email address.";
			}
		}
		else {
			var status = "danger";
			var message = "Please input a valid email address.";
		}
		return [status, message];
	},
	updateEmail: function (email) {
		var validate_email = this.validateEmail(email);
		this.setState({
			email: {
				content: email,
				label: "Email",
				status: validate_email[0],
				message: validate_email[1],
				name: "email"
			}
		});
	},
	explainTeza: function (e) {
		bootbox.alert({
			title: "About Teza",
			message: "Teza matches students with professors to work on undergraduate research together. Developed @ <a href='https://www.utoronto.ca' target='_blank'>University of Toronto</a>."
		});
	},
	updateIdentity: function (e) {
		this.setState({ identity: e.target.value });
	},
	render: function () {
		var submit_button = this.state.email.status === "danger" ? <button type="submit" className="btn btn-secondary float-xs-right" disabled>Enter Teza</button> : <button type="submit" className="btn btn-secondary float-xs-right">Enter Teza</button>;
		return (
			<div className="container">
				<div style={{ paddingTop: 50 }}></div>
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<form action="/login_form" method="post">
							<input type="hidden" name="authenticity_token" value={this.state.token} />
							<ThesisTinderInput data={this.state.email} onchange={this.updateEmail} />
							<div className="form-group">
								<label className="form-control-label"><b>Identity</b></label>
								<select className="form-control" value={this.state.identity} name="identity" onChange={this.updateIdentity}>
									<option value="Student">Student</option>
									<option value="Professor">Professor</option>
								</select>
							</div>
							{submit_button}
							<button type="button" className="btn btn-link" onClick={this.explainTeza}>What is Teza?</button>
						</form>
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		);
	}
});