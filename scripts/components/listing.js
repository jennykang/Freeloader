var React = require('react');
var { Panel }  = require('react-bootstrap');

module.exports = React.createClass({
	render: function() {
		var elems = this.props.data.map((e) => {
			var title = <h1> { e.title } </h1>
			var footer = <span> footer </span>
			return (
				<Panel header={title} footer={footer}>
					Panel content
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
