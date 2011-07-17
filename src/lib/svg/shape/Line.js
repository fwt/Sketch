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
 * A straight line segment.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElement</li>
 * </ul>
 *  
 */
qx.Class.define("svg.shape.Line",
{
  extend : svg.core.Element,
  
  include : [ svg.paint.MStrokeProperties,
              svg.coords.MTransform,
              svg.core.dom.MLocatable,
              svg.paint.MMarkerProperties ],

  construct : function() {
    this.base(arguments, "line");
  },
  
  properties :
  {
    /**
     * x-coord of the start of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementX1Attribute</li>
     * </ul>
     */
    x1: {
      nullable: true,
      init: null,
      apply: "__applyX1",
      check: "Number",
      event: "changeX1"
    },
    
    /**
     * y-coord of the start of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementY1Attribute</li>
     * </ul>
     */
    y1: {
      nullable: true,
      init: null,
      apply: "__applyY1",
      check: "Number",
      event: "changeY1"
    },
    
    /**
     * x-coord of the end of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementX2Attribute</li>
     * </ul>
     */
    x2: {
      nullable: true,
      init: null,
      apply: "__applyX2",
      check: "Number",
      event: "changeX2"
    },
    
    /**
     * y-coord of the end of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementY2Attribute</li>
     * </ul>
     */
    y2: {
      nullable: true,
      init: null,
      apply: "__applyY2",
      check: "Number",
      event: "changeY2"
    },
    
    /**
     * Line start coords (x1,y1).
     */
    start: {
      group: ["x1", "y1"]
    },
    
    /**
     * Line end coords (x2,y2).
     */
    end: {
      group: ["x2", "y2"]
    }
    
  },

  members :
  {
    
    //applies x1
    __applyX1: function(value, old) {
      if (null == value) {
        this.removeAttribute("x1");
      } else {
        this.setAttribute("x1", value);
      }
    },
  
    //applies y1
    __applyY1: function(value, old) {
      if (null == value) {
        this.removeAttribute("y1");
      } else {
        this.setAttribute("y1", value);
      }
    },
  
    //applies x2
    __applyX2: function(value, old) {
      if (null == value) {
        this.removeAttribute("x2");
      } else {
        this.setAttribute("x2", value);
      }
    },
  
    //applies y2
    __applyY2: function(value, old) {
      if (null == value) {
        this.removeAttribute("y2");
      } else {
        this.setAttribute("y2", value);
      }
    }
  
  }
});