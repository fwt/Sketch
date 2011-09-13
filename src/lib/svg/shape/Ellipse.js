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
 * An ellipse based on a center point and two radii.
 * 
 * The ellipse is axis-aligned with the current user coordinate system.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Ellipse",
{
  extend : svg.core.Element,
  
  include : [ svg.paint.MFillProperties,
              svg.paint.MStrokeProperties,
              svg.coords.MTransform,
              svg.core.dom.MLocatable ],

  construct : function() {
    this.base(arguments, "ellipse");
  },

  properties :
  {
    /**
     * The x-axis coordinate of the center of the ellipse.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementCXAttribute</li>
     * </ul>
     */
    cx : {
      nullable: true,
      init: null,
      apply: "__applyCx",
      check: "Number",
      event: "changeCx"
    },
    
    /**
     * The y-axis coordinate of the center of the ellipse.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementCYAttribute</li>
     * </ul>
     */
    cy : {
      nullable: true,
      init: null,
      apply: "__applyCy",
      check: "Number",
      event: "changeCy"
    },

    /**
     * The x-axis radius of the ellipse.
     * A value of zero disables rendering of the element.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementRXAttribute</li>
     * </ul>
     */
    radiusX : {
      nullable: true,
      init: null,
      apply: "__applyRadiusX",
      check: "!isNaN(value) && value >= 0",
      event: "changeRadiusX"
    },
    
    /**
     * The y-axis radius of the ellipse.
     * A value of zero disables rendering of the element.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementRYAttribute</li>
     * </ul>
     */
    radiusY : {
      nullable: true,
      init: null,
      apply: "__applyRadiusY",
      check: "!isNaN(value) && value >= 0",
      event: "changeRadiusY"
    },
    
    /**
     * Short-hand property for radiusX and radiusY.
     */
    radius : {
      group : ["radiusX", "radiusY"],
      mode : "shorthand"
    }
  },
  
  
  members :
  {
    
    //applies cx
    __applyCx: function(value, old) {
      if (null == value) {
        this.removeAttribute("cx");
        this.setBorderX(null);
      } else {
        this.setAttribute("cx", value);
        this.setBorderX(value - this.getRadiusX());
      }
    },
    
    //applies cy
    __applyCy: function(value, old) {
      if (null == value) {
        this.removeAttribute("cy");
        this.setBorderY(null);
      } else {
        this.setAttribute("cy", value);
        this.setBorderY(value - this.getRadiusY());
      }
    },

    //applies rx
    __applyRadiusX: function(value, old) {
      if (null == value) {
        this.removeAttribute("rx");
        this.setBorderX(null);
        this.setBorderWidth(null);
      } else {
        this.setAttribute("rx", value);
        this.setBorderX(this.getCx() - value);
        this.setBorderWidth(2 * value);
      }
    },

    //applies ry
    __applyRadiusY: function(value, old) {
      if (null == value) {
        this.removeAttribute("ry");
        this.setBorderY(null);
        this.setBorderHeight(null);
      } else {
        this.setAttribute("ry", value);
        this.setBorderY(this.getCy() - value);
        this.setBorderHeight(2 * value);
      }
    },
    
    //apply border changes
    applyBorderChange: function() {
	  // cache values
	  var borderX = this.getBorderX();
	  var borderY = this.getBorderY();
	  var borderWidth = this.getBorderWidth();
	  var borderHeight = this.getBorderHeight();
	  
	  this.setRadiusX(borderWidth / 2);
	  this.setRadiusY(borderHeight / 2);
	  this.setCx(borderX + this.getRadiusX());
	  this.setCy(borderY + this.getRadiusY());
    }
  }
});
