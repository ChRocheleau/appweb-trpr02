---
outline: deep
---

# Revue du code du TP02 de Charles Rocheleau

Le Travail pratique 2 porte sur un jeu de combat de vaisseaux utilisant typescript vite+vue.

Le code suivant est une version révisée des points en général:

## Ici la norme de mettre les requêtes à l'API dans un GameService est bien respectée et le code est très propre. Ce qui était un des points non respecté du TP01, il y a une nette amélioration!
```ts
<script setup lang="ts">

//gameService.ts
export default class GameService {
  API_URL: string
  constructor () {
    this.API_URL = 'http://127.0.0.1:3000'
  }

  async getRankings () {
    const { data } = await axios.get(this.API_URL + RANKING_PATH)
    return data
  }

  async getShips () {
    const { data } = await axios.get(this.API_URL + SHIPS_PATH)
    return data
  }

  async getCharacter (characterPlacement : number) {
    const { data } = await axios.get(this.API_URL + CHARACTER_STARTING_PATH + characterPlacement + CHARACTER_ENDING_PATH)
    return data
  }
}

</script>
```
## Une variable currentScreen est utilisée pour suivre l'écran actuel affiché permettant ainsi un affichage dynamique, très beau code!
```ts
<script setup lang="ts">

//App.vue
<template>
    <div id="fullPage" class="container-fluid" style="width: 150vh">
        <Header />
        <Suspense><MainMenu v-if="currentScreen === 'MainMenu'"
          @launchGame="handleLaunch"
        /></Suspense>
        <Game v-if="currentScreen === 'Game'"
          :playerNameToDisplay="playerName"
          :playerShipToDisplay="playerShip"
        />
        <Score v-if="currentScreen === 'Score'" />
        <Footer />
    </div>
</template>

</script>
```
## Pour le code suivant, les composants enfants ne communiquent pas entre eux et l'information est passée efficacement, ce qui est une très bonne utilisation des composants.
```ts
<script setup lang="ts">

//App.vue
<template>
    <div id="fullPage" class="container-fluid" style="width: 150vh">
        <Header />
        <Suspense><MainMenu v-if="currentScreen === 'MainMenu'"
          @launchGame="handleLaunch"
        /></Suspense>
        <Game v-if="currentScreen === 'Game'"
          :playerNameToDisplay="playerName"
          :playerShipToDisplay="playerShip"
        />
        <Score v-if="currentScreen === 'Score'" />
        <Footer />
    </div>
</template>

</script>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>


