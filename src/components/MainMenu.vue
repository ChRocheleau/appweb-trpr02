<script setup lang="ts">
import { ref } from 'vue'
import GameService from '../scripts/gameService.ts'

const ships = await new GameService().getShips()
const playerName = ref<string>("")
const playerShip = ref<string>("")

const emit = defineEmits<{
  (event: 'launchGame', chosenName: string, chosenShip: string): void
}>()

function formCompleted() {  
    emit('launchGame', playerName.value, playerShip.value)
}
</script>
<template>
    <div id="MainMenu" class="py-3 container-fluid" style="height: 84vh;">
        <div id="questTitle">
            <h4><b>Votre objectif: </b>survivre à 5 missions en obtenant le plus de crédits galactiques.</h4>
        </div>

        <div id="logForm" class="col-3 p-3 mx-auto">
            <form id="creationPersonnage" @submit.prevent="formCompleted">
                <div>
                    <label for="playerName">Votre nom:</label>
                </div>
                <div class="mb-3">
                    <input v-model="playerName" class="form-control" type="text" id="playerName">
                </div>
                <div>
                    <label for="playerShip">Votre vaisseau:</label>
                </div>
                <div class="mb-3">
                    <select v-model="playerShip" class="form-select" name="historique" id="historique">
                        <option disabled selected :value="null">Choisir...</option>
                        <option v-for="ship in ships" :key="ship.id" :value="ship.id">
                            {{ ship.name }}
                        </option>
                    </select>
                </div>
                <button onclick="formCompleted()" type="submit" class="btn btn-primary form-control">Débuter la partie</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
#MainMenu {
    height: 100%;
}
#logForm {
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 20px;
}
</style>
