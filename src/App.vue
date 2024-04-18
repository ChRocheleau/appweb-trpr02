<script setup lang="ts">
import Header from './components/Header.vue'
import MainMenu from './components/MainMenu.vue'
import Game from './components/Game.vue'
import Score from './components/Score.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'

const chosenPlayerName = ref<string>('')
const chosenPlayerShip = ref<string>('')

function handleLaunch(playerName: string, playerShip: string) {
chosenPlayerName.value = playerName
chosenPlayerShip.value = playerShip
currentScreen.value = 'Game'
}
const currentScreen = ref('MainMenu')
</script>

<template>
    <div id="fullPage" class="container-fluid" style="width: 150vh">
        <Header />
        <Suspense><MainMenu v-if="currentScreen === 'MainMenu'"
          @launchGame="handleLaunch"
        /></Suspense>
        <Game v-if="currentScreen === 'Game'"
          :playerNameToDisplay="chosenPlayerName"
          :playerShipToDisplay="chosenPlayerShip"
        />
        <Score v-if="currentScreen === 'Score'" />
        <Footer />
    </div>
</template>

<style scoped>
    #fullPage {
        width: 100%;
    }
</style>