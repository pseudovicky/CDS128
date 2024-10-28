let localStream;
let remoteStream;
let peerConnection;
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

async function startCall() {
  // Access the user's webcam
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById('localVideo').srcObject = localStream;

  // Initialize the peer connection
  peerConnection = new RTCPeerConnection(configuration);

  // Add local stream tracks to the peer connection
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  // Set up remote stream to play on the `remoteVideo` element
  peerConnection.ontrack = event => {
    if (!remoteStream) {
      remoteStream = new MediaStream();
      document.getElementById('remoteVideo').srcObject = remoteStream;
    }
    remoteStream.addTrack(event.track);
  };

  // Create an offer to start the peer connection
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // This is where you would send the offer to a signaling server and wait for an answer.
  // For now, we're just logging it for testing purposes.
  console.log('Offer:', offer);
}

function endCall() {
  peerConnection.close();
  localStream.getTracks().forEach(track => track.stop());
  document.getElementById('localVideo').srcObject = null;
  document.getElementById('remoteVideo').srcObject = null;
   
}