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
 * Includes and renders an external image file. The image can be a raster 
 * image such as PNG or JPEG, or a file with MIME type of "image/svg+xml".
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#ImageElement</li>
 * </ul>
 *
 */
qx.Class.define("svg.struct.Image",
{
  extend : svg.core.Element,
  
  include : [ svg.coords.MTransform,
              svg.coords.MPreserveAspectRatio,
              svg.core.MHref,
              svg.coords.MViewBox ],

  construct : function() {
    this.base(arguments, "image");
  },
  
  properties :
  {
    /**
     * x-coord of the region into which the referenced document is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#ImageElementXAttribute</li>
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
     * y-coord of the region into which the referenced document is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#ImageElementYAttribute</li>
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
     * width of the region into which the referenced document is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#ImageElementWidthAttribute</li>
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
     * height of the region into which the referenced document is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#ImageElementHeightAttribute</li>
     * </ul>
     */
    height : {
      nullable: true,
      init: null,
      apply: "__applyHeight",
      check: "svg.core.Types.isLength(value)",
      event: "changeHeight"
    }
  },

  members :
  {
     //applies x
    __applyX: function(value, old) {
      if (null == value) {
        this.removeAttribute("x");
      } else {
        this.setAttribute("x", value);
      }
    },
  
    //applies y
    __applyY: function(value, old) {
      if (null == value) {
        this.removeAttribute("y");
      } else {
        this.setAttribute("y", value);
      }
    },
  
    //applies width
    __applyWidth: function(value, old) {
      if (null == value) {
        this.removeAttribute("width");
      } else {
        this.setAttribute("width", value);
      }
    },
  
    //applies height
    __applyHeight: function(value, old) {
      if (null == value) {
        this.removeAttribute("height");
      } else {
        this.setAttribute("height", value);
      }
    }
  }
});