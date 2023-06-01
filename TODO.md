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
- [ ] lift common ground + player into body
- [ ] swap level #big (requires some refactoring)
- [ ] Teleport
- [ ] Ice tile
- [ ] Lock
- [ ] Particle effect when collect
- [ ] Clock news to come from level config

## Low

- [x] not all gameobjects using simplifed sprite setup
- [ ] shadow glitch on enemy
- [ ] water tile turnsAroundAtWater?
- [ ] game instance doesn't need to be a global, it can just be exported from the file. similar to inventory
- [ ] reset events for death message and timer are a bit icky
- [ ] fix types in wall
- [ ] not all functions have return types
- [ ] sizing in GO + collision still inconsistent (sometimes / CELL sometimes not)

## Cusotm

- [ ] door timers
- [ ] more keys
