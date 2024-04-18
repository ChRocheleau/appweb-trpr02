import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../TodoList.vue'

describe('TodoList.vue', () => {

  it('Par défaut, la liste des tâches est vide.', () => {
    const wrapper = mount(TodoList)

    expect(wrapper.findAllComponents(TodoList)).toHaveLength(0)
  })

  it('Par défaut, le nombre de tâches affiché est 0', () => {
    const wrapper = mount(TodoList)

    expect(wrapper.find('[role="counter"]').text()).toBe('0')
  })

  it("Le nombre de tâches doit s'afficher dans le bas de la liste.", async () => {
    const wrapper = mount(TodoList)

    expect(wrapper.find('[role="counter"]').exists())
  })

  it('Un clic sur la liste de tâches inverse son contenu.', async () => {

  })

  it('On peut ajouter une tâche à la liste.', async () => {

  })
})
