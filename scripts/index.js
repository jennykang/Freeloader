var React = require('react');
var Bootstrap = require('react-bootstrap');

// var ParseReact = require('parse-react');
var Parse = require('parse').Parse;

Parse.initialize("YzTovlpCemH5MQyxGSHrKD46Y0Nfk2bnRa8q3fh1", "CtWhDYoUpcLqEI40DAESdCCjSWqvmUDavbPbKAPD");

class NavBar extends React.Component {
	render() {
		return (
			<Bootstrap.Navbar brand='FreeLoader'>
			<Bootstrap.Nav>
				<Bootstrap.NavItem eventKey={1} href='#'>
					<Bootstrap.Glyphicon glyph='record' /> Find</Bootstrap.NavItem>

				<Bootstrap.NavItem eventKey={2} href='#'>
					<Bootstrap.Glyphicon glyph='plus' /> Publish</Bootstrap.NavItem>

			</Bootstrap.Nav>
			</Bootstrap.Navbar>
		);
	}
}

class FindView extends React.Component {
	render() {
		return (
			<div></div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<NavBar />
		);
	}
}

React.render(<App />, document.body);
