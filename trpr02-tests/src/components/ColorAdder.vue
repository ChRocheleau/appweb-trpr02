<script setup lang="ts">
import { ref } from 'vue'
import ColorAdderList from './ColorAdderList.vue'

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

// Méthode pour gérer l'événement click sur une couleur émis par le composant enfant
function onClickColor(color: string) {
  clickedColor.value = color
}
</script>

<template>
  <div>
    <h2>7A-ColorAdder</h2>
    <p>
      Le comportement de ce composant est le même que celui du composant SimpleColorAdder ci-dessus. Il a tout simplement été décomposé en deux composants : ColorAdder et ColorAdderList. Le tableau de couleurs se trouve dans ColorAdder et les couleurs s'affichent dans ColorAdderList. Le tableau de couleurs est passé en paramètre au composant enfant colorAdderList par un prop.
      <span class="fw-bold">C'est de cette façon qu'un composant parent communique avec son enfant.</span>
    </p>
    <p>
      Aussi, ce composant écoute les événements de son enfant (ColorAdderList). Sur réception de l'événement "clickColor", il affiche la couleur sélectionnée.
    </p>

    <div class="input-group mb-3">
      <label for="color">Couleur</label>
      <input id="color" type="text" class="form-control" v-model="colorToAdd" />
      <button class="btn btn-outline-primary" @click="addColor">
        Ajouter la couleur
      </button>
    </div>

    <p>Couleur sélectionnée: {{ clickedColor }}</p>
    <ColorAdderList :colors="colors" @clickColor="onClickColor" />
  </div>
</template>

<style scoped></style>
