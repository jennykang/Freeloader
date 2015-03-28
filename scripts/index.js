var React = window.React = require('react');
var Bootstrap = require('react-bootstrap');

var Immutable = require('immutable');

var ListingView = require('./components/listing');

var Parse = require('parse').Parse;

Parse.initialize("YzTovlpCemH5MQyxGSHrKD46Y0Nfk2bnRa8q3fh1", "CtWhDYoUpcLqEI40DAESdCCjSWqvmUDavbPbKAPD");

var ListingObject = Parse.Object.extend("Listing");
var ListingQuery = new Parse.Query(ListingObject);

class NavBar extends React.Component {
	render() {
		var logo = <img src="../images/logolong.gif"/>
		return (
			<Bootstrap.Navbar toggleNavKey={3} brand={logo} inverse>
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
	constructor(props) {
		super(props);
		this.state = Immutable.Map({
			login: false, loading: false, listings: undefined, error: null
		});
	}
	updateData() {
		ListingQuery.find().then((items) => {
			alert('got back listings!');
			console.log('got back listings:', items);
			var state = this.state;
			this.setState(state.set('listings', items));
		}, (ex) => {
			console.log('got back error:', ex);
			var state = this.state;
			this.setState(state.set('error', ex));
		});
	}
	componentWillMount() {
		this.updateData();
	}
	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<ListingView data={data} />
				</div>
			</div>
		);
	}
}

React.render(<App />, document.body);
