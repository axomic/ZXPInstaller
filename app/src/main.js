global.$ = $;

global.View = function() {
  var view = document.getElementById('main-view');
  var holder = document.getElementById('holder');
  var installer = global.installer();
  var spinner = new Spinner({color: "#bbbbbb", top: "170px"}).spin()

  this.zxpPath;

  _this = this;

  var install = function() {
    var promise = installer.install(_this.zxpPath);
    startInstalling();
    promise.then(function(result) {
      installationSuccess();
    }, function(err) {
      console.log(err); // Error
      installationFaild(err);
    });

  }

  var startInstalling = function(){
    $('.loaded').hide()
    $(view).find('.status');
    view.appendChild(spinner.el);
  }

  var installationFaild = function(error) {
    view.removeChild(spinner.el);
    $(view).find('.status').html(error);
  }

  var installationSuccess = function() {
    $('.status').hide()
    $('.loaded').show()
    $('body').addClass('installed');
    view.removeChild(spinner.el);
  }

  // PUBLIC

  this.init = function() {
    console.log('installing OpenAsset');
    _this.zxpPath = __dirname +'/assets/OpenAsset.zxp';
    install();
  }

}

$(document).ready(function() {
  var _view = new View();
  _view.init();
});
