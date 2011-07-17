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
 * A marker is a symbol which can be attached to one or more vertices of {@link Path},
 * {@link Line}, {@link Polyline} or {@link Polygon} elements. Typically, markers
 * are used to make arrowheads or polymarkers.
 * 
 * To indicate that a particular ‘marker’ element should be rendered at the
 * vertices of a particular element, set one or more marker properties
 * to reference the marker element.
 * 
 * @see svg.paint.MMarkerProperties 
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/painting.html#Markers</li>
 * </ul>
 */
qx.Class.define("svg.paint.Marker",
{
  extend : svg.core.Element,
  
  include : [ svg.paint.MFillProperties,
              svg.paint.MStrokeProperties,
              svg.coords.MTransform,
              svg.coords.MViewBox,
              svg.coords.MPreserveAspectRatio ],

  construct : function() {
    this.base(arguments, "marker");
  },
  
  properties :
  {
    /**
     * Defines the coordinate system used by {@link #markerWidth},
     * {@link #markerHeight}, and the contents of the marker.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerUnitsAttribute</li>
     * </ul>
     */
    markerUnits : {
      nullable: true,
      init: null,
      apply: "__applyMarkerUnits",
      check: ["strokeWidth", "userSpaceOnUse"],
      event: "changeMarkerUnits"
    },
    
    /**
     * The x-axis coordinate of the reference point.
     * 
     * The coordinate is defined in the coordinate system after application
     * of the {@link svg.coords.MViewBox#viewBox} and 
     * {@link svg.coords.MPreserveAspectRatio} attributes.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerElementRefXAttribute</li>
     * </ul>
     */
    refX : {
      nullable: true,
      init: null,
      apply: "__applyRefX",
      check: "Number",
      event: "changeRefX"
    },
    
    /**
     * The y-axis coordinate of the reference point.
     * 
     * The coordinate is defined in the coordinate system after application
     * of the {@link svg.coords.MViewBox#viewBox} and 
     * {@link svg.coords.MPreserveAspectRatio} attributes.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerElementRefYAttribute</li>
     * </ul>
     */
    refY : {
      nullable: true,
      init: null,
      apply: "__applyRefY",
      check: "Number",
      event: "changeRefY"
    },
    
    /**
     * The width of the viewport into which the marker is to be fitted when it is rendered.
     * 
     * A value of zero disables rendering of the element.
     * If unspecified, the effect is as if a value of "3" were specified.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerWidthAttribute</li>
     * </ul>
     */
    markerWidth : {
      nullable: true,
      init: null,
      apply: "__applyMarkerWidth",
      check: "!isNaN(value) && value >= 0",
      event: "changeMarkerWidth"
    },
    
    /**
     * The height of the viewport into which the marker is to be fitted when it is rendered.
     * 
     * A value of zero disables rendering of the element.
     * If unspecified, the effect is as if a value of "3" were specified.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerHeightAttribute</li>
     * </ul>
     */
    markerHeight : {
      nullable: true,
      init: null,
      apply: "__applyMarkerHeight",
      check: "!isNaN(value) && value >= 0",
      event: "changeMarkerHeight"
    },
    
    /**
     * Indicates how the marker is rotated.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#OrientAttribute</li>
     * </ul>
     */
    orient : {
      nullable: true,
      init: null,
      apply: "__applyOrient",
      check: "!isNaN(value) || value == 'auto'",
      event: "changeOrient"
    }
    
  },

  members :
  {
    
    //applies markerUnits
    __applyMarkerUnits: function(value, old) {
      if (null == value) {
        this.removeAttribute("markerUnits");
      } else {
        this.setAttribute("markerUnits", value);
      }
    },

    //applies refX
    __applyRefX: function(value, old) {
      if (null == value) {
        this.removeAttribute("refX");
      } else {
        this.setAttribute("refX", value);
      }
    },

    //applies refY
    __applyRefY: function(value, old) {
      if (null == value) {
        this.removeAttribute("refY");
      } else {
        this.setAttribute("refY", value);
      }
    },

    //applies markerWidth
    __applyMarkerWidth: function(value, old) {
      if (null == value) {
        this.removeAttribute("markerWidth");
      } else {
        this.setAttribute("markerWidth", value);
      }
    },

    //applies markerHeight
    __applyMarkerHeight: function(value, old) {
      if (null == value) {
        this.removeAttribute("markerHeight");
      } else {
        this.setAttribute("markerHeight", value);
      }
    },

    //applies orient
    __applyOrient: function(value, old) {
      if (null == value) {
        this.removeAttribute("orient");
      } else {
        this.setAttribute("orient", value);
      }
    }
  }
});