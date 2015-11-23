# Forked from CreativeDo's excellent drag and drop ZXP Installer

NB: the ZXP installer currently uses electron-builder which, peculiarly, searches for a hard-coded array index ([1]) for the location/disposition of the installation icon.

As our installer is not a 'drag to applications' installer but rather a 'double-click-and-run' installer, this requires changing. This kind of output DMG cannot actually be set by altering `packager.json`. The first argument in the array that electron-builder is reading is the location of the Applications or other folder you'd like to display in the DMG (ie: the X in 'Drag me into X'). electron-builder expects the array to contain the folder location and if it's not there, it does what JS always does when you check an attribute of `undefined`. Not great API design. 

`node_modules/electron-builder/lib/osx.js`
```
    options.log( '- Starting creation of installer for ´' + options.platform );

    options.log( 'Writing temporary ´appdmg.json´' );

    options.config.osx.background         = path.resolve( options.basePath, options.config.osx.background );
    options.config.osx.icon               = path.resolve( options.basePath, options.config.osx.icon );
    options.config.osx.contents[ 0 ].path = options.appPath;  /// <<<<<<<<<<<<<<<<<< CHANGE FROM 1

```

Currently our version of electron-builder is 1.1.0 - I haven't forked electron-builder to fix this change currently as departing from upstream on a library which is already at 2.2.0 as I write this seems like a recipe for disaster.

Ideally we can come to this with a more mature stack than ZXP installer's current setup at a later date. For now, a quick monkey patch seems the easiest sollution. Sorry :/
