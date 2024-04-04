<script setup lang="ts">
import { ref } from 'vue'

interface AdminDashboardProps {
  isAdmin: boolean
}

// Définition des props avec TypeScript
const props = defineProps<AdminDashboardProps>()

// Définition des messages autorisés et non autorisés comme réactifs
const authorizeMessage = ref("Autorisé à accéder à l'interface d'administration.")
const notAuthorizeMessage = ref('Accès non autorisé.')
</script>

<template>
  <div>
    <h2>3-AdminDashboard</h2>
    <p>
      Ce composant affiche un message différent selon que l'utilisateur est
      administrateur ou non. L'information sur le statut d'administrateur (vrai
      ou faux) est passée au composant par le prop "isAdmin".
    </p>

    <p>
      Message :
      <span v-if="props.isAdmin">{{ authorizeMessage }}</span>
      <span v-else>{{ notAuthorizeMessage }}</span>
    </p>
  </div>
</template>

<style scoped></style>