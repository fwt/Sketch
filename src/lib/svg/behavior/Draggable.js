/* ************************************************************************

   Copyright:
     2010-2011  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * Makes any visible svg element draggable.
 * 
 * The required mouse listeners are attached to the element's parent.
 * 
 * _NOTE_
 * The current implementation will *overwrite* the *transform* attribute of the
 * element that's being dragged. This will be changed in the future.
 * 
 */
qx.Class.define("svg.behavior.Draggable",
{
  extend : qx.core.Object,

  /**
   * @param svgElement {svg.core.Element}
   *   Element that should become draggable. 
   */
  construct : function(svgElement)
  {
    this.base(arguments);

    this.__element = svgElement;
    
    this.__offsets = {x:0, y:0};
    this.__addListener();
    
    this.__convert = svg.coords.Convert.clientToUserspace; //shortcut to much used function
  },

  members :
  {
    __convert : null,
    __element : null,
    __mouseUpListenerId : null,
    __mouseDownListenerId : null,
    __mouseMoveListenerId : null,
    __lastMousePos : null,
    __offsets : null,

    /**
     * The SVG element made draggable.
     * 
     * @return {svg.core.Element}
     */
    getElement : function() {
      return this.__element;
    },

    /**
     * Adds listener(s) to start dragging.
     */
    __addListener : function()
    {
      //add mousedown listener
      this.__mouseDownListenerId = this.__element.addListener("mousedown", this.__onMouseDown, this);
    },

    /**
     * Handler for mousedown event.
     * 
     * @param e {qx.event.type.Mouse}
     *   Event object
     */
    __onMouseDown : function(e)
    {
      if (!e.isLeftPressed()) {
        return;
      }
      
      //convert mouse coordinates to userspace
      var curMousePos = this.__convert(this.__element, e.getDocumentLeft(), e.getDocumentTop());
      
      //store mouse coordinates
      this.__lastMousePos = {
        x : curMousePos.x,
        y : curMousePos.y
      };
      
      var parent = this.__element.getParent();
        
      // add "mousemove" event listener
      this.__mouseMoveListenerId = parent.addListener("mousemove", this.__onMouseMove, this);
        
      // add "mouseup" event listener
      this.__mouseUpListenerId = parent.addListener("mouseup", this.__onMouseUp, this);
        
      parent.capture();
    },

    /**
     * Handler for mouseup event.
     * 
     * @param e {qx.event.type.Mouse}
     *   Event object
     */
    __onMouseUp : function(e)
    {
      try {
        e.stopPropagation();
      }
      catch (ex) {}
      
      var parent = this.__element.getParent();

      //remove mousemove listener
      parent.removeListenerById(this.__mouseMoveListenerId);
      this.__mouseMoveListenerId = null;
      
      //remove mousedown listener
      parent.removeListenerById(this.__mouseUpListenerId);
      this.__mouseUpListenerId = null;
      
      parent.releaseCapture();
      
    },

    /**
     * Handler for mousemove event.
     * 
     * @param e {qx.event.type.Mouse}
     *   Event object
     */
    __onMouseMove : function(e)
    {
      e.stopPropagation();
      
      var curMousePos = this.__convert(this.__element, e.getDocumentLeft(), e.getDocumentTop());
      var lastMousePos = this.__lastMousePos;

      //calculate new offsets by adding delta's 
      this.__offsets.x += curMousePos.x - lastMousePos.x;
      this.__offsets.y += curMousePos.y - lastMousePos.y;
      
      //apply new offsets to element
      this.__element.setAttribute("transform", "translate(" + this.__offsets.x + "," + this.__offsets.y + ")");
      
      //store current mouse position as last know mouse position
      this.__lastMousePos = curMousePos;
    }

  },


  /* ******************************************************
   *    DESTRUCT
   * ******************************************************/
  destruct : function() {
    
    if (null !== this.__mouseUpListenerId) {
      this.__element.removeListenerById(this.__mouseUpListenerId);
      this.__mouseUpListenerId = null;
    }
    if (null !== this.__mouseDownListenerId) {
      this.__element.removeListenerById(this.__mouseDownListenerId);
      this.__mouseDownListenerId = null;
    }
    if (null !== this.__mouseMoveListenerId) {
      this.__element.removeListenerById(this.__mouseMoveListenerId);
      this.__mouseMoveListenerId = null;
    }
    
    this.__element = null;
    this.__offsets = null;
    this.__lastMousePos = null;
    this.__convert = null;
  }
});
