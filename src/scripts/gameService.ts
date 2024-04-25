import axios from 'axios' 
const RANKING_PATH = '/ranking'
const SHIPS_PATH = '/ships'
const CHARACTERS_PATH = '/characters'
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
    id: string
    name: string
    vitality: number
  }
}

export enum Experience {
  Débutant,
  Confirmé,
  Expert,
  Maître
}

export default class GameService {
  API_URL: string
  characterIds: string[] | null = null;
  shipIds: string[] | null = null;

  constructor () {
    this.API_URL = 'http://127.0.0.1:3000'
  }

  async initialize() {
    try {
      this.characterIds = await this.getCharactersIds();
      this.shipIds = await this.getShipsIds();
    } catch (error) {
      console.error('Error initializing GameService:', error);
    }
  }

  async getRankings () {
    const { data } = await axios.get(this.API_URL + RANKING_PATH)
    return data
  }

  async getShips () {
    const { data } = await axios.get(this.API_URL + SHIPS_PATH)
    return data
  }

  async getShip (shipPlacement : string) {
    const { data } = await axios.get(this.API_URL + SHIPS_PATH +'/'+ shipPlacement)
    return data
  }

  async getShipsIds () {
    const { data } = await axios.get<Ship[]>(this.API_URL + SHIPS_PATH);
    return data.map(ship => ship.id);
  }

  async getCharacters () {
    const { data } = await axios.get(this.API_URL + CHARACTERS_PATH)
    return data
  }

  async getCharactersIds () {
    const { data } = await axios.get<Character[]>(this.API_URL + CHARACTERS_PATH);
    return data.map(character => character.id);
  }

  async getCharacter (characterPlacement : string) {
    const { data } = await axios.get(this.API_URL + CHARACTER_STARTING_PATH + characterPlacement + CHARACTER_ENDING_PATH)
    return data
  }

  async getCharacterById (characterPlacement : string) {
    const { data } = await axios.get(this.API_URL + CHARACTERS_PATH +'/'+ characterPlacement)
    return data
  }
}