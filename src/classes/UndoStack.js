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


qx.Class.define("eyeos.sketch.UndoStack",
{
  extend : qx.core.Object,
   
  construct : function(mainApp)
  {
    this.__stack = new Array();
    this.__stackPointer = 0;
    this.__mainApp = mainApp;
    //this.__undoButton = undoButton;
    //this.__redoButton = redoButton;
  },

  members :
  {
    __stack: null,
    __stackPointer: null,
    __undoButton: null,
    __redoButton: null,
    
    addChange: function(action, tooldata) {
	  if (this.__stack.length > 0) {
		while (this.__stackPointer < this.__stack.length) {
		  var undoItem = this.__stack.pop();
		  if (undoItem.action == "new")
		    undoItem.tooldata.obj.dispose();
	    }
	  }
	  if (action == "new") {
		this.__stack.push({ action: "new", tool: tooldata.tool, obj: tooldata.obj });
		
		var svgNode = tooldata.obj.getDomElement();
	    var content = qx.xml.Element.serialize(svgNode);
		this.__mainApp._sendMessage("new", content);
	  }
	  else if (action == "change") {
		this.__stack.push({ action: "change", obj: tooldata.obj });
		
		var svgNode = tooldata.obj.getDomElement();
	    var content = qx.xml.Element.serialize(svgNode);
		this.__mainApp._sendMessage("change", content);
	  }
	  this.__stackPointer++;
	  //this.__undoButton.setEnabled(true);
	  //this.__redoButton.setEnabled(false);
    },
	
	undo: function() {
	  if (this.__stack.length > 0 && this.__stackPointer > 0) {
		this.__stackPointer--;
		var undoItem = this.__stack[this.__stackPointer];
		
		if (undoItem.action == "new") {
		  undoItem.obj.exclude();
		  
		  var nodeID = undoItem.obj.getAttribute("id");
		  this.__mainApp._sendMessage("delete", nodeID);
	    }
	    //else if (undoItem.action == "change") {
		//  var nodeID = undoItem.obj.getAttribute("id");
		//  this.__mainApp._sendMessage("delete", nodeID);
	    //}
	    
	    //if (this.__stackPointer == 0)
	    //  this.__undoButton.setEnabled(false);
	    //this.__redoButton.setEnabled(true);
	  }
    },
    
    redo: function() {
	  if (this.__stack.length > 0 && this.__stackPointer < this.__stack.length) {
		var undoItem = this.__stack[this.__stackPointer];
		
		if (undoItem.action == "new") {
		  undoItem.obj.include();
		  
		  var svgNode = undoItem.obj.getDomElement();
	      var content = qx.xml.Element.serialize(svgNode);
		  this.__mainApp._sendMessage("new", content);
	    }
		
		this.__stackPointer++;
		//this.__undoButton.setEnabled(true);
		//if (this.__stackPointer == this.__stack.length)
		//  this.__redoButton.setEnabled(false);
	  }
    },
    
    setSvg : function(svgElem) {
      this.__svg = svgElem;
    }
  },

  destruct : function() {
    this._disposeObjects("__stack");
  }
});
