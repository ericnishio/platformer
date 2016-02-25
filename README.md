platformer
==========

![screencap][screencap]

## Setup

Requirements: *Node 5*

```
$ npm install
$ npm start
```

URL: `http://localhost:8080`

## Code Linting

```
$ npm run lint
```

## Tools

- [PyxelEdit](http://pyxeledit.com/) for art (.pyxel)
- [Tiled](http://www.mapeditor.org/) for level design (.tmx)
- [Bfxr](http://www.bfxr.net/) for sound effects (.bfxrsound)
- [MediaHuman Audio Converter](http://www.mediahuman.com/audio-converter/) for converting audio files (.wav to .ogg/.mp3)
- [Littera](http://kvazars.com/littera/) for converting fonts (.ttf to .fnt/.png)

[screencap]: /screenshots/screencap1.gif

## How to Upgrade Phaser

Clone the [Phaser repo](https://github.com/photonstorm/phaser) and create a custom Phaser build:

```
grunt custom --exclude p2,creature,ninja --split true
```

Then copy Phaser’s `dist/phaser.js` and `dist/pixi.js` files to `lib`.
