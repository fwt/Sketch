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
 * A container element, somewhat similar to {@link Group} and {@link Defs}.
 * 
 * The differences between symbols, groups and defs are:
 * <ul>
 *   <li>
 *     A symbol contains graphic elements and other container elements (like groups).
 *   </li>
 *   <li>
 *     A symbol itself is never rendered. It must be instantiated
 *     by a {@link Use} element (like defs). 
 *   </li>
 *   <li>
 *     A symbol will be scaled to fit within a rectangular viewport. The rectangle
 *     will be defined by the _width_ and _height_ properties of the referencing
 *     use element. 
 *   </li>
 * </ul>
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#SymbolElement</li>
 * </ul>
 */
qx.Class.define("svg.struct.Symbol",
{
  extend : svg.core.Element,
  
  include : [ svg.coords.MViewBox,
              svg.coords.MPreserveAspectRatio,
              svg.paint.MStrokeProperties,
              svg.coords.MTransform ],

  construct : function() {
    this.base(arguments, "symbol");
  }
});