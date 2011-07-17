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
 * A closed shape consisting of a set of connected straight line segments.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#PolygonElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Polygon",
{
  extend : svg.core.Element,
  
  include : [ svg.paint.MFillProperties,
              svg.paint.MStrokeProperties,
              svg.coords.MTransform,
              svg.core.dom.MLocatable,
              svg.paint.MMarkerProperties ],

  construct : function() {
    this.base(arguments, "polygon");
  },
  
  properties : {
    
    /**
     * The points that make up the polygon. All coordinate values are in the
     * user coordinate system.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#PolygonElementPointsAttribute</li>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#PointsBNF</li>
     * </ul>
     */
    points : {
      nullable: true,
      init: null,
      apply: "__applyPoints",
      check: "String",
      event: "changePoints"
    }
  },

  members :
  {
    
    //applies points
    __applyPoints: function(value, old) {
      if (null == value) {
        this.removeAttribute("points");
      } else {
        this.setAttribute("points", value);
      }
    }
  }
});