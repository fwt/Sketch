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


function sketch_application(checknum, pid, args) {
  var app = new eyeos.application.Sketch(checknum, pid, args);
  app.drawGUI();
}

qx.Class.define('eyeos.application.Sketch', {
  extend: eyeos.system.EyeApplication,
  
  statics: {
    DEFAULT_WIDTH: 800,
    DEFAULT_HEIGHT: 600
  },
  
  construct: function(checknum, pid, args) {
    arguments.callee.base.call(this, 'sketch', checknum, pid);
    
    this.__fileChooser = new eyeos.dialogs.FileChooser(this.getChecknum());
  },

  members: {
	
	// GUI components
	__menuBar: null,
	__toolBar: null,
	__window: null,
	__svgWidget: null,
	__svg: null,
	
	// state variables
	__currentBrush: 'Select',
	__strokeColor: "black",
	__fillColor: "#0094FF",
	__strokeWidth: 4,
	
	// dialogs
	__fileChooser: null,
	
	__undoStack: null,
    __tooldata: null,
    __dragdata: null,
    __lastFilepath: null,
	count: 0,
	
	_buildMenuBar: function(actions) {
	  this.__menuBar = new eyeos.ui.menubar.MenuBar();
	  this.__menuBar.setItems(new eyeos.sketch.MenuItems().getItems());
	  this.__menuBar.setActions(actions);
	  this.__menuBar.createMenuBar();
	  
	  return this.__menuBar;
	},
	
	_buildToolBar: function(actions) {
	  this.__toolBar = new eyeos.ui.toolbar.ToolBar();
	  this.__toolBar.set({ height: 50 });
	  this.__toolBar.setIconsPath('index.php?extern=images/22x22/actions/');
	  this.__toolBar.setItems(new eyeos.sketch.ToolbarItems().getItems());
	  this.__toolBar.setActions(actions);
	  this.__toolBar.createToolBar();
	  
	  return this.__toolBar;
	},
	
	_buildLeftBar: function(actions) {
	  var leftbar = new qx.ui.container.Composite();
      leftbar.set({padding: 5, backgroundColor: '#F2F2F3'});
      leftbar.setLayout(new qx.ui.layout.Grid(3,3));
      
      // create Brushes
      var brushGroup = new qx.ui.form.RadioGroup();
      var brushes = new eyeos.sketch.LeftbarItems().getItems()[0].Group;
      
      for (var i = 0; i < brushes.length; i++) {
		var button = new qx.ui.toolbar.RadioButton(brushes[i].name);
		button.set({icon: 'index.php?extern=images/sketch/' + brushes[i].image});
		button.addListener("click", function() {
		  actions.changeBrush(this);
		}, button);
		button.set({toolTipText : brushes[i].name, show: "icon"});
	    button.set({group: brushGroup});
	    leftbar.add(button, {row: Math.floor(i/2), column: i%2});
	  }
      
      // color selector
      var strokeColorBox = new qx.ui.container.Composite();
      strokeColorBox.set({width: 50, height: 25,
        backgroundColor: this.__strokeColor });
      
      var strokeColorPopup = new qx.ui.control.ColorPopup();
      strokeColorPopup.exclude();
      strokeColorBox.addListener("click", function(e) {
        strokeColorPopup.placeToWidget(strokeColorBox);
        strokeColorPopup.setValue(strokeColorBox.getBackgroundColor());
        strokeColorPopup.show();
      }, this);
      strokeColorPopup.addListener("changeValue", function(e) {
        strokeColorBox.setBackgroundColor(e.getData());
        this.__strokeColor = e.getData();
      }, this);
      
      var fillColorBox = new qx.ui.container.Composite();
      fillColorBox.set({width: 50, height: 25,
        backgroundColor: this.__fillColor });
      
      var fillColorPopup = new qx.ui.control.ColorPopup();
      fillColorPopup.exclude();
      fillColorBox.addListener("click", function(e) {
        fillColorPopup.placeToWidget(fillColorBox);
        fillColorPopup.setValue(fillColorBox.getBackgroundColor());
        fillColorPopup.show();
      }, this);
      fillColorPopup.addListener("changeValue", function(e) {
		if (e.getData() == null) {
		  fillColorBox.setBackgroundColor(null);
          this.__fillColor = "none";
	    } else {
		  fillColorBox.setBackgroundColor(e.getData());
          this.__fillColor = e.getData();
	    }
      }, this);
      
      // stroke width
      var strokeWidthSpinner = new qx.ui.form.Spinner();
      strokeWidthSpinner.set({ value: 5, minimum: 1, maximum: 50 });
      strokeWidthSpinner.addListener("changeValue", function(e) {
		this.__strokeWidth = e.getData();
	  }, this);
      
      leftbar.add(new qx.ui.basic.Label("Stroke Color:"), {row: 5, column: 0, colSpan: 2});
      leftbar.add(strokeColorBox, {row: 6, column: 0, colSpan: 2});
      leftbar.add(new qx.ui.basic.Label("Fill Color:"), {row: 7, column: 0, colSpan: 2});
      leftbar.add(fillColorBox, {row: 8, column: 0, colSpan: 2});
      leftbar.add(new qx.ui.basic.Label("Stroke Width:"), {row: 9, column: 0, colSpan: 2});
      leftbar.add(strokeWidthSpinner, {row: 10, column: 0, colSpan: 2});
	  
	  return leftbar;
	},    
    
    _sendMessage: function(msgname, msg) {
	  var netSync = eyeos.netSync.NetSync.getInstance();
	  var message = new eyeos.netSync.Message({
  		type: 'sketch',
		name: msgname,
		to: 'img_0',
		data: [eyeos.getCurrentUserName(), msg]
	  });
	  netSync.send(message);
    },
    
	
	
    drawGUI: function() {
	  // main window
      this.__window = new eyeos.ui.Window(this, 'Sketch', 'index.php?extern=/images/sketch/sketch-16.png').set({
        width: this.self(arguments).DEFAULT_WIDTH,
        height: this.self(arguments).DEFAULT_HEIGHT,
        contentPadding: 0,
        destroyOnClose: true
      });
      this.__window.setLayout(new qx.ui.layout.Dock());
      
      var controller = new eyeos.sketch.Controller(this, this.getChecknum());
      var actions = new eyeos.sketch.Actions(this, controller);
      
      // menubar
      this.__window.add(this._buildMenuBar(actions), {edge: "north"});
      
      // toolbar
      this.__window.add(this._buildToolBar(actions), {edge: "north"});
      
      // brush & color selection panel
      this.__window.add(this._buildLeftBar(actions), {edge: "west"});
      
      // SVG drawing area
      this.__svgWidget = new svg.embed.Svg();
      this.__window.add(this.__svgWidget, { left: 0, right: 0, top: 0, bottom: 0 });
      this.__svg = this.__svgWidget.getSvg();

      this.__svgWidget.addListener("mousedown", actions.mouseDown, actions);
      this.__svgWidget.addListener("mousemove", actions.mouseMove, actions);
      this.__svgWidget.addListener("mouseup", actions.mouseUp, actions);
      
      // Undo stack
      this.__undoStack = new eyeos.sketch.UndoStack(this);
      
      this.__window.open();
      
      this.__svg.setAttribute("width", this.__svgWidget.getWidth());
      this.__svg.setAttribute("height", this.__svgWidget.getHeight());
      
      // listen for network messages
      var netSync = eyeos.netSync.NetSync.getInstance();
      netSync.subscribe("img_0");
      
      var bus = eyeos.messageBus.getInstance();
      
      bus.addListener('eyeos_sketch_new', function (e)
      {
		var data = JSON.parse(e.getData());
		if (data[0] != eyeos.getCurrentUserName()) {
          //alert ('new message ' + data[1]);
          var obj = eyeos.sketch.ImportExport.createObjectsFromXML(data[1]);
          if (obj != null) {
            this.__svg.add(obj);
            obj.addListener("mousedown", function (e) {
		      actions.mouseDownOnObject(obj, e);
		    }, actions);
		  }
	    }
      }, this);
      
      bus.addListener('eyeos_sketch_delete', function (e)
      {
		var data = JSON.parse(e.getData());
		if (data[0] != eyeos.getCurrentUserName()) {
          //alert ('delete message ' + data[1]);
          var obj = eyeos.sketch.ImportExport.getObjectById(this.__svg, data[1]);
          if (obj != null) {
			obj.free();
          }
	    }
      }, this);
      
      bus.addListener('eyeos_sketch_change', function (e)
      {
		var data = JSON.parse(e.getData());
		if (data[0] != eyeos.getCurrentUserName()) {
          //alert ('change message ' + data[1]);
          var newobj = eyeos.sketch.ImportExport.createObjectsFromXML(data[1]);
          if (newobj != null) {
			var oldobj = eyeos.sketch.ImportExport.getObjectById(this.__svg,
			  newobj.getAttribute('id'));
            if (oldobj != null) {
			  var pos = this.__svg.indexOf(oldobj);
			  oldobj.free();
			  oldobj.dispose();
			  
			  this.__svg.addAt(newobj, pos);
              newobj.addListener("mousedown", function (e) {
		        actions.mouseDownOnObject(newobj, e);
		      }, actions);
            }
		  }
	    }
      }, this);
    }
  }
});


