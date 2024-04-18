<script setup lang="ts">
import { Ship } from "./../scripts/gameService.ts";
import { Character } from "./../scripts/gameService.ts";
import GameService from "./../scripts/gameService.ts";
import { ref, onMounted } from "vue";

const props = defineProps({
  playerNameToDisplay: String,
  playerShipToDisplay: String,
});

const gameService = new GameService();
const opponent = ref<Character | null>(null);
const playerShip = ref<Ship>();
const charactersIds = ref<string[]>([]);
const shipsIds = ref<string[]>([]);

onMounted(async () => {
  try {
    charactersIds.value = await gameService.getCharactersIds();
    shipsIds.value = await gameService.getCharactersIds();
    playerShip.value = await gameService.getShip(props.playerShipToDisplay as string);
    const randomOpponentId = getRandomCharacterId();
    const randomOpponentShipId = getRandomShipId();
    opponent.value = await getOpponent(randomOpponentId);
    opponent.ship.value = await getShip(randomOpponentShipId);
    console.log('Opponent:', opponent.value);
  } catch (error) {
    console.error('Error:', error);
  }
});

function getRandomCharacterId(): string {
  const maxIndex = charactersIds.value.length - 1;
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  return charactersIds.value[randomIndex];
}

async function getOpponent(id: string): Promise<Character> {
  const opponentData: Character = await gameService.getCharacter(id);
  return opponentData;
}

function getRandomShipId(): string {
  const maxIndex = shipsIds.value.length - 1;
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  return shipsIds.value[randomIndex];
}

async function getShip(id: string): Promise<Ship> {
  const shipData: Ship = await gameService.getShip(id);
  return shipData;
}

const MAX_MISSION = 5;
const PLAYER_ID: string = "0";
const PLAYER_STARTING_CREDIT = 0;
const PLAYER_RANK = 4;
const PLAYER_STARTING_LIFE = 100;
const currentMission = ref(1);
const player = ref<Character>({
  id: PLAYER_ID,
  name: props.playerNameToDisplay as string,
  credit: PLAYER_STARTING_CREDIT,
  experience: PLAYER_RANK,
  ship: {
    id: playerShip.value?.id as string,
    name: playerShip.value?.name as string,
    vitality: PLAYER_STARTING_LIFE
  }
});

function handleCombat() {
  if (currentMission.value < MAX_MISSION) {
    currentMission.value++;
  }
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
            <p>Maître - 0 CG</p>
            <p class="text-center">{{ player.ship.name }}</p>
            <div class="container">
              <div class="row justify-content-center mt-1">
                <div class="col-md-12">
                  <div class="progress">
                    <div class="progress-bar bg-primary" role="progressbar"
                      :style="{ width: player.ship.vitality + '%' }" aria-valuenow="100" aria-valuemin="0"
                      aria-valuemax="100">
                      <span class="progress-text">{{ player.ship.vitality }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6" v-if="opponent">
        <div id="GameBox" class="row mx-auto">
          <div class="bg-primary text-white d-flex align-items-center py-2">
            <p class="m-0">{{ opponent.name }}</p>
          </div>
          <div class="bg-light text-white" style="height: 15vh">
            <p>{{ opponent.experience }} - {{ opponent.credit }} CG</p>
            <p class="text-center">{{ opponent.ship.name }}</p>
            <div class="container">
              <div class="row justify-content-center mt-1">
                <div class="col-md-12">
                  <div class="progress">
                    <div class="progress-bar bg-primary" role="progressbar"
                      :style="{ width: opponent.ship.vitality + '%' }" aria-valuenow="100" aria-valuemin="0"
                      aria-valuemax="100">
                      <span class="progress-text">{{ opponent.ship.vitality }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
