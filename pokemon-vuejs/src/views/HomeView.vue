<template>
  <div class="pokemon-app">
    <div>
      <h1>Busqueda interactiva</h1>
    </div>

    <div class="pokemon-search-container">
      <input
        class="pokemon-search"
        placeholder="Buscar pokemon por nombre o ID"
        type="text"
        v-model="search"
      />
      <button class="pokemon-button" @click="searchPokemon">Buscar</button>
    </div>

    <div class="pokemon-card">
      <div v-if="loadingCard" class="pokemon-card-loading">
        <img src="https://media1.tenor.com/m/WX_LDjYUrMsAAAAC/loading.gif" />
      </div>
      <div v-else>
        <div v-if="pokemon">
          <img :src="pokemon.sprites.front_default" />

          <h2>{{ pokemon.name }}</h2>

          <p>ID: {{ pokemon.id }}</p>

          <p>Altura: {{ pokemon.height / 10 }} m</p>
        </div>

        <div v-else>
          <p class="pokemon-alert">Pokemon no encontrado</p>
        </div>
      </div>
    </div>

    <!--    <div>-->
    <!--      <table class="pokemon-table">-->
    <!--        <thead>-->
    <!--          <tr>-->
    <!--            <th>Nombre</th>-->
    <!--            <th>URL</th>-->
    <!--          </tr>-->
    <!--        </thead>-->

    <!--        <tbody>-->
    <!--          <tr v-for="item in pokemons" :key="item.name">-->
    <!--            <td>{{ item.name }}</td>-->
    <!--            <td>{{ item.url }}</td>-->
    <!--          </tr>-->
    <!--        </tbody>-->
    <!--      </table>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const search = ref('')
const pokemons = ref([])
const pokemon = ref(null)
const loadingCard = ref(false)
const errorSearch = ref(false)

const fetchPokemon = async () => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`)

  pokemons.value = data.results
}

const searchPokemon = async () => {
  loadingCard.value = true
  errorSearch.value = false

  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.value}`)
    pokemon.value = data
  } catch (error) {
    console.log(error)
    pokemon.value = null
    errorSearch.value = true
    console.log("errorSearch.value: ", errorSearch.value)
  }

  setTimeout(() => {
    loadingCard.value = false
  }, 500)
}

onMounted(() => {
  fetchPokemon()
})
</script>

<style scoped>
@import '@/assets/pokemon.css';
</style>
