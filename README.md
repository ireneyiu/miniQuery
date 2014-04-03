# miniQuery challenge

##Learning Competencies
- Create modular code in Javascript.
- Implement css selector library in Javascript.
- Implement DOM manipulation library in Javascript.
- Implement event dispatch library in Javascript.
- Implement http requests library in Javascript.
- Understand and reimplement jQuery as a toolbelt that collects various libraries.

##Summary
[jQuery](http://jquery.com/) is a very popular Javascript toolbelt. It is a collection of tools, each tool allows you to do a very specific job, for example:

  - Select elements with css: $('#id'), $('.class'), $('element')
  - Manipulate the DOM: .show(), .hide(), .addClass(), .removeClass(), etc.
  - Dispatch and listen for events: .trigger(...), .on(...)
  - Send http requests: $.ajax

It's important to realize that jQuery is not just one thing, it's a collection of things grouped under one framework. In fact, some parts of it could be used as standalone tools. For example, jQuery uses [Sizzle](https://github.com/jquery/sizzle) under the hood as its selector engine.

In this challenge we will decompose jQuery and reimplement some of its functionality. We will start by implementing each tool on its own. Eventually, we will group everything together under one toolbelt: miniQuery. The objective is to remove the "magic" from jQuery and realize that it's nothing you couldn't write. It's also important to separate the different tools that jQuery provides you by function and to be able to identify them as separate components collected under one umbrella.

### Setting Up the Application
Under the source folder, you'll find an index.html file and a lib folder. The index.html is very simple, it primarily links to our miniQuery library and allows us to test it easily. The lib folder contains miniQuery.js, this is where you'll be spending most of your time. You are NOT allowed to include the jQuery or any other external library, this would defeat the purpose of this challenge. You are, however, encouraged to read the jQuery code, get inspired. You will be using the browser console to test your code.

Read [Module Pattern chapter of Javascript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)

##Releases
###Release 0: A selector library
Create a module called SweetSelector that allows us to do the following (hint: you need to do it in [pure javascript](http://www.w3schools.com/js/js_htmldom_elements.asp) ):

- select by id:
```javascript
// should return <div id="eyed">eyed</div>
SweetSelector.select('#eyed')
```
- select by class:
```javascript
// should return <div class="klass">klass</div>
SweetSelector.select('.klass')
```
- select by tag name:
```javascript
// should return <a href="#hello">click me</a>
SweetSelector.select('a')
```


###Release 1: DOM manipulation

Create a module called DOM that allows us to do the following:

Hint: What does hide actually do? Try it in jQuery, hide an element and inspect it. See anything different? Styling maybe?

- hide and show elements:
```javascript
DOM.hide('.klass') // hides the div
DOM.show('.klass') // shows the div
```
- addClass and removeClass elements:
```javascript
// div.klass should look like this: <div class="klass shadi">klass</div>
DOM.addClass('.klass', 'shadi')
// div.klass should look like this: <div class="klass">klass</div>
DOM.removeClass('.klass', 'shadi')
```

###Release 2:  Event dispatch
Create a module called EventDispatcher that allows us to do the following:

Hints:

- Read about events, [here is a start](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)

Implement the following functionalities:

```javascript
EventDispatcher.on('.klass', 'shadi', function() { console.log("awesome") });
// this should print "awesome" in the console.
EventDispatcher.trigger('.klass', 'shadi');
```

###Release 3: Ajax
Create a module called AjaxWrapper that allows us to do the following:

Hints: [using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

```javascript
// this should an ajax request to the url and call the success callback if successful and fail callback if unsuccessful.
AjaxWrapper.request({
 url: 'someurl',
 type: 'GET',
 success: function() {
   //do something
 },
 fail: function() {
  //do something
 }
});
```

###Release 4: miniQuery
Let's namespace all of our tools/libraries into one awesome toolbelt: miniQuery. We want to be able to do the following:

```javascript
// selectors:
miniQuery('.kalss')
miniQuery('#eyed')
miniQuery('a')
// DOM manipulation
miniQuery('.klass').hide();
miniQuery('.klass').show();
miniQuery('.klass').addClass();
miniQuery('.klass').removeClass();
// Event Dispatch
miniQuery('.klass').on('shadi', function() { console.log("awesome") });
miniQuery('.klass).trigger('shadi');
// ajax
miniQuery.ajax({
 url: 'someurl',
 type: 'GET',
 success: function() {
   //do something
 },
 fail: function() {
  //do something
 }
});
```

- Start by creating a miniQuery module and move everything under it. So you'll have a somthing like:
```javascript
miniQuery.DOM.hide('.klass');
miniQuery.AjaxWrapper.request({...});
```
- Then move the selectors so they work directly from miniQuery('...'). Don't move all of the functions straight under miniQuery module, think of a clean way to use them under the hood.
- Continue with the rest of the libraries and make sure you're not repeating yourself. Meaning, can the libraries use each other?
- Take small steps, don't attempt to solve this all at once.

###Release 5: use $
miniQuery is too long to write, can we use $ as well. Nothing should change, we'll just give the user the option to use miniQuery() or $().

###Dive Deeper
- [Bonzo](https://github.com/ded/bonzo)
- [reqwest](https://github.com/ded/reqwest)
- [Bean](https://github.com/fat/bean)
