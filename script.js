// Цвета для заднего фона карточки
const typeColor = {
    bug: "#26de81", dragon: "#ffeaa7", electric: "#fed330", fairy: "#FF0069",
    fighting: "#30336b", fire: "#f0932b", flying: "#81ecec", grass: "#00b894",
    ground: "#EFB549", ghost: "#a55eea", ice: "#74b9ff", normal: "#95afc0",
    poison: "#6c5ce7", psychic: "#a29bfe", rock: "#2d3436", water: "#0190FF"
}
// Начальный URL и элементы из дерева
let firstUrl = "https://pokeapi.co/api/v2/pokemon/",
    pokeCard = document.getElementById("poke__card"),
    pokeBtn = document.getElementById("poke__btn")
// Функция получения рандомного ID и его добавление в URL
let getData = () => {
    let id = Math.floor(Math.random() * 150) + 1
    const finalUrl = firstUrl + id
    fetch(finalUrl)
        .then((res) => res.json())
        .then((data) => {
            getCard(data)
        })
}
// Функция отрисовки карточки
let getCard = data => {
    let $pokeHp = document.createElement('span'),
        $pokeHpName = document.createElement('span'),
        $pokeHeight = document.createElement('span'),
        $pokeHeightName = document.createElement('span'),
        $pokeWeight = document.createElement('span'),
        $pokeWeightName = document.createElement('span'),
        $pokeParamsWrapper = document.createElement('div'),
        $pokeAttack = document.createElement('span'),
        $pokeAttackName = document.createElement('span'),
        $pokeDef = document.createElement('span'),
        $pokeDefName = document.createElement('span'),
        $pokeSpeed = document.createElement('span'),
        $pokeSpeedName = document.createElement('span'),
        $pokeStatsWrapper = document.createElement('div'),
        $pokeTypesWrapper = document.createElement('div'),
        $pokeName = document.createElement('h1'),
        $pokePic = document.createElement('img')
    // Цвет для заднего фона карточки
    const themeColor = typeColor[data.types[0].type.name];

    $pokeHp.textContent = `${data.stats[0].base_stat} hp`
    $pokeHpName.textContent = 'Health'
    $pokeAttack.textContent = data.stats[1].base_stat
    $pokeAttackName.textContent = 'Attack'
    $pokeDef.textContent = data.stats[5].base_stat
    $pokeDefName.textContent = 'Defense'
    $pokeSpeed.textContent = data.stats[3].base_stat
    $pokeSpeedName.textContent = 'Speed'
    $pokeHeight.textContent = `${(data.height / 10)} m`
    $pokeHeightName.textContent = 'Height'
    $pokeWeight.textContent = `${data.weight / 10} kg`
    $pokeWeightName.textContent = 'Weight'
    $pokeName.textContent = data.name[0].toUpperCase() + data.name.slice(1)
    $pokePic.src = data.sprites.other.dream_world.front_default

    $pokeParamsWrapper.setAttribute('class', 'poke__params')
    $pokeStatsWrapper.setAttribute('class', 'poke__stats')
    $pokeTypesWrapper.setAttribute('class', 'poke__types')
    data.types.forEach(el => {
        let $span = document.createElement('span')
        $span.textContent = el.type.name
        $pokeTypesWrapper.append($span)
    })

    $pokeAttackName.prepend($pokeAttack)
    $pokeDefName.prepend($pokeDef)
    $pokeSpeedName.prepend($pokeSpeed)
    $pokeHpName.append($pokeHp)
    $pokeHeightName.append($pokeHeight)
    $pokeWeightName.append($pokeWeight)
    $pokeParamsWrapper.append($pokeHpName, $pokeHeightName, $pokeWeightName)
    $pokeStatsWrapper.append($pokeAttackName, $pokeDefName, $pokeSpeedName)
    pokeCard.append($pokeParamsWrapper, $pokePic, $pokeName, $pokeTypesWrapper, $pokeStatsWrapper)
    // Присвоение цвета карточке
    colorCard(themeColor)
}
// Функция установки цвета заднего фона карточки
let colorCard = color => {
        pokeCard.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`
        pokeCard.style.boxShadow = `0 20px 30px ${color}`
        pokeCard.querySelectorAll(".poke__types span").forEach((typeColor) => {
        typeColor.style.backgroundColor = color
    })
}
// Генерация новой карточки при нажатии на кнопку
pokeBtn.addEventListener('click', () => {
    pokeCard.innerHTML = ''
    getData()
})
window.addEventListener('load', getData)