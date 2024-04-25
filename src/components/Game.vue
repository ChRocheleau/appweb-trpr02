<script setup lang="ts">
import { Character } from "./../scripts/gameService.ts";
import { Experience } from "./../scripts/gameService.ts";
import GameService from "./../scripts/gameService.ts";
import { ref, onMounted, computed } from "vue";
// @ts-ignore
import { Modal } from "bootstrap";

const props = defineProps({
  playerNameToDisplay: String,
  playerShipToDisplay: String,
});

const emit = defineEmits<{
  (event: "updateScreen", chosenScreen: string): void;
}>();
const HOME_SCREEN: string = "MainMenu";

const gameService = new GameService();
const MAX_MISSION = 5;
const PLAYER_ID: string = "0";
const PLAYER_STARTING_CREDIT = 0;
const PLAYER_RANK = 4;
const PLAYER_STARTING_LIFE = 100;
const currentMission = ref(1);

const opponents = ref<Character[]>([]);
const currentOpponentIndex = ref(0);
const opponentInitialVitalities = ref<number[]>([]);
const opponentCurrentVitalities = ref<number[]>([]);

const charactersIds = ref<string[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    charactersIds.value = await gameService.getCharactersIds();
    for (let i = 0; i < MAX_MISSION; i++) {
      const randomOpponentId = getRandomCharacterId();
      const opponentData = await getOpponent(randomOpponentId);
      opponents.value.push(opponentData);
      opponentInitialVitalities.value.push(opponentData.ship.vitality);
      opponentCurrentVitalities.value.push(opponentData.ship.vitality);
    }
    isLoading.value = false;
  } catch (error) {
    console.error("Error:", error);
  }
});

const player = ref<Character>({
  id: PLAYER_ID,
  name: props.playerNameToDisplay as string,
  credit: PLAYER_STARTING_CREDIT,
  experience: PLAYER_RANK,
  ship: {
    id: "",
    name: props.playerShipToDisplay as string,
    vitality: PLAYER_STARTING_LIFE,
  },
});

const opponentVitalityPercentage = computed(() => {
  const initialVitality =
    opponentInitialVitalities.value[currentOpponentIndex.value];
  const currentVitality =
    opponentCurrentVitalities.value[currentOpponentIndex.value];
  return Math.round((currentVitality / initialVitality) * 100);
});

function getRandomCharacterId(): string {
  const maxIndex = charactersIds.value.length - 1;
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  return charactersIds.value[randomIndex];
}

async function getOpponent(id: string): Promise<Character> {
  const opponentData: Character = await gameService.getCharacterById(id);
  return opponentData;
}

function fromExperienceToHitProbabilityConverter(experience: number): number {
  let probability: number;

  switch (experience) {
    case 1:
      probability = 0.2;
      break;
    case 2:
      probability = 0.35;
      break;
    case 3:
      probability = 0.5;
      break;
    case 4:
      probability = 0.7;
      break;
    default:
      probability = 0;
      break;
  }

  return probability;
}

function experienceConverter(experience: number) {
  let niveau: string;

  switch (experience) {
    case 1:
      niveau = Experience[Experience.Débutant];
      break;
    case 2:
      niveau = Experience[Experience.Confirmé];
      break;
    case 3:
      niveau = Experience[Experience.Expert];
      break;
    case 4:
      niveau = Experience[Experience.Maître];
      break;
    default:
      niveau = "Erreur niveau inconnu";
      break;
  }

  return niveau;
}

function handleCombat() {
  handlePlayerAttack();
  handleOpponentAttack();
  if (
    opponentCurrentVitalities.value[currentOpponentIndex.value as number] <= 0
  ) {
    handleMissionOver();
  }
  if (player.value.ship.vitality <= 0) {
    gameOver();
  }
}

function gameOver() {
  handleGameOverMessage();
  emit('updateScreen', HOME_SCREEN);
}

function handleMissionOver() {
  console.log("mission over");
  player.value.credit += opponents.value[currentOpponentIndex.value].credit;
  handleMissionOverMessage();
  if (currentMission.value < MAX_MISSION) {
    currentMission.value++;
    currentOpponentIndex.value++;
  }
  if (currentOpponentIndex.value >= MAX_MISSION) {
    currentOpponentIndex.value = 0;
  }
}

