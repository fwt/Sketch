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
 * Apply transformations to elements.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/coords.html#TransformAttribute</li>
 * </ul>
 */
qx.Mixin.define("svg.coords.MTransform",
{
  
  properties :
  {
    /**
     * A (list of) transformations which are applied in order.
     * 
     * The value can either be a string or an instance of {@link svg.coords.transform.Transformation}.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/coords.html#TransformAttribute</li>
     * </ul>
     */
    transform : {
      nullable: true,
      init: null,
      check: function(value) {
               return qx.lang.Type.isString(value) ||
                 value instanceof svg.coords.transform.Transformation;
             },
      apply: "__applyTransform",
      event: "changeTransform"
    },
    
    /**
     * Notation to use when setting the transform attribute.
     * 
     * Allowed values are:
     * <ul>
     *   <li><code>normal</code> - use normal notation, e.g. rotate(x,x)</li>
     *   <li><code>matrix</code> - use matrix notation, e.g. matrix(a,b,c,d,e,f)</li>
     * </ul>
     * 
     * This setting has no effect when {@link #transform} is a string.
     */
    transformMode : {
      nullable: false,
      init: "normal",
      check: ["normal", "matrix"],
      apply: "__applyTransformMode"
    }
  },
  
  events :
  {
    transformed : "qx.event.type.Event"
  },
  
  members :
  {

    //applies transform property
    __applyTransform: function(value, old) {

      this.__setTransformAttribute(value, this.getTransformMode());

      if (value instanceof svg.coords.transform.Transformation) {
        value.addListener("change", this.__changeTransformListener, this);
      }
      
      if (old instanceof svg.coords.transform.Transformation) {
        old.removeListener("change", this.__changeTransformListener, this);
      }
    },
    
    //applies transformMode property
    __applyTransformMode: function(value, old) {
      this.__setTransformAttribute(this.getTransform(), value);
      this.fireEvent("transformed");
    },
    
    /**
     * Sets the transform attribute of the element, either directly to
     * the specified string value or to the derived value from a
     * Transformation object.
     * 
     * @param value {svg.coords.transform.Transformation | String} 
     *   Value to set.
     * 
     * @param transformMode {String}
     *   Mode to use when setting value. See description of {@link #transformMode}
     *   for a list of valid values. 
     */
    __setTransformAttribute : function(value, transformMode) {
      if (null === value) {
        this.removeAttribute("transform");
        return;
      }
      
      if (value instanceof svg.coords.transform.Transformation) {
        switch (transformMode) {
          case "normal":
            this.setAttribute("transform", value.toString());
            return;
          case "matrix":
            this.setAttribute("transform", value.toMatrixString());
            return;
          default:
            qx.core.Assert.fail("Default case should be unreachable!", false);
        }
      }
      this.setAttribute("transform", value);
    },
    
    /**
     * Handler for _change_ event of Transformation object when the transform property
     * is set instance of {@link svg.coords.transform.Transformation}. 
     */
    __changeTransformListener: function() {
      this.__setTransformAttribute(this.getTransform(), this.getTransformMode());
      this.fireEvent("transformed");
    }
    
  }
});