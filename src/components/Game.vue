<script setup lang="ts">
import { Character } from './../scripts/gameService.ts'
import GameService from './../scripts/gameService.ts'
import ActionsCard from './ActionsCard.vue'
import MissionsCard from './MissionsCard.vue'
import CharacterCard from './CharacterCard.vue'
import { ref, onMounted, computed } from 'vue'
// @ts-ignore
import { Modal } from 'bootstrap'

const props = defineProps({
  playerNameToDisplay: String,
  playerShipToDisplay: String
})

const emit = defineEmits<{
  (event: 'updateScreen', chosenScreen: string): void
  (event: 'launchScore', playerScore: number): void
}>()
const HOME_SCREEN: string = 'MainMenu'
const SCORE_SCREEN: string = 'Score'

const gameService = new GameService()
const MAX_MISSION = 5
const PLAYER_ID: string = '0'
const PLAYER_STARTING_CREDIT = 0
const PLAYER_RANK = 4
const PLAYER_STARTING_LIFE = 100
const currentMission = ref(1)

const opponents = ref<Character[]>([])
const currentOpponentIndex = ref(0)
const opponentInitialVitalities = ref<number[]>([])
const opponentCurrentVitalities = ref<number[]>([])
const charactersIds = ref<string[]>([])

const isLoading = ref(true)
const alertMessage = ref('')

const GAME_OVER_MESSAGE = `Vous êtes mort, la mission à échouée!`
const MISSION_OVER_MESSAGE = `Vous avez gagné la mission!`

onMounted(async () => {
  try {
    charactersIds.value = await gameService.getCharactersIds()
    for (let i = 0; i < MAX_MISSION; i++) {
      const randomOpponentId = getRandomCharacterId()
      const opponentData = await getOpponent(randomOpponentId)
      opponents.value.push(opponentData)
      opponentInitialVitalities.value.push(opponentData.ship.vitality)
      opponentCurrentVitalities.value.push(opponentData.ship.vitality)
    }
    isLoading.value = false
  } catch (error) {
    console.error('Error:', error)
  }
})

const player = ref<Character>({
  id: PLAYER_ID,
  name: props.playerNameToDisplay as string,
  credit: PLAYER_STARTING_CREDIT,
  experience: PLAYER_RANK,
  ship: {
    id: '',
    name: props.playerShipToDisplay as string,
    vitality: PLAYER_STARTING_LIFE
  }
})

const opponentVitalityPercentage = computed(() => {
  const initialVitality =
    opponentInitialVitalities.value[currentOpponentIndex.value]
  const currentVitality =
    opponentCurrentVitalities.value[currentOpponentIndex.value]
  return Math.ceil((currentVitality / initialVitality) * 100)
})

function getRandomCharacterId(): string {
  const maxIndex = charactersIds.value.length - 1
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1))
  return charactersIds.value[randomIndex]
}

async function getOpponent(id: string): Promise<Character> {
  const opponentData: Character = await gameService.getCharacterById(id)
  return opponentData
}

function fromExperienceToHitProbabilityConverter(experience: number): number {
  let probability: number

  switch (experience) {
    case 1:
      probability = 0.2
      break
    case 2:
      probability = 0.35
      break
    case 3:
      probability = 0.5
      break
    case 4:
      probability = 0.7
      break
    default:
      probability = 0
      break
  }

  return probability
}

function handleCombat() {
  handlePlayerAttack()
  handleOpponentAttack()
  if (
    opponentCurrentVitalities.value[currentOpponentIndex.value as number] <= 0
  ) {
    handleMissionOver('credit')
  }
  if (player.value.ship.vitality <= 0) {
    gameOver()
  }
}

function gameOver() {
  showAlert(GAME_OVER_MESSAGE)
  const modalElement = document.querySelector('.modal')
  const modal = Modal.getOrCreateInstance(modalElement)

  emit('launchScore', 0)

  modalElement?.addEventListener('hidden.bs.modal', () => {
    emit('updateScreen', HOME_SCREEN)
  })

  const modalTitle = modalElement?.querySelector('.modal-title')
  if (modalTitle) {
    modalTitle.textContent = 'Mission Échouée!'
  }

  modal.show()
}

