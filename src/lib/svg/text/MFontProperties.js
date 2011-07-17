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
 * Properties for text font.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/text.html#FontPropertiesUsedBySVG</li>
 * </ul>
 */
qx.Mixin.define("svg.text.MFontProperties", {
  
  properties :
  {
    
    /**
     * Font family.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#FontFamilyProperty</li>
     * </ul>
     */
    fontFamily : {
      nullable: true,
      init: null,
      check: "String",
      apply: "__applyFontFamily",
      event: "changeFontFamily"
    },
    
    
    /**
     * Normal, italic or oblique font style.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#FontStyleProperty</li>
     * </ul>
     */
    fontStyle : {
      nullable: true,
      init: null,
      check: ["normal", "italic", "oblique", "inherit"],
      apply: "__applyFontStyle",
      event: "changeFontStyle"
    },
    
    
    /**
     * Normal or small-caps characters for lowercase text.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#FontVariantProperty</li>
     * </ul>
     */
    fontVariant : {
      nullable: true,
      init: null,
      check: ["normal", "small-caps", "inherit"],
      apply: "__applyFontVariant",
      event: "changeFontVariant"
    },
    
    
    /**
     * Boldness or lightness of the text.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#FontWeightProperty</li>
     * </ul>
     */
    fontWeight : {
      nullable: true,
      init: null,
      check: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400",
              "500", "600", "700", "800", "900", "inherit"],
      apply: "__applyFontWeight",
      event: "changeFontWeight"
    },
    
    
    /**
     * Amount of condensing or expansion in the glyphs.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#FontStretchProperty</li>
     * </ul>
     */
    fontStretch : {
      nullable: true,
      init: null,
      check: ["normal", "wider", "narrower",
              "ultra-condensed", "extra-condensed", "condensed", "semi-condensed",
              "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"],
      apply: "__applyFontStretch",
      event: "changeFontStretch"
    },
    
    
    /**
     * Font size.
     * 
     * Values may be an _absolute size_, a _relative size_, a _length_, or a _percentage_.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#FontSizeProperty</li>
     * </ul>
     */
    fontSize : {
      nullable: true,
      init: null,
      apply: "__applyFontSize",
      event: "changeFontSize"
    }
  
  },
  
  members :
  {
    //applies font-family
    __applyFontFamily: function(value, old) {
      if (null == value) {
        this.removeAttribute("font-family");
      } else {
        this.setAttribute("font-family", value);
      }
    },    

    //applies font-style
    __applyFontStyle: function(value, old) {
      if (null == value) {
        this.removeAttribute("font-style");
      } else {
        this.setAttribute("font-style", value);
      }
    },
    
    //applies font-variant
    __applyFontVariant: function(value, old) {
      if (null == value) {
        this.removeAttribute("font-variant");
      } else {
        this.setAttribute("font-variant", value);
      }
    },
    
    //applies font-weight
    __applyFontWeight: function(value, old) {
      if (null == value) {
        this.removeAttribute("font-weight");
      } else {
        this.setAttribute("font-weight", value);
      }
    },
    
    //applies font-size
    __applyFontStretch: function(value, old) {
      if (null == value) {
        this.removeAttribute("font-stretch");
      } else {
        this.setAttribute("font-stretch", value);
      }
    },

    //applies font-size
    __applyFontSize: function(value, old) {
      if (null == value) {
        this.removeAttribute("font-size");
      } else {
        this.setAttribute("font-size", value);
      }
    }
  }
  
});