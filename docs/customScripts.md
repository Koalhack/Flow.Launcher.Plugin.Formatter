# Custom Scripts

> [!INFO]
> This page is a modified version of the [Boop project](https://github.com/IvanMathy/Boop/blob/main/Boop/Documentation/CustomScripts.md) documentation

## Setup

To use custom scripts, you need to go to the `Scripts` folder located in `...\flow-launcher\UserData\Plugins\Formatter-x.x.x`.

## Writing Custom Scripts

You can easily extend **Formatter** with custom scripts to add your own functionality. Each script is a self-contained Javascript file that is loaded at app launch. If you make something cool or useful, feel free to submit a PR and share it with everyone else!

### Meta info

Each script starts with a declarative JSON document, describing the contents of that file, a title, a description, and search tags. All that stuff is contained within a top level comment (with some extra asterisks) just like so:

```js
/**
  {
    "api":1,
    "name":"Add Slashes",
    "description":"Escapes your text",
    "author":"Ivan",
    "icon":"quote",
    "tags":"add,slashes,escape"
  }
**/
```

- `api` is not currently used, but is strongly recommended for potential backwards compatibility. You should set it to 1.
- `name`, `description` and `author` are exactly what you think they are.
- `icon` is a visual representation of your scripts' actions. (is not currently used, but will can be used soon)
- `tags` are used to filter and sort results.

### The Main Function

Your script must declare a top level `main()` function, that takes in a single argument of type `ScriptExecution`. This is where all of the magic happens.

Your script will only be executed once, just like a web browser would at page load. Anytime your script's services are requested, `main()` will be invoked with a new execution object.

Your script will be kept alive in its own virtual machine, retaining context and any potential global variables/functions you define. This means you need to be mindful of potentially generated garbage.

```js
function main(state) {
  // Do something useful here (or not)
}
```

### ScriptExecution

The script execution object is a representation of the current state of the editor. This is how you communicate with the main app. A new execution object will be created and passed down to your script every time the user needs it. Once your `main()` returns, values are extracted from the execution and put back in the editor.

Script executions are not exactly full Javascript objects, instead they're a proxy to the native `ScriptExecution` Plugin class that communicates with FLow Launcher. Property are actually dynamic getters and setters rather than stored values. Therefore, try to only use the values you need and store them in variables to avoid calling native code too often.

#### Property

At the moment, Script execution object have only one property to deal with text: `text`.

- `text` will contain or set the entire string from the clipboard.

```js
let text = state.text; // get
state.text = 'Replace the whole text in your clipboard'; // set
```
