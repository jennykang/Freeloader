var React = require('react');

module.exports = React.createClass({
	render: function() {
		var elems = [];
		this.props.data.forEach((e) => {
			elems.push(<div>Hello</div>);
		});

		return (
			<div>
				{elems}
			</div>
		);
	}
});
