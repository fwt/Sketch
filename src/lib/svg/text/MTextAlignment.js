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
 * Properties for text alignment.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/text.html#TextAlignmentProperties</li>
 * </ul>
 */
qx.Mixin.define("svg.text.MTextAlignment", {
  
  properties :
  {
    /**
     * Text alignment.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextAnchorProperty</li>
     * </ul>
     */
    textAnchor : {
      nullable: true,
      init: null,
      check: ["start", "middle", "end"],
      apply: "__applyTextAnchor",
      event: "changeTextAnchor"
    }

  },
  
  members :
  {
    //applies text-anchor
    __applyTextAnchor: function(value, old) {
      if (null == value) {
        this.removeAttribute("text-anchor");
      } else {
        this.setAttribute("text-anchor", value);
      }
    }
  }
  
});