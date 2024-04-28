<script setup lang="ts">
import { ref } from 'vue'
import { Ship } from '../scripts/gameService.ts'
import GameService from '../scripts/gameService.ts'
import RegisterForm from './RegisterForm.vue'

const ships = ref<Ship[]>([])
const playerName = ref<string>('')
const playerShip = ref<string>('')
const formComplete = ref(false)
const errorLoadingShips = ref(false)
const isLoading = ref(true)
const isFormValid = ref(false)

async function loadShips() {
  try {
    ships.value = await new GameService().getShips()
    isLoading.value = false
  } catch (error) {
    console.error('Error loading ships:', error)
    errorLoadingShips.value = true
    isLoading.value = false
  }
}

loadShips()

const emit = defineEmits<{
  (event: 'launchGame', chosenName: string, chosenShip: string): void
}>()

function handleInvalidForm() {
  formComplete.value = true
  isFormValid.value = false
}
function formCompleted(player: string, shipId: string) {
  formComplete.value = true
  playerName.value = player
  playerShip.value = shipId
  isFormValid.value = true
  const selectedShip = ships.value.find(
    (ship: { id: string }) => ship.id === playerShip.value
  )
  const shipName = selectedShip?.name ?? ''
  emit('launchGame', playerName.value, shipName)
}
</script>
<template>
  <div id="MainMenuPage" class="py-3 container-fluid" style="height: 84vh">
    <div id="questTitle">
      <h4>
        <b>Votre objectif: </b>survivre à 5 missions en obtenant le plus de
        crédits galactiques.
      </h4>
    </div>

    <div v-if="formComplete && !isFormValid" class="alert alert-danger mt-3">
      <strong>Erreur:</strong> Veuillez entrer votre nom et choisir un vaisseau.
    </div>

    <div v-if="errorLoadingShips" class="alert alert-danger mt-3">
      <strong>Erreur:</strong> Vaisseaux non trouvés
    </div>

    <RegisterForm
      :playerName="playerName"
      :playerShip="playerShip"
      :formComplete="formComplete"
      :ships="ships"
      :formCompleted="formCompleted"
      :errorLoadingShips="errorLoadingShips"
      :isLoading="isLoading"
      @formInvalid="handleInvalidForm"
    />
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
