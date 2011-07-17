/* ************************************************************************

   Copyright:
     2010-2011  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)
     * Martijn Evers (mevers)

************************************************************************ */
/*
#require(svg.core.Types)
*/

/**
 * An element that resides in the SVG namespace. Using the correct
 * SVG namespace is required for embedding SVG into XHTML.
 *
 * The namespace used is *http://www.w3.org/2000/svg*.
 */
qx.Class.define("svg.core.Element",
{
  extend : qx.html.Element,

  include : [ svg.core.MTitleDescription,
              svg.core.dom.MElement],


  /**
   * @param tagName {String}
   *   Tag name of the element to create.
   */
  construct : function(tagName)
  {
    this.base(arguments, tagName);
    this.__svgElement = document.createElementNS(svg.core.Element.SVG_NAMESPACE, tagName);
  },

  statics : {
    SVG_NAMESPACE : "http://www.w3.org/2000/svg"
  },

  properties :
  {
    /**
     * Unique name for this element.
     */
    id : {
      nullable: true,
      init: null,
      apply: "_applyId",
      check: "String",
      event: "changeId"
    }
  },

  members :
  {
    __svgElement : null,

    //applies id
    _applyId : function(value, old) {
      if (null == value) {
        this.removeAttribute("id");
      } else {
        this.setAttribute("id", value);
      }
    },

    /**
     * Internal helper to generate the DOM element
     * *override*
     *
     * @return {svg.core.Element}
     */
    _createDomElement : function() {
      return this.__svgElement;
    },

    /**
     * Returns the DOM element. Please use this with caution.
     * It is better to make all changes to the object itself using the public
     * API rather than to the underlying DOM element.
     *
     * *override*
     *
     * @return {Element}
     *   The DOM element node
     */
    getDomElement : function() {
      return this.__svgElement;
    },

    /**
     * Gets an FuncIRI reference to this element. An {@link #id} must have been set for this.
     *
     * Returns _null_ if no id is set.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#DataTypeFuncIRI</li>
     * </ul>
     *
     * @return {String}
     *   an FuncIRI reference, i.e. url(#abc)
     */
    getFuncIri : function() {
      var id = this.getId();

      if (null == id) {
        if ((qx.core.Environment.get("qx.debug"))) {
          this.warn("Can't create uri reference; id is null.");
        }
        return null;
      }
      return "url(#" + id + ")";
    },


    /**
     * Checks if the DOM element is currently in the document tree. Note that this returns the *actual*
     * state of the DOM element, which may change when the framework's element queue is flushed.
     *
     * @return {Boolean}
     *   true if the DOM element is now in the document tree, false otherwise.
     */
    inDocumentTree : function() {
      var el = this.__svgElement;

      //return "element is created AND ("element has parent" OR "element is the document root")
      return (null !== el) && ((null !== el.parentNode) || (el.ownerDocument.documentElement === el));
    },

    /**
     * Searches the current element's ancestor tree for the element that wraps the specified
     * DOM element. The search includes the current element.
     *
     * <pre>
     * var eSvg = new svg.struct.Svg();
     * var eGroup = new svg.struct.Group();
     * var eRect = new svg.shape.Rect();
     *
     * eSvg.add(eGroup);
     * eGroup.add(eRect);
     *
     * var x = eRect.parentByDomElement(eSvg.getDomElement()); //x === eSvg
     *
     * </pre>
     *
     * @param domElement {Element} DOM Element
     *
     * @return {svg.core.Element|null}
     *   The found svg element, or <pre>null</pre> if nothing was found.
     */
    parentByDomElement : function(domElement) {
      var el = this;

      while (el !== null && el.getDomElement() !== domElement) {
        el = el.getParent();
      }

      return el;
    },
    
    /**
     * Add event listener to this object. The event can be either a native
     * event that's supported by the DOM element (like mousedown), or a
     * qooxdoo event defined by the element class.
     *
     * @param type {String} name of the event type
     * @param listener {Function} event callback function
     * @param self {Object ? null} Reference to the 'this' variable inside
     *         the event listener. When not given, the corresponding dispatcher
     *         usually falls back to a default, which is the target
     *         by convention. Note this is not a strict requirement, i.e.
     *         custom dispatchers can follow a different strategy.
     * @param capture {Boolean ? false} Whether to attach the event to the
     *         capturing phase or the bubbling phase of the event. The default is
     *         to attach the event handler to the bubbling phase.
     * @return {String} An opaque id, which can be used to remove the event listener
     *         using the {@link #removeListenerById} method.
     */
    addListener : function(type, listener, self, capture) {
      if (this.$$disposed) {
        return null;
      }
      
      if (qx.bom.Event.supportsEvent(this.__svgElement, type)) {
        //attach listener to native event
        return this.base(arguments, type, listener, self, capture);
      }
      else {
        //attach listener to qooxdoo event
        return qx.event.Registration.addListener(this, type, listener, self, capture);        
      }
    },
    
    /**
     * Remove event listener from this object
     *
     * @param type {String} name of the event type
     * @param listener {Function} event callback function
     * @param self {Object ? null} reference to the 'this' variable inside the callback
     * @param capture {Boolean} Whether to remove the event listener of
     *   the bubbling or of the capturing phase.
     * @return {Boolean} Whether the event was removed successfully (has existed)
     */
    removeListener: function(type, listener, self, capture) {
      if (this.$$disposed) {
        return false;
      }
      
      if (qx.bom.Event.supportsEvent(this.__svgElement, type)) {
        //remove listener from native event
        return this.base(arguments, type, listener, self, capture);
      }
      else {
        //remove listener from qooxdoo event
        return qx.event.Registration.removeListener(this, type, listener, self, capture);        
      }
    },
    
    /**
     * Removes an event listener from an event target by an id returned by
     * {@link #addListener}
     *
     * @param id {String} The id returned by {@link #addListener}
     * @return {Boolean} Whether the event was removed successfully (has existed)
     */
    removeListenerById: function(id) {
      if (this.$$disposed) {
        return false;
      }
      
      //get event type from listener id
      var type = id.split("|")[0];
      
      if (qx.bom.Event.supportsEvent(this.__svgElement, type)) {
        //remove listener from native event
        return this.base(arguments, id);
      }
      else {
        //remove listener from qooxdoo event
        return qx.event.Registration.removeListenerById(this, id);
      }
    }

  },

  destruct : function() {
    this.__svgElement = null;
  }
});