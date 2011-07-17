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


qx.Class.define('eyeos.sketch.ToolbarItems', {
	extend : qx.core.Object,
	implement : [eyeos.ui.genericbar.IItems],

	construct: function() {
		arguments.callee.base.call(this);
		this.setItems(this.items);
	},

	properties: {
		items: {
			init: null
		}
	},
	members: {
		items: [{
			name: tr('File'),
			id: 'File',
			Group: [{
				name: tr('New'),
				id: 'New',
				image: 'document-new.png',
				cmd: 'fileNew'
			}, {
				name: tr('Open'),
				id: 'Open',
				image: 'document-open.png',
				cmd: 'fileOpen'
			}, {
				name: tr('Save'),
				id: 'Save',
				image: 'document-save.png',
				cmd: 'fileSave'
			}]
		}, {
			name: tr('Edit'),
			id: 'Edit',
			Group: [{
				name: tr('Undo'),
				id: 'Undo',
				image: 'edit-undo.png',
				cmd: 'editUndo'
			}, {
				name: tr('Redo'),
				id: 'Redo',
				image: 'edit-redo.png',
				cmd: 'editRedo'
			}]
		}]
	}
});

