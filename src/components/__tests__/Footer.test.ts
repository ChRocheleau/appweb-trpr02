import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'

describe('Footer.vue', () => {

  it("Par défaut, la balise <p> est bien présente avec le bon contenu.", async () => {
    const wrapper = mount(Footer)

    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').text()).toBe('© Charles Rocheleau et Adam Royer')
  })
})
