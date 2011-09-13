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

/**
 * find and create DOM objects
 */
qx.Class.define('eyeos.sketch.ImportExport', {
  
  statics: {
	
	mapTagNames : {
	  svg :			"svg.embed.Svg",
	  line :		"svg.shape.Line",
	  rect :		"svg.shape.Rect",
	  ellipse :		"svg.shape.Ellipse",
	  path :		"svg.path.Path",
	  text :		"svg.text.Text"
    },
	
	/**
	 * searches and returns the object with the given ID
	 */
	getObjectById: function(svgnode, id) {
	  if (! svgnode.hasChildren())
	    return null;
	  
	  var children = svgnode.getChildren();
	  
	  for (var i = 0; i < children.length; i++) {
		if (children[i].getAttribute("id") == id)
		  return children[i];
		  
		if (eyeos.sketch.ImportExport.getObjectById(children[i], id) != null)
		  return eyeos.sketch.ImportExport.getObjectById(children[i], id);
	  }
	  
	  return null;
    },
    
    
    /**
     * creates an object tree from an XML file
     */
    createObjectsFromXML: function(xmlstring) {
	  var parser = new DOMParser();
	  var doc = parser.parseFromString(xmlstring, "text/xml");
	  
	  if (doc.documentElement.tagName == "svg")
	    return eyeos.sketch.ImportExport.createObjectsArrayFromDOM(doc.documentElement.childNodes);
	  else
	    return eyeos.sketch.ImportExport.createObjectsFromDOM(doc.documentElement);
    },
	
	createObjectsFromDOM: function(domNode) {
	  // create new object
	  var objName = eyeos.sketch.ImportExport.mapTagNames[domNode.tagName];
	  if (objName == null)
		return null;
	  var obj = eval("new " + objName + "()");
	  
	  // set attributes
	  if (domNode.tagName != "svg") {
		var attributes = domNode.attributes;
		for (var i = 0; i < attributes.length; i++) {
		  obj.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
		}
	  }
	  
	  if (domNode.tagName == "text") {
		obj.setValue("Test");
	  }
	  
	  // recursively parse children
	  var children = domNode.childNodes;
	  for (var i = 0; i < children.length; i++) {
		var child = eyeos.sketch.ImportExport.createObjectsFromDOM(children[i]);
		if (child != null)
		  obj.add(child);
	  }
	  
	  return obj;
    },
	
	createObjectsArrayFromDOM: function(domArray) {
	  var obj = new Array();
	  
	  for (var i = 0; i < domArray.length; i++) {
		obj[i] = eyeos.sketch.ImportExport.createObjectsFromDOM(domArray[i]);
	  }
	  
	  return obj;
    }
    
  }
  
});
