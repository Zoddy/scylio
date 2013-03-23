horizon.js
============

Allocation and functional based templating engine.

## Usage

### Command Line

    $ horizon foo.horizon [-w|--watch] [-c|--compile] [(-o|--out)=TARGET]

Argument            |Definition
--------------------|----------
-w --watch       |Get in watch mode, and whenever a file change (also the imported files), recreate all
-c --compile     |If this is set, horizon will compile to one line and dumps whitespaces. If not you will get a pretty printed html file (good for debugging)
(-o --out)=TARGET|If you want a specific target path and filename, when you have to set it here


## Examples

### List of Tasks
JSON Data:

    [{
      "title": "Lorem ipsum",
      "content": "Dolor sit amet"
    }, {
      "title": "Hello",
      "content": "World"
    }, {
      "title": "Foo",
      "content": "Bar"
    }]

Horizon Template for the Body:

    :template('$')
      @5
      html
        head
          title = Horizon Template Example Tasks
        body
          ul#task-list
            :apply-templates('.*')

Horizon Template for the List:

    :template('@')
      li
        strong = {{ title }}
        span = {{ content }}
        
This will output the following:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Horizon Template Example Tasks</title>
      </head>
      <body>
        <ul id="task-list">
          <li>
            <strong>Lorem Ipsum</strong>
            <span>Dolor sit amet</span>
          </li>
          <li>
            <strong>Hello</strong>
            <span>World</span>
          </li>
          <li>
            <strong>Foo</strong>
            <span>Bar</span>
          </li>
        </ul>
      </body>
    </html>

## Elements

### Define elements
It's very easy to define elements.

    div
      #foo // set id to 'foo'
      .bar // set class to 'bar'
      .baz // sets another class to 'baz', so class-attribute will be 'bar baz'
      @title = test // set the attribute 'title' to 'test'
      = lorem ipsum
      = dolor sit amet
      
This will create the html `<div id="foo" class="bar baz" title="test">lorem ipsum dolor sit amet</div>`. This is the strict variant of horizon. You can also use various shortcuts, let's see:

    div#foo.bar.baz(title = test) = lorem ipsum dolor sit amet

That's it. It will create the same html.

## Functions
All functions begins with a `:`, followed by function name and arguments between braces (like a function call in much programming languages).

### Define a template

    :template(query)

**query** - A SparQL query, that says for which nodes this template is responsible.

    :template('/user') // a template which is responsible for the user nodes

### Set Variables
You can set global and local variables for using in all templates. If you set this outside of a template, it's global, instead it's local for the template. You can not override horizon-based variables.

    :set(key, value)

**key** - name of the variable  
**value** - content of the variable

    :set('foo', 'bar') // sets variable 'foo' to 'bar'
    :set('foo', 123) // sets variable 'foo' to 123

### Get Variables
To get the setted variables.

    :get(key)

**key** - name of the variable

    :set('foo', 123) // first set 'foo' to 123
    :get('foo') // returns 123

### Import plain text
You can import any other file as a plain text. But with this function you can also uses import hooks. That means, if you import a less-file and there's a hook for it (horizon.js brings it themself) it will automatically parse the file.

    :import(filepath[, options])

**filepath** - absolute path of the file, or relative to the template  
**options** - key-value-object with the following things:
  **useKeys** - this defines if horizon will parse keys in the document **[ default: true ]**  
  **keysParse** - will the keys parse `after` parsing the document or `before` that? **[ default: 'before' ]**



