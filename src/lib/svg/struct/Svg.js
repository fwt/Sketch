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
 * An SVG document fragment.
 *
 * The SVG element is the root element of any SVG document. It can also appear
 * in the middle of SVG content. This allows SVG document fragments to be
 * embedded within other SVG document fragments.
 *
 * The SVG element can also be used to establish a new viewport.
 *
 * More info:
 * <ul>
 *   <li><b>SVG element:</b> http://www.w3.org/TR/SVG/struct.html#SVGElement</li>
 *   <li><b>Viewport:</b> http://www.w3.org/TR/SVG/coords.html#EstablishingANewViewport</li>
 *  </ul>
 */
qx.Class.define("svg.struct.Svg",
{
  extend : svg.core.Element,

  include : [ svg.coords.MViewBox,
              svg.coords.MPreserveAspectRatio,
              svg.struct.dom.MSvgElement,
              svg.core.dom.MLocatable ],

  construct : function()
  {
    this.base(arguments, "svg");

    this.setAttributes({
      "version"     : "1.1",
      "baseProfile" : "full",
      "xmlns"       : "http://www.w3.org/2000/svg",
      "xmlns:xlink" : "http://www.w3.org/1999/xlink",
      "xmlns:ev"    : "http://www.w3.org/2001/xml-events"
    });

  },

  properties :
  {
    /**
     * The x-axis coordinate of one corner of the rectangular region into which an embedded
     * 'svg' element is placed. If the attribute is not specified, the effect is as if a
     * value of "0" were specified.
     *
     * Has no meaning or effect on outermost 'svg' elements.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#SVGElementXAttribute</li>
     * </ul>
     */
    x : {
      nullable: true,
      init: null,
      apply: "__applyX",
      check: "Number",
      event: "changeX"
    },

    /**
     * The y-axis coordinate of one corner of the rectangular region into which an embedded
     * 'svg' element is placed. If the attribute is not specified, the effect is as if a
     * value of "0" were specified.
     *
     * Has no meaning or effect on outermost 'svg' elements.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#SVGElementYAttribute</li>
     * </ul>
     */
    y : {
      nullable: true,
      init: null,
      apply: "__applyY",
      check: "Number",
      event: "changeY"
    },

    /**
     * For outermost 'svg' elements, the intrinsic width of the SVG document fragment.
     * For embedded 'svg' elements, the width of the rectangular region into which the
     * 'svg' element is placed. A negative value is an error. A value of zero disables
     * rendering of the element. If the attribute is not specified, the effect is as
     * if a value of "100%" were specified.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#SVGElementWidthAttribute</li>
     * </ul>
     */
    width : {
      nullable: true,
      init: null,
      apply: "__applyWidth",
      check: "svg.core.Types.isLength(value)",
      event: "changeWidth"
    },

    /**
     * For outermost 'svg' elements, the intrinsic height of the SVG document fragment.
     * For embedded 'svg' elements, the height of the rectangular region into which the
     * 'svg' element is placed. A negative value is an error. A value of zero disables
     * rendering of the element. If the attribute is not specified, the effect is as
     * if a value of "100%" were specified.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#SVGElementHeightAttribute</li>
     * </ul>
     */
    height : {
      nullable: true,
      init: null,
      apply: "__applyHeight",
      check: "svg.core.Types.isLength(value)",
      event: "changeHeight"
    }
  },

  members :
  {
     //applies x
    __applyX: function(value, old) {
      if (null == value) {
        this.removeAttribute("x");
      } else {
        this.setAttribute("x", value);
      }
    },

    //applies y
    __applyY: function(value, old) {
      if (null == value) {
        this.removeAttribute("y");
      } else {
        this.setAttribute("y", value);
      }
    },

    //applies width
    __applyWidth: function(value, old) {
      if (null == value) {
        this.removeAttribute("width");
      } else {
        this.setAttribute("width", value);
      }
    },

    //applies height
    __applyHeight: function(value, old) {
      if (null == value) {
        this.removeAttribute("height");
      } else {
        this.setAttribute("height", value);
      }
    }
  }

});