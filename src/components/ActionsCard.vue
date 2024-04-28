<script setup lang="ts">
const props = defineProps<{
  handleCombat: () => void
  handleEndMission: () => void
  handleRepair: () => void
}>()
</script>
<template>
  <div id="GameBox" class="row mx-auto">
    <div class="bg-primary text-white d-flex align-items-center py-2">
      <p id="actionsP" class="m-0">Actions</p>
    </div>
    <div class="bg-light p-3" style="height: 15vh">
      <div class="row mx-auto">
        <div class="col">
          <button
            @click="props.handleCombat()"
            class="btn btn-primary form-control"
            id="fightButton"
          >
            Combattre
          </button>
        </div>
        <div class="col">
          <button
            @click="props.handleEndMission()"
            class="btn btn-primary form-control"
            id="endMissionButton"
          >
            Terminer la mission
          </button>
        </div>
        <div class="col">
          <button
            @click="props.handleRepair()"
            class="btn btn-primary form-control"
            id="endMissionAndRepairButton"
          >
            Terminer la mission et réparer le vaisseau
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#GameBox {
  border-radius: 10px;
  overflow: hidden;
}
</style>
