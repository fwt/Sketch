/* ************************************************************************

   Copyright:
     2010-2011  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)
     * Florian Wohlfart

************************************************************************ */

/**
 * A rectangle. Rounded rectangles can be achieved by setting appropriate values
 * for attributes rx and ry.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Rect",
{
  extend : svg.core.Element,
  
  include : [ svg.paint.MFillProperties,
              svg.paint.MStrokeProperties,
              svg.coords.MTransform,
              svg.core.dom.MLocatable ],

  construct : function() {
    this.base(arguments, "rect");
  },
  
  properties :
  {
    /**
     * x-coord of the rectangle.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementXAttribute</li>
     * </ul>
     */
    x : {
      nullable: true,
      init: null,
      apply: "__applyX",
      check: "Number",
      event: "changeX"
    },
    
    /**
     * y-coord of the rectangle.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementYAttribute</li>
     * </ul>
     */
    y : {
      nullable: true,
      init: null,
      apply: "__applyY",
      check: "Number",
      event: "changeY"
    },
    
    /**
     * Width of the rectangle.
     * A value of zero disables rendering of the element.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementWidthAttribute</li>
     * </ul>
     */
    width : {
      nullable: true,
      init: null,
      apply: "__applyWidth",
      check: "svg.core.Types.isLength(value)",
      event: "changeWidth"
    },
    
    /**
     * Height of the rectangle.
     * A value of zero disables rendering of the element.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementHeightAttribute</li>
     * </ul>
     */
    height : {
      nullable: true,
      init: null,
      apply: "__applyHeight",
      check: "svg.core.Types.isLength(value)",
      event: "changeWidth"
    },
    
    /**
     * For rounded rectangles, the x-axis radius of the ellipse used
     * to round off the corners of the rectangle.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementRXAttribute</li>
     * </ul>
     */
    roundX : {
      nullable: true,
      init: null,
      apply: "__applyRoundX",
      check: "svg.core.Types.isLength(value)",
      event: "changeRoundX"
    },
    
    /**
     * For rounded rectangles, the y-axis radius of the ellipse used
     * to round off the corners of the rectangle.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementRYAttribute</li>
     * </ul>
     */
    roundY : {
      nullable: true,
      init: null,
      apply: "__applyRoundY",
      check: "svg.core.Types.isLength(value)",
      event: "changeRoundY"
    }
    
    
  },

  members :
  {
    
    //applies x
    __applyX: function(value, old) {
      if (null == value) {
        this.removeAttribute("x");
        this.setBorderX(null);
      } else {
        this.setAttribute("x", value);
        this.setBorderX(value);
      }
    },
  
    //applies y
    __applyY: function(value, old) {
      if (null == value) {
        this.removeAttribute("y");
        this.setBorderY(null);
      } else {
        this.setAttribute("y", value);
        this.setBorderY(value);
      }
    },
  
    //applies width
    __applyWidth: function(value, old) {
      if (null == value) {
        this.removeAttribute("width");
        this.setBorderWidth(null);
      } else {
        this.setAttribute("width", value);
        this.setBorderWidth(value);
      }
    },
  
    //applies height
    __applyHeight: function(value, old) {
      if (null == value) {
        this.removeAttribute("height");
        this.setBorderHeight(value);
      } else {
        this.setAttribute("height", value);
        this.setBorderHeight(value);
      }
    },
  
    //applies rx
    __applyRoundX: function(value, old) {
      if (null == value) {
        this.removeAttribute("rx");
      } else {
        this.setAttribute("rx", value);
      }
    },
  
    //applies ry
    __applyRoundY: function(value, old) {
      if (null == value) {
        this.removeAttribute("ry");
      } else {
        this.setAttribute("ry", value);
      }
    },
    
    //apply border changes
    applyBorderChange: function() {
	  this.setX(this.getBorderX());
	  this.setY(this.getBorderY());
	  this.setWidth(this.getBorderWidth());
	  this.setHeight(this.getBorderHeight());
    }

  }
});
