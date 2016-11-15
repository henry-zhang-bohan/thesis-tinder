var UserProfile = React.createClass({
	getInitialState: function () {
		return {
			email: {
				content: "",
				label: "Email",
				status: "",
				message: "",
				name: "email"
			},
			first_name: {
				content: "",
				label: "First Name",
				status: "",
				message: "",
				name: "first_name"
			},
			last_name: {
				content: "",
				label: "Last Name",
				status: "",
				message: "",
				name: "last_name"
			},
			link: {
				content: "",
				label: "Link",
				status: "",
				message: "",
				name: "link"
			},
			bio: {
				content: "",
				label: "Bio",
				status: "",
				message: "",
				name: "bio"
			},
			user: {
				id: this.props.id
			},
			token: $("meta[name=csrf-token]").attr("content")
		};
	},
	componentDidMount: function () {
		var self = this;
		$.ajax({
			method: "GET",
			url: this.props.getAction,
			dataType: "json",
			data: { id: this.state.user.id }
		}).
		done(function (data) {
			var validate_email = self.validateEmail(data["email"]);
			var validate_first_name = self.validateName(data["first_name"], "first name");
			var validate_last_name = self.validateName(data["last_name"], "last name");
			var validate_link = self.validateLink(data["link"]);
			var validate_bio = self.validateBio(data["bio"]);
			self.setState({
				email: {
					content: data["email"],
					label: "Email",
					status: validate_email[0],
					message: validate_email[1],
					name: "email"
				},
				first_name: {
					content: data["first_name"],
					label: "First Name",
					status: validate_first_name[0],
					message: validate_first_name[1],
					name: "first_name"
				},
				last_name: {
					content: data["last_name"],
					label: "Last Name",
					status: validate_last_name[0],
					message: validate_last_name[1],
					name: "last_name"
				},
				link: {
					content: data["link"],
					label: "Link",
					status: validate_link[0],
					message: validate_link[1],
					name: "link"
				},
				bio: {
					content: data["bio"],
					label: "Bio",
					status: validate_bio[0],
					message: validate_bio[1],
					name: "bio"
				}
			});
		});
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
	validateName: function (name, type) {
		if (name.length > 0) {
			var status = "success";
			var message = "Your " + type + " looks good.";
		}
		else {
			var status = "danger";
			var message = "Please input a valid " + type + "."
		}
		return [status, message];
	},
	updateFirstName: function (name) {
		var validate_name = this.validateName(name, "first name");
		this.setState({
			first_name: {
				content: name,
				label: "First Name",
				status: validate_name[0],
				message: validate_name[1],
				name: "first_name"
			}
		});
	},
	updateLastName: function (name) {
		var validate_name = this.validateName(name, "last name");
		this.setState({
			last_name: {
				content: name,
				label: "Last Name",
				status: validate_name[0],
				message: validate_name[1],
				name: "last_name"
			}
		});
	},
	validateLink: function (link) {
		if (link.length === 0) {
			var status = "";
			var message = "Please include a link to your personal website / LinkedIn profile.";
		}
		else {
			var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
			if (urlregex.test(link)) {
				var status = "success";
				var message = "Your link looks good.";
			}
			else {
				var status = "danger";
				var message = "Please input a valid link starting with http:// or https://";
			}
		}
		return [status, message];
	},
	updateLink: function (link) {
		var validate_link = this.validateLink(link);
		this.setState({
			link: {
				content: link,
				label: "Link",
				status: validate_link[0],
				message: validate_link[1],
				name: "link"
			}
		});
	},
	validateBio: function (bio) {
		if (bio.length === 0) {
			var status = "";
			var message = "Please include a concise bio to describe your research interests.";
		}
		else {
			if (bio.length > 250) {
				var status = "danger";
				var message = "Your bio is way too long (" + String(bio.length) + "/250)";
			}
			else if (bio.length > 150) {
				var status = "warning";
				var message = "Consider making your bio more concise. (" + String(bio.length) + "/250)";
			}
			else {
				var status = "success";
				var message = "Your bio looks good. (" + String(bio.length) + "/250)";
			}
		}
		return [status, message];
	},
	updateBio: function (bio) {
		var validate_bio = this.validateBio(bio);
		this.setState({
			bio: {
				content: bio,
				label: "Bio",
				status: validate_bio[0],
				message: validate_bio[1],
				name: "bio"
			}
		});
	},
	render: function () {
		return (
			<div className="container">
				<div style={{ paddingTop: 50 }}></div>
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-6">
						<form encType="multipart/form-data" action={this.props.updateAction} method="post">
							<input type="hidden" name="authenticity_token" value={this.state.token} />
							<input type="hidden" name="id" value={this.state.user.id} />
							<ThesisTinderInput data={this.state.email} onchange={this.updateEmail} />
							<ThesisTinderInput data={this.state.first_name} onchange={this.updateFirstName} />
							<ThesisTinderInput data={this.state.last_name} onchange={this.updateLastName} />
							<ThesisTinderInput data={this.state.link} onchange={this.updateLink} />
							<ThesisTinderTextarea data={this.state.bio} onchange={this.updateBio} />
							<div style={{ textAlign: "right" }}>
								<button type="submit" className="btn btn-secondary">Update</button>
							</div>
						</form>
						<br />
					</div>
					<div className="col-md-4">
						<UserCard title={this.state.first_name.content + " " + this.state.last_name.content}
						subtitle="Engineering Science" link={this.state.link.content}
						imageURL="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAbxAAAAJDYzMThmMGI5LWFiNTItNGEwZC1hMTM5LWZhOWM4YmRjMWI3Nw.jpg"
						text={this.state.bio.content} />
					</div>
					<div className="col-md-1"></div>
				</div>
			</div>
		);
	}
});