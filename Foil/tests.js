$.getScript("script.js", function(){

  QUnit.module("Evaluating the output types of functions", () => {

    QUnit.test("userUnitList function output type", assert => {

      let actual = typeof userUnitList();
      let expected = "number";

      assert.equal(actual, expected,
        "userUnitList function should return a number.");
    });

    QUnit.test("flightButton function output type", assert => {
      let actual = typeof userFlightButton();
      let expected = "number";

      assert.equal(actual, expected,
        "flightButton function should return a number");
    });

    QUnit.test("probeButton function output type", assert => {
      let actual = typeof userProbeButton();
      let expected = "number";

      assert.equal(actual, expected,
        "probeButton function should return a number");

      });

    QUnit.test("getParent function output type", assert => {
        let child = $("#flightButton");
        let actual = typeof getParent(child);
        let expected = "object";

        assert.equal(actual, expected,
          "Should return an object");
    });

    QUnit.test("getChildren function output type", assert => {
      let parent = $(".inputButtons");
      let actual = typeof getChildren(parent);
      let expected = "object";

      assert.equal(actual, expected,
        "Should return an object");
    });

    QUnit.test("getButtonValue function output type", assert => {
        let child = $("#flightButton");
        let actual = typeof getButtonValue(child);
        let expected = "number";

        assert.equal(actual, expected,
            "Should return a number");

        actual = getButtonValue(child);
        expected = 0;
        assert.equal(actual, expected, "Should return 0");
      });

    QUnit.todo("evaluateClickedButton function output type", assert => {


        let actual = typeof evaluateClickedButton();
        let expected = "number";

        assert.equal(actual, expected,
          "Should return a number");
    });

  });

  QUnit.module("group b", () => {

    QUnit.test("The getParent function returns the parent of the child element", assert => {
        let child = $("#flightButton");
        let actual = getParent(child);
        let expected = $("#flightButton").parent();

        assert.deepEqual(actual, expected, "Should return the parent element of the child");

    });

    QUnit.test("The getChildren function returns the child element of the parent", assert => {

        let parent = $(".inputButtons");
        let actual = getChildren(parent);
        let expected = $(".inputButtons").children();

        assert.deepEqual(actual, expected,
              "The getChildren function should return the children of the element");
      });

    QUnit.test("Setting properties to an object through jQuery", assert => {

      let myObjA = {
        value: 0,
        id: "num"
      }

      let myObjB = {};

      let actual = $(myObjA);
      let expected = $(myObjB).prop({ value: 0, id: "num" });

      assert.deepEqual(actual, expected,
        "The attributes for both objects should be equal");

    });

    QUnit.test("Accessing object properties for comparison", assert => {

      let myObjA = {
        x: [0, 1, 2, 3, 4],
        y: [1, 2, 3, 4, 5]
      };

      let actual = myObjA.x;
      let expected = [0, 1, 2, 3, 4];

        assert.deepEqual(actual, expected, "Should return the properties of x");
    });

    QUnit.test("Comparing two similar object properties with different instances", assert => {

        let myObjA = {
            x: [1,2,3,4],
            type: "object"
        };
        let myObjB = {
            x: [2,3,4,5],
            type: "object"
        };

        let actual = myObjA.type;
        let expected = myObjB.type;

          assert.equal(actual, expected,
            "Should return two object.properties that are equal");
    });

    QUnit.test("Comparing an object array with a declared object array with different instances", assert => {
        let myObjA = {};
        let myObjB = {};
        let myObjC = {};
        let arr = [ myObjA, myObjB, myObjC ];

        let actual = arr;
        let expected = [ myObjA, myObjB, myObjC ];

        assert.deepEqual(actual, expected,
          "Should return two object arrays that are equal");

      });

    QUnit.todo("Comparing the use of jQuery to change properties via css method", assert => {

        let myObjA = {
              color: "blue"
        };
        let myObjB = {};

        let actual = myObjA;
        let expected = $(myObjB).css({ color: "blue" });

        assert.deepEqual(actual, expected,
          "Should evaluate both as equal since both would have the same properties");
      });

      QUnit.todo("isEquivalent compares two objects properties to see if they are equal", assert => {
          let a = $(".inputButtons");
          let b = getParent( $(".inputButtons").children() );
          let actual = isEquivalent(a, b);
          let expected = true;

          assert.equal(actual, expected,
            "Should return true");
      });


    });

});
