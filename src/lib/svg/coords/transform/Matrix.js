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
/* **
#ignore(SVGMatrix)
*/

/**
 * Matrix transformation.
 */
qx.Class.define("svg.coords.transform.Matrix",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    /**
     * The matrix to be wrapped by this transformation.
     * 
     * The value must be an instance of SVGMatrix.
     * Such an instance can be created with {@link svg.struct.Svg#createMatrix}.
     * 
     * Example code:
     * <pre>
     * var matrix = svgWidget.getSvg().createMatrix();
     * matrix.e = 300;
     * matrix.f = 100;
     * 
     * var transformation = new svg.coords.transform.Matrix(matrix);
     * 
     * someElement.setTransform(transformation);
     * </pre>
     */
    matrix : {
      nullable: false,
      deferredInit: true,
      check: "value instanceof SVGMatrix",
      apply: "__applyProperty"
    }
  },

  /**
   * @param matrix {SVGMatrix}
   *   The matrix to be wrapped by this transformation. For more info, see
   *   the description of the {@link #matrix} property.
   */
  construct : function(matrix) {
    this.base(arguments);
    this.initMatrix(matrix);
  },
  
  members :
  {
    /**
     * Creates a string that describes the transformation.
     * 
     * @return {String}
     */
    _composeString : function() {
      return this.toMatrixString();
    },
    
    /**
     * Creates a matrix that represents the transformation.
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {
      return this.getMatrix();
    },
    
    //apply matrix property
    __applyProperty : function() {
      this._invalidateCache();
      this.fireEvent("change");
    }
  }
});