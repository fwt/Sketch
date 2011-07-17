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


qx.Class.define('eyeos.sketch.MenuItems', {
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
			subMenu: [{
				name: tr('New'),
				id: 'New',
				cmd: 'fileNew'
			}, {
				name: tr('Open...'),
				id: 'Open',
				cmd: 'fileOpen'
			}, {
				name: tr('Save'),
				id: 'Save',
				cmd: 'fileSave'
			}, {
				name: tr('Save as...'),
				id: 'SaveAs',
				cmd: 'fileSaveAs'
			}, {
				name: tr('Export...'),
				id: 'Export',
				cmd: 'fileExport'
			}, {
				type: 'Separator'
			}, {
				name: tr('Properties...'),
				id: 'Properties',
				cmd: 'fileProperties'
			}]
		}, {
			name: tr('Edit'),
			id: 'Edit',
			subMenu: [{
				name: tr('Undo'),
				id: 'Undo',
				cmd: 'editUndo'
			}, {
				name: tr('Redo'),
				id: 'Redo',
				cmd: 'editRedo'
			}, {
				type: 'Separator'
			}, {
				name: tr('Cut'),
				id: 'Cut',
				cmd: 'editCut'
			}]
		}, {
			name: tr('View'),
			id: 'View',
			subMenu: [{
				name: tr('Show Toolbar'),
				id: 'showToolbar',
				cmd: 'viewShowToolbar',
				type: 'CheckBox',
				active: true
			}]
		}, {
			name: tr('Format'),
			id: 'Format',
			subMenu: [{
				name: tr('Test1'),
				id: 'Test1'
			}, {
				name: tr('Test2'),
				id: 'Test2'
			}]
		}]
	}
});

