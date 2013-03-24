horizon
=======

Allocation and functional based templating engine.


# Examples

## List of Tasks
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

    :template('body')
      @5
      html
        head
          title = Horizon Template Example Tasks
        body
          ul#task-list
            :applyTemplate('task-list')

Horizon Template for the List:

    :template('content')
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

# Elements

## Define elements
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

# Functions
All functions begins with a `:`, followed by function name and arguments between braces (like a function call in much programming languages).

## Define a template

    :template([name])

**name** - Name of the template, it's optional, but good for debugging

## Set Variables
You can set global and local variables for using in all templates. If you set this outside of a template, it's global, instead it's local for the template. You can not override horizon-based variables.

    :set(key, value)

**key** - name of the variable  
**value** - content of the variable

    :set('foo', 'bar') // sets variable 'foo' to 'bar'
    :set('foo', 123) // sets variable 'foo' to 123


## Get Variables
To get the setted variables.

    :get(key)

**key** - name of the variable

    :set('foo', 123) // first set 'foo' to 123
    :get('foo') // returns 123


## Import plain text
You can import any other file as a plain text. But with this function you can also uses import hooks. That means, if you import a less-file and there's a hook for it (horizon.js brings it themself) it will automatically parse the file.

    :import(filepath[, options])

**filepath** - absolute path of the file, or relative to the template  
**options** - key-value-object with the following things:
  **useKeys** - this defines if horizon will parse keys in the document **[ default: true ]**  
  **keysParse** - will the keys parse `after` parsing the document or `before` that? **[ default: 'before' ]**


## Internationalization / i18n

The defualt locale is en_US. If you want to change this:

    :setLocale('de_DE')
    
And to get it:

    :getLocale() // will return 'de_DE'

### Localization / l10n

To add localization support, you have to set the l10n-setting.

    :__(key[, [sprintf, ..][, plural]])

**key** - identifier of the text  
**sprintf** - horizon supports sprintf, so you can add sprintf variables as much, as you want, also nesting (and deep nesting) is supported  
**plural** - number how much entities you have, so the text can use the plural, singular, null or whatever form

    :__('Foo %s Baz', 'Bar') // 'Foo Bar Baz'
    :__('Cat', 1) // Cat
    :__('Cat', 2) // Cats


### Formatting

There are always two ways to implement the formatters. It's like the variable function. If you set it outside a template, the settings will be global, otherwise local for the template. But you can also formatting it inline.


#### Numbers

    :numberFormat(decimalCount, decimalMark, digitGroup) // global or temporary
    :number(number, decimalCount, decimalMark, digitGroup) // inline
    :number(number) // inline, but with default or from :numberFormat

**number** - the number which you want to format
**decimalcount** - count of numbers after the decimal mark **[ default: 2 ]**  
**decimalMark** - char(s) for the decimal mark **[ default: '.' ]**  
**digitGroup** - char(s) for digit grouping **[ default: ',' ]**

    :number(10123.4583, 2, ',', '.') // will output 10.123,45
    :number(10123.4583, 1, '.', ',') // will output 10,123.4


#### Currency