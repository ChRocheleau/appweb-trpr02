import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ColorAdderList from '../ColorAdderList.vue'
//TODO Importer le composant ColorAdderList

describe('ColorAdderList.vue', () => {
  it('Doit afficher une liste de couleurs provenant du composant parent', async () => {
    // TODO Créer un tableau de constantes colors : bleu, blanc rouge
    const colors = ['bleu', 'blanc', 'rouge']
    const wrapper = mount(ColorAdderList, {
      props: { colors }
    })

    const colorList = wrapper.findAll('li').map(li => li.text())

    expect(colorList).toStrictEqual(colors)
    // TODO Vérifier que la liste de couleurs est égale à colors
    // indice: toStrictEqual(...)
  })

  it("Sur le clic d'une couleur, doit émettre l'événement clickColor", async () => {
    // TODO Créer un tableau de constantes colors : bleu, blanc rouge
    const colors = ['bleu', 'blanc', 'rouge']
    const wrapper = mount(ColorAdderList, {
      props: { colors }
    })

    await wrapper.findAll('li')[0].trigger('click')

    const emittedEvent = wrapper.emitted('clickColor')
    expect(emittedEvent && emittedEvent[0]).toStrictEqual([colors[0]])
  })

  it("Sur modification du prop colors, un message doit s'afficher dans la console", async () => {
    const spyConsole = vi.spyOn(console, 'log')

    // TODO Créer un tableau de constantes colors : bleu, blanc rouge
    const colors = ['bleu', 'blanc', 'rouge']
    const wrapper = mount(ColorAdderList, {
      props: { colors }
    })

    await wrapper.setProps({ colors: [...colors, 'jaune'] })

    expect(spyConsole).toHaveBeenCalledWith(
      'Le prop colors de ColorAdderList a été modifié.',
      expect.anything(),
      expect.anything()
    )

    // Nettoyer le mock après le test
    // TODO Appeler la méthode mockRestore du mock spyConsole
    spyConsole.mockRestore()
  })
})
