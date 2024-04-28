<script setup lang="ts">
import { Character } from './../scripts/gameService.ts'
import { Experience } from './../scripts/gameService.ts'

const props = defineProps({
  characterToDisplay: Object as () => Character,
  vitalityPercentage: Number
})

function experienceConverter(experience: number) {
  let niveau: string

  switch (experience) {
    case 1:
      niveau = Experience[Experience.Débutant]
      break
    case 2:
      niveau = Experience[Experience.Confirmé]
      break
    case 3:
      niveau = Experience[Experience.Expert]
      break
    case 4:
      niveau = Experience[Experience.Maître]
      break
    default:
      niveau = 'Erreur niveau inconnu'
      break
  }

  return niveau
}
</script>
<template>
  <div id="GameBox" class="row mx-auto">
    <div class="bg-primary text-white d-flex align-items-center py-2">
      <p class="m-0" id="playerNameP">{{ props.characterToDisplay?.name }}</p>
    </div>
    <div class="bg-light text-white" style="height: 15vh">
      <p id="playerExpAndCreditP">
        {{
          experienceConverter(props.characterToDisplay?.experience as number)
        }}
        - {{ props.characterToDisplay?.credit }} CG
      </p>
      <p class="text-center" id="playerShipP">
        {{ props.characterToDisplay?.ship.name }}
      </p>
      <div class="container">
        <div class="row justify-content-center mt-1">
          <div class="col-md-12">
            <div class="progress">
              <div
                class="progress-bar bg-primary"
                role="progressbar"
                :style="{
                  width: props.vitalityPercentage + '%'
                }"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <span class="progress-text" id="playerShipVitalitySpan"
                  >{{ props.vitalityPercentage }}%</span
                >
              </div>
            </div>
          </div>
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
