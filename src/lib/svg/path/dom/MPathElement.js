/* ************************************************************************

   Copyright:
     2010-2011  Martijn Evers

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martijn Evers (mevers)

************************************************************************ */

/**
 * Implements the SVGPathElement interface.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/paths.html#InterfaceSVGPathElement</li>
 * </ul>
 */
qx.Mixin.define("svg.path.dom.MPathElement", {

  members :
  {
    /**
     * Returns the user agent's computed value for the total length of the path
     * using the user agent's distance-along-a-path algorithm, as a distance
     * in the current user coordinate system.
     *
     * This is the implementation of:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#__svg__SVGPathElement__getTotalLength</li>
     * </ul>
     *
     * @return {Float} The total length of the path.
     */
    getTotalLength : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getTotalLength();
    },

    /**
     * Returns the (x,y) coordinate in user space which is distance units along the
     * path, utilizing the user agent's distance-along-a-path algorithm.
     *
     * This is the implementation of:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#__svg__SVGPathElement__getPointAtLength</li>
     * </ul>
     *
     * @param distance {Float}
     *   The distance along the path, relative to the start of
     *   the path, as a distance in the current user coordinate system.
     *
     * @return {SVGPoint} The returned point in user space.
     */
    getPointAtLength : function(distance) {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getPointAtLength(distance);
    },

    /**
     * Returns the index into pathSegList which is distance units along the
     * path, utilizing the user agent's distance-along-a-path algorithm.
     *
     * This is the implementation of:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#__svg__SVGPathElement__getPathSegAtLength</li>
     * </ul>
     *
     * @param distance {Float}
     *   The distance along the path, relative to the start of
     *   the path, as a distance in the current user coordinate system.
     *
     * @return {Double} The index of the path segment, where the first path segment is number 0.
     */
    getPathSegAtLength : function(distance) {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getPathSegAtLength(distance);
    }
  }
});