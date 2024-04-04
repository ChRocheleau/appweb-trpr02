<script setup lang="ts">
import { watch, ref } from 'vue'

const selectedColor = ref('')

// Définir les émissions et leurs types
const emit = defineEmits<{
  (event: 'clickColor', color: string): void
}>()

// Définition des props avec une valeur par défaut
const props = withDefaults(defineProps<{
  colors: string[]
}>(), {
  colors: () => []
})

// Surveillance du prop "colors" pour détecter les changements
watch(() => [...props.colors], (newColors, oldColors) => {
  console.log(
    'Le prop colors de ColorAdderList a été modifié.',
    'Avant : ' + oldColors,
    'Maintenant : ' + newColors
  )
}, { deep: true })

// Méthode pour émettre un événement personnalisé lors du clic sur une couleur
function onClick(color: string) {
  selectedColor.value = color
  emit('clickColor', color)
}
</script>

<template>
  <div>
    <h2>7B-ColorAdderList</h2>
    <p>
      Un clic sur une couleur de la liste émet l'événement "clickColor". L'événement est écouté par le composant parent ColorAdder qui lui affiche la couleur sélectionnée.
      <span class="fw-bold">C'est de cette façon qu'un composant enfant communique avec son parent.</span>
    </p>
    <p>Aussi, ce composant surveille les changements de la propriété "colors" et affiche un message dans la console dès qu'elle est modifiée.</p>
    <ul>
      <li v-for="color in props.colors" :key="color" @click="onClick(color)" :class="{ selected: color === selectedColor }">
        {{ color }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.selected {
  font-weight: bold;
}
</style>
