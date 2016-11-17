var ThesisTinder = React.createClass({
	getInitialState: function () {
		return {
			users: []
		};
	},
	componentDidMount: function () {
		var self = this;
		$.ajax({
			method: "GET",
			url: this.props.getLink,
			dataType: "json",
			data: { identity: this.props.identity }
		})
		.done(function (data) {
			self.setState({
				users: data
			});
		});
	},
	likeHandler: function (index) {
		var clonedUsers = this.state.users.slice();
		clonedUsers[index].like = true;
		var self = this;
		$.ajax({
			method: "GET",
			url: "/like",
			dataType: "json",
			data: {
				id: self.state.users[index].id,
				identity: self.props.identity
			}
		})
		.done(function (data) {
			self.setState({
				users: clonedUsers
			});
			if (data.match == true) {
				bootbox.alert({
					title: "It's a Match!",
					message: data.message
				});
			}
		});
	},
	dislikeHandler: function (index) {
		var clonedUsers = this.state.users.slice();
		clonedUsers[index].like = false;
		var self = this;
		$.ajax({
			method: "GET",
			url: "/dislike",
			dataType: "json",
			data: {
				id: self.state.users[index].id,
				identity: self.props.identity
			}
		})
		.done(function (data) {
			if (data.success == true) {
				self.setState({
					users: clonedUsers
				});
			}
		});
	},
	render: function () {
		var user_cards = [];
		for (var i = 0; i < this.state.users.length; i++) {
			var user = this.state.users[i];
			user_cards.push(
				<div className="col-md-4" key={user.identifier}>
					<UserCard title={user.first_name + " " + user.last_name}
					subtitle={user.department}
					link={user.link}
					imageURL={user.photo}
					text={user.bio}
					skill_tags={user.skill}
					keyword_tags={user.keyword}
					identifier={user.identifier}
					index={i}
					like={user.like}
					onlike={this.likeHandler}
					dislike={this.dislikeHandler} />
				</div>
			);
		}
		return (
			<div className="container">
				<div style={{ paddingTop: 100 }}></div>
				<div className="row">{user_cards}</div>
			</div>
		);
	}
});