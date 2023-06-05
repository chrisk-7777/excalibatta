- [x] Background layers / map (LevelBackgroundTilesLayer)
- [x] Wall limits
- [x] Lift common stuff into GameObject class
- [x] Collect flour
- [x] Goal tile
- [x] z layer
- [x] camera follow
- [x] death tile like water or fire
- [x] (1) Stop / start game timer
- [x] restart level
- [x] tearing on camera
- [x] internal Wall
- [x] Door
- [x] DoorSwitch
- [x] Fix janky control
- [x] bug where nextx nexty in GO isn't always a full int. not related to janky, need to mark actual x/y
- [x] Water
- [x] map skin change
- [x] Animated tiles
- [x] goal complete level
- [x] water and fire tile need skin change
- [x] THEME_BACKGROUNDS back ground
- [x] Door isRaised from config
- [x] ground enemy
- [x] lift common ground + player into body
- [x] Ice tile
- [x] Clock news to come from level config
- [x] Lock
- [x] Teleport
- [x] Particle effect when collect
- [x] flying enemy
- [x] roaming enemy
- [x] thief
- [x] swap level #big (requires some refactoring)
- [x] enter key on death message. emit from Ex
- [x] conveyer
- [x] ice corners
- [x] ground enemy initial direction from config
- [x] doesn't respect refresh rate

## Low

- [x] not all gameobjects using simplifed sprite setup
- [x] sizing in GO + collision still inconsistent (sometimes / CELL sometimes not)
- [x] water tile turnsAroundAtWater?
- [x] shadow glitch on enemy
- [x] game instance doesn't need to be a global, it can just be exported from the file. similar to inventory
- [x] not all functions have return types
- [ ] event constants
- [ ] maybe some kind of "implenets" in JS vs lots of inherintance (https://timmousk.com/blog/typescript-instanceof-interface/)
- [ ] reset events for death message and timer are a bit icky
- [ ] fix types (search eslint / TODO)

## Custom

- [ ] door timers
- [ ] more keys
