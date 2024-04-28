---
outline: deep
---

# Revue du code du TP02 de Charles Rocheleau

Le Travail pratique 2 porte sur un jeu de combat de vaisseaux utilisant typescript vite+vue.

Le code suivant est une version révisée des points en général:

## Semaine 1

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

## Semaine 2

## Pour le code suivant, les requêtes d'information sont faites dans un OnMounted async avec un try-catch. Ce fonctionnement robuste inclus la possibilitée d'erreurs et attends de recevoir l'information. C'est une très bonne façon de faire des requêtes!

```ts
<script setup lang="ts">
//Game.vue
onMounted(async () => {
  try {
    charactersIds.value = await gameService.getCharactersIds();
    playerShip.value = await gameService.getShip(props.playerShipToDisplay as string);
    const randomOpponentId = getRandomCharacterId();
    opponent.value = await getOpponent(randomOpponentId);
    isLoading.value = false;
  } catch (error) {
    console.error('Error:', error);
  }
});

</script>
```
## Ici une fonction universelle est employée pour obtenir une valeur aléatoire parmis un array. Elle est utilisée pour recevoir l'ID d'un adversaire aléatoire. Cette fonction assure que l'adversaire sera toujours aléatoire. Beau code!
```ts
<script setup lang="ts">

//Game.vue
function getRandomCharacterId(): string {
  const maxIndex = charactersIds.value.length - 1;
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  return charactersIds.value[randomIndex];
}

</script>
```
## Pour le code suivant, une variable booléenne isLoading est utilisée pour s'assurer de l'intégrité des valeurs de l'adversaire qui est chargé dynamiquement avec la BD. C'est seulement lorsque toutes les requêtes à la BD sont completées que les valeurs de l'adversaire sont affichées. C'est un bon code qui évite les erreurs d'affichage. 
```ts
<script setup lang="ts">

//Game.vue
onMounted(async () => {
  try {
    //code existant
    isLoading.value = false;
  } catch (error) {
    console.error('Error:', error);
  }
});
<template>
    <div class="col-6" v-if="!isLoading">> //tant qu'il charge rien n'est affiché
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white d-flex align-items-center py-2">
            <p class="m-0">{{ opponent.name }}</p>
          </div>
          <div class="bg-light text-white" style="height: 15vh">
            <p>{{ opponent.experience }} - {{ opponent.credit.toString() }} CG</p>
            <p class="text-center">{{ opponent.ship.name }}</p>
            <div class="container">
              <div class="row justify-content-center mt-1">
                <div class="col-md-12">
                  <div class="progress">
                    <div class="progress-bar bg-primary" role="progressbar"
                      :style="{ width: opponent.ship.vitality + '%' }" aria-valuenow="100" aria-valuemin="0"
                      aria-valuemax="100">
                      <span class="progress-text">{{ opponent.ship.vitality }}%</span>
                      //fermeture divs
</template>

</script>
```

## Semaine 3

## Pour le code suivant, le calcul du pourcentage utilise Computed. Cette facon de faire est un bon exemple d'utilisation d'une propriété calculée. La propriété computed garantit que le pourcentage est toujours à jour, ce qui améliore la maintenabilité du code. Excellent code!

```ts
<script setup lang="ts">
//Game.vue
const opponentVitalityPercentage = computed(() => {
  const initialVitality =
    opponentInitialVitalities.value[currentOpponentIndex.value];
  const currentVitality =
    opponentCurrentVitalities.value[currentOpponentIndex.value];
  return Math.ceil((currentVitality / initialVitality) * 100);
});
</script>
```
## Ici la fonction est très simple et concise, facilitant la compréhension du code, elle crée efficacement une quantité aléatoire entre 0.03 et 0.06.
```ts
<script setup lang="ts">

//Game.vue
function getRandomAttackPercentage(): number {
  const minPercentage = 0.03;
  const maxPercentage = 0.06;
  const randomPercentage =
    Math.random() * (maxPercentage - minPercentage) + minPercentage;
  return randomPercentage;
}

</script>
```
## Pour cette ligne de code, les scores sont organisés en ordre décroissant, le score le plus élevé en premier. Cette approche permet une manipulation efficace des données et garantit que les scores sont présentés tel que demandés dans le récit 2.
```ts
<script setup lang="ts">

//Score.vue
scores.value.sort((a, b) => b.playerScore - a.playerScore);

</script>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>


