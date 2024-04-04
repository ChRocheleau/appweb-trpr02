<script setup lang="ts">
import { ref } from 'vue'

// Initialisation des états réactifs avec ref
const colors = ref<string[]>([])
const validColors = [
  'rouge',
  'bleu',
  'vert',
  'jaune',
  'orange',
  'violet',
  'marron',
  'noir',
  'blanc',
  'gris'
]
const colorToAdd = ref('')
const clickedColor = ref('')

// Méthode pour ajouter une couleur si elle est valide
function addColor() {
  if (validColors.includes(colorToAdd.value)) {
    colors.value.push(colorToAdd.value)
    colorToAdd.value = '' // Réinitialiser le champ après ajout
  }
}

// Méthode pour gérer le clic sur une couleur
function onClickColor(color: string) {
  clickedColor.value = color
}
</script>

<template>
  <div>
    <h2>6-SimpleColorAdder</h2>
    Ce composant permet d'ajouter des couleurs à une liste. Les couleurs possibles d'ajouter sont rouge, bleu, vert, jaune, orange, violet, marron, noir, blanc et gris. Lorsqu'une couleur est cliquée, elle est affichée sous la liste.

    <div class="input-group mb-3">
      <label for="color">Couleur</label>
      <input id="color" type="text" class="form-control" v-model="colorToAdd" />
      <button class="btn btn-outline-primary" @click="addColor">
        Ajouter la couleur
      </button>
    </div>

    <ul>
      <li
        v-for="color in colors"
        :key="color"
        @click="onClickColor(color)"
        :class="{ selected: color === clickedColor }"
      >
        {{ color }}
      </li>
    </ul>

    <p class="selectedColor">Couleur sélectionnée: {{ clickedColor }}</p>
  </div>
</template>

<style scoped>
.selected {
  font-weight: bold;
}
</style>
