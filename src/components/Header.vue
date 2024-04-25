<script setup lang="ts">

const HOME_SCREEN: string = "MainMenu"
const SCORE_SCREEN: string = "Score"

const emit = defineEmits<{
  (event: 'updateScreen', chosenScreen: string): void
}>()

</script>

<template>
  <header class="container-fluid bg-dark text-light p-3 text-center">
    <div class="row">
      <div class="col-4">
        <div class="row align-items-center">
          <div class="col-6">
            <h3><b>Star What</b></h3>
          </div>
          <div class="col-3">
            <h5 @click="emit('updateScreen', HOME_SCREEN)">Accueil</h5>
          </div>
          <div class="col-3">
            <h5 @click="emit('updateScreen', SCORE_SCREEN)">Score</h5>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  h5 {
    cursor: pointer;
  }

  h5:hover {
    font-weight: bold;
  }
</style>