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
 * A list of transformations, that can be handled as a single unit.
 */
qx.Class.define("svg.coords.transform.TransformList",
{
  extend : svg.coords.transform.Transformation,
  
  properties : 
  {
    /**
     * Whether or not to multiply matrices when using matrix notation.
     * 
     * <ul>
     *   <li>concat - matrix string results a concatenated list matrices</li>
     *   <li>multiply - matrix string results in a single matrix that is the product
     *   of all underlying transformation matrices</li>
     * </ul>
     * 
     * This setting is ignored when using normal string notation.
     */
    matrixMode : {
      nullable: false,
      deferredInit: true,
      check: ["concat", "multiply"],
      apply: "__onPropertyChange"
    }
  },

  /**
   * @param svgElem {svg.struct.Svg}
   *   Any instance of SVG Element. May be null when not using matrix notation.
   * 
   * @param matrixMode {String?}
   *   Matrix mode. Can be <code>concat</code> (default) or <code>multiply</code>.
   *   See description of {@link #matrixMode} property for more information.
   */
  construct : function(svgElem, matrixMode) {
    this.base(arguments, svgElem);
    this.initMatrixMode(matrixMode || "concat");
    this.__array = new qx.data.Array();
    this.__array.addListener("change", this.__onArrayChange, this);
  },
  
  members :
  {
    /**
     * Internal qooxdoo array that will contain the transformation.
     * @type qx.data.Array 
     */
    __array : null,
    
    /**
     * Handler for array change event.
     */
    __onArrayChange : function() {
      this._invalidateCache();
      this.fireEvent("change");
    },
    
    /**
     * Handler for change event of array elements.  
     */
    __onArrayElementChange : function() {
      this._invalidateCache();
      this.fireEvent("change");
    },
    
    /**
     * Apply handler of all properties.
     */
    __onPropertyChange : function() {
      this._invalidateCache();
      this.fireEvent("change");
    },
    
    /**
     * Creates a string that describes the transformation list.
     * 
     * @return {String}
     */
    _composeString : function() {
      var str = "";
      
      for (var i=0,j=this.__array.getLength(); i<j; i++) {
        str += this.__array.getItem(i).toString() + " ";
      }
      return qx.lang.String.trim(str);
    },

    /**
     * Creates a matrix that is the product of all underlying
     * transformation matrices.
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {
      //get matrix object (initialized to the identity matrix)
      var mx = this.getSvg().createMatrix();

      //multiply matrix by each transformation in this group
      for (var i=0,j=this.__array.getLength(); i<j; i++) {
        mx = mx.multiply(this.__array.getItem(i).toMatrix());
      }
      
      //return product matrix
      return mx;
    },
    
    /**
     * Returns the transformation as a matrix string. Depending on the value of
     * the {@link #matrixMode} property, one of the following is returned:
     * 
     * <ul>
     *   <li>
     *     *concat* - returns a list of matrix transformations, for example:
     *     _matrix(a1,b1,c1,d1,e1,f1) matrix(a2,b2,c2,d2,e2,f2)_
     *   </li>
     *   <li>
     *     *multiply* - returns a single matrix transformation, that is the
     *     product of all transformations in the TranformList.
     *   </li>
     * </ul>
     * 
     * @return {String}
     */
    toMatrixString : function() {
      
      switch (this.getMatrixMode())
      {
        case "expand":
          var str = "";
          for (var i=0,j=this.__array.getLength(); i<j; i++) {
            str += this.__array.getItem(i).toMatrixString() + " ";
          };
          this._asMatrixString = str;
          this._cachedMatrixString = true;
          return qx.lang.String.trim(str);
          
        case "concat":
          var mx = this.toMatrix();
          this._asMatrixString = "matrix("+ mx.a+","+mx.b+","+mx.c+","+mx.d+","+mx.e+","+mx.f+")";
          this._cachedMatrixString = true;
          return this._asMatrixString;
          
        default:
          qx.core.Assert.fail("Default statement should be unreachable.", true);
      }
      
    },
    
    /* *****************************************************
     * Wrappers for qx.data.Array
     ***************************************************** */
    
    /**
     * Check if the given transformation is in the transform list.
     * 
     * @param transformation {svg.coords.transform.Transformation}
     *   The transformation which is possibly in the list.
     *  
     * @return {Boolean}
     *   True, if the list contains the given transformation.
     */
    contains : function(transformation) {
      return this.__array.contains(transformation);
    },
    
    /**
     * Get the transformation at the given index from the list. 
     * 
     * @param index {Number}
     *   Index of transformation to get.
     * 
     * @return {svg.coords.transform.Transformation}
     *   Transformation at given index.
     */
    getItem : function(index) {
      return this.__array.getItem(index);
    },
    
    /**
     * Get the number of transformations in the list.
     * 
     * @return {Number}
     */
    getLength : function() {
      return this.__array.getLength();
    },
    
    /**
     * Get the index in the list of the given transformation.
     * 
     * @param transformation {svg.coords.transform.Transformation}
     *   The transformation to find.
     * 
     * @return {Number}
     *   Index in the list.
     */
    indexOf : function(transformation) {
      return this.__array.indexOf(transformation);
    },
    
    /**
     * Insert a transformation into the list after the given transformation.
     * 
     * @param after {svg.coords.transform.Transformation}
     *   Insert after this transformation.
     * 
     * @param transformation {svg.coords.transform.Transformation}
     *   Transformation to insert.
     */
    insertAfter : function(after, transformation) {
      this.__array.insertAfter(after, transformation);
      transformation.addListener("change", this.__onArrayElementChange, this);
    },
    
    /**
     * Insert a transformation at the given position.
     * 
     * @param index {Number}
     *   Position where to insert the transformation.
     *    
     * @param transformation {svg.coords.transform.Transformation}
     *   Transformation to insert.
     */
    insertAt : function(index, transformation) {
      this.__array.insertAt(index, transformation);
      transformation.addListener("change", this.__onArrayElementChange, this);
    },
    
    /**
     * Insert a transformation into the list before the given transformation.
     * 
     * @param before {svg.coords.transform.Transformation}
     *   Insert before this transformation.
     * 
     * @param transformation {svg.coords.transform.Transformation}
     *   Transformation to insert.
     */
    insertBefore : function(before, transformation) {
      this.__array.insertBefore(before, transformation);
      transformation.addListener("change", this.__onArrayElementChange, this);
    },
    
    /**
     * Removes and returns last transformation in the list.
     * 
     * @return {svg.coords.transform.Transformation}
     *   The last transformation in the list.
     * 
     */
    pop : function() {
      var transformation = this.__array.pop();
      transformation.removeListener("change", this.__onArrayElementChange, this);
      return transformation;
    },

    /**
     * Adds one or more transformations at the end of the list.
     * 
     * @param varargs {varargs}
     *   Multiple transformations. Every transformation will be added to the end
     *   of the list.
     */
    push : function(varargs) {
      this.__array.push.apply(this.__array, arguments);
      for (var i=0,j=arguments.length; i<j; i++) {
        arguments[i].addListener("change", this.__onArrayElementChange, this);
      }
    },
    
    /**
     * Remove a transformation from the list.
     * 
     * @param transformation {svg.coords.transform.Transformation}
     *   Transformation to remove.
     *    
     * @return {svg.coords.transform.Transformation}
     *   The removed transformation.
     */
    remove : function(transformation) {
      transformation.removeListener("change", this.__onArrayElementChange, this);
      return this.__array.remove(transformation);
    },
    
    /**
     * Remove all transformations from the list.
     * 
     * @return {Array}
     *   A native array containing the removed transformations. 
     */
    removeAll : function() {
      var removed = this.__array.removeAll();
      for (var i=0,j=removed.length; i<j; i++) {
        removed[i].removeListener("change", this.__onArrayElementChange, this);
      }
      return removed;
    },
    
    /**
     * Remove a transformation from the list at the given position.
     * 
     * @param index {Number}
     *   Index of transformation to be removed.
     *    
     * @return {svg.coords.transform.Transformation}
     *   The removed transformation.
     */
    removeAt : function(index) {
      this.__array.getItem(index).removeListener("change", this.__onArrayElementChange, this);
      return this.__array.removeAt(index);
    },
    
    /**
     * Reverse the order of the transform list.
     */
    reverse : function() {
      this.__array.reverse();
    },
    
    /**
     * Set the transformation at the given index.
     * 
     * @param index {Number}
     *   Index of the tranformation.
     *   
     * @param transformation {svg.coords.transform.Transformation}
     *   Transformation to set.
     */
    setItem : function(index, transformation) {
      this.__array.getItem(index).removeListener("change", this.__onArrayElementChange, this);
      this.__array.setItem(index, transformation);
      transformation.addListener("change", this.__onArrayElementChange, this);
    },
    
    /**
     * Removes the first transformation from the list and returns it.
     * 
     * @return {svg.coords.transform.Transformation}
     *   The first transformation in the list.
     */
    shift : function() {
      var tf = this.__array.shift();
      tf.removeListener("change", this.__onArrayElementChange, this);
      return tf;
    },
    
    /**
     * Adds the given transformations to the beginning of the list.
     * 
     * @param varargs {varargs}
     *   Multiple transformations. Every transformation will be added to the beginning
     *   of the list.
     */
    unshift : function(varargs) {
      this.__array.unshift.apply(this.__array, arguments);
      for (var i=0,j=varargs.length; i<j; i++) {
        arguments[i].addListener("change", this.__onArrayElementChange, this);
      }
    }
   
  },
  
  destruct : function() {
    this._disposeObjects("__array");
  }
  
});