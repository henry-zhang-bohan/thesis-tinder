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
			department: {
				content: "",
				label: "Department",
				status: "",
				message: "",
				name: "department",
				autocompleteURL: "/autocomplete_department"
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
			photo: {
				content: "",
				label: "Photo",
				status: "",
				message: "",
				name: "photo"
			},
			skill: {
				content: "",
				label: "Skill",
				status: "",
				message: "",
				name: "skill",
				tags: []
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
			var validate_department = self.validateDepartment(data["department"], data["department_list"])
			var validate_link = self.validateLink(data["link"]);
			var validate_bio = self.validateBio(data["bio"]);
			var validate_photo = self.validatePhoto(data["photo"]);
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
				department: {
					content: data["department"],
					label: "Department",
					status: validate_department[0],
					message: validate_department[1],
					name: "department",
					autocompleteURL: "/autocomplete_department",
					list: data["department_list"]
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
				},
				photo: {
					content: data["photo"],
					label: "Photo",
					status: validate_photo[0],
					message: validate_photo[1],
					name: "photo"
				},
				skill: {
					content: "",
					label: "Skill",
					status: "",
					message: self.props.type === "professor" ? "What skills do you expect from your research assistants?" : "Demonstrate your skill set to impress professors.",
					name: "skill",
					tags: data["skill"]
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
	validateDepartment: function (department, department_list) {
		if (department_list.indexOf(department) !== -1) {
			var status = "success";
			var message = department + " sounds like home.";
		}
		else if (department.length === 0 || /^[a-zA-Z ]+$/g.test(department) === false) {
			var status = "danger";
			var message = "Please input a valid department name.";
		}
		else {
			var status = "warning";
			var message = "Attention: you are creating a new department called \"" + department + "\"";
		}
		return [status, message];
	},
	updateDepartment: function (department) {
		var validate_department = this.validateDepartment(department, this.state.department.list);
		this.setState({
			department: {
				content: department,
				label: "Department",
				status: validate_department[0],
				message: validate_department[1],
				name: "department",
				autocompleteURL: "/autocomplete_department",
				list: this.state.department.list
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
	validatePhoto: function (photo) {
		if (photo.length === 0) {
			var status = "";
			var message = "Upload an image to show who you are.";
		}
		else {
			var status = "success";
			var message = "Your photo looks good.";
		}
		return [status, message];
	},
	updatePhoto: function (photo) {
		var validate_photo = this.validatePhoto(photo);
		this.setState({
			photo: {
				content: photo,
				label: "Photo",
				status: validate_photo[0],
				message: validate_photo[1],
				name: "photo"
			}
		});
	},
	updateSkill: function (skill) {
		var self = this;
		if (skill.length === 0) {
			this.setState({
				skill: {
					content: skill,
					label: "Skill",
					status: "",
					message: this.props.type === "professor" ? "What skills do you expect from your research assistants?" : "Demonstrate your skill set to impress professors.",
					name: "skill",
					tags: this.state.skill.tags
				}
			});
		}
		else if (this.state.skill.tags.indexOf(skill) !== -1) {
			this.setState({
				skill: {
					content: skill,
					label: "Skill",
					status: "danger",
					message: "\"" + String(skill) + "\" is already in your skill set.",
					name: "skill",
					tags: this.state.skill.tags
				}
			});
		}
		else {
			$.ajax({
				method: "GET",
				url: "/check_skill",
				dataType: "json",
				data: { skill: skill }
			})
			.done(function (data) {
				if (data["existing"] === "yes") {
					self.setState({
						skill: {
							content: skill,
							label: "Skill",
							status: "success",
							message: "\"" + String(skill) + "\" is good to have!",
							name: "skill",
							tags: self.state.skill.tags
						}
					});
				}
				else if (data["existing"] === "no") {
					self.setState({
						skill: {
							content: skill,
							label: "Skill",
							status: "warning",
							message: "Attention: you are creating a new skill \"" + String(skill) + "\".",
							name: "skill",
							tags: self.state.skill.tags
						}
					});
				}
			});
		}
	},
	addSkill: function (skill) {
		if (this.state.skill.tags.indexOf(skill) !== -1) { return; }
		var new_tags = this.state.skill.tags;
		new_tags.push(skill);
		this.setState({
			skill: {
				content: "",
				label: "Skill",
				status: "",
				message: this.props.type === "professor" ? "What skills do you expect from your research assistants?" : "Demonstrate your skill set to impress professors.",
				name: "skill",
				tags: new_tags
			}
		});
	},
	removeSkill: function (skill) {
		var new_tags = this.state.skill.tags;
		new_tags.splice(new_tags.indexOf(skill), 1)
		this.setState({
			skill: {
				content: this.state.skill.content,
				label: "Skill",
				status: this.state.skill.status,
				message: this.state.skill.message,
				name: "skill",
				tags: new_tags
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
							<ThesisTinderInput data={this.state.department} onchange={this.updateDepartment} autocompleteURL={this.state.department.autocompleteURL} />
							<ThesisTinderInput data={this.state.link} onchange={this.updateLink} />
							<ThesisTinderTextarea data={this.state.bio} onchange={this.updateBio} />
							<ThesisTinderFileInput data={this.state.photo} onchange={this.updatePhoto} />
							<hr />
							<ThesisTinderTagInput data={this.state.skill} onchange={this.updateSkill} onadd={this.addSkill} onremove={this.removeSkill} autocompleteURL="/autocomplete_skill" />
							<div style={{ textAlign: "right" }}>
								<button type="submit" className="btn btn-secondary">Update</button>
							</div>
						</form>
						<br />
					</div>
					<div className="col-md-4">
						<UserCard title={this.state.first_name.content + " " + this.state.last_name.content}
						subtitle={this.state.department.content} link={this.state.link.content}
						imageURL={this.state.photo.content}
						text={this.state.bio.content}
						skill_tags={this.state.skill.tags} />
					</div>
					<div className="col-md-1"></div>
				</div>
			</div>
		);
	}
});