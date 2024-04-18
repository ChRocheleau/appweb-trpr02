import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoAdder from '../TodoAdder.vue'

describe('TodoAdder.vue', () => {

  it("Par défaut, la zone d'ajout est vide.", async () => {
    const wrapper = mount(TodoAdder)

    expect(wrapper.findAllComponents(TodoAdder)).toHaveLength(0)
  })

  it("Par défaut, aucun bouton d'ajout n'est affiché.", () => {
    const wrapper = mount(TodoAdder)
    const addButton = wrapper.findAll('button')

    expect(addButton).toHaveLength(0)
  })

  it("Sur le clic du bouton, doit émettre l'événement 'newtask'", async () => {

  })

  it("Après avoir ajouté une tâche, la zone d'ajout est vidée.", async () => {

  })
})
