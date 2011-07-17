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
 * Rotation transformation.
 */
qx.Class.define("svg.coords.transform.Rotate",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    /**
     * Rotation angle (in degrees)
     */
    angle : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    },
    
    /**
     * X-coordinate of rotation point.
     */
    cx : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    },
    
    /**
     * Y-coordinate of rotation point.
     */
    cy : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "__applyProperty"
    }
  },

  /**
   * @param svgElem {svg.struct.Svg}
   *   Any instance of SVG Element. May be null when not using matrix notation.
   * 
   * @param angle {Number}
   *   Angle (in degrees) for rotation.
   * 
   * @param cx {Number?}
   *   X-coord of point to rotate around (default 0).
   * 
   * @param cy {Number?}
   *   Y-coord of point to rotate around (default 0).
   */
  construct : function(svgElem, angle, cx, cy) {
    this.base(arguments, svgElem);
    this.initAngle(angle);
    this.initCx(cx || 0);
    this.initCy(cy || 0);
  },
  
  members :
  {
    /**
     * Creates a string that describes the rotation.
     * in the format <code>rotate(angle, cx, cy)</code>
     * 
     * @return {String}
     */
    _composeString : function() {
      var str = "rotate(" + this.getAngle();
      
      if ((0 !== this.getCx()) || (0 !== this.getCy())) {
        str += "," + this.getCx() + "," + this.getCy();
      }
      return str + ")";
    },
    
    /**
     * Creates the matrix that represents the rotation.
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {

      //get angle in rad
      var r = this.getAngle() / 180 * Math.PI;
      
      qx.core.Assert.assertEquals(this.getCx(), 0, "Matrix rotate around point other than origin is not supported (yet).");
      qx.core.Assert.assertEquals(this.getCy() || 0, 0, "Matrix rotate around point other than origin is not supported (yet).");
      
      //create matrix object
      var matrix = this.getSvg().createMatrix();

      //set rotation matrix
      matrix.a = Math.cos(r).toFixed(10);
      matrix.b = Math.sin(r).toFixed(10);
      matrix.c = -1 * Math.sin(r).toFixed(10);
      matrix.d = Math.cos(r).toFixed(10);
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