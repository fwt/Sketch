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
 * A widget that embeds an SVG drawing.
 */
qx.Class.define("svg.embed.Svg",
{
  extend : qx.ui.core.Widget,
   
  construct : function()
  {
    this.__svg = new svg.struct.Svg();
    this.base(arguments);
    this.setBackgroundColor("white");
  },

  members :
  {
    __svg : null,

    /**
     * Overrides {@link qx.ui.core.Widget#_createContentElement}
     *
     * @return {svg.struct.Svg}
     */
    _createContentElement : function() {
      return this.__svg;
    },


    /**
     * Gets the SVG root element of the drawing.
     *
     * @return {svg.struct.Svg}
     *   The SVG document fragment that is the root of the widget's content.
     */
    getSvg : function() {
      return this.__svg;
    }
  },

  destruct : function() {
    this._disposeObjects("__svg");
  }
});