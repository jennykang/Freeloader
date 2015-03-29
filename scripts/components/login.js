var React = require('react');
var { Panel, Jumbotron, Button }  = require('react-bootstrap');

var Moment = require('moment');
var dummyImgSrc = 'http://cdn.shopify.com/s/files/1/0228/4239/collections/placeholder_large.jpg';
module.exports = React.createClass({
	render: function() {

		return (
			<Jumbotron>
				<h1>Hello, Freeloaders!</h1>
				<p><Button bsStyle='primary'>Learn more</Button></p>
			</Jumbotron>
		);
	}
});
