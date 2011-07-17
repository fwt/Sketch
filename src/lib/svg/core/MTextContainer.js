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
 * Adds a getter and setter for the inner text (textContent) of SVG elements.
 */
qx.Mixin.define("svg.core.MTextContainer",
{
  members :
  {
    /**
     * Set the text content.
     *
     * @param value {String} value to set
     * @return {void}
     */
    setValue : function(value) {
      this.getDomElement().textContent = value;
    },


    /**
     * Get the text content.
     *
     * @return {String} TODOC
     */
    getValue : function() {
      return this.getDomElement().textContent;
    }
  }
});