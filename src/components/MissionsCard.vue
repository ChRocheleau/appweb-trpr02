<script setup lang="ts">
const props = defineProps({ currentMission: Number })
</script>
<template>
  <div id="GameBox" class="row mx-auto">
    <div class="bg-primary text-white d-flex align-items-center py-2">
      <p class="m-0" id="currentMissionP">Mission en cours</p>
    </div>
    <div class="bg-light p-3" style="height: 15vh">
      <p id="currentMissionCounterP">{{ props.currentMission }}/5</p>
      <p id="objectiveP">
        Objectif: survivre à 5 missions en obtenant le plus de crédits.
      </p>
    </div>
  </div>
</template>
<style scoped>
#GameBox {
  border-radius: 10px;
  overflow: hidden;
}
</style>
