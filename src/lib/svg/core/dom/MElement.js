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
 * Implements the SVGElement interface.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/types.html#InterfaceSVGElement</li>
 * </ul>
 */
qx.Mixin.define("svg.core.dom.MElement", {

  members :
  {

    /**
     * Gets the nearest ancestor SVG element. Returns null if the current element
     * is the outermost svg element.
     *
     * This is the implementation of:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGElement__ownerSVGElement</li>
     * </ul>
     *
     * @return {svg.struct.Svg | null}
     */
    getOwnerSVG : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.parentByDomElement(this.getDomElement().ownerSVGElement);
    },

    /**
     * Gets the {@link svg.core.Element} which established the current viewport. This is often the same as
     * the nearest ancestor svg element.
     *
     * Returns _null_ when this element is the outermost svg element.
     *
     * This is the implementation of:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGElement__viewportElement</li>
     * </ul>
     *
     * @return {svg.core.Element}
     */
    getViewport : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.parentByDomElement(this.getDomElement().viewportElement);
    }
  }
});