function handlePlayerAttack() {
  let probability = fromExperienceToHitProbabilityConverter(PLAYER_RANK);
  const randomProbability = Math.random();
  if (randomProbability <= probability) {
    playerAttack();
  } else {
    console.log("player missed");
  }
}

function handleOpponentAttack() {
  let probability = fromExperienceToHitProbabilityConverter(
    opponents.value[currentOpponentIndex.value].experience
  );
  const randomProbability = Math.random();
  if (randomProbability <= probability) {
    opponentAttack();
  } else {
    console.log("opponent missed");
  }
}

function playerAttack() {
  const playerDamage =
    getRandomAttackPercentage() *
    opponentInitialVitalities.value[currentOpponentIndex.value];
  opponentCurrentVitalities.value[currentOpponentIndex.value] -=
    playerDamage * 2;
  if (opponentCurrentVitalities.value[currentOpponentIndex.value] < 0)
    opponentCurrentVitalities.value[currentOpponentIndex.value] = 0;
}

function opponentAttack() {
  const opponentDamage = getRandomAttackPercentage() * PLAYER_STARTING_LIFE;
  player.value.ship.vitality -= opponentDamage;
  if (player.value.ship.vitality < 0) player.value.ship.vitality = 0;
}

function getRandomAttackPercentage(): number {
  const minPercentage = 0.03;
  const maxPercentage = 0.06;
  const randomPercentage =
    Math.random() * (maxPercentage - minPercentage) + minPercentage;
  return randomPercentage;
}

const alertMessage = ref("");

function showAlert(message: string) {
  alertMessage.value = message;
  const modalElement = document.querySelector(".modal");
  const modal = Modal.getOrCreateInstance(modalElement);
  modal.show();
}

function handleMissionOverMessage() {
  const MISSION_OVER_MESSAGE = `Vous avez gagné la mission! Vous avez récupéré ${
    opponents.value[currentOpponentIndex.value].credit
  } crédits!`;
  showAlert(MISSION_OVER_MESSAGE);
}

function handleGameOverMessage() {
  const GAME_OVER_MESSAGE = `Vous êtes mort, la mission à échouée!`;
  showAlert(GAME_OVER_MESSAGE);
}
</script>

<template>
  <div id="Game" class="py-3 container-fluid" style="height: 84vh">
    <div class="row justify-content-center mb-5">
      <div class="col-7">
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white d-flex align-items-center py-2">
            <p class="m-0">Actions</p>
          </div>
          <div class="bg-light p-3" style="height: 15vh">
            <div class="row mx-auto">
              <div class="col">
                <button
                  @click="handleCombat"
                  class="btn btn-primary form-control"
                >
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
        </div>
      </div>
      <div class="col-3">
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white d-flex align-items-center py-2">
            <p class="m-0">Mission en cours</p>
          </div>
          <div class="bg-light p-3" style="height: 15vh">
            <p>{{ currentMission }}/5</p>
            <p>
              Objectif: survivre à 5 missions en obtenant le plus de crédits.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white d-flex align-items-center py-2">
            <p class="m-0">{{ player.name }}</p>
          </div>
          <div class="bg-light text-white" style="height: 15vh">
            <p>
              {{ experienceConverter(player.experience) }} -
              {{ player.credit }} CG
            </p>
            <p class="text-center">{{ player.ship.name }}</p>
            <div class="container">
              <div class="row justify-content-center mt-1">
                <div class="col-md-12">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      :style="{ width: player.ship.vitality + '%' }"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span class="progress-text"
                        >{{ Math.round(player.ship.vitality) }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6" v-if="!isLoading">
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white d-flex align-items-center py-2">
            <p class="m-0">{{ opponents[currentOpponentIndex].name }}</p>
          </div>
          <div class="bg-light text-white" style="height: 15vh">
            <p>
              {{
                experienceConverter(opponents[currentOpponentIndex].experience)
              }}
              - {{ opponents[currentOpponentIndex].credit }} CG
            </p>
            <p class="text-center">
              {{ opponents[currentOpponentIndex].ship.name }}
            </p>
            <div class="container">
              <div class="row justify-content-center mt-1">
                <div class="col-md-12">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      :style="{ width: opponentVitalityPercentage + '%' }"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span class="progress-text"
                        >{{ opponentVitalityPercentage }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mission Réussie!</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ alertMessage }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
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

#GameBox {
  border-radius: 10px;
  overflow: hidden;
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
