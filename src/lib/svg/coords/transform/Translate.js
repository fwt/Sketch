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
 * Translate transformation
 */
qx.Class.define("svg.coords.transform.Translate",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    /**
     * X-distance of translation. 
     */
    tx : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    },
    
    /**
     * Y-distance of translation.
     */
    ty : {
      nullable: false,
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
   * @param tx {Number?}
   *   X-distance of translation.
   *   
   * @param ty {Number?}
   *   Y-distance of translation.
   */
  construct : function(svgElem, tx, ty) {
    this.base(arguments, svgElem);
    this.initTx(tx || 0);
    this.initTy(ty || 0);
  },
  
  members :
  {
    
    /**
     * Creates a string that describes the translation.
     * in the format <code>translate(tx, ty)</code>.  
     * 
     * @return {String}
     */
    _composeString : function() {
      return "translate(" + this.getTx() + "," + this.getTy() + ")";
    },
    
    /**
     * Creates the matrix that represents the translation.
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {

      //create matrix object
      var matrix = this.getSvg().createMatrix();

      //create translation matrix
      matrix.a = 1;
      matrix.b = 0;
      matrix.c = 0;
      matrix.d = 1;
      matrix.e = this.getTx();
      matrix.f = this.getTy();
      
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