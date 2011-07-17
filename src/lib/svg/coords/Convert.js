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
 * Utility class to convert coordinate systems.
 */
qx.Class.define("svg.coords.Convert",
{
  statics :
  {
    /**
     * Converts client (document) coordinates to svg userspace coordinates.
     *
     * This is the inverse of {@link #userspaceToClient}.
     *
     * @param el {svg.core.Element}
     *   Element of which to use coordinate system.
     *
     * @param clientx {Integer}
     *   x coordinate in client (pixels)
     *
     * @param clienty {Integer}
     *   y coordinate in client (pixels)
     *
     * @return {SVGPoint}
     *   An object with coordinates <code>x</code> and <code>y</code> in userspace.
     *
     */
    clientToUserspace : function(el, clientx, clienty) {
      var vp = el.getViewport() || el;
      var m = vp.getScreenCTM();

      var p = vp.createPoint();
      p.x = clientx;
      p.y = clienty;

      p = p.matrixTransform(m.inverse());
      return p;
    },

    /**
     * Converts svg userspace coordinates to client (document) coordinates.
     *
     * This is the inverse of {@link #clientToUserspace}.
     *
     * @param el {svg.core.Element}
     *   Element of which to use coordinate system.
     *
     * @param usX {Integer}
     *   x coordinate in userspace
     *
     * @param usY {Integer}
     *   y coordinate in userspace
     *
     * @return {SVGPoint}
     *   An object with coordinates <code>x</code> and <code>y</code> in client (document).
     */
    userspaceToClient : function(el, usX, usY) {
      var vp = el.getNearestViewport() || el;
      var m = vp.getScreenCTM();

      var p = vp.createPoint();
      p.x = usX;
      p.y = usY;

      p = p.matrixTransform(m);
      return p;
    }

  }

});