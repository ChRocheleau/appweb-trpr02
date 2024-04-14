import axios from 'axios' 
const RANKING_PATH = '/ranking'
const SHIPS_PATH = '/ships'
const CHARACTER_STARTING_PATH = '/characters?_page='
const CHARACTER_ENDING_PATH = '&_limit=1'

export type Ship = {
  id: string
  name: string
}

export type Ranking = {
  id: string
  name: string
  score: number
}

export type Character = {
  id: string
  name: string
  credit: number
  experience: number
  ship: {
    id: number
    name: string
    vitality: number
  }
}

export default class GameService {
  API_URL: string
  constructor () {
    this.API_URL = 'http://127.0.0.1:3000'
  }

  async getRankings () {
    const { data } = await axios.get(this.API_URL + RANKING_PATH)
    return data
  }

  async getShips () {
    const { data } = await axios.get(this.API_URL + SHIPS_PATH)
    return data
  }

  async getCharacter (characterPlacement : number) {
    const { data } = await axios.get(this.API_URL + CHARACTER_STARTING_PATH + characterPlacement + CHARACTER_ENDING_PATH)
    return data
  }
}