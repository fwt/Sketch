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
 * Control uniform scaling.
 * 
 * In some cases, typically when using the viewBox attribute, it is desirable that the
 * graphics stretch to fit non-uniformly to take up the entire viewport. In other cases,
 * it is desirable that uniform scaling be used for the purposes of preserving the
 * aspect ratio of the graphics.
 *
 * Attribute preserveAspectRatio indicates whether or not to force uniform scaling.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute</li>
 * </ul>
 */
qx.Mixin.define("svg.coords.MPreserveAspectRatio",
{
  members :
  {
    /**
     * Indicates whether or not to force uniform scaling.
     * 
     * To remove the preserveAspectRatio attribute, set it to null:
     * <pre class="javascript">
     * element.setPreserveAspectRatio(null);
     * </pre>
     *
     * @param align {String ? "xMidYMid"} The 'align' parameter indicates whether to force uniform scaling and, if so,
     *   the alignment method to use in case the aspect ratio of the viewBox doesn't
     *   match the aspect ratio of the viewport. Possible values are:
     *   <ul>
     *     <li>xMinYMin - align to top left</li>
     *     <li>xMidYMin - center on x-axis, align top</li>
     *     <li>xMaxYMin - align to top right</li>
     *     <li>xMinYMid - align to left, center on y-axis</li>
     *     <li>xMidYMid (default) - center on x and y-axes</li>
     *     <li>xMaxYMid - align to right, center on y-axis</li>
     *     <li>xMinYMax - align to bottom left</li>
     *     <li>xMidYMax - center on x-axis, align to bottom</li>
     *     <li>xMaxYMax - align to bottom right</li>
     *   </ul>
     *   
     * @param meetOrSlice {String ? "meet"} Possible values are:
     *   <ul>
     *     <li>_meet_ - scale the graphic such that:
     *       <ul>
     *         <li>aspect ratio is preserved</li>
     *         <li>the entire viewbox is visible within the viewport</li>
     *         <li>the viewbox is scaled up as much as possible, while still meeting the other criteria</li>
     *       </ul>
     *       If the aspect ratio's of the viewbox and viewport do not match, the area into
     *       which the viewbox will draw is smaller than the viewport.
     *     </li>
     *     <li>_slice_ - scale the graphic such that:
     *       <ul>
     *         <li>aspect ratio is preserved</li>
     *         <li>the entire viewport is covered by the viewbox</li>
     *         <li>the viewbox is scaled down as much as possible, while still meeting the other criteria</li> 
     *       </ul>
     *       If the aspect ratio's of the viewbox and viewport do not match, the area into
     *       which the viewbox will draw is larger than the viewport.
     *     </li>
     *   </ul>
     *   
     * @param defer {Boolean ? false} If set to true on an 'image' element, then the value of preserveAspectRatio
     *   on the referenced content should be used. For preserveAspectRatio on all other elements, the 'defer'
     *   portion of the attribute is ignored.
     *   
     * @return {void}
     */
    setPreserveAspectRatio : function(align, meetOrSlice, defer)
    {
      if (null == align) {
        this.removeAttribute("preserveAspectRatio");
      }
      else {
        var value = align + " " + (meetOrSlice || "meet");

        if (defer) {
          value = "defer " + value;
        }

        this.setAttribute("preserveAspectRatio", value);
      }
    },


    /**
     * Gets the value of the preserveAspectRatio attribute.
     *
     * @return {String}
     * @see #setPreserveAspectRatio
     */
    getPreserveAspectRatio : function() {
      return this.getAttribute("preserveAspectRatio");
    }
  }
});