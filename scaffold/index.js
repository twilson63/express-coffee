var ejs = require('ejs')
  , fs = require('fs')
  , path = require('path')

module.exports = function(name) {
  var name = name.toLowerCase();
  var renderParams = {"name":name};

  var appDir = path.normalize((__dirname + "/../"));
  var renderAndSave = function(templateName, outputName) {
    if (fs.existsSync(outputName)) {
      console.log("! "+outputName+" already exists!");
      process.exit(1);
    }
    var template = fs.readFileSync(__dirname+"/"+templateName, "utf-8");
    var renderedTemplate = ejs.render(template, renderParams);
    fs.writeFileSync(appDir+outputName, renderedTemplate);
    console.log("# "+outputName+" created");
  }
  renderAndSave("controller.coffee.ejs", "src/controllers/"+ name+"s.coffee");
  renderAndSave("model.coffee.ejs", "src/models/"+ name+".coffee");
  renderAndSave("test.coffee.ejs", "test/"+ name+"s_test.coffee");

}
