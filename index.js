const container = document.querySelector('#container')
const seeAllPokemon = document.querySelector('#see-all-pokemon')
const form = document.querySelector('#form')

const onShowPokemonSuccess = (pokemon) => {
    console.log(pokemon)
    container.style.display = 'none'
    
    const singlePokemon = document.querySelector('.single-pokemon')
    if (singlePokemon) {
        singlePokemon.remove()
    }

    const pokeDex = document.createElement('div')
    pokeDex.classList.add('single-pokemon')
    pokeDex.innerHTML = `
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}" />
    `
    document.querySelector('body').appendChild(pokeDex)
}

const showPokemon = (event) => {
    const pokemonUrl = event.target.getAttribute('data-url')
    console.log(pokemonUrl)
    fetch(pokemonUrl)
        .then(res => res.json())
        .then(onShowPokemonSuccess)
}

const onGetPokemonSuccess = (pokemonArray) => {

    pokemonArray.forEach(pokemon => {
        const pokemonCard = document.createElement('div')
        pokemonCard.classList.add('pokemon-card')
        pokemonCard.innerText = pokemon.name
        pokemonCard.setAttribute('data-url', pokemon.url)
        pokemonCard.addEventListener('click', showPokemon)
        container.appendChild(pokemonCard)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        .then(res => res.json())
        .then(res => res.results)
        .then(onGetPokemonSuccess)
})

seeAllPokemon.addEventListener('click', () => {
    container.style.display = 'flex'
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('yess')
    const pokeNumber = input.value
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
        .then(res => res.json())
        .then(onShowPokemonSuccess)
})
