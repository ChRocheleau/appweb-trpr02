import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleColorAdder from '../SimpleColorAdder.vue'

describe('SimpleColorAdder.vue', () => {
  it('Par défaut, la liste de couleurs est vide.', async () => {
    const wrapper = mount(SimpleColorAdder)

    const colors = wrapper.findAll('li') 
   
    expect(colors.length).toBe(0) // TODO Vérifier que la liste est vide
                             // indice: lenght ... toBe
  })

  it('On doit pouvoir ajouter une couleur à la liste.', async () => {
    const colorToAdd = 'jaune'
    const wrapper = mount(SimpleColorAdder)
    await wrapper.find('input[type="text"]').setValue(colorToAdd)
    await wrapper.find('button').trigger('click')

    // TODO Chercher un élément input de type text dans le composant enveloppé par wrapper, puis définir la valeur de cet élément à colorToAdd en utilisant une instruction asynchrone await pour attendre que l'action soit complétée.
    
    expect(wrapper.findAll('li').map(li => li.text())).toContain(colorToAdd)
  })

  it("Une couleur cliquée dans la liste doit s'afficher.", async () => {
    const colorToAdd = 'jaune'
    const wrapper = mount(SimpleColorAdder)
    await wrapper.find('input[type="text"]').setValue(colorToAdd)
    await wrapper.find('button').trigger('click')

    // TODO Cliquer sur la couleur ajoutée à la liste (premier élément 0)
    // indice: uitiliser findAll

    const listItems = wrapper.findAll('li')
    await listItems[0].trigger('click')

    expect(wrapper.find('.selectedColor').text()).toContain(colorToAdd)
  })

  it('Ajouter une couleur qui n’existe pas ne peut être ajoutée à la liste.', async () => {
    const notAColor = 'abcde'
    const wrapper = mount(SimpleColorAdder)
    await wrapper.find('input[type="text"]').setValue(notAColor)
    await wrapper.find('button').trigger('click')

    expect(wrapper.findAll('li').map(li => li.text())).not.toContain(notAColor) // TODO Vérifier que la liste est toujours vide
  })
})
