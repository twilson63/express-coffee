# Express Coffee

This is a template node web app

## Technologies
This is a template that can be used to create nodejs applications using 

* Node v0.4.11
* Express v2.4.6
* CoffeeScript! v1.1.2
* Coffeekup v0.3.0

## Requirements

* [NodeJs](http://nodejs.org)
* [Express](http://expressjs.com)
* [CoffeeScript](http://coffeescript.org)
* [Coffeekup](http://coffeekup.org/)
* [Jasmine-Node](https://github.com/mhevery/jasmine-node/)

These will install with npm, just do 

```
npm install
```

In your project directory.

---

## Install, Build, Run, Test, and Watch

```
# Install nodejs and npm

git clone http://github.com/twilson63/express-coffee.git [project-name]
cd [project-name]
npm install

# Build

cake build

# Run

node server.js

# Test

cake spec

# Watch - Compile when files change.

cake watch

```

## Thanks to

* [Jeremy Ashkenas](https://github.com/jashkenas) for creating coffee-script
* [TJ Holowaychuk](https://github.com/visionmedia) for creating express
* [Maurice Machado](https://github.com/mauricemach) for creating coffeekup
* [Miško Hevery](https://github.com/mhevery) for creating Jasmine-Node
* [Pivotal Labs](http://github.com/pivotal/jasmine) for creating Jasmine

## About

express-coffee is a template or boiler-plate to get started writting 
express web applications in CoffeeScript.  It comes ready to go with base
setup for an Express Web App.  It includes a Cakefile that lets you build, 
spec, and watch your coffeescript as you develop.  You hack in the src folder
and run cake build to build you server files, write your jasmine tests in
your spec folder and run cake spec to run your test suite.  Create your
coffeekup views in the views folder and put your public assets in the public
folder.  Enjoy your express-coffee 

  ~      
c[_] 0.1.0     

Coffeekup Layout View borrowed from CoffeeKup Examples

## License

See LICENSE

## Ready to Deploy on Heroku

[heroku](http://devcenter.heroku.com/articles/node-js)


