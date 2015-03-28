var React = require('react');
var { Panel }  = require('react-bootstrap');

var Moment = require('moment');

module.exports = React.createClass({
	render: function() {
		if (!this.props.data) {
			return <div> loading ... </div>
		}

		var elems = this.props.data.map((e) => {
			var title = <h1> { e.title } </h1>;
			var footer = <span> { Moment(e.start).fromNow() } </span>
			return (
				<Panel header={title} footer={footer}>
					{ e.description }
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
