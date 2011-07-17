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
 * Any SVG element can have a {@link svg.struct.Title} and/or
 * {@link svg.struct.Desc} element as a child.
 * 
 * This mixin provides easy access to those elements.
 * 
 * Instead of writing:
 * <pre class="javascript">
 * var title = new svg.struct.Title("MyElement");
 * title.setValue();
 * someElement.add(title);
 *   
 * var desc = new svg.struct.Desc();
 * desc.setValue("This is my favourite element!");
 * someElement.add(desc);
 * </pre>
 * 
 * You can now write:
 * <pre class="javascript">
 * someElement.setTitle("MyElement");
 * someElement.setDescription("This is my favourite element!");
 * </pre>
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#DescriptionAndTitleElements</li>
 * </ul>
 */
qx.Mixin.define("svg.core.MTitleDescription",
{
  members :
  {
    __titleElement : null,
    __descElement : null,


    /**
     * Sets the SVG element's title.
     *
     * @param value {String} value to set
     * @return {void}
     */
    setTitle : function(value)
    {
      if (null == this.__titleElement) {
        this.add(this.__titleElement = new svg.struct.Title(value));
      } else {
        this.__titleElement.setValue(value);
      }
    },


    /**
     * Gets the SVG element's title.
     *
     * @return {String} TODOC
     */
    getTitle : function()
    {
      if (null == this.__titleElement) {
        return null;
      } else {
        return this.__titleElement.getValue();
      }
    },


    /**
     * Sets the SVG element's description.
     *
     * @param value {String} value to set
     * @return {void}
     */
    setDescription : function(value)
    {
      if (null == this.__descElement) {
        this.add(this.__descElement = new svg.struct.Desc(value));
      } else {
        this.__descElement.setValue(value);
      }
    },


    /**
     * Gets the SVG element's description.
     *
     * @return {String} TODOC
     */
    getDescription : function()
    {
      if (null == this.__descElement) {
        return null;
      } else {
        return this.__descElement.getValue();
      }
    }
  },

  destruct : function() {
    this._disposeObjects("__titleElement", "__descElement");
  }
});