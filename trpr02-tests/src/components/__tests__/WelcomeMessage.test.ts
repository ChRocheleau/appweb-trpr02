import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeMessage from '../WelcomeMessage.vue'

describe('WelcomeMessage', () => {
  it('Doit afficher un message de bienvenue passé en paramètre.', async () => {
    const message = "string"; 
    const wrapper = mount(WelcomeMessage, {
      props: {
        welcomeMessage: message 
      }
    })
    expect(wrapper.text()).toContain(message);
  })
})


