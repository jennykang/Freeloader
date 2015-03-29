var React = require('react');
var { Panel }  = require('react-bootstrap');

var Moment = require('moment');
var dummyImgSrc = 'http://cdn.shopify.com/s/files/1/0228/4239/collections/placeholder_large.jpg';
module.exports = React.createClass({
	onListing: function(l) {
		this.props.onListing(l);
	},
	render: function() {
		if (!this.props.data) {
			return <div> loading ... </div>
		}

		var elems = this.props.data.map((e) => {
			var date =  'Happening ' + Moment(e.start).fromNow();
			date = active ? 'Happening Now!!' : date;
			// var imgSrc = dummyImgSrc;
			var active = e.active;
			var imgSrc = e.image ? e.image.url() : dummyImgSrc;
			var title = <h1> { e.title } </h1>;
			var footer = <span> { date } </span>;
			return (
				<Panel
					header={title}
					footer={footer}
					bsStyle={ active ? 'success' : '' }

					style={
					{
						marginRight: 'auto', marginLeft: 'auto', maxWidth: '70%',
						cursor: 'pointer',
					}
				} onClick= {() => this.props.onListing(e) }>
					<img src={imgSrc} style={ { width: '100%' } } />
					<div>{ e.description }</div>
				</Panel>
			);
		});

		return (
			<div>
				{elems}
			</div>
		);
	}
});
