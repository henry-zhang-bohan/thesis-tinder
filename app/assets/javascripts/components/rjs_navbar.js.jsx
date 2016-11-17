var ThesisTinderNavbar = React.createClass({
	render: function () {
		return (
			<nav className="navbar navbar-fixed-top navbar-light bg-faded">
				<div className="container">
					<a className="navbar-brand"><b className="text-muted">Teza</b></a>
					<ul className="nav navbar-nav float-xs-right">
						<li className="nav-item">
							<a className="nav-link" href="/">HOME</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href={this.props.profileLink}>PROFILE</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/logout">LOGOUT</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
});