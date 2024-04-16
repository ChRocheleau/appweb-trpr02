<script setup lang="ts">
import Ship from "./../scripts/gameService.ts";
import { ref } from "vue";

const MAX_MISSION = 5;
const currentMission = ref(1);

const props = defineProps({
  playerNameToDisplay: String,
  playerShipToDisplay: Ship,
});

function handleCombat() {
  if (currentMission.value < MAX_MISSION) {
    currentMission.value++;
  }
}
</script>

<template>
  <div id="Game" class="py-3 container-fluid" style="height: 84vh">
    ##############################################################################################################################
    <div class="row">
      <div class="col-6">
        <div class="bg-primary text-white">
        <p>Actions</p>
      </div>
        <div id="GameBox" class="container row p-3 mx-auto">
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
      <div class="col-6">
        <p>Mission en cours</p>
        <div id="#GameBox" class="container col-3 p-3 mx-auto">
          <p>{{ currentMission }}/5</p>
          <p>
            Objectif: survivre à 5 missions en obtenant le plus de crédits
            galactiques.
          </p>
        </div>
      </div>
    </div>
    ##############################################################################################################################
    <div class="row">
      <div class="col-6">
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white">
            <p>{{ props.playerNameToDisplay }}</p>
          </div>
          <div class="bg-light text-white">
            <p>Rank - 0 CG</p>
            <p class="text-center"> {{ props.playerShipToDisplay }} </p>
          </div>
        </div>
      </div>
    </div>

    <div id="playerShip" class="container col-3 p-3 mx-auto">
      <div></div>
    </div>

    <div id="opponentShip" class="container col-3 p-3 mx-auto">
      <div></div>
    </div>
  </div>
</template>

<style scoped>
#Game {
  height: 100%;
}
#GameBox {
  //border: 2px solid #ccc;
  border-radius: 10px;
}
</style>
