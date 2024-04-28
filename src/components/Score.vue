<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  playerNameToDisplay: String,
  playerScoreToDisplay: Number
})

const scores = ref<{ playerName: string; playerScore: number }[]>([])

const addScore = (playerName: string, playerScore: number) => {
  scores.value.push({ playerName, playerScore })
}

//placeholder values
addScore('Maximus', 160)
addScore('Barack Obama', 290)
addScore('Gale', 10)
addScore('NotACheater', 9999)

if (props.playerNameToDisplay != '') {
  addScore(
    props.playerNameToDisplay as string,
    props.playerScoreToDisplay as number
  )
}

scores.value.sort((a, b) => b.playerScore - a.playerScore)
</script>

<template>
  <div id="Score" class="py-3 container-fluid" style="height: 84vh">
    <div class="mt-2">
      <h5 class="text-center"><b>Pointage</b></h5>
      <hr />
    </div>

    <ul>
      <li v-for="score in scores" :key="score.playerName">
        {{ score.playerName }} - {{ score.playerScore }} CG
      </li>
    </ul>
  </div>
</template>

<style scoped>
#Score {
  height: 100%;
}
</style>
