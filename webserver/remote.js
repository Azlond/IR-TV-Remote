var hashmap = {
	"remotePowerButton": "KEY_POWER",
	"remoteSourceButton": "KEY_SOURCE",
	"remoteMuteButton": "KEY_MUTE",
	"remoteSoundUpButton": "KEY_VOLUMEUP",
	"remoteSoundDownButton": "KEY_VOLUMEDOWN",
	"remoteNumber1Button": "KEY_1",
	"remoteNumber2Button": "KEY_2",
	"remoteNumber3Button": "KEY_3",
	"remoteNumber4Button": "KEY_4",
	"remoteNumber5Button": "KEY_5",
	"remoteNumber6Button": "KEY_6",
	"remoteNumber7Button": "KEY_7",
	"remoteNumber8Button": "KEY_8",
	"remoteNumber9Button": "KEY_9",
	"remoteNumber0Button": "KEY_0",
	"remoteProgramUpButton": "KEY_CHANNELUP",
	"remoteProgramDownButton": "KEY_CHANNELDOWN",
	"remoteArrowUpButton": "KEY_UP",
	"remoteArrowLeftButton": "KEY_LEFT",
	"remoteArrowDownButton": "KEY_DOWN",
	"remoteArrowRightButton": "KEY_RIGHT",
	"remoteOKButton": "KEY_OK"
}

function defineVariables() {
	var svg = document.getElementById("remote-svg");
	var svgDoc = svg.contentDocument;

	var buttons = [];
	buttons.push(svgDoc.getElementById("remotePowerButton"));
	buttons.push(svgDoc.getElementById("remoteSourceButton"));
	buttons.push(svgDoc.getElementById("remoteMuteButton"));
	buttons.push(svgDoc.getElementById("remoteSoundUpButton"));
	buttons.push(svgDoc.getElementById("remoteSoundDownButton"));
	buttons.push(svgDoc.getElementById("remoteNumber1Button"));
	buttons.push(svgDoc.getElementById("remoteNumber2Button"));
	buttons.push(svgDoc.getElementById("remoteNumber3Button"));
	buttons.push(svgDoc.getElementById("remoteNumber4Button"));
	buttons.push(svgDoc.getElementById("remoteNumber5Button"));
	buttons.push(svgDoc.getElementById("remoteNumber6Button"));
	buttons.push(svgDoc.getElementById("remoteNumber7Button"));
	buttons.push(svgDoc.getElementById("remoteNumber8Button"));
	buttons.push(svgDoc.getElementById("remoteNumber9Button"));
	buttons.push(svgDoc.getElementById("remoteNumber0Button"));
	buttons.push(svgDoc.getElementById("remoteProgramUpButton"));
	buttons.push(svgDoc.getElementById("remoteProgramDownButton"));
	buttons.push(svgDoc.getElementById("remoteArrowUpButton"));
	buttons.push(svgDoc.getElementById("remoteArrowLeftButton"));
	buttons.push(svgDoc.getElementById("remoteArrowDownButton"));
	buttons.push(svgDoc.getElementById("remoteArrowRightButton"));
	buttons.push(svgDoc.getElementById("remoteOKButton"));




	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", buttonPressed);
	}
}


function buttonPressed() {
	//alert("Button: " + hashmap[this.id] + " was pressed.");
	console.log(this);
	var req = new XMLHttpRequest();
	var baseURL = 'http://pi.sintho:3000/tv/';
	var fullURL = baseURL + hashmap[this.id];
	console.log(fullURL);
	req.open('get', fullURL);
	req.addEventListener('readystatechange', function () {
		var parsedResponse;
		if (req.readyState === 4) { // done
			console.log(req);
		}
	});
	req.send();
	console.log("sent request");

}
