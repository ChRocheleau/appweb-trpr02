<script setup lang="ts">
import { computed } from 'vue'

interface SortedNumberProps {
  unsortedNumbers: number[]
}

// Définition des props avec TypeScript, et configuration de la valeur par défaut
const props = withDefaults(defineProps<SortedNumberProps>(), {
  unsortedNumbers: () => []
})

// Utilisation de computed pour créer une propriété calculée
const sortedNumbers = computed(() => {
  // Création d'une copie du tableau pour éviter de modifier le prop directement
  const copyOfUnsortedNumbers = [...props.unsortedNumbers]

  // Tri du tableau
  return copyOfUnsortedNumbers.sort((a, b) => a - b)
})
</script>

<template>
  <div>
    <h2>4-SortedNumber</h2>
    <p>
      Ce composant affiche des nombres triés dans l'ordre croissant. Les nombres
      sont passés au composant par le prop "unsortedNumbers".
    </p>
    <p>Tableau non-triée : {{ props.unsortedNumbers.toString() }}</p>
    <p>Tableau triée : {{ sortedNumbers.toString() }}</p>
  </div>
</template>

<style scoped></style>
