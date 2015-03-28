var React = window.React = require('react');
var Bootstrap = require('react-bootstrap');

window.Parse = require('parse').Parse;
var ParseReact = require('parse-react/src/ParseReact');

Parse.initialize("YzTovlpCemH5MQyxGSHrKD46Y0Nfk2bnRa8q3fh1", "CtWhDYoUpcLqEI40DAESdCCjSWqvmUDavbPbKAPD");

class NavBar extends React.Component {
	render() {
		return (
			<Bootstrap.Navbar brand='FreeLoader' >
			<Bootstrap.Nav>
				<Bootstrap.NavItem eventKey={1} href='#' active>
					<Bootstrap.Glyphicon glyph='record' /> Find</Bootstrap.NavItem>

				<Bootstrap.NavItem eventKey={2} href='#'>
					<Bootstrap.Glyphicon glyph='plus' /> Publish</Bootstrap.NavItem>

			</Bootstrap.Nav>
			</Bootstrap.Navbar>
		);
	}
}

class Listings extends React.Component {
	render() {
		return (
			<div>
				<h1> Listings ... </h1>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<Listings />
				</div>
			</div>
		);
	}
}

React.render(<App />, document.body);
