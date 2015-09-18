# tinyall
## A tiny golfing language, just for the fun

### Syntax

The syntax is easy. Consider the following example:

    2

That prints an `Hello, World!` version. A code with an empty file or just a value will be printing it.

-------------------------------------------------------------------------------------------------------

Everything that isn't a capital letter (A-Z) or `=` or `_` is a variable or value.

Everything that is a capital letter (A-Z) or `_` is a function.

An example:

    <=P1_<

This sets the value of `P1` into `<` and then ouputs `<`. `P1` is an invocation to the function `P`, passing the value `1`.

---------------------------------------------------------------------------------------------------------------------------

An argument can be anything. A space has a special meaning. It indicated that there's no value.

The values a-z will be interpreted as 10-35, unless you attribute a value to it. Then it will have whatever value you gave.

---------------------------------------------------------------------------------------------------------------------------

Also, there is string interpolation. It is `[:<value>]`. `<value>` can be a variable or a function. An example:

    _"[:Hv]How are you, Mr./Ms. [:I]"

This will execute both `Hv` and `I`, which will be added to the string.

### Data types

There's no data types.

Whatever comes in, must go out. Either as a string, a number or what-not

### Functions

Currently, the number of functions is limited and will change:

 - `_` - Prints a value
 - `P` - Passes a value. This is used to give a value from a variable to another one
 - `H` - The `Hello, World!` function. It receives a number that will control the output of the function:
     - 1 - Start with `h` or `H`
     - 2 - Include the `,`
     - 3 - Capital `W` in `World`
     - 4 - End with `!`
     - 5 - End with a Linux newline
- `I` - Returns the input (marked to be deleted)
- `V` - Returns a value
