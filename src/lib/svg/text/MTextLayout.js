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
 * Properties for text direction.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/text.html#TextLayout</li>
 * </ul>
 */
qx.Mixin.define("svg.text.MTextLayout", {
  
  properties :
  {
    /**
     * Direction of text.
     * 
     * Possible values:
     * <ul>
     *   <li><em>lr</em>: from left to right, from top to bottom</li>
     *   <li><em>rl</em>: from right to left, from top to bottom</li>
     *   <li><em>tb</em>: from top to bottom, from right to left</li>
     * </ul>
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#WritingModeProperty</li>
     * </ul>
     */
    writingMode : {
      nullable: true,
      init: null,
      check: ["lr", "rl", "tb", "inherit"],
      apply: "__applyWritingMode",
      event: "changeWritingMode"
    },
    
    
    /**
     * Vertical orientation of glyphs.
     * 
     * Must be <code>auto</code> or an angle.
     * 
     * Angles are restricted to 0, 90, 180 and 270 degrees.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#GlyphOrientationVerticalProperty</li>
     * </ul>
     */
    glyphOrientV : {
      nullable: true,
      init: null,
      check: function(value) {
               return value === "auto" ||
                      value === "inherit" ||
                      svg.core.Types.isAngle(value);
      },
      apply: "__applyGlyphOrientV",
      event: "changeGlyphOrientV"
    },
    
    
    /**
     * Horizontal orientation of glyphs.
     * 
     * Must be an angle.
     * 
     * Angles are restricted to 0, 90, 180 and 270 degrees.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#GlyphOrientationHorizontalProperty</li>
     * </ul>
     */
    glyphOrientH : {
      nullable: true,
      init: null,
      check: function(value) {
                      value === "inherit" ||
                      svg.core.Types.isAngle(value);
      },
      apply: "__applyGlyphOrientH",
      event: "changeGlyphOrientH"
    }
    
  },
  
  members :
  {
    //applies writing-mode
    __applyWritingMode: function(value, old) {
      if (null == value) {
        this.removeAttribute("writing-mode");
      } else {
        this.setAttribute("writing-mode", value);
      }
    },
    
    //applies glyph-orientation-vertical
    __applyGlyphOrientV: function(value, old) {
      if (null == value) {
        this.removeAttribute("glyph-orientation-vertical");
      } else {
        this.setAttribute("glyph-orientation-vertical", value);
      }
    },
    
    //glyph-orientation-horizontal
    __applyGlyphOrientH: function(value, old) {
      if (null == value) {
        this.removeAttribute("glyph-orientation-horizontal");
      } else {
        this.setAttribute("glyph-orientation-horizontal", value);
      }
    }
    
  }
  
});