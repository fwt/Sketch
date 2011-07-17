/*
 * Sketch - A simple collaborative vector graphics editor for eyeOS 2.x
 * Copyright (C) 2011  Florian Wohlfart
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


qx.Class.define('eyeos.sketch.Controller', {
	extend: qx.core.Object,
	
	construct: function(application, checknum) {
		arguments.callee.base.call(this);
		
		this.__checknum = checknum;
		this.__application = application;
	},
	
	events: {
	},
	
	properties: {
	},
	
	members: {
        __checknum: null,
        __application: null,
		
		openFileDialog: function (lastfilepath, callback, callbackContext) {
			var fc = new eyeos.dialogs.FileChooser(this.__checknum);
			fc.setFilters([
				{desc: 'SVG files', patterns: ['*.svg'], defaultExt: 'svg'},
			]);
			fc.showOpenDialog(this.__application.__window, function(choice, path) {
				if (choice == eyeos.dialogs.FileChooser.APPROVE_OPTION) {
					callback.call(callbackContext, path);
				}
				else callback(null);
			}, this.__application, lastfilepath);
		},
		
		saveFileDialog: function (lastfilepath, callback, callbackContext) {
			var fc = new eyeos.dialogs.FileChooser(this.__checknum);
			fc.setFilters([
				{desc: 'SVG files', patterns: ['*.svg'], defaultExt: 'svg'},
				{desc: 'PNG files', patterns: ['*.png'], defaultExt: 'png'},
				{desc: 'PDF files', patterns: ['*.pdf'], defaultExt: 'pdf'}
			]);
			fc.showSaveDialog(this.__application.__window, function(choice, path) {
				if (choice == eyeos.dialogs.FileChooser.APPROVE_OPTION) {
					callback.call(callbackContext, path);
				}
				else callback(null);
			}, this.__application, lastfilepath);
		},
		
		readStringFromFile: function (filename, callback, callbackContext) {
			eyeos.callMessage(this.__checknum, '__FileSystem_getFileContent', {path: filename}, function(file) {
				callback.call(callbackContext, file.data);
			}, this);
		},
		
		writeStringToFile: function (filename, content) {
			eyeos.callMessage(this.__checknum, '__FileSystem_setFileContent', {path: filename, data: content}, function() {
				eyeos.messageBus.getInstance().send('desktop', 'showDesktopNotification', [tr('File saved successfully')]);
			}, this, {
				onException: function (e) {
					if(e.__eyeos_specialControlMessage_body.name=="EyeAccessControlException") {
						var op = new eyeos.dialogs.OptionPane(tr('Insufficent permission'),
							eyeos.dialogs.OptionPane.ERROR_MESSAGE, null, null,
							[e.__eyeos_specialControlMessage_body.message]
						);
						var d = op.createDialog(this.__window, tr('Impossible to save document'), function(result, inputValue) {
							eyeos.consoleInfo(result);
							eyeos.consoleInfo(inputValue);
						});
						d.open();
					}
				}
			});
		},
		
		exportToFile: function (filename, content) {
			eyeos.callMessage(this.__checknum, 'exportToFile', [filename, content], function(success) {
				if (success)
					eyeos.messageBus.getInstance().send('desktop', 'showDesktopNotification', [tr('File saved successfully')]);
				else eyeos.alert("failed to save file!");
			}, this);
		},
	}
});
