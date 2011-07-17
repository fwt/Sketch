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
 * Properties for text decorations.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/text.html#TextDecorationProperties</li>
 * </ul>
 */
qx.Mixin.define("svg.text.MTextDecoration", {
  
  properties :
  {
    /**
     * Underline, overline, strikethrough and blinking.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextDecorationProperty</li>
     * </ul>
     */
    textDecoration : {
      nullable: true,
      init: null,
      check: ["underline", "overline", "line-through", "blink", "inherit"],
      apply: "__applyTextDecoration",
      event: "changeTextDecoration"
    }
  
  },
  
  members :
  {
    //applies text-decoration
    __applyTextDecoration: function(value, old) {
      if (null == value) {
        this.removeAttribute("text-decoration");
      } else {
        this.setAttribute("text-decoration", value);
      }
    }
  }
  
});