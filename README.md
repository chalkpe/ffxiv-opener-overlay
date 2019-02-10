# ffxiv-opener-overlay
[ACT](https://advancedcombattracker.com/) [overlay](https://github.com/hibiyasleep/OverlayPlugin) for [Final Fantasy XIV](https://www.finalfantasyxiv.com/) that shows your real-time skill sequences.

![Summoner opener](public/smn-sb-opener.png)

* [In-game video (click to watch)](https://gaming.youtube.com/watch?v=sLJddcK1z6Y&feature=share)

## Usage

### Installation
```
https://chalkpe.github.io/ffxiv-opener-overlay
```

#### OverlayPlugin 
1. Open ACT
1. Plugins -> OverlayPlugin.dll -> New
1. Add new **Log Parse** type overlay (name is your choice)
1. Switch to the new overlay tab and set **URL** as above

#### ACTWebSocket
1. Open ACT
1. Plugins -> ACTWebSocket -> Check **Using BeforeLogLineRead**
1. **Add URL** -> set as above and select the new row -> Click **Overlay**

### Commands
* `/e toggle` - show/hide overlay
* `/e reset` - reset current sequence
* `/e scale <number>` - scale entire overlay (default: `1`)

## Development

#### dev server
```bash
yarn && yarn serve
```

#### build & deploy
```bash
yarn && yarn build && yarn deploy
```

## License
[MIT License](LICENSE)

### /src/assets
```
© 2010 - 2019 SQUARE ENIX CO., LTD. All Rights Reserved.
```