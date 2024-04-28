<script setup lang="ts">
import { Ship } from '../scripts/gameService.ts'
import { ref } from 'vue'

const props = defineProps<{
  playerName: string
  playerShip: string
  formComplete: boolean
  ships: Ship[]
  formCompleted: (player: string, shipId: string) => void
  errorLoadingShips: boolean
  isLoading: boolean
}>()
const emit = defineEmits<{
  (event: 'formInvalid'): void
}>()
const playerName = ref<string>(props.playerName)
const playerShip = ref<string>(props.playerShip)

function checkFormValidity(player: string, shipId: string) {
  if (player.trim() == '' || shipId.trim() == '') {
    emit('formInvalid')
  } else {
    props.formCompleted(player, shipId)
  }
}
</script>
<template>
  <div id="logForm" class="col-3 p-3 mx-auto">
    <form id="creationPersonnage" @submit.prevent="props.formComplete">
      <div>
        <label for="playerName">Votre nom:</label>
      </div>
      <div class="mb-3">
        <input
          v-model="playerName"
          class="form-control"
          type="text"
          id="playerName"
        />
      </div>
      <div>
        <label for="playerShip">Votre vaisseau:</label>
      </div>
      <div class="mb-3">
        <select
          v-model="playerShip"
          class="form-select"
          name="historique"
          id="historique"
        >
          <option v-for="ship in ships" :key="ship.id" :value="ship.id">
            {{ ship.name }}
          </option>
        </select>
      </div>
      <button
        @click="checkFormValidity(playerName, playerShip)"
        type="submit"
        class="btn btn-primary form-control"
        :disabled="errorLoadingShips || isLoading"
      >
        Débuter la partie
      </button>
    </form>
  </div>
</template>
