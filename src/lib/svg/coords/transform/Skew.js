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
 * Skew (shear) transformation.
 */
qx.Class.define("svg.coords.transform.Skew",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    /**
     * Skewing angle 
     */
    angle : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    },
    
    /**
     * Skewing mode (x or y axis) 
     */
    mode : {
      nullable: false,
      deferredInit: true,
      check: ["x", "y"],
      apply: "__applyProperty"
    }
  },

  /**
   * @param svgElem {svg.struct.Svg}
   *   Any instance of SVG Element. May be null when not using matrix notation.
   * 
   * @param angle {Number}
   *   Skewing angle.
   * 
   * @param mode {String?}
   *   Skewing mode. Must be <code>x</code> or <code>y</code>. Default <code>x</code>.
   */
  construct : function(svgElem, angle, mode) {
    this.base(arguments, svgElem);
    this.initAngle(angle);
    this.initMode(mode || "x");
  },
  
  members :
  {
    /**
     * Creates a string that describes the skewing transformation.
     * in the format <code>skewX(angle)</code> or <code>skewY(angle)</code>.  
     * 
     * @return {String}
     */
    _composeString : function() {
      
      switch (this.getMode()) {
        case "x":
          return "skewX(" + this.getAngle() + ")";
        case "y":
          return "skewY(" + this.getAngle() + ")";
        default:
          qx.core.Assert.fail("Default statement should be unreachable.", true);
      }
    },

    /**
     * Creates the matrix that represents the skewing transformation.
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {

      //get angle in rad
      var r = this.getAngle() * Math.PI / 180;

      //create matrix object
      var matrix = this.getSvg().createMatrix();
      
      switch (this.getMode()) {
        case "x":
          matrix.a = 1;
          matrix.b = 0;
          matrix.c = Math.tan(r).toFixed(10);
          matrix.d = 1;
          matrix.e = 0;
          matrix.f = 0;
          break;
        case "y":
          matrix.a = 1;
          matrix.b = Math.tan(r).toFixed(10);
          matrix.c = 0;
          matrix.d = 1;
          matrix.e = 0;
          matrix.f = 0;
          break;
        default:
          qx.core.Assert.fail("Default statement should be unreachable.", true);
      }
      
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