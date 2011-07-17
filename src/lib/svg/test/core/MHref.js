/* **
#ignore(svg.test.core.MHref.Dummy)
*/
qx.Class.define("svg.test.core.MHref",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function() {
      //create test class that includes the mixin
      qx.Class.define("svg.test.core.MHref.Dummy", {
        extend : svg.core.Element,
        include : [svg.core.MHref]
      });
    },

    tearDown : function() {
      qx.Class.undefine("svg.test.core.MHref.Dummy");
    },

    testReferenceObjectIdAsObjectString : function()
    {
      var rect = new svg.shape.Rect();
      var rectHash = rect.toString();

      var dummy = new svg.test.core.MHref.Dummy;
      dummy.setHref(rect);

      this.assertIdentical(rect, dummy.getHref());
      this.assertIdentical('#' + rectHash, dummy.getDomElement().getAttribute('xlink:href'));
    },

    testReferenceObjectChangeId : function()
    {
      var rect = new svg.shape.Rect();
      rect.setId('empty');

      var dummy = new svg.test.core.MHref.Dummy;
      dummy.setHref(rect);
      this.assertIdentical('#empty', dummy.getDomElement().getAttribute('xlink:href'));

      rect.setId('abc123');
      qx.html.Element.flush();
      this.assertIdentical('#abc123', dummy.getDomElement().getAttribute('xlink:href'));
    }
  }
});