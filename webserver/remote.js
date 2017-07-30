/* USER VARIABLES */
var hashmap = {							// mapping IDs to key names. Not necessarily needed, but for better readability
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

var hostname = "";				//hostname or IP of the server
var webserverPort = 3000;		//port configured in server.js
var svgID = "";					//ID of the svg image as defined in the HTML file
/******************************/

/*adding click-listeners to each svg-button/group*/
function defineVariables() {
	var svg = document.getElementById(svgID);
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

/*Sending a XHR-request to node-js server when button is pressed*/
function buttonPressed() {
	var req = new XMLHttpRequest();
	var url = 'http://' + hostname + ':' + webserverPort + '/tv/' + hashmap[this.id];
	req.open('get', url);
	req.addEventListener('readystatechange', function () {
		var parsedResponse;
		if (req.readyState === 4) { // done
		}
	});
	req.send();
}
