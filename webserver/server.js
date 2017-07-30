/* USER VARIABLES */

var pathToExecutable = "";	//path to where the c-file to be executed is located. Needs to end with '/'
var executableName = "";	//name of the executable
var serverPort = 3000;

/*the keys that the remote supports*/
var possibleKeys = ["KEY_POWER", "KEY_SOURCE", "KEY_MUTE", "KEY_VOLUMEUP", "KEY_VOLUMEDOWN", "KEY_1", "KEY_2", "KEY_3", "KEY_4", "KEY_5", "KEY_6", "KEY_7", "KEY_8", "KEY_9", "KEY_0", "KEY_CHANNELUP", "KEY_CHANNELDOWN", "KEY_UP", "KEY_LEFT", "KEY_DOWN", "KEY_RIGHT", "KEY_OK"]

/*mapping the key names to their binary string*/
var hashmap = {
	"KEY_POWER": "100100100",
	"KEY_SOURCE": "00000010000",
	"KEY_MUTE": "100100110",
	"KEY_VOLUMEUP": "111000000",
	"KEY_VOLUMEDOWN": "111000010",
	"KEY_1": "10000000010",
	"KEY_2": "100000011",
	"KEY_3": "10000001000",
	"KEY_4": "100001100",
	"KEY_5": "100001110",
	"KEY_6": "100001001",
	"KEY_7": "10000100000",
	"KEY_8": "100110000",
	"KEY_9": "100110010",
	"KEY_0": "10000000000",
	"KEY_CHANNELUP": "00100000000",
	"KEY_CHANNELDOWN": "00100000010",
	"KEY_UP": "1111100",
	"KEY_LEFT": "1111110",
	"KEY_DOWN": "111001000",
	"KEY_RIGHT": "1111001",
	"KEY_OK": "000011110"
}


/*******************************/


var http = require('http');
var express = require('express');
var childProcess = require("child_process");

var app = express();

app.use(express['static'](__dirname));

// Express route for incoming requests for a customer name
app.get('/tv/*', function (req, res) {
	var url = req.url;
	if (url.indexOf("KEY_") != -1) {
		var key = url.substring(4);
		if (possibleKeys.indexOf(key) != -1) {
			childProcess.exec("sudo " + pathToExecutable + executableName +  " " + hashmap[key]);
			res.status(200).send(key);
		} else {
			res.status(404).send('Unrecognised API call');
		}
	} else {
		res.status(404).send('Unrecognised API call');
	}


});

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
	res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
	if (req.xhr) {
		res.status(500).send('Oops, Something went wrong!');
	} else {
		next(err);
	}
});

app.listen(serverPort);
console.log('Server running at port ' + serverPort);
