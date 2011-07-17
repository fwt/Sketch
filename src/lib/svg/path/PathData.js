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
 * PathData is a utility class that can be used to write path data,
 * usually used as the "d" attribute of a path element.
 *
 * While it is possible to write path data by hand, using this class
 * will make the job a little easier while also taking advantage
 * of SVG's path shortcuts.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/paths.html#PathData</li>
 * </ul>
 */
qx.Class.define("svg.path.PathData",
{
  extend : qx.core.Object,

  construct : function()
  {
    this.base(arguments);

    this.__path = "";
    this.__penX = 0;
    this.__penY = 0;
    this.__subPaths = [];
  },

  events :
  {
    /**
     * Fired when the path data changed. Event will contain the new value.
     */
    "change" : "qx.event.type.Data"
  },

  members :
  {
    __path : null,
    __subPaths : null,
    __penX : null,
    __penY : null,
    __lastCommand : null,


    /**
     * Internally track the starting of a subpath.
     */
    __startSubPath : function()
    {
      this.__subPaths.push(
      {
        x : this.__penX,
        y : this.__penY
      });
    },


    /**
     * Internally track the closure of a subpath.
     */
    __endSubPath : function()
    {
      var sp = this.__subPaths.pop();
      if (sp) {
        this.__penX = sp.x;
        this.__penY = sp.y;
      }
    },


    /**
     * Internally track the pen location. The location can be used by various
     *  commands to find shortcuts. This is used by {@link #lineTo}.
     *
     * @param x {Number | null}
     *   new x-coordinate of the pen, or use _null_ if unchanged.
     *
     * @param y {Number | null}
     *   new x-coordinate of the pen, or use _null_ if unchanged.
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates.
     *   *true*: x and y are specified relative to the current pen location.
     */
    _setPen : function(x, y, relative)
    {
      if (relative)
      {
        if (null !== x) {
          this.__penX += x;
        }

        if (null !== y) {
          this.__penY += y;
        }
      }
      else
      {
        if (null !== x) {
          this.__penX = x;
        }

        if (null !== y) {
          this.__penY = y;
        }
      }
    },


    /**
     * Adds a command and the end of the path data.
     *
     * @param cmd {String}
     *   one letter path command
     *
     * @param params {String}
     *   the parameters for the specified command
     *
     * @param allowShortcut {Boolean | true}
     *   whether or not command shortcuts are allowed. If true, omits the
     *   command when it is the same as the 'active' (last used) command.
     */
    _addCmd : function(cmd, params, allowShortcut)
    {
      var allowShortcut = allowShortcut || true;

      if ((cmd != this.__lastCommand) || !allowShortcut)
      {
        // not using shortcut
        this.__path += cmd;
      }
      else
      {
        // using shortcut, only write a space
        this.__path += " ";
      }

      // only add params if they are specified (prevent "null" in string)
      if (null !== params) {
        this.__path += params;
      }

      this.__lastCommand = cmd;

      this.fireDataEvent("change", this.toString());
    },


    /**
     * Moves the pen and starts a new sub-path.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataMovetoCommands</li>
     * </ul>
     *
     * @param x {Number}
     *   x-coordinate to move to
     *
     * @param y {Number}
     *   y-coordinate to move to
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates.
     *   *true*: x and y are specified relative to the current pen location.
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    moveTo : function(x, y, relative)
    {
      this._addCmd(relative ? "m" : "M", x + "," + y);
      this._setPen(x, y, relative);
      this.__startSubPath();
      return this;
    },


    /**
     * Draws a line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands</li>
     * </ul>
     *
     * @param x {Number}
     *   x-coordinate of end point
     *
     * @param y {Number}
     *   y-coordinate of end point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates.
     *   *true*: x and y are specified relative to the current pen location.
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    lineTo : function(x, y, relative)
    {
      var sameX = this.__penX == x;
      var sameY = this.__penY == y;

      // same point? do nothing
      if (sameX && sameY) {
        return this;
      }

      // same x? draw vertical line
      else if (sameX && !sameY) {
        return this.lineToY(y, relative);
      }

      // same y? draw horizontal line
      else if (!sameX && sameY) {
        return this.lineToX(x, relative);
      }

      // draw a free line
      else
      {
        this._addCmd(relative ? "l" : "L", x + "," + y);
        this._setPen(x, y, relative);
        return this;
      }

      if ((qx.core.Environment.get("qx.debug"))) {
        qx.core.Assert.fail("This line should never be reached.");
      }
    },


    /**
     * Draws a horizontal line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands</li>
     * </ul>
     *
     * @param x {Number}
     *   x-coordinate of end point
     *
     * @param relative {Boolean ? false}
     *   *false*: x is an absolute coordinate.
     *   *true*: x is specified relative to the current pen location.
     *
     * @return {svg.path.PathData}
     *   this object (for chaining support)
     */
    lineToX : function(x, relative)
    {
      this._addCmd(relative ? "h" : "H", x);
      this._setPen(x, null, relative);
      return this;
    },


    /**
     * Draws a vertical line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands</li>
     * </ul>
     *
     * @param y {Number}
     *   y-coordinate of end point
     *
     * @param relative {Boolean ? false}
     *   *false*: y is an absolute coordinate.
     *   *true*: y is specified relative to the current pen location.
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    lineToY : function(y, relative)
    {
      this._addCmd(relative ? "v" : "V", y);
      this._setPen(null, y, relative);
      return this;
    },


    /**
     * Closes a sub-path using a line segment.
     *
     * Use {@link #moveTo} to start a sub-path.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataClosePathCommand</li>
     * </ul>
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    closePath : function()
    {
      // The "Z" command should not be cut short.
      this._addCmd("Z", null, false);
      this.__endSubPath();
      return this;
    },


    /**
     * Draws an elliptical arc.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataCurveCommands</li>
     * </ul>
     *
     * @param rx {Number}
     *   x-axis radius
     *
     * @param ry {Number}
     *   y-axis radius
     *
     * @param rotation {Number}
     *   x-axis rotation
     *
     * @param largeArcFlag {Boolean}
     *   *true*: draw the largest arc,
     *   *false*: draws the smallest arc
     *
     * @param sweepFlag {Boolean}
     *   *true*: positive angular orientation,
     *   *false*: negative angular orientation
     *
     * @param x {Number}
     *   x-coord of new point
     *
     * @param y {Number}
     *   y-coord of new point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates
     *   *true*: x and y are specified relative to the current pen location
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    arc : function(rx, ry, rotation, largeArcFlag, sweepFlag, x, y, relative)
    {
      var pars = "" + rx + "," + ry + " " + rotation + " ";
      pars += largeArcFlag ? "1 " : "0 ";
      pars += sweepFlag ? "1 " : "0 ";
      pars += x + "," + y;

      this._addCmd(relative ? "a" : "A", pars);
      this._setPen(x, y, relative);
      return this;
    },


    /**
     * Draws a circular arc. This is a special case of the eliptical {@link #arc}.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataCurveCommands</li>
     * </ul>
     *
     * @param r {Number}
     *   circle radius
     *
     * @param largeArcFlag {Boolean}
     *   <b>true</b>: draw the largest arc,
     *   <b>false</b>: draws the smallest arc
     *
     * @param sweepFlag {Boolean}
     *   <b>true</b>: positive angular orientation,
     *   <b>false</b>: negative angular orientation
     *
     * @param x {Number}
     *   x-coord of new point
     *
     * @param y {Number}
     *   y-coord of new point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates
     *   *true*: x and y are specified relative to the current pen location
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    circularArc : function(r, largeArcFlag, sweepFlag, x, y, relative) {
      return this.arcTo(r, r, 0, largeArcFlag, sweepFlag, x, y, relative);
    },


    /**
     * Draws a quadratic bézier curve.
     *
     * <img src="http://www.learnsvg.com/html/bitmap/chapter04/pictures/page042.jpg" />
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands</li>
     * </ul>
     *
     * @param x1 {Number}
     *   x-coordinate of the approximating control point
     *
     * @param y1 {Number}
     *   y-coordinate of the approximating control point
     *
     * @param x {Number}
     *   x-coordinate of the new curve point
     *
     * @param y {Number}
     *   y-coordinate of the new curve point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates
     *   *true*: x and y are specified relative to the current pen location
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    qCurve : function(x1, y1, x, y, relative)
    {
      var pars = (x1 + "," + y1) + " " + (x + "," + y);
      this._addCmd(relative ? "q" : "Q", pars);
      this._setPen(x, y, relative);
      return this;
    },


    /**
     * Draws a smooth (shorthand) quadratic bézier curve. The control point
     * will be automatically created from the previous curve's control point.
     * This results in a smooth junction between this and the previous curve.
     *
     * A smooth quadratic curve must be preceded by either a regular
     * quadratic curve or another smooth quadratic curve to work correctly.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands</li>
     * </ul>
     *
     * @param x {Number}
     *   x-coordinate of the new curve point
     *
     * @param y {Number}
     *   y-coordinate of the new curve point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates
     *   *true*: x and y are specified relative to the current pen location
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    qCurveSmooth : function(x, y, relative)
    {
      if ((qx.core.Environment.get("qx.debug")))
      {
        if ((this.__lastCommand.toUpperCase() !== 'Q') && (this.__lastCommand.toUpperCase() !== 'T')) {
          this.warn("A smooth quadratic curve should be preceded by another quadratic curve (regular or smooth).");
        }
      }

      var pars = (x + "," + y);
      this._addCmd(relative ? "T" : "t", pars);
      this._setPen(x, y, relative);
      return this;
    },


    /**
     * Draws a cubic bézier curve.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands</li>
     * </ul>
     *
     * @param x1 {Number}
     *   x-coordinate of the first approximating control point
     *
     * @param y1 {Number}
     *   y-coordinate of the first approximating control point
     *
     * @param x2 {Number}
     *   x-coordinate of the second approximating control point
     *
     * @param y2 {Number}
     *   y-coordinate of the second approximating control point
     *
     * @param x {Number}
     *   x-coordinate of the new curve point
     *
     * @param y {Number}
     *   y-coordinate of the new curve point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates
     *   *true*: x and y are specified relative to the current pen location
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    cCurve : function(x1, y1, x2, y2, x, y, relative)
    {
      var pars = (x1 + "," + y1) + " " + (x2 + "," + y2) + " " + (x + "," + y);
      this._addCmd(relative ? "c" : "C", pars);
      this._setPen(x, y, relative);
      return this;
    },


    /**
     * Draws a smooth (shorthand) cubic bézier curve. The first control point
     * will be automatically created from the previous curve's last control
     * point. This results in a smooth junction between this and the previous
     * curve.
     *
     * A smooth cubic curve must be preceded by either a regular
     * cubic curve or another smooth cubic curve to work correctly.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands</li>
     * </ul>
     *
     * @param x2 {Number}
     *   x-coordinate of the second approximating control point
     *
     * @param y2 {Number}
     *   y-coordinate of the second approximating control point
     *
     * @param x {Number}
     *   x-coordinate of the new curve point
     *
     * @param y {Number}
     *   y-coordinate of the new curve point
     *
     * @param relative {Boolean ? false}
     *   *false*: x and y are absolute coordinates
     *   *true*: x and y are specified relative to the current pen location
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    cCurveSmooth : function(x2, y2, x, y, relative)
    {
      if ((qx.core.Environment.get("qx.debug")))
      {
        if ((this.__lastCommand.toUpperCase() !== 'C') && (this.__lastCommand.toUpperCase() !== 'S')) {
          this.warn("A cubic curve should be preceded by another cubic curve (regular or smooth).");
        }
      }

      var pars = (x + "," + y);
      this._addCmd(relative ? "T" : "t", pars);
      this._setPen(x, y, relative);
      return this;
    },

    /**
     * Clears all path data.
     *
     * @return {svg.util.PathData}
     *   this object (for chaining support)
     */
    clear : function()
    {
      this.__path = "";
      this.__penX = 0;
      this.__penY = 0;
      this.__subPaths = [];
      this.fireDataEvent("change", this.toString());
      return this;
    },


    /**
     * Returns the created path data as a string. The string can be directly used
     * as value for the "d" attribute of a Path element.
     *
     * @return {String}
     *   the path data
     */
    toString : function()
    {
      if ('' !== this.__path && 'M' !== this.__path[0] && 'm' !== this.__path[0]) {
        return 'M0,0' + this.__path;
      }

      return this.__path;
    }
  }

});