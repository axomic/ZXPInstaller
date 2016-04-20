var platform = require("os").platform;
var install_process = require("child_process");
var path = require('path');

global.installer = function() {

  var RELEASE = 'zxp/release.zxp'
  var CMD_PREFIX = (platform() == "darwin") ? "--" : "/"

  var target_path = function() {
    var pathToBin
    switch (platform()) {
          case "darwin":
            pathToBin = "bin/OSX/Contents/MacOS/ExManCmd";
            break;
          case "win32":
            pathToBin = "bin/WINDOWS/ExManCmd.exe";
          case "win64":
            pathToBin = "bin/WINDOWS/ExManCmd.exe";
        }
    return pathToBin;
  }


  return {
    install: function(zxpPath) {

      console.log("using target path of " + target_path());
      console.log("startig to install ZXP from path " + zxpPath);

      return promise = new Promise(function(resolve, reject) {
        var spawn = install_process.spawn(path.join(__dirname, target_path()), [CMD_PREFIX+"install", zxpPath]);

        // AEM only prints out if something went wrong. Adobe - go figure
        spawn.stdout.on('data',function(data){
            console.log("stdout " + data.toString());
            reject(data.toString());
        });

        spawn.stderr.on('data',function(data){
            console.log("stdout " + data.toString());
            reject(data.toString());
        });

        // code 0 => success
        spawn.on('exit',function(code){
            if(code == 0) {resolve()}
        });

      });


    },

    uninstall: function(zxpPath) {

      console.log("using target path of " + target_path());
      console.log("startig to install ZXP from path " + zxpPath);
      return promise = new Promise(function(resolve, reject) {
          var cmd = path.join('"'+__dirname, target_path()) +'" '+
                    [CMD_PREFIX+"remove",
                     'com.axomic.openassetforindesign.extension'].join(' ');
          try {
            var child  = install_process.execSync(cmd );
          } catch(e){
              // "Why would you use execSync? - because ExManCmd isn't real"
          }
        resolve();

      });


    },
  }
};
