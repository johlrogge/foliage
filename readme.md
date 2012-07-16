Foliage - HTML in javascript
============================
The basic idea of foliage is to provide modular, non-magical, easy to use, easy to extend, html-builders in javascript.


Easy to use
-----------
The core concept of foliage is just a clever element implementation. The element is designed to make it easy to compose a tree of elements and have those elements create the corresponding dom-elements when given a parent to create those in. The functionality in the Foliage element is intended to be visually easy to understand and practically unsurprising to use.

Here is an example of how to print 'hello world' in a paragraph using foliage:

```javascript
define(['foliage'], function(f) {
    return f.p("hello-world");
});
```

For such a simple example there is a bit of amd boilerplate in order to import foliage and assign the html builder to the variable f but it should be pretty clear that the intention is to print hello world in a p tag.

Lets see how to compose several elements:

```javascript
define(['foliage'], function(f) {
   return f.ol(
             f.li("It is hard"),
             f.li(f.strong("not"), "to"),
             f.ul(
                f.li("figure"),
                f.li("out"),
                f.li("what this")),
             f.li("will", "look", "like"),
             f.li(f.img({src: "http://placekitten.com/g/200/200", 
                         alt: "there can not be enough cats in examples"})))
});
```

The above example shows basic composability and also introduces attributes.

For your convenience all html 4 elements has been declared on the foliage object.

Non-magical
-----------
What you do with foliage is very close to what you would do in HTML. It is generally quite simple to imagine what the resulting HTML will look like when reading foliage code. Foliage does not pretend that you are not generating HTML like some ui-frameworks. Instead foliage tries to make it more convenient to write HTML without robbing the user of control.

Modular
-----------
Foliage is modular both on a high and a low level. On a high level foliage relies heavily on AMD-modules. AMD is not optional, it is a core concept of Foliage. Foliage does not care which AMD-loader you use but the examples are using curl.

On a lower level Foliage is composable using functional programming. Therefore it is easy to reuse concepts and layouts with foliage. In the examples we have seen the result of each element invocation is a function taking anything that jquery interprets as an element as it's argument. Any number of these functions can then be passed as arguments into other elements to form trees.











