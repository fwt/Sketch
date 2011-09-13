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


qx.Class.define('eyeos.sketch.Actions', {
	extend: qx.core.Object,
	implement : [eyeos.ui.genericbar.IActions],

	construct: function(application, controller) {
		arguments.callee.base.call(this);
		this.setApplication(application);
		this.setController(controller);
	},

	properties: {
		application: {
			init: null,
			check: 'eyeos.system.EyeApplication'
		},
		
		controller: {
			init: null,
			check: 'eyeos.sketch.Controller'
		},
		
		toolBarVisible: {
			init: true,
			check: 'Boolean'
		}
	},

	members: {
		dynamicsActions: function() {},
		
		// =============================================================
		// 		FILE
		// =============================================================
		
		fileNew: function() {
			// TODO: check if document was modified, save changes?
			// TODO: clear undo history
			this.getApplication().__lastFilepath = null;
			this.getApplication().__svg.removeAll();
		},
		
		fileOpen: function() {
			//this.fileNew();
			this.getController().openFileDialog(this.getApplication().__lastFilepath, function (filename) {
				if (filename != null) {
					this.getApplication().__lastFilepath = filename;
					this.getController().readStringFromFile(filename, function (content) {
						if (filename == null)
							alert("Could not read file! Maybe it's binary.");
						
						var objects = eyeos.sketch.ImportExport.createObjectsFromXML(content);
						this.getApplication().__svg.removeAll();
						for (var i = 0; i < objects.length; i++)
						  this.getApplication().__svg.add(objects[i]);
						//eyeos.sketch.ImportExport.parseFromString(content, this.getApplication().__svg);
					}, this);
				}
			}, this);
		},
		
		fileSave: function() {
			if (this.getApplication().__lastFilepath == null)
				this.fileSaveAs();
			else {
				var svgNode = this.getApplication().__svg.getDomElement();
				var content = qx.xml.Element.serialize(svgNode);
				var content = '<?xml version="1.0" encoding="UTF-8"?>' + content;
				
				var filename = this.getApplication().__lastFilepath;
				this.getController().writeStringToFile(filename, content);
			}
		},
		
		fileSaveAs: function() {
			this.getController().saveFileDialog(this.getApplication().__lastFilepath, function (filename) {
				if (filename != null) {
					this.getApplication().__lastFilepath = filename;
					
					var svgNode = this.getApplication().__svg.getDomElement();
					var content = qx.xml.Element.serialize(svgNode);
					var content = '<?xml version="1.0" encoding="UTF-8"?>' + content;
					
					this.getController().writeStringToFile(filename, content);
				}
			}, this);
		},
		
		fileExport: function() {
			this.getController().saveFileDialog(this.getApplication().__lastFilepath, function (filename) {
				if (filename != null) {
					var svgNode = this.getApplication().__svg.getDomElement();
					var content = qx.xml.Element.serialize(svgNode);
					var content = '<?xml version="1.0" encoding="UTF-8"?>' + content;
					
					this.getController().exportToFile(filename, content);
				}
			}, this);
		},
		
		fileProperties: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
	
		// =============================================================
		// 		EDIT
		// =============================================================
		
		editUndo: function() {
			this.getApplication().__undoStack.undo();
		},
		
		editRedo: function() {
			this.getApplication().__undoStack.redo();
		},
		
		//---------
		
		editCut: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
		editCopy: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
		editPaste: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
	
		// =============================================================
		// 		VIEW
		// =============================================================
		
		viewShowToolbar: function() {
			//eyeos.alert(tr('show/hide toolbar'));
		},
		
		viewZoom: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
	
		// =============================================================
		// 		FORMAT
		// =============================================================
	
		test1: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
		test2: function() {
			eyeos.alert(tr('Not available yet...'));
		},
		
		// =============================================================
		// 		BRUSHES
		// =============================================================
		
		changeBrush: function(button) {
		  this.getApplication().__currentBrush = button.getLabel();
		},
		
		// =============================================================
		// 		CANVAS MOUSE EVENTS
		// =============================================================
		
		_getLeft : function(e) {
		  var offset = this.getApplication().__svgWidget.getContainerLocation('box');
	      return e.getDocumentLeft() - offset.left;
	    },
	    
	    _getTop : function(e) {
		  var offset = this.getApplication().__svgWidget.getContainerLocation('box');
	      return e.getDocumentTop() - offset.top;
	    },
	    
	    // select an object on the canvas for dragging
		mouseDownOnObject: function(obj, e) {
		  if (this.getApplication().__currentBrush != 'Select')
		    return;
		  
		  var mouseX = this._getLeft(e);
		  var mouseY = this._getTop(e);
			
	      this.getApplication().__dragdata = {
			obj: obj,
			x: obj.getBorderX() - mouseX,
			y: obj.getBorderY() - mouseY
		  };
	    },
		
		// create new object on the canvas
		mouseDown: function(e) {
		  
		  // skip if select tool is active
		  if (this.getApplication().__currentBrush == 'Select')
		    return;
		  
		  var mouseX = this._getLeft(e);
		  var mouseY = this._getTop(e);
		  var tool_properties = {
	        fill: this.getApplication().__fillColor,
	        stroke: this.getApplication().__strokeColor,
	        strokeWidth: this.getApplication().__strokeWidth,
	        linecap: "round"
	      };
		  
		  switch (this.getApplication().__currentBrush)
		  {
		  // pen tool
	      case 'Pen':
	        var path = new svg.path.Path().set(tool_properties);
	        path.set({ fill: "none" });
	        
	        var pathdata = new svg.path.PathData();
	        pathdata.moveTo(mouseX, mouseY);
	        path.setPathData(pathdata);
	        this.getApplication().__svg.add(path);
	
	        this.getApplication().__tooldata = { tool: "pen", obj: path };
	        break;
		  
		  // line tool
		  case 'Line':
			var line = new svg.shape.Line().set({
	          stroke: this.getApplication().__strokeColor,
	          strokeWidth: this.getApplication().__strokeWidth,
	          linecap: "round"});
	        
	        line.setStart(mouseX, mouseY);
	        line.setEnd(mouseX, mouseY);
	        this.getApplication().__svg.add(line);
	
	        this.getApplication().__tooldata = { tool: "line", obj: line };
	        break;
		  
		  // rectangle tool
		  case 'Rectangle':
			var rect = new svg.shape.Rect().set(tool_properties);
	        
	        rect.setX(mouseX);
	        rect.setY(mouseY);
	        rect.setWidth(0);
	        rect.setHeight(0);
	        this.getApplication().__svg.add(rect);
	
	        this.getApplication().__tooldata = { tool: "rect", startX: mouseX, startY: mouseY, obj: rect };
	        break;
		  
		  // ellipse tool
		  case 'Ellipse':
			var ellipse = new svg.shape.Ellipse().set(tool_properties);
	        
	        ellipse.setCx(mouseX);
	        ellipse.setCy(mouseY);
	        ellipse.setRadiusX(0);
	        ellipse.setRadiusY(0);
	        this.getApplication().__svg.add(ellipse);
	
	        this.getApplication().__tooldata = { tool: "ellipse", startX: mouseX, startY: mouseY, obj: ellipse };
	        break;
		  
		  // text tool
		  case 'Text':
			var text = new svg.text.Text();
	        
	        text.setX(mouseX);
	        text.setY(mouseY);
	        text.setValue("Test");
	        this.getApplication().__svg.add(text);
	        
	        this.getApplication().__tooldata = { tool: "text", obj: text };
	        break;
		  }
		  
		  this.getApplication().__tooldata.obj.setAttribute("id",
		    eyeos.getCurrentUserName() + "_shape_" + this.getApplication().count);
		  this.getApplication().count++;
		},
		
		mouseMove: function(e) {
		  var tooldata = this.getApplication().__tooldata;
		  var mouseX = this._getLeft(e);
		  var mouseY = this._getTop(e);
		  
		  // draw new shape
	      if (tooldata != null) {
			
			// pen tool
			if (tooldata.tool == "pen") {
	          tooldata.obj.getPathData().lineTo(mouseX, mouseY);
		    }
		    
		    // line tool
		    else if (tooldata.tool == "line") {
			  tooldata.obj.setEnd(mouseX, mouseY);
		    }
		    
		    // rectangle tool
		    else if (tooldata.tool == "rect") {
			  var rect = tooldata.obj;
			  if (mouseX > tooldata.startX) {
				rect.setX(tooldata.startX);
			    rect.setWidth(mouseX - tooldata.startX);
			  } else {
				rect.setX(mouseX);
				rect.setWidth(tooldata.startX - mouseX);
			  }
			  if (mouseY > tooldata.startY) {
				rect.setY(tooldata.startY);
			    rect.setHeight(mouseY - tooldata.startY);
			  } else {
				rect.setY(mouseY);
			    rect.setHeight(tooldata.startY - mouseY);
			  }
			  
		    }
		    
		    // ellipse tool
		    else if (tooldata.tool == "ellipse") {
			  var ellipse = tooldata.obj;
			  
			  if (mouseX > tooldata.startX)
			    ellipse.setRadiusX(mouseX - tooldata.startX);
			  else
				ellipse.setRadiusX(tooldata.startX - mouseX);
			  if (mouseY > tooldata.startY)
			    ellipse.setRadiusY(mouseY - tooldata.startY);
			  else
			    ellipse.setRadiusY(tooldata.startY - mouseY);
		    }
	      }
	      
	      // drag object
	      if (this.getApplication().__dragdata != null) {
			var obj = this.getApplication().__dragdata.obj;
			
			obj.setBorderX(mouseX + this.getApplication().__dragdata.x);
			obj.setBorderY(mouseY + this.getApplication().__dragdata.y);
			obj.applyBorderChange();
		  }
		},
		
		mouseUp: function(e) {
		  // end painting
		  if (this.getApplication().__tooldata != null) {
		    var obj = this.getApplication().__tooldata.obj;
		    
		    this.getApplication().__undoStack.addChange("new",
		      this.getApplication().__tooldata);
            this.getApplication().__tooldata = null;
		    
		    obj.addListener("mousedown", function (e) {
		      this.mouseDownOnObject(obj, e);
		    }, this);
	      }
	      
	      // end dragging
	      if (this.getApplication().__dragdata != null) {
			this.getApplication().__undoStack.addChange("change",
		      this.getApplication().__dragdata);
		    this.getApplication().__dragdata = null;
	      }
	    }
	}
});

