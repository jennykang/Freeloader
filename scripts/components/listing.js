var React = require('react');

module.exports = React.createClass({
	render: function() {
		var elems = this.props.data.map((e) => { return  (<h3>e.title </h3>); });
		return (
			<div>
				{elems}
			</div>
		);
	}
});