function handleMissionOver(action: string) {
  if (currentMission.value < MAX_MISSION) {
    if (action == 'message') {
      showAlert(MISSION_OVER_MESSAGE)
    } else if (action == 'repair') {
      repairShip()
    } else if (action == 'credit') {
      player.value.credit += opponents.value[currentOpponentIndex.value].credit
      const MISSION_OVER_MESSAGE = `Vous avez gagné la mission! Vous avez récupéré ${opponents.value[currentOpponentIndex.value].credit
        } crédits!`
      showAlert(MISSION_OVER_MESSAGE)
    }
    currentMission.value++
    currentOpponentIndex.value++
  } else {
    player.value.credit += opponents.value[currentOpponentIndex.value].credit
    handleGameWon()
  }
}
function handleEndMission() {
  if (currentMission.value < MAX_MISSION) {
    showAlert(MISSION_OVER_MESSAGE)
    currentMission.value++
    currentOpponentIndex.value++
  } else {
    handleGameWon()
  }
}
function handleRepair() {
  if (currentMission.value < MAX_MISSION) {
    repairShip()
    currentMission.value++
    currentOpponentIndex.value++
  } else {
    handleGameWon()
  }
}

function repairShip() {
  const costPerPercentage = 5;
  const repairPercentage = 1;
  const maxHealth = 100;

  const maxRepairPercentage = Math.min(player.value.credit / costPerPercentage, maxHealth - player.value.ship.vitality);
  const repairAmount = Math.floor(maxRepairPercentage / repairPercentage);
  const healthToAdd = repairAmount * repairPercentage;
  const creditSpent = repairAmount * costPerPercentage;

  player.value.ship.vitality += healthToAdd;
  player.value.credit -= creditSpent;

  showAlert(`Vaisseau réparé de ${healthToAdd}% pour ${creditSpent} crédits.`);
}

function handleGameWon() {
  const totalGameCredits = player.value.credit
  const modalElement = document.querySelector('.modal')
  const modal = Modal.getOrCreateInstance(modalElement)

  emit('launchScore', totalGameCredits)

  modalElement?.addEventListener('hidden.bs.modal', () => {
    emit('updateScreen', SCORE_SCREEN)
  })

  const modalBody = modalElement?.querySelector('.modal-body')
  if (modalBody) {
    modalBody.textContent = `Félicitations! Vous avez gagné! Crédits gagnés: ${totalGameCredits}`
  }

  modal.show()
}

function handlePlayerAttack() {
  let probability = fromExperienceToHitProbabilityConverter(PLAYER_RANK)
  const randomProbability = Math.random()
  if (randomProbability <= probability) {
    playerAttack()
  }
}

function handleOpponentAttack() {
  let probability = fromExperienceToHitProbabilityConverter(
    opponents.value[currentOpponentIndex.value]?.experience
  )
  const randomProbability = Math.random()
  if (randomProbability <= probability) {
    opponentAttack()
  }
}

function playerAttack() {
  const playerDamage =
    getRandomAttackPercentage() *
    opponentInitialVitalities.value[currentOpponentIndex.value]
  opponentCurrentVitalities.value[currentOpponentIndex.value] -=
    playerDamage * 2 //6 à 12% de dégats pour bien balancer la difficulté
  if (opponentCurrentVitalities.value[currentOpponentIndex.value] < 0)
    opponentCurrentVitalities.value[currentOpponentIndex.value] = 0
}

function opponentAttack() {
  const opponentDamage = getRandomAttackPercentage() * PLAYER_STARTING_LIFE
  player.value.ship.vitality -= opponentDamage
  if (player.value.ship.vitality < 0) player.value.ship.vitality = 0
}

function getRandomAttackPercentage(): number {
  const minPercentage = 0.03
  const maxPercentage = 0.06
  const randomPercentage =
    Math.random() * (maxPercentage - minPercentage) + minPercentage
  return randomPercentage
}

function showAlert(message: string) {
  alertMessage.value = message
  const modalElement = document.querySelector('.modal')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}
</script>

<template>
  <div id="Game" class="py-3 container-fluid" style="height: 84vh">
    <div class="row justify-content-center mb-5">
      <div class="col-7">
        <ActionsCard :handleCombat="handleCombat" :handleEndMission="handleEndMission" :handleRepair="handleRepair" />
      </div>
      <div class="col-3">
        <MissionsCard :currentMission="currentMission" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <CharacterCard :characterToDisplay="player" :vitalityPercentage="Math.ceil(player.ship.vitality)" />
      </div>
      <div class="col-6" v-if="!isLoading">
        <CharacterCard :characterToDisplay="opponents[currentOpponentIndex]"
          :vitalityPercentage="opponentVitalityPercentage" />
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mission Réussie!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ alertMessage }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Game {
  height: 100%;
}

.progress {
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.progress-bar {
  width: 50px;
  border-radius: 5px;
  text-align: center;
  position: relative;
}

.progress-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}
</style>
