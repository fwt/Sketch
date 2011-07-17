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
 * A container element for elements, somewhat similar to {@link Group}.
 * 
 * The differences between defs and groups are:
 * <ul>
 *   <li>The defs element itself is never rendered (unlike {@link Group}).</li>
 *   <li>It must be instantiated by a {@link Use} element.</li>
 *   </li>
 * </ul>
 *  
 * More info: http://www.w3.org/TR/SVG/struct.html#DefsElement
 */
qx.Class.define("svg.struct.Defs",
{
  extend : svg.core.Element,

  construct : function() {
    this.base(arguments, "defs");
  }
});