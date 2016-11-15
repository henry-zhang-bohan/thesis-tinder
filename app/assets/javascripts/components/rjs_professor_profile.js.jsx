var ProfessorProfile = React.createClass({
	getInitialState: function () {
		return {
			email: {
				content: "",
				label: "Email",
				status: "",
				message: ""
			},
			professor: {
				id: "1"
			}
		};
	},
	componentDidMount: function () {
		var self = this;
		$.ajax({
			method: "GET",
			url: "/get_professor_info",
			dataType: "json",
			data: { id: this.state.professor.id }
		}).
		done(function (data) {
			var validate_email = self.validateEmail(data["email"]);
			self.setState({
				email: {
					content: data["email"],
					label: "Email",
					status: validate_email[0],
					message: validate_email[1]
				}
			});
		});
	},
	validateEmail: function (email) {
		// test if contains @ character
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
		var self = this;
		$.ajax({
			method: "GET",
			url: "/update_professor_info",
			dataType: "json",
			data: { id: self.state.professor.id, email: email }
		})
		.done(function (data) {
			self.setState({
				email: {
					content: email,
					label: "Email",
					status: validate_email[0],
					message: validate_email[1]
				}
			});
		});
	},
	render: function () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<ThesisTinderInput data={this.state.email} onchange={this.updateEmail} />
					</div>
					<div className="col-md-3"></div>
				</div>
			</div>
		);
	}
});