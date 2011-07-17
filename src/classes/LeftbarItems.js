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


qx.Class.define('eyeos.sketch.LeftbarItems', {
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
			name: tr('Brushes'),
			id: 'Brushes',
			Group: [{
				name: tr('Select'),
				id: 'Select',
				image: 'transform-move.png',
				cmd: 'changeBrush'
			}, {
				name: tr('Pen'),
				id: 'Pen',
				image: 'draw-freehand.png',
				cmd: 'changeBrush'
			}, {
				name: tr('Line'),
				id: 'Line',
				image: 'draw-line.png',
				cmd: 'changeBrush'
			}, {
				name: tr('Polyline'),
				id: 'Polyline',
				image: 'draw-polyline.png',
				cmd: 'changeBrush'
			}, {
				name: tr('Rectangle'),
				id: 'Rectangle',
				image: 'draw-rectangle.png',
				cmd: 'changeBrush'
			}, {
				name: tr('Ellipse'),
				id: 'Ellipse',
				image: 'draw-circle.png',
				cmd: 'changeBrush'
			}, {
				name: tr('Text'),
				id: 'Text',
				image: 'draw-text.png',
				cmd: 'changeBrush'
			}]
		}]
	}
});

