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
 * Implements the SVGSVGElement interface.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#InterfaceSVGSVGElement</li>
 * </ul>
 */
qx.Mixin.define("svg.struct.dom.MSvgElement", {

  members :
  {
    /**
     * Creates an SVGNumber object outside of any document trees.
     * Initialized to 0.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGNumber</li>
     * </ul>
     * 
     * @return {SVGNumber}
     */
    createNumber : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGNumber();
    },
    
    /**
     * Creates an SVGLength object outside of any document trees.
     * Initialized to 0.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGLength</li>
     * </ul>
     * 
     * @return {SVGLength}
     */
    createLength : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGLength();
    },
    
    /**
     * Creates an SVGAngle object outside of any document trees.
     * Initialized to 0 degrees.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGAngle</li>
     * </ul>
     * 
     * @return {SVGAngle}
     */
    createAngle : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGAngle();
    },
    
    /**
     * Creates an SVGPoint object outside of any document trees.
     * Initialized to the point (0,0) in the user coordinate system.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGPoint</li>
     * </ul>
     * 
     * @return {SVGPoint}
     */
    createPoint : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGPoint();
    },
    
    /**
     * Creates an SVGMatrix object outside of any document trees.
     * Initialized to the *identity* matrix.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGMatrix</li>
     * </ul>
     * 
     * @return {SVGMatrix}
     */
    createMatrix : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGMatrix();
    },
    
    /**
     * Creates an SVGRect object outside of any document trees.
     * Initialized to 0,0,0,0.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGRect</li>
     * </ul>
     * 
     * @return {SVGRect}
     */
    createRect : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGRect();
    },
    
    /**
     * Creates an SVGTransform object outside of any document trees.
     * Initialized to an identity matrix transform.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGTransform</li>
     * </ul>
     *  
     * @return {SVGTransform}
     */
    createTransform : function() {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGTransform();
    },
    
    /**
     * Creates an SVGTransform object outside of any document trees, which is initialized to the
     * given matrix transform.
     * 
     * Initialized to the given matrix transform. 
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#__svg__SVGSVGElement__createSVGTransformFromMatrix</li>
     * </ul>
     * 
     * @param matrix {SVGMatrix}
     *   The transform matrix.
     * 
     * @return {SVGTransform}
     */
    createTransformFromMatrix : function(matrix) {
      if ((qx.core.Environment.get("qx.debug"))) {
        svg.core.Assert.assertElementInDocTree(this);
      }
      return this.getDomElement().createSVGTransformFromMatrix(matrix);
    }
    
  }
});