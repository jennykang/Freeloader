var React = require('react');
var { Panel, Button }  = require('react-bootstrap');

var uuid = require('node-uuid');

var Moment = require('moment');
var dummyImgSrc = 'http://cdn.shopify.com/s/files/1/0228/4239/collections/placeholder_large.jpg';
module.exports = React.createClass({
	getInitialState: function() {
		return { record: false };
	},
	onListing: function(l) {
		this.props.onListing(l);
	},
	componentWillMount: function() {
		this.MODERATOR_CHANNEL_ID = 'freeloader'; // channel-id
		this.MODERATOR_SESSION_ID = 'listing-' + this.props.data.id;    // room-id
		this.MODERATOR_ID         = 'listing-admin-' + this.props.id;    // user-id
		this.MODERATOR_SESSION    = {         // media-type
			audio: true,
			video: true
		};
		this.MODERATOR_EXTRA      = {};       // empty extra-data
	},
	participate: function() {
		var participants = new RTCMultiConnection(this.MODERATOR_CHANNEL_ID);
		participants.join({
			sessionid: this.MODERATOR_SESSION_ID,
			userid:    this.MODERATOR_ID,
			extra:     this.MODERATOR_EXTRA,
			session:   { video: false, audio: false }
		});

		this.setState({ record: true });
		console.log('started to participate!');
		participants.onstream = (event) => {
			// got local or remote stream
			// if(event.type == 'remote') {}
			if(event.type == 'remote')  {

				console.log('got back stream!!', event);
				this.setState({ src: event.blobURL });
				document.getElementById('video-elem').appendChild(event.mediaElement);
				// this.setState({ src: URL.createObjectURL(event.stream) });
			}

			// or YOUR_VIDEO.src = event.blobURL;
			// or YOUR_VIDEO.src = URL.createObjectURL(event.stream);
		};
	},
	record: function() {
		var moderator     = new RTCMultiConnection(this.MODERATOR_CHANNEL_ID);
		moderator.session = this.MODERATOR_SESSION;
		moderator.userid  = this.MODERATOR_ID;
		moderator.extra   = this.MODERATOR_EXTRA;
		moderator.open({
			dontTransmit: true,
			sessionid   : this.MODERATOR_SESSION_ID
		});

		this.setState({ record: true });
		moderator.onstreamid = (event) => {
			// got a clue of incoming remote stream
			// didn't get remote stream yet

			var incoming_stream_id = event.streamid;
		};

		moderator.onstream = (event) => {
			// got local or remote stream
			// if(event.type == 'remote') {}
			if(event.type == 'local')  {

				console.log('got back stream!!', event);
				this.setState({ src: event.blobURL });
				document.getElementById('video-elem').appendChild(event.mediaElement);
				// this.setState({ src: URL.createObjectURL(event.stream) });
			}

			// or YOUR_VIDEO.src = event.blobURL;
			// or YOUR_VIDEO.src = URL.createObjectURL(event.stream);
		};
	},
	render: function() {
		if (!this.props.data) {
			return <div> loading ... </div>
		}
		var e = this.props.data;
		var date =  'Happening ' + Moment(e.start).fromNow();
		// var imgSrc = dummyImgSrc;
		var imgSrc = e.image ? e.image.url() : dummyImgSrc;
		var title = <h1> { e.title } </h1>;
		var footer = <span> { date } </span>
		var videoElem = null;
		if (this.state.record) {
			videoElem = (
				<span id="video-elem" />
			);
		}
		else {
			videoElem = (
				<div>
				<Button bsStyle='info' onClick={this.participate.bind(this)}>Participate</Button>
				<Button bsStyle='success' onClick={this.record.bind(this)}>Record</Button>
				</div>
			);
		}

		return (
			<Panel header={title} footer={footer} style={
				{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '70%'}
			}>
				<img src={imgSrc} style={ { width: '100%' } } />
				<div>{ e.description }</div>
				{ videoElem }
			</Panel>
		);
	}
});
