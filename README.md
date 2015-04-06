scylio
======

Allocation and functional based templating engine.

# Index
* [Options / Configuration](#options--configuration)
* [Doctype](#doctype)
* [Elements](#elements)
* [Functions](#functions)
  * [:template - Define a template](#define-a-template)
  * [:var - Get or set a variable](#variables)
  * [:import - Import plain text](#import-plain-text)
  * [:locale - Get or set locale](#internationalization--i18n)
    * [:__ - Localization / String translation](#localization--l10n)
    * [:numberFormat - Define how format numbers](#numbers)
    * [:number - Formats a number](#numbers)
    * [:currencyFormat - Define how to format a currency](#currency)
    * [:currency - Formats a currency](#currency)
* [Examples](#examples)
  * [List of tasks](#list-of-tasks)
* [Strict Coding Conventions](#strict-coding-conventions)


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

scylio Template for the Body:

    :template('$')
      !!!5
      html
        head
          title = Scylio Template Example Tasks
        body
          ul#task-list
            :applyTemplate('task-list')

scylio Template for the List:

    :template('@')
      li
        strong = {{ title }}
        span = {{ content }}

This will output the following:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Scylio Template Example Tasks</title>
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

# Options / Configuration
You can set various options to control the behavior of scylio. With just one parameter, you can read the options value. By setting the second parameter, you set the option.

    :config(key, [value])

Here is the list of available options:

* minimize: **true** or **false** - set to true, if the output should be minimized
* closeTags: **true** or **false** - if you have elements with no content (typically br-tags), they will be closed like `<br />`, otherwise just `<br>`
* strict: **true** or **false** - built-in check for strict coding conventions, see [Strict Coding Conventions](#strict-coding-conventions)
* htmlOnly: **true** or **false** - built-in check for html, the elements will be checked, if they are really existing (also the attributes)

# Doctype

Just begin your line with `!!!` and a following identifier to set the doctype.

Implemented doctypes

|Command|Alias|Output|
|-------|-----------|------|
|`!!!5`|`!!!HTML 5`|`<!DOCTYPE html>`|
|`!!!html`|`!!!HTML 5`|`<!DOCTYPE html>`|
|`!!!4s`|`!!!HTML 4.01 Strict`|`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`|
|`!!!4t`|`!!!HTML 4.01 Transitional`|`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`|
|`!!!4f`|`!!!HTML 4.01 Frameset`|`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`|
|`!!!x1s`|`!!!XHTML 1.0 Strict`|`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`|
|`!!!x1t`|`!!!XHTML 1.0 Transitional`|`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`|
|`!!!x1f`|`!!!XHTML 1.0 Frameset`|`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`|
|`!!!x11`|`!!!XHTML 1.1`|`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`|



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

This will create the html `<div id="foo" class="bar baz" title="test">lorem ipsum dolor sit amet</div>`. This is the strict variant of scylio. You can also use various shortcuts, let's see:

    div#foo.bar.baz(title = test) = lorem ipsum dolor sit amet

That's it. It will create the same html.

# Functions
All functions begin with a `:`, followed by function name and arguments in parantheses (like a function call in many programming languages). If you don't have arguments, parantheses are optional.

## Define a template

    :template(query)

**query** - JSONPath query over which you iterate

## Variables
You can set local variables and global variables for usage in all templates. If you set a variable outside of a template it's global, otherwise it's local for the template. You can not override scylio-based variables. When you call the `var:`function with one parameter, it acts as a getter, with a second parameter as a setter.

    :var(key, [value])

**key** - name of the variable  
**value** - content of the variable

    :var('foo', 'bar') // sets variable 'foo' to 'bar'
    :var('foo', 123) // overwrites variable 'foo' to 123
    :var('foo') // returns 123



## Import plain text
You can import any other file as a plain text or optionally set import hooks. E.g. if you import a less-file and you add a hook for that, it will automatically parse the file.

    :import([options])

**options** - key-value-object with the following things:  
**useKeys** - this defines if scylio will parse keys in the document **[ default: true ]**  
**keysParse** - will the keys parse `after` parsing the document or `before` that? **[ default: 'before' ]**

    '/var/www/test.txt'|:import // will import the file from given filepath


## Internationalization / i18n

The default locale is en_US. If you are using no parameter, you will get the current setted locale. With one parameter you set the locale.

    :locale // will return 'en_US'
    :locale('de_DE') // set locale and return 'de_DE'
    :locale // will return 'de_DE'

### Localization / l10n

To add localization support, you have to set the l10n-setting.

    :__([plural])

**plural** - number of entities that you have, so the text can use the plural, singular, null or whatever form **[ default: 1 ]**

    'Cat'|:__ // will output 'Katze', if you have a german translation
    'Cat'|:__(1) // will output 'Katze', if you have a german translation
    'Cat'|:__(2) // will output 'Katzen', if you have a german translation


### Formatting

There are three ways to implement the formatters. Like the variable function, if you set the formatter outside a template, it will be applied globally, otherwise locally for the template. You can even format a value inline.


#### Numbers

    :numberFormat(decimalCount, decimalMark, digitGroup) // global or temporary
    :number(decimalCount, decimalMark, digitGroup) // inline
    :number // inline, but with default or from :numberFormat

**decimalCount** - count of numbers after the decimal mark **[ default: 2 ]**  
**decimalMark** - char(s) for the decimal mark **[ default: '.' ]**  
**digitGroup** - char(s) for digit grouping **[ default: ',' ]**

    10123.4583|:number(2, ',', '.') // will output 10.123,45
    10123.4583|:number(1, '.', ',') // will output 10,123.4


#### Date and Time

TODO


#### Currency

TODO


## default

sets a default parameter if the predecessor is empty (string, list) or 0 (number) or not defined

    :default(content)

**content** - what you want to instead of the empty or nonexisting predeccesor

    ''|:default('foobar') // will output 'foobar'
    []|:default('foobar') // will output 'foobar'
    0|:default('foobar') // will output 'foobar'
    42|:default('foobar') // will output 42


## length

get the length of a list or a string

    :length

no arguments here

    'foobar'|:length // will output 6
    ['abc', 'def', 'ghi']|:length // will output 3


## partly

If you have a string, a list/array you can get parts of it, like you know from other languages. If you have a string, you get a substring, if you have a list, you get the part out of it.

    :partly(start)
    :partly(start, end)

**start** - index where you want to start (begins with 0)  
**end** - index where you want to end. you can also use negative numbers **[ default: to end of the string or list/array ]**

    ['abc', 'cde', 'foo', 'bar']|:partly(1, 2) // will output ['cde', 'foo']
    ['abc', 'cde', 'foo', 'bar']|:partly(0, -1) // will output ['abc', 'cde', 'foo']
    'foobar'|:partly(1, 2) // will output 'oo'
    'foobar'|:partly(0, -1) // will output 'fooba'
