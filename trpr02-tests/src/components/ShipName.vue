<script setup lang="ts">
import axios from 'axios'
import toastr from 'toastr'
import { ref, onMounted } from 'vue'

// Définition des états réactifs
const shipName = ref('')
const isLoading = ref(false)

// Fonction pour charger le nom du vaisseau
async function loadShipName() {
  isLoading.value = true
  try {
    const { data } = await axios.get('https://swapi.dev/api/starships/10')
    shipName.value = data.name
  } catch (error) {
    displayErrorMessage(
      "Une erreur est survenue sur cette page. Si l'erreur persiste, communiquez avec le service à la clientèle."
    )
  } finally {
    isLoading.value = false
  }
}

// Fonction pour afficher un message d'erreur
function displayErrorMessage(errorMessage: string) {
  toastr.options = {
    closeButton: true,
    timeOut: 0
  }
  toastr.error(errorMessage)
}

// Exécution de loadShipName au montage du composant
onMounted(loadShipName)
</script>

<template>
  <div>
    <h2>5-ShipName</h2>
    <p>
      Ce composant affiche le nom d'un vaisseau spatial qui provient d'un API
      REST. Le id du vaisseau est 10 et la route pour accéder à la ressource est
      : https://swapi.dev/api/starships/10.
    </p>
    <p>
      Notez la présence d'une image de chargement qui s'affiche pendant que le
      nom du vaisseau spatial est récupéré (rafraîchissez la page pour voir).
    </p>

    <p>
      Résulat :
      <img
        v-if="isLoading"
        src="../assets/loading-waiting.gif"
        alt="Chargement..."
        width="20"
      />{{ shipName }}
    </p>
  </div>
</template>

<style scoped></style>