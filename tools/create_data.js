/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('core/event_bus.js');

function onError(err){
	throw Error(err);
}

function createData(){
	var composer = require('core/composer.js');
	var network = require('core/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var data = {age: 78.90, props: {sets: ['0bbb', 'zzz', 1/3]}};
	composer.composeDataJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", data, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createData);
