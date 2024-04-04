<script setup lang="ts">
import { ref } from 'vue'

// Utilisation de ref pour créer une réactivité sur la variable count
// On initialise count avec 0
const count = ref(0)

// Fonction pour incrémenter count
function incrementCounter() {
  count.value++
}
</script>

<template>
  <div>
    <h2>1-ClickCounter</h2>
    <p>
      Ce composant affiche un compteur qui augmente de 1 à chaque fois que
      l'utilisateur clique sur le bouton.
    </p>
    <button class="btn btn-primary m-1" @click="incrementCounter">
      Le compte est de {{ count }}
    </button>
  </div>
</template>

<style scoped></style>