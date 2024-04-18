---
outline: deep
---

# Revue du code du TP02 de Adam Royer

Le Travail pratique 2 porte sur un jeu de combat de vaisseaux utilisant typescript vite+vue.

Le code suivant est une version révisée des points en général:

## Code très propre! Le placement des types personnalisés dans gameService est une bonne pratique. Le code est plus clair et organisé.
```ts
<script setup lang="ts">

//gameService.ts
export type Ship = {
  id: string
  name: string
}

export type Ranking = {
  id: string
  name: string
  score: number
}

export type Character = {
  id: string
  name: string
  credit: number
  experience: number
  ship: {
    id: number
    name: string
    vitality: number
  }
}

</script>
```
## Bonne division du code en composant. Ajout du Header et du Footer (pas requis, mais ajouté quand même) rend le code plus lisible et démontre une bonne séparation de la page.
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
## Bonne utilisation de la fonction formCompleted propre au composant MainMenu.vue qui contient le formulaire en question. Cette méthode évite de surcharger le composant App.vue de fonctions pouvant être déclarée à un composant plus spécifique.
```ts
<script setup lang="ts">

//MainMenu.vue
const emit = defineEmits<{
  (event: 'launchGame', chosenName: string, chosenShip: Ship): void
}>()

function formCompleted() {  
    emit('launchGame', playerName.value, playerShip.value)
}

</script>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>