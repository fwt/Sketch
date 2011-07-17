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
 * Add filling properties to elements that can be filled (which means painting
 * the interior of the object).
 *
 * With SVG, you can paint (i.e., fill or stroke) with:
 * <ul>
 *   <li>a single color</li>
 *   <li>a solid color with opacity</li>
 *   <li>a gradient (linear or radial)</li>
 *   <li>a pattern (vector or image, possibly tiled)</li>
 *   <li>custom paints available via extensibility</li>
 * </ul>
 *
 * SVG uses the general notion of a paint server. Paint servers are specified
 * using a URI reference on a 'fill' property. Gradients, patterns
 * and solid colors are just specific types of paint servers.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/painting.html#FillProperties</li>
 * </ul>
 */
qx.Mixin.define("svg.paint.MFillProperties",
{

  properties :
  {

    /**
     * The paint used for filling the interior.
     * The interior is determined according to the rules associated with the
     * current value of the {@link #fillRule} property.
     *
     * Example usage:
     *
     * <pre>
     * myShape.setFill(patternElement);
     * myShape.setFill("black");
     * myShape.setFill("#1044A6");
     * myShape.setFill("url(#myGradient)");
     * </pre>
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#FillProperty</li>
     * </ul>
     */
    fill: {
      nullable: true,
      init: null,
      apply: "__applyFill",
      event: "changeFill"
    },

    /**
     * The algorithm used to determine the interior.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#FillRuleProperty</li>
     * </ul>
     */
    fillRule: {
      nullable: true,
      init: null,
      apply: "__applyFillRule",
      check: ["nonzero", "evenodd", "inherit"],
      event: "changeFillRule"
    },

    /**
     * The opacity of the interior.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#FillOpacityProperty</li>
     * </ul>
     */
    fillOpacity: {
      nullable: true,
      init: null,
      apply: "__applyFillOpacity",
      check: "!isNaN(value) && value >= 0 && value <= 1",
      event: "changeFillOpacity"
    }

  },

  members :
  {

    //applies fill
    __applyFill : function(value, old) {

      if (null == value) {
        this.removeAttribute("fill");
        return;
      }
      if (value instanceof svg.core.Element) {
        value = value.getFuncIri();
      }
      this.setAttribute("fill", value);
    },

    //applies fill-rule
    __applyFillRule : function(value, old) {
      if (null == value) {
        this.removeAttribute("fill-rule");
      } else {
        this.setAttribute("fill-rule", value);
      }
    },

    //applies fill-opacity
    __applyFillOpacity : function(value, old) {
      if (null == value) {
        this.removeAttribute("fill-opacity");
      } else {
        this.setAttribute("fill-opacity", value);
      }
    }

  }
});