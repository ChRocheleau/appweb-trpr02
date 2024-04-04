import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ColorAdder from '../ColorAdder.vue'

describe('ColorAdder.vue', () => {
  it('Par défaut, la liste de couleurs est vide.', async () => {
    const wrapper = mount(ColorAdder)
    const colors = wrapper.findAll('li') 
   
    expect(colors.length).toBe(0)
  // TODO Vérifier que la liste est vide
                      // indice: lenght ... toBe
  })

  it('On doit pouvoir ajouter une couleur à la liste.', async () => {
    const colorToAdd = 'jaune'
    const wrapper = mount(ColorAdder)
    await wrapper.find('input[type="text"]').setValue(colorToAdd)
    await wrapper.find('button').trigger('click')

    // TODO Chercher un élément button dans le composant enveloppé par wrapper, puis déclenche un événement click sur ce bouton en utilisant une instruction asynchrone await pour attendre que l'action soit complétée.

    expect(wrapper.findAll('li').map(li => li.text())).toContain(colorToAdd)
  })

  it('Ajouter une couleur qui n’existe pas ne peut être ajoutée à la liste.', async () => {
    const notAColor = 'abcde'
    const wrapper = mount(ColorAdder)
    await wrapper.find('input[type="text"]').setValue(notAColor)
    await wrapper.find('button').trigger('click')
    // TODO Chercher un élément button dans le composant enveloppé par wrapper, puis déclenche un événement click sur ce bouton en utilisant une instruction asynchrone await pour attendre que l'action soit complétée.

    expect(wrapper.findAll('li').map(li => li.text())).not.toContain(notAColor) // TODO Vérifier que la liste est toujours vide
  })
})
