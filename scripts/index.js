var React = window.React = require('react');
var Bootstrap = require('react-bootstrap');

var Listing = require('./components/listing');

window.Parse = require('parse').Parse;
// var ParseReact = require('parse-react/src/ParseReact');

Parse.initialize("YzTovlpCemH5MQyxGSHrKD46Y0Nfk2bnRa8q3fh1", "CtWhDYoUpcLqEI40DAESdCCjSWqvmUDavbPbKAPD");

class NavBar extends React.Component {
	render() {
		var logo = <img src="../images/logolong.gif"/>
		return (
			<Bootstrap.Navbar toggleNavKey={3} brand={logo}>
			<Bootstrap.Nav eventKey={3}>
				<Bootstrap.NavItem eventKey={1} href='#' active>
					<Bootstrap.Glyphicon glyph='record' /> Find</Bootstrap.NavItem>

				<Bootstrap.NavItem eventKey={2} href='#'>
					<Bootstrap.Glyphicon glyph='plus' /> Publish</Bootstrap.NavItem>

				
			</Bootstrap.Nav>
			</Bootstrap.Navbar>
		);
	}
}

var data = [
	{title: 'sample test', active: true, description: 'asdf asd fasdf asd fasd'},
	{title: 'sample test', active: true, description: 'asdf asd fasdf asd fasd'},
	{title: 'sample test', active: true, description: 'asdf asd fasdf asd fasd'},
	{title: 'sample test', active: true, description: 'asdf asd fasdf asd fasd'},
];

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<Listing data={data} />
				</div>
			</div>
		);
	}
}

React.render(<App />, document.body);
