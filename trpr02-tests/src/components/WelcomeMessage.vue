<script setup lang="ts">

// Utilisation de defineProps pour définir les props avec TypeScript
// On définit une interface pour typer les props
interface WelcomeMessageProps {
  welcomeMessage: string
}

// On passe l'interface comme générique à defineProps pour typer les props
const props = defineProps<WelcomeMessageProps>()

</script>

<template>
  <div>
    <h2>2-WelcomeMessage</h2>
    <p>
      Ce composant affiche un message de bienvenue. Le message est passé au
      composant par le prop "welcomeMessage".
    </p>

    <p>Message : {{ props.welcomeMessage }}</p>
  </div>
</template>

<style scoped></style>
