<script setup lang="ts">
import { ref } from 'vue'
import GameService from '../scripts/gameService.ts'

const ships = await new GameService().getShips()
const playerName = ref<string>("")
const playerShip = ref<string>("")
const formComplete = ref(false);

const emit = defineEmits<{
  (event: 'launchGame', chosenName: string, chosenShip: string): void
}>()

function formCompleted() { 
    formComplete.value = true; 
    const selectedShip = ships.find((ship: { id: string; }) => ship.id == playerShip.value)
    const shipName = selectedShip.name
    emit('launchGame', playerName.value, shipName)
}
</script>
<template>
    <div id="MainMenuPage" class="py-3 container-fluid" style="height: 84vh;">
        <div id="questTitle">
            <h4><b>Votre objectif: </b>survivre à 5 missions en obtenant le plus de crédits galactiques.</h4>
        </div>

        <div v-if="(formComplete && playerName == '') || (formComplete && playerShip == '')" class="alert alert-danger mt-3">
            <strong>Erreur:</strong> Veuillez entrer votre nom et choisir un vaisseau.
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
                        <option v-for="ship in ships" :key="ship.id" :value="ship.id">
                            {{ ship.name }}
                        </option>
                    </select>
                </div>
                <button @click="formCompleted()" type="submit" class="btn btn-primary form-control">Débuter la partie</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
#MainMenuPage {
    height: 100%;
}
#logForm {
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 20px;
}
</style>
