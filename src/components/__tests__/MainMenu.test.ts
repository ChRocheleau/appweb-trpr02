import { describe, expect, it } from 'vitest'
import MainMenu from '../MainMenu.vue'
import { mount } from '@vue/test-utils'


describe('MainMenu.vue', () => {
  it('emits launchGame event with player name and ship when form is submitted', async () => {
    const wrapper = mount(MainMenu)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('launchGame')).toBeTruthy()
    expect(wrapper.emitted('launchGame')[0]).toEqual(['John Doe', 'Millennium Falcon'])
  })
  
  /*it('emits launchGame event with player name and ship when form is submitted', async () => {
    const wrapper = mount(MainMenu)
    console.log(wrapper.html())
    const playerNameInput = wrapper.find('input')
    await playerNameInput.setValue('John Doe')
    const select = wrapper.find('select')
    await select.setValue('20')
    wrapper.find('button[type="submit"]').trigger('click')

    expect(wrapper.emitted('launchGame')).toBeTruthy()
    expect(wrapper.emitted('launchGame')[0]).toEqual(['John Doe', 'Millennium Falcon'])
  })*/
  
})
