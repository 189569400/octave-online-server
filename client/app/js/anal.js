/*
 * Copyright © 2018, Octave Online LLC
 *
 * This file is part of Octave Online Server.
 *
 * Octave Online Server is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Octave Online Server is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Octave Online Server.  If not, see
 * <https://www.gnu.org/licenses/>.
 */

define(function(){

	var garef = null;
	var q = [];

	// Wait to load Google Analytics to not slow down the module
	require(["js/runtime"], function(){ require(["analytics"], function(_garef){
		// If _garef is null, the user might be blocking Google Analytics.
		// Suppress console errors by passing a noop function.
		garef = _garef ? _garef : function(){};

		// Set up Analytics
		window.GoogleAnalyticsObject = "ga";
		garef("create", "{!gacode!}", "auto");
		garef("set", "anonymizeIp", true);

		// Record browser window size
		var width = window.innerWidth || document.body.clientWidth;
		var height = window.innerHeight || document.body.clientHeight;
		width = Math.round(width/50)*50;
		height = Math.round(height/50)*50;
		garef("send", "event", "browser-size", "width", width);
		garef("send", "event", "browser-size", "height", height);
		garef("send", "event", "browser-size", "combined", width+"x"+height);

		// Send queued-up messages to GA
		for (var i=0; i<q.length; i++) {
			garef.apply(this, q[i]);
		}
	}); });

	// Function to either call ga() or add to the waiting list
	function _ga() {
		if (garef) {
			garef.apply(this, arguments);
		} else {
			q.push(arguments);
		}
	}

	var numExtraTime = 0;

	// Return methods to register certain events
	return {
		pageview: function(){
			_ga("send", "pageview");
		},
		signedin: function(){
			_ga("send", "event", "accounts", "signed-in");
		},
		welcomeback: function() {
			_ga("send", "event", "accounts", "welcome-back");
		},
		sitecontrol: function(which){
			_ga("send", "event", "site-control", which);
		},
		command: function(cmd){
			_ga("send", "event", "command", "user-cmd", cmd.substr(0,5), cmd.length);
		},
		runfile: function(){
			_ga("send", "event", "command", "run-file");
		},
		sigint: function(){
			_ga("send", "event", "signal", "user-interrupt");
		},
		patience: function(){
			_ga("send", "event", "loading", "patience-message");
		},
		dismiss: function(what){
			_ga("send", "event", "dismiss", "promo", what);
		},
		duration: function(duration){
			_ga("send", "event", "command", "duration", "millis", duration);
		},
		extraTime: function(){
			_ga("send", "event", "extra-time", "from-prompt", numExtraTime++);
		},
		acknowledgePayload: function(){
			_ga("send", "event", "extra-time", "acknowledge-payload");
		},
		alert: function(message){
			_ga("send", "event", "alert", "alert", message.substr(0,20), message.length);
		}
	};
});
