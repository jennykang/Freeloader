var React = window.React = require('react');
var Bootstrap = require('react-bootstrap');

require('rtcmulticonnection-v3/RTCMultiConnection.js');

var Immutable = require('immutable');

var ListingView = require('./components/listings');
var Listing = require('./components/listing');
var LoginView = require('./components/login');

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

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: Immutable.Map({
				login: false, loading: false,
				location: undefined, listings: undefined,
				error: null, listing: null
			})
		}
	}

	updateData() {
		ListingQuery.find().then((items) => {
			var data = this.state.data;
			this.setState({ data: data.set('listings', items) });
		}, (ex) => {
			alert('something went wrong!');
			console.log('got back error:', ex);
			var data = this.state.data;
			this.setState({ data: data.set('error', ex) });
		});
	}

	componentWillMount() {
		this.updateData();
	}

	onListing(e) {
		console.log('slected a listing!:', e);
		this.setState({ data: this.state.data.set('listing', e) });
	}

	render() {
		var listings = this.state.data.get('listings');
		if (listings) {
			listings = listings.map((l) => {
				return {
					id: l.get('id'),
					title: l.get('title'),
					start: l.get('start'),
					end: l.get('end'),
					description: l.get('description'),
					active: l.get('active'),
					image: l.get('image'),
					_server: l
				};
			});
		}

		console.log('got back parsed listings:', listings);
		var body = null;
		var listing = this.state.data.get('listing');
		if (listing) {
			body = (
				<div className="container">
					<Listing data={listing} />
				</div>
			);
		}
		else {
			body = (
				<div className="container">
					<LoginView />
					<ListingView data={listings} onListing={this.onListing.bind(this)} />
				</div>
			);
		}
		return (
			<div>
				<NavBar />
				{ body }
			</div>
		);
	}
}

React.render(<App />, document.body);
