Foliage - HTML in javascript
============================
The basic idea of foliage is to provide modular, non-magical, easy to use, easy to extend, html-builders in javascript. The philosophy is that markup is for computers and code is for humans. Foliage tries to make client coding as human as possible.


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

Here is a summary of of the effect of different arguments to an element:

```javascript
"a string"
```

becomes a text element under the element

```javascript
{attr1: 'value1', attr2: "value2"}
```

Becomes attributes on the element

```javascript
l.span("text")
```

Becomes a span element with a text element under the current element.

```javascript
function(parent) {$(parent).click(function(){alert("somebody clicked the element")})}
``` 

Invokes the function on element when invoked.

For your convenience all html 4 elements has been declared on the foliage object.

Non-magical
-----------
What you do with foliage is very close to what you would do in HTML. It is generally quite simple to imagine what the resulting HTML will look like when reading foliage code. Foliage does not pretend that you are not generating HTML like some ui-frameworks. Instead foliage tries to make it more convenient to write HTML without robbing the user of control.

Modular
-----------
Foliage is modular both on a high and a low level. On a high level foliage relies heavily on AMD-modules. AMD is not optional, it is a core concept of Foliage. Foliage does not care which AMD-loader you use but the examples are using curl.

On a lower level Foliage is composable using functional programming. Therefore it is easy to reuse concepts and layouts with foliage. In the examples we have seen the result of each element invocation is a function taking anything that jquery interprets as an element as it's argument. Any number of these functions can then be passed as arguments into other elements to form trees.

Foliage does nothing to enforce this but all of foliage is written in a stateless fashion. What that means is that each foliage function will behave the same given that you call it with the same parameters. Beware though, foliage functions manipulate the DOM that means that the functions do have sideffects.

Without exceptions the followin is true for foliage:

 * composing foliage elements does not have sideffects
 * passing a JQuery element or expression to a foliage element will typically alter that element or add elements to it.
 
 
 
