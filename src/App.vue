<script setup lang="ts">
import Header from './components/Header.vue'
import MainMenu from './components/MainMenu.vue'
import Game from './components/Game.vue'
import Score from './components/Score.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'

const chosenPlayerName = ref<string>('')
const chosenPlayerShip = ref<string>('')
const playerScore = ref<number>(0)
const currentScreen = ref('MainMenu')
const gameInProgress = ref(false)

function handleLaunch(playerName: string, playerShip: string) {
  chosenPlayerName.value = playerName
  chosenPlayerShip.value = playerShip
  currentScreen.value = 'Game'
  gameInProgress.value = true
}

function handleScore(score: number) {
  playerScore.value = score
  gameInProgress.value = false
}

function handleScreenChange(newScreen: string) {
  if (gameInProgress.value && currentScreen.value === "Game") {
    if (confirm("Êtes-vous sûr de vouloir quitter la partie en cours?")) {
      currentScreen.value = newScreen
    }
  } else {
    currentScreen.value = newScreen
  }
}

const emit = defineEmits<{
  (event: 'updateScreen', chosenScreen: string): void
}>()

</script>

<template>
  <div id="fullPage" class="container-fluid" style="width: 150vh">
    <Header @updateScreen="handleScreenChange" />
    <Suspense
      ><MainMenu v-if="currentScreen === 'MainMenu'" @launchGame="handleLaunch"
    /></Suspense>
    <Game
      v-if="currentScreen === 'Game'"
      :playerNameToDisplay="chosenPlayerName"
      :playerShipToDisplay="chosenPlayerShip"
      @updateScreen="handleScreenChange"
      @launchScore="handleScore"
    />
    <Score
      v-if="currentScreen === 'Score'"
      :playerNameToDisplay="chosenPlayerName"
      :playerScoreToDisplay="playerScore"
    />
    <Footer />
  </div>
</template>

<style scoped>
#fullPage {
  width: 100%;
}
</style>
