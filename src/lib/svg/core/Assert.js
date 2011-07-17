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
 * A collection of assertions.
 * 
 * If an assertion fails an {@link qx.core.AssertionError} is thrown.
 * 
 * The assertions are used internally in the svg library as well.
 */
qx.Class.define("svg.core.Assert",
{
  statics :
  {
    /**
     * Assert that the SVG element is part of the document tree at the time this check
     * is called.
     * 
     * @param element {svg.core.Element}
     *   Element to look for.
     * 
     * @param msg {String?}
     *   Message to be shown if the assertion fails.
     */
    assertElementInDocTree : function(element, msg){
      if (!element.inDocumentTree()) {
        msg = msg || "SVG element is not in the document tree.";
        qx.core.Assert.fail(msg, true);
      }      
    }
  }
  
});