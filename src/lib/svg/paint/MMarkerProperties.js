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
 * Add marker properties to shapes and paths that support markers.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerProperties</li>
 * </ul>
 */
qx.Mixin.define("svg.paint.MMarkerProperties",
{
  properties :
  {
  
    /**
     * The marker that must be drawn at the first vertex.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerStartProperty</li>
     * </ul>
     */
    markerStart: {
      nullable: true,
      init: null,
      apply: "__applyMarkerStart",
      event: "changeMarkerStart"      
    },

    /**
     * The marker that must be drawn at every other vertex
     * (i.e., every vertex except the first and last).
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerMidProperty</li>
     * </ul>
     */
    markerMid: {
      nullable: true,
      init: null,
      apply: "__applyMarkerMid",
      event: "changeMarkerMid"
    },

    /**
     * The marker that must be drawn at the last vertex.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerEndProperty</li>
     * </ul>
     */
    markerEnd: {
      nullable: true,
      init: null,
      apply: "__applyMarkerEnd",
      event: "changeMarkerEnd"
    },
    
    /**
     * The marker for all vertices on the given ‘path’ element or basic
     * shape. It is a short-hand for the three individual marker properties
     * {@link #markerStart}, {@link #markerMid}, {@link #markerEnd}.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#MarkerProperty</li>
     * </ul>
     */
    marker: {
      nullable: true,
      init: null,
      apply: "__applyMarker",
      event: "changeMarker"
    }
    
  },
  
  members :
  {
      
    //applies marker-start 
     __applyMarkerStart: function(value, old) {
      if (null == value) {
        this.removeAttribute("marker-start");
      } else {
        this.setAttribute("marker-start", value);
      }
    },
    
    //applies marker-mid
    __applyMarkerMid: function(value, old) {
      if (null == value) {
        this.removeAttribute("marker-mid");
      } else {
        this.setAttribute("marker-mid", value);
      }
    },
    
    //applies marker-end
    __applyMarkerEnd: function(value, old) {
      if (null == value) {
        this.removeAttribute("marker-end");
      } else {
        this.setAttribute("marker-end", value);
      }
    },
    
    //applies marker
    __applyMarker: function(value, old) {
      if (null == value) {
        this.removeAttribute("marker");
      } else {
        //should the other marker properties be reset here??
        //this.resetMarkerStart();
        //this.resetMarkerMid();
        //this.resetMarkerEnd();
        this.setAttribute("marker", value);
      }
    }
  }
});