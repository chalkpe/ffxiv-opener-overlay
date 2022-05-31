# ffxiv-opener-overlay

![Package version] ![Global version] ![Korean version]

[ACT] [overlay][OverlayPlugin] for [FINAL FANTASY XIV] that shows your real-time skill sequences.

![Example]

* Watch in-game video: [YouTube]

## Installation

```url
https://chalkpe.github.io/ffxiv-opener-overlay/
```

### OverlayPlugin (recommended)

1. Open ACT
1. Plugins → OverlayPlugin.dll → `New`
1. Add new **Custom** preset, **MiniParse** type overlay (name is your choice)
1. Switch to the new overlay tab and set **URL** as above

### ACTWebSocket

1. Open ACT
1. Plugins → ACTWebSocket
1. Check **Using BeforeLogLineRead** on left panel
1. `Add URL` → set as above and select the new row → Click `Overlay`

## Requirements

### Supported clients

| Language | Patch |
| :--: | :--: |
| 日本語 (`jp`) | `6.11a` |
| English (`en`) | `6.11a` |
| Deutsch (`de`) | `6.11a` |
| Français (`fr`) | `6.11a` |
| 한국어 (`kr`) | `6.01` |

### In-game configuration

* (`jp`) キャラクターコンフィグ → チャットログ設定 → ログフィルター設定 → バトル → `自分からのアクションの開始/中断`
* (`en`) Character Configuration → Log Window Settings → Log Filters → Battle → `Actions initiated by you.`
* (`de`) Configuration personnage → Fenêtre de log → Filtres du log → Combat → `Vos actions`
* (`fr`) Charakterkonfiguration → Chatlog → Chatfilter → Kampfhandlungen → `Eigenes Kommando`
* (`kr`) 캐릭터 설정 → 대화창 설정 → 로그 필터 설정 → 전투 → `자신의 기술 시작 및 중단`

## Usage

### Commands

* `/e toggle` - show/hide overlay
* `/e reset` - reset current sequence
* `/e scale <number>` - scale entire overlay (default: `1`)

## Development

* [Job actions data] is automatically generated by [ffxiv-actions] package.

### Local development

```bash
yarn && yarn serve
```

### Deploy to GitHub Pages

```bash
yarn build && yarn deploy
```

## Maintainers

| [Chalk Alt][Chalk Alt: Twitter] |
| :--: |
| [![Chalk Alt: Avatar]][Chalk Alt: Lodestone] |

## License

[MIT License]

### /src/assets

```text
© 2010 - 2022 SQUARE ENIX CO., LTD. All Rights Reserved.
```

[MIT License]: LICENSE
[Example]: public/rdm-ew-opener.png
[Job actions data]: src/assets/actions
[ffxiv-actions]: https://github.com/ChalkPE/ffxiv-actions

[Package version]: https://img.shields.io/github/package-json/v/ChalkPE/ffxiv-opener-overlay
[Global version]: https://img.shields.io/badge/global-6.11a-blueviolet
[Korean version]: https://img.shields.io/badge/korea-6.01-red

[YouTube]: https://youtu.be/j2YD54eWDWE
[ACT]: https://advancedcombattracker.com/
[OverlayPlugin]: https://github.com/ngld/OverlayPlugin
[FINAL FANTASY XIV]: https://www.finalfantasyxiv.com/

[Chalk Alt: Twitter]: https://twitter.com/chalk_alt
[Chalk Alt: Lodestone]: https://na.finalfantasyxiv.com/lodestone/character/27400250/
[Chalk Alt: Avatar]: https://img2.finalfantasyxiv.com/f/1734839702c1c1e9792782c2bc669472_393eb74047bb90c8d80dea54218430eefc0_96x96.jpg
