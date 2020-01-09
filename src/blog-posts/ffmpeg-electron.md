---
path: /blog/use-ffmpeg-electron
date: 2020-01-06
tags: [Electron, FFMPEG, Node]
title: Include FFMPEG Binaries in your Electron App
summary: How to use ffmpeg in your desktop Electron app.  Include the correct ffmpeg binaries for the user's machine and exclude the others.
---
Electron is a tool maintained by the GitHub team that allows developers to build desktop apps exclusively using web technologies which powers many popular desktop applications today including VScode, Atom, Slack, Discord and many others.  A main cause for its popularity is its ability to allow developers to transfer their web development skills over to building desktop applications that as a bonus often package Linux, Windows and Mac installers from the same code base.  

Electron does that by packaging the HTML, CSS and Javascript files for the project with a version of Chromium and optionally a copy of Node JS for some heavy lifting or to use the the interfaces Electron can access.  The Node process here is refered to as the 'main' process and the Chromium browser views and 'renderer' these process can message over IPC messages in a send/response pattern you can think of like HTTP or TCP.  What we will be doing here is packaging the binaries for FFMPEG with our application and interfacing with that binary using the main process.

## Get our dependencies
FFMPEG is a mature open source shell program for Unix and Windows that has been around for a long time that is widely used for manipulating and converting multimedia files.  This program can be used in your node projects using the [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) node package, this package however assumes the user has FFMPEG installed on our machine.  Which would be fine if we were running our node app on one of our servers, however since your Electron app needs to work on your end user's machine you cannot make this assumption.  We will remedy this issue by packaging a known version of the FFMPEG binaries in our app, again there is a package on NPM that serves this purpose, [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static). Additionally we will be doing the same with FFPROBE, another shell program commonly installed with FFMPEG, but with a seperate binary used for addressing multimedia metadata [ffprobe-static](ffprobe-static). All together:

`` yarn add fluent-ffmpeg ffmpeg-static ffprobe-static``
or
`` npm i fluent-ffmpeg ffmpeg-static ffprobe-static``

## Configure our Electron application
When Eletron packages an application it packages up your node_modules inside of an [asar archive](https://electronjs.org/docs/tutorial/application-packaging), in most instances this is great, but the fluent-ffmpeg package needs to have the directly path to our binary, it won't know what to do with a path inside of an archive.  So we get around this by instructing Electron Packager to not archive those modules.  this is done in our package.json, by adding the paths we want to retain to build.ararUnpack.  

```json
./package.json

...
build{
...
	"asarUnpack":[
		"node_modules/ffmpeg-static/bin/${os}/${arch}/ffmpeg",
		"node_modules/ffmpeg-static/index.js",
		"node_modules/ffmpeg-static/package.json"
		]
	}
}

```
Note what I am doing here with the string concatenation, ""node_modules/ffmpeg-static/bin/${os}/${arch}/ffmpeg" this is so that we can exclude the binaries for other os and architectures that the user won't need.  For instance I am developing this project from my 64-bit Ubuntu machine so once I have installed my Electron app I can check out the apps files in my /opt directory.
``/opt/ElectronReact/resources/app.asar.unpacked/node_modules/ffmpeg-static/bin/``
and I only have downloaded the binaries for linux/x64.  Whereas you can see here the node package [itself](https://github.com/eugeneware/ffmpeg-static/tree/master/bin) contains binaries for Windows, Mac (darwin) and Linux.

## Use it!
Now that we have everything set up we can go ahead and use ffmpeg in our program.  However your app is structured you can now run from the main process an ffmpeg job like so.

```javascript
//require the ffmpeg package so we can use ffmpeg using JS
const ffmpeg = require('fluent-ffmpeg');
//Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static').replace(
	'app.asar',
	'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
	'app.asar',
	'app.asar.unpacked'
);
//tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
```

Now you are all set to build your desktop multimedia application with the ease of javascript!