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
 * The use element references another element and includes/draws it
 * at that given point in the document.
 * 
 * Any {@link Svg}, {@link Symbol}, {@link Group}, graphics element or other
 * use element is potentially a template object that can be reused ("instanced"). 
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#UseElement</li>
 * </ul>
 */
qx.Class.define("svg.struct.Use",
{
  extend : svg.core.Element,
  
  include : [ svg.core.MHref,
              svg.core.dom.MElement,
              svg.core.dom.MLocatable
            ],

  construct : function() {
    this.base(arguments, "use");
  },
  
  properties :
  {
    /**
     * x-coord of the region into which the referenced element is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementXAttribute</li>
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
     * y-coord of the region into which the referenced element is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementYAttribute</li>
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
     * width of the region into which the referenced element is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementWidthAttribute</li>
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
     * height of the region into which the referenced element is placed.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementHeightAttribute</li>
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