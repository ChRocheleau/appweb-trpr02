import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ClickCounter from '../ClickCounter.vue'

describe('ClickCounter', () => {
  it("Version 1 : Sur le clic d'un bouton, le compteur doit incrémenter.", async () => {
    const wrapper = mount(ClickCounter)
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    // TODO Refaire un deuxième clic de bouton

    expect(wrapper.find('button').text()).toContain('Le compte est de 2')  // TODO Vérifier que le texte contient 'Le compte est de 2'
  })

  it("Version 2 : Sur le clic d'un bouton, le compteur doit incrémenter en utilisant un matcheur différent.", async () => {
    const wrapper = mount(ClickCounter)
    // TODO Faire deux clics de bouton
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('button').text()).toMatch(/2/)  // TODO Vérifier que le texte "toMatch()" le chiffre 2 (expression régulière /2/)."       
  })
})
