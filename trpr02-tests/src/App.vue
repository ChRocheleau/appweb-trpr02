<!-- Section script : Il s'agit de la partie JavaScript du composant, où vous pouvez définir les propriétés et les méthodes du composant, ainsi que gérer les interactions avec l'utilisateur. C'est ici que vous pouvez définir les données que vous voulez afficher dans le template et comment ces données sont gérées. -->
<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Importation des composants
import ClickCounter from './components/ClickCounter.vue'
import WelcomeMessage from './components/WelcomeMessage.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import SortedNumbers from './components/SortedNumbers.vue'
import ShipName from './components/ShipName.vue'
import SimpleColorAdder from './components/SimpleColorAdder.vue'
import ColorAdder from './components/ColorAdder.vue'

</script>

<!-- Section template : Il s'agit de la partie HTML du composant, qui définit la structure et l'affichage du composant. C'est ici que vous décidez comment les données sont affichées et comment l'utilisateur interagit avec le composant. -->
<template>
  <div class="container">
    <h1>Exemples de composants</h1>
    <p>
      Il y a beaucoup de commentaires dans le code de l'application ainsi que
      dans les tests. Les commentaires sont la plupart du temps écrit sur une
      seule ligne. Je vous suggèrre d'utiliser la séquence de touche Alt + Z,
      avec VSCode, pour activer/désactiver le mode "Word Wrap". Cela vous
      permettra de lire les commentaires plus facilement.
    </p>

    <!-- Les composants sont utilisés dans la section template. -->
    <ClickCounter />
    <!--   
    Les props sont des propriétés qui sont passées à un composant lors de son utilisation. Ci-dessous, on affecte au prop "welcomeMessage" de WelcomeMessage un message texte.  
    *** Notez la particularité de la syntaxe utilisée pour utiliser le prop welcomeMessage: La déclaration du prop "welcomeMessage" dans le composant WelcomeMessage utilise la syntaxe "camelCase" (voir 2-WelcomeMessage.vue), mais l'attribut "initial-message" de WelcomeMessage ci-dessous (qui est le prop welcomeMessage), utilise la syntaxe "kebab-case". VueJs fait cette conversion automatiquement. La syntaxe "camelCase" fonctionnerait aussi, mais respecte moins le standard HTML. 
    *** Notez aussi que la balise WelcomeMessage, utilise la syntaxe "PascaleCase".
    -->
    <WelcomeMessage welcome-message="Wow, c'est magique les props !" />
    <!-- 
      Version camelCase (fonctionne mais ne respecte pas le standard HTML)
      <WelcomeMessage
      welcomeMessage="Ce message provient d'un prop dans le composant parent App)"
    /> -->

    <!-- Dans les deux exemples suivants, notez la présence du v-bind (le :). On pourrait se demander pourquoi dans l'exemple précédent, il n'y a pas de v-bind. Si on n'utilise pas le v-bind, VueJs interpréte le contenu comme étant une chaîne de caractères et non, comme un type spécifique. Dans AdminDashboard ce doit être un booléen et dans SortedNumbers un tableau. -->
    <AdminDashboard :isAdmin="false" />
    <SortedNumbers :unsorted-numbers="[6, 1, 14, 3, 2]" />
    <ShipName />
    <SimpleColorAdder />
    <ColorAdder />
  </div>
</template>

<!-- Section style : Il s'agit de la partie CSS du composant, où vous pouvez définir les styles pour le composant. Les styles définis ici ne s'appliquent qu'au composant actuel et ne sont pas affectés par d'autres composants. Cela vous permet de maintenir une séparation claire entre les différents composants et d'éviter les conflits de style.-->
<!-- L'attribut "scoped", permet de vous assurer que les styles de chaque composant sont clairement séparés les uns des autres, ce qui peut faciliter la maintenance et la compréhension du code.-->
<style scoped></style>
