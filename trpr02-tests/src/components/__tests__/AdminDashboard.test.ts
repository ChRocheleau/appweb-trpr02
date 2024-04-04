import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminDashboard from '../AdminDashboard.vue'

describe('AdminDashboard.vue', () => {
  it('Par défaut, un message de non-autorisation est affiché.', () => {
    const wrapper = mount(AdminDashboard, {
      // TODO le props isAdmin est faux par défaut.
      propsData: {
        isAdmin: false
      }
    })

    // Utilisation de expect avec toContain pour vérifier la présence du texte.
    // Note: La recherche n'est pas sensible à la casse directement, considérer le texte exact ou utiliser des méthodes pour transformer le texte si nécessaire.

    // TODO vérifie que le texte rendu par le composant enveloppé par wrapper contient la chaîne de caractères "accès non autorisé", en ignorant la casse grâce à l'option i dans l'expression régulière.
    expect(wrapper.text()).toContain("Accès non autorisé.")
  })

  it("Un message d'autorisation est affiché si l'utilisateur est un admin.", () => {
    const wrapper = mount(AdminDashboard, {
      // TODO le props isAdmin est vrai par défaut.
      propsData: {
        isAdmin: true
      }
    })

    // Utilisation de expect avec toContain pour vérifier la présence du texte attendu.

    // TODO vérifie que le texte rendu par le composant enveloppé par wrapper contient la chaîne de caractères "autorisé à accéder", en ignorant la casse grâce à l'option i dans l'expression régulière.
    expect(wrapper.text()).toContain("Autorisé à accéder à l'interface d'administration.")
  })
})
