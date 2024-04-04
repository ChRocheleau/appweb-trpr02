<script setup lang="ts">
import GameService from '../scripts/gameService.ts'

const ships = await new GameService().getShips()
</script>
<template>
    <div id="MainMenu" class="p-3 container">
        <div id="questTitle">
            <h4><b>Votre objectif: </b>survivre à 5 missions en obtenant le plus de crédits galactiques.</h4>
        </div>

        <!--<div id="logForm" class="col-12 p-3">
            <form id="creationPersonnage" method="post" action="">
                <label for="playerName">Votre nom:</label>
                <input type="text" id="playerName">
                <select class="form-select" name="historique" id="historique">
                    <option value="" selected>Choisir...</option>
                    <option v-for="ship in ships" :key="ship.id" value="ship.name">
                        {{ ship.name }}
                    </option>
                </select>
            </form>
        </div>-->
        <li v-for="ship in ships" :key="ship.id">
            {{ ship.name }}
        </li>
    </div>
</template>