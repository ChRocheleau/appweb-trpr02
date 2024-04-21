---
outline: deep
---

# Revue du code du TP02 de Adam Royer

Le Travail pratique 2 porte sur un jeu de combat de vaisseaux utilisant typescript vite+vue.

Le code suivant est une version révisée des points en général:

## Semaine 1

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

## Semaine 2


## Pour le code suivant, étant donné que plusieurs propriétés du joueur de type Character sont prédéterminées, l'utilisation de constantes rend le code beaucoup plus lisible et clair, tout en facilitant la création du joueur.

```ts
<script setup lang="ts">
// Game.vue
const MAX_MISSION = 5;
const PLAYER_ID: string = "0";
const PLAYER_STARTING_CREDIT = 0;
const PLAYER_RANK = 4;
const PLAYER_STARTING_LIFE = 100;
// [...]
const player = ref<Character>({
  id: PLAYER_ID,
  name: props.playerNameToDisplay as string,
  credit: PLAYER_STARTING_CREDIT,
  experience: PLAYER_RANK,
  ship: {
    id: playerShip.value.id as string,
    name: playerShip.value.name as string,
    vitality: PLAYER_STARTING_LIFE
  }
});
</script>
```
## L'ajout d'un id GameBox dans les styles de la classe Game permet une meilleure gestion du css sur toutes les différentes boîtes de jeu (Actions, Mission en cours, Joueur et Ennemi). Cela permet de généraliser les styles pour éviter la répétition de code (DRY).
```ts
<script setup lang="ts">
// Game.vue
<div id="GameBox" class="row mx-auto">
  <div class="bg-primary text-white d-flex align-items-center py-2">
    <p class="m-0">Actions</p>
  </div>
  <div class="bg-light p-3" style="height: 15vh">
    <div class="row mx-auto">
      <div class="col">
        <button @click="handleCombat" class="btn btn-primary form-control">
          Combattre
        </button>
      </div>
      <div class="col">
        <button onclick="" class="btn btn-primary form-control">
          Terminer la mission
        </button>
      </div>
      <div class="col">
        <button onclick="" class="btn btn-primary form-control">
          Terminer la mission et réparer le vaisseau
        </button>
      </div>
    </div>
  </div>
</div>
</script>
<style scoped>
  #GameBox {
    border-radius: 10px;
    overflow: hidden;
  }
</style>
```
## La gestion de la barre de vie pour le joueur (et pour l'ennemi) est très bien codée, permettant de directement aller chercher la propriété de la vie du vaisseau du joueur (et de l'ennemi) pour s'ajuster automatiquement. Cette fonctionnalité est très efficace et les classes qui s'y sont associées sont claires et concises.
```ts
<script setup lang="ts">

// Game.vue
  <div class="progress">
    <div class="progress-bar bg-primary" role="progressbar"
      :style="{ width: player.ship.vitality + '%' }" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100">
      <span class="progress-text">{{ player.ship.vitality }}%</span>
    </div>
  </div>
</script>
<style scoped>
.progress {
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.progress-bar {
  width: 50px;
  border-radius: 5px;
  text-align: center;
  position: relative;
}

.progress-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}
</style>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>