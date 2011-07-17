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
 * Scaling transformation.
 */
qx.Class.define("svg.coords.transform.Scale",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    /**
     * X-scale factor.
     */
    xFactor : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    },
    
    /**
     * Y-scale factor. If set to null, it will be equal to the x-scale factor.
     */
    yFactor : {
      nullable: true,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    }
  },

  /**
   * 
   * @param svgElem {svg.struct.Svg}
   *   Any instance of SVG Element. May be null when not using matrix notation.
   *   
   * @param xFactor {Number?}
   *   X-scale factor.
   * 
   * @param yFactor {Number?}
   *   Y-scale factor. If not set, it will be equal to the xFactor.
   */
  construct : function(svgElem, xFactor, yFactor) {
    this.base(arguments, svgElem);
    this.initXFactor(xFactor || 0);
    this.initYFactor(yFactor || null);
  },
  
  members :
  {
    /**
     * Creates a string that describes the scaling,
     * in the format <code>scale(xfactor, yfactor)</code>
     * 
     * @return {String}
     */
    _composeString : function() {
      var str = "scale(" + this.getXFactor();
      str += null !== this.getYFactor() ? "," + this.getYFactor() : ""; 
      return str + ")";
    },
    
    /**
     * Creates the matrix that represents the scaling.
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {
      
      //create matrix object
      var matrix = this.getSvg().createMatrix();
      
      //set scale matrix
      matrix.a = this.getXFactor();
      matrix.b = 0;
      matrix.c = 0;
      matrix.d = this.getYFactor() || this.getXFactor();
      matrix.e = 0;
      matrix.f = 0;
      
      return matrix;
    },
    
    /**
     * Apply handler of all properties.
     */
    __applyProperty : function() {
      this._invalidateCache();
      this.fireEvent("change");
    }
  }
});