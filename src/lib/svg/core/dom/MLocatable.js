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
 * Implements the SVGLocatable interface.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/types.html#InterfaceSVGLocatable</li>
 * </ul>
 */
qx.Mixin.define("svg.core.dom.MLocatable", {

  members :
  {

    /**
     * Gets the {@link svg.core.Element} which established the current viewport. This will often be the
     * nearest ancestor {@link svg.struct.Svg} element. 
     * 
     * Returns *null* if current element is the outermost svg element.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGLocatable__nearestViewportElement</li>
     * </ul>
     * 
     * @return {svg.core.Element}
     */
    getNearestViewport : function()
    {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.parentByDomElement(this.getDomElement().nearestViewportElement);      
    },
    
    /**
     * Gets farthest ancestor {@link svg.struct.Svg} element. _null_ if current element is the outermost svg element. 
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGLocatable__farthestViewportElement</li>
     * </ul>
     * 
     * @return {svg.struct.Svg}
     */
    getFarthestViewport : function()
    {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.parentByDomElement(this.getDomElement().farthestViewportElement);      
    },
    
    /**
     * Returns the bounding box of this element, after application of the transform attribute,
     * excluding strokes, clips, masks and filter effects.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGLocatable__getBBox</li>
     * </ul>
     * 
     * @return {SVGRect}
     *   A read-only map containing <code>x</code>, <code>y</code>, <code>width</code> and <code>height</code>.
     */
    getBoundingBox : function()
    {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getBBox();
    },
    
    /**
     * Gets the transformation matrix from current user units to the viewport coordinate system for the
     * nearest viewport element.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGLocatable__getCTM</li>
     * </ul>
     * 
     * @see #getNearestViewport
     * 
     * @return {SVGMatrix}
     */
    getCTM : function()
    {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getCTM();
    },
    
    /**
     * Gets the transformation matrix from current user units to the browser's notice of a "pixel".
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#__svg__SVGLocatable__getScreenCTM</li>
     * </ul>
     * 
     * @return {SVGMatrix}
     */
    getScreenCTM : function()
    {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getScreenCTM();
    },
    
    /**
     * Returns the transformation matrix from the user coordinate system on the current element
     * to the user coordinate system on the specified target element.
     * 
     * @param element {svg.core.Element}
     *   The target element.
     * 
     * @return {SVGMatrix}
     */
    getTransformToElement : function(element)
    {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().getTransformToElement(element.getDomElement());
    }
  }
  
});