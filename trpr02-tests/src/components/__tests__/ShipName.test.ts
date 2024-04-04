import {
  describe,
  afterEach,
  it,
  expect,
  beforeAll,
  afterAll,
  vi
} from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ShipName from '../ShipName.vue'
import toastr from 'toastr'
import { setupServer } from 'msw/node'
import { success, networkError } from '../../../tests/mocks/handlers' // Assurez-vous que le chemin d'import est correct

const server = setupServer(...success) // Assurez-vous que les handlers correspondent à votre configuration

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => {
  // TODO Réinitialiser les handlers entre les tests
  // indice: server.??()
  vi.restoreAllMocks() // Réinitialiser les mocks entre les tests
})

describe('ShipName.vue', () => {
  it('Doit afficher le nom du vaisseau', async () => {
    const wrapper = mount(ShipName)
    await flushPromises() // Attendre que toutes les promesses soient résolues

    expect(true).toBe(false) // TODO Vérifier que le texte contient le nom du vaisseau spatial (Millennium Falcon)
  })

  it("Une notification doit informer l'utilisateur si une erreur réseau se produit.", async () => {
    // TODO Utiliser le handler networkError
    // indice: server.use(...)

    const toastrSpy = vi.spyOn(toastr, 'error')

    mount(ShipName)
    await flushPromises() // Attendre que toutes les promesses soient résolues

    expect(true).toBe(false) // TODO Vérifier que la fonction error de toastr a été appelée
  })
})
