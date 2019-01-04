import React from 'react'
import {withRouter} from 'react-router-dom'

@withRouter
class RtcFirebase extends React.Component{

  constructor(props){
    super(props)
    if (!this.props.location.hash) {
      this.props.history.push(`#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`) 
    }
    // Generate random room name if needed

  // Room name needs to be prefixed with 'observable-'
     const roomHash = this.props.location.hash.substring(1);
     

      this.config={
        apiKey: "AIzaSyAQp-SLmDH-t85Cjjm0GsYTXy3ICSESoEk",
        authDomain: "webrtc-server-63859.firebaseapp.com",
        databaseURL: "https://webrtc-server-63859.firebaseio.com",
        projectId: "webrtc-server-63859",
        storageBucket: "webrtc-server-63859.appspot.com",
        messagingSenderId: "500122117041"
      }
      this.servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'beaver','username': 'webrtc.websitebeaver@gmail.com'}]};
      this.database=undefined
      this.yourVidel=undefined
      this.friendsVideo=undefined
      this.yourId=roomHash
      this.receiverId = this.yourId.split('_')[1]
      this.yourId=this.yourId.split('_')[0]
      this.pc = undefined
      window.firebase.initializeApp(this.config);
      this.showFriendsFace=this.showFriendsFace.bind(this)
      this.readMessage=this.readMessage.bind(this)
      this.showMyFace=this.showMyFace.bind(this)
      this.sendMessage=this.sendMessage.bind(this)
  }
  readMessage(data) {
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    var receiver = data.val().receiver
    if (sender != this.yourId && receiver==this.yourId) {
        if (msg.ice != undefined)
            this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        else if (msg.sdp.type == "offer")
            this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
              .then(() => this.pc.createAnswer())
              .then(answer => this.pc.setLocalDescription(answer))
              .then(() => this.sendMessage(this.receiverId,this.yourId, JSON.stringify({'sdp': this.pc.localDescription})));
        else if (msg.sdp.type == "answer")
            this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
};
  showMyFace() {
    console.log(navigator)
  navigator.mediaDevices.getUserMedia({audio:true, video:true})
    .then(stream => this.yourVideo.srcObject = stream)
    .catch(()=>{alert('device error')})
    .then(stream => this.pc.addStream(stream))
    .catch(()=>{alert('device error')})
  }
  showFriendsFace() {
  this.pc.createOffer()
    .then(offer => this.pc.setLocalDescription(offer) )
    .then(() => this.sendMessage(this.receiverId, this.yourId, JSON.stringify({'sdp': this.pc.localDescription})) );
  }

  sendMessage(receiverId, senderId, data) {
    var msg = this.database.push({ receiver:receiverId, sender: senderId, message: data });
    msg.remove();
  }
 componentDidMount(){

    this.database = window.firebase.database().ref();
    this.yourVideo = document.getElementById("localVideo");
    this.friendsVideo = document.getElementById("remoteVideo");
    //this.yourId = Math.floor(Math.random()*1000000000);
    this.pc=new RTCPeerConnection(this.servers)
    this.pc.onicecandidate = (event => event.candidate?this.sendMessage(this.receiverId, this.yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
    this.pc.onaddstream = (event => this.friendsVideo.srcObject = event.stream);
    this.database.on('child_added', this.readMessage);
}
	render(){
		return(
			<div className='video-area'>
				<video className="_localVideo" id="localVideo" autoPlay playsinline muted></video>
        <video className="_remoteVideo" id="remoteVideo" autoPlay playsinline></video>
        <button onClick={this.showFriendsFace} type="button" className="btn btn-primary btn-lg">Call</button>
        <button onClick={this.showMyFace} type="button" className="btn btn-primary btn-lg">onpe mine</button>
			</div>
		)
	}
}

export default RtcFirebase