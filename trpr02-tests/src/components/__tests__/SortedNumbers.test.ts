import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SortedNumbers from '../SortedNumbers.vue'

    
    describe('SortedNumbers.vue', () => {
      it("Doit afficher les nombres triés d'un tableau passé en paramètre", () => {
        // TODO: À compléter
        const numbers = [2, 2, 3, 1, 7]
        const numbersSorted = [...numbers].sort((a, b) => a - b)
    
        const wrapper = mount(SortedNumbers, {
          props: { unsortedNumbers: numbers }
        })
        const unsortedText = wrapper.find('p:nth-child(3)').text() //p:nth-child(3) généré avec ChatGPT
        const sortedText = wrapper.find('p:nth-child(4)').text()
    
        expect(unsortedText).toBe(`Tableau non-triée : ${numbers.toString()}`)
        expect(sortedText).toBe(`Tableau triée : ${numbersSorted.toString()}`)
      })
    })
    
