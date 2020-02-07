---
path: /blog/electron-icon-maker
date: 2020-01-26
tags: [electron, icons, icon, build]
title: Automatically create icons for your electron app for all platforms
summary: Use the electron-icon-maker package to build static icons for Linux, Mac, Windows from one source PNG file.
---

Electron let's you build native apps for Linux, Mac and Windows using web technologies and a common code base, drastically reducing the barriers to entry for web devs looking to build awesome desktop apps.  One annoying hurdle that Electron does not yet take care of for you is assembling icons for each of these platforms.  Luckily you can easily generate icons for every platform from one PNG file easilyusing of this handy NPM package "[Electron-Icon-Maker](https://www.npmjs.com/package/electron-icon-maker)" or [my fork](https://github.com/AlexanderCleasby/electron-icon-maker) thereof.  I will be covering using my fork explicitly in this walk through explicitly, but the only thing I changed in this fork was the file structure of my output to line up with what I already had in my Electron projects.

 1. Put a PNG of the icon you made in your buildResources folder as defined by your pacakge.json (default ./build).
 ![icon.png](https://raw.githubusercontent.com/AlexanderCleasby/TimeLapseStudio/master/resources/icon.ico)
 2. Install the module from my repo as a dev dependency.
``yarn add https://github.com/AlexanderCleasby/electron-icon-maker.git --dev``
 
 3. Add the following script to your package.json
 ```javascript
 {...
 scripts{
	 ...
	"create-icons": "electron-icon-maker --input=./build/icon.png --output=./build"
}
 }
 ```

4. Run ``yarn create-icons`` and you are done.  You now have, several PNG icons for Linux, ICO for Windows, ICNS for Mac and all in the format electron-builder recognizes.  Going forward if you want to make any change to your app's icon you can do so with very little busy work.
