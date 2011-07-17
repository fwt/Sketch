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
 * A title element that can be added to any SVG element. The content will not
 * be displayed on the screen.
 * 
 * It is recommended to use {@link svg.struct.MTitleDescription#setTitle}
 * instead of using this class directly.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#DescriptionAndTitleElements</li>
 * </ul>
 */
qx.Class.define("svg.struct.Title",
{
  extend : svg.core.Element,
  
  include : [ svg.core.MTextContainer ],


  /**
   * Creates a new 'title' element, which can then be added to any SVG element.
   * 
   * @param title {String?}
   *   the title text.
   */
  construct : function(title)
  {
    this.base(arguments, "title");

    if ("undefined" !== typeof (title)) {
      this.setValue(title);
    }
  }
});