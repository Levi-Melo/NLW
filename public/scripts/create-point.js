function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

      for (const state of states) {

        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}
populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.disabled = true
  citySelect.innerHTML = "<option value>Selecione a Cidade"

  fetch(url)
    .then(res => res.json())
    .then(cities => {

      for (const city of cities) {

        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })
}


document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

//pegar todos li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  //adicionar ou remover uma classe com JS
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id




  const alreadySelected = selectedItems.findIndex(item => item == itemId) //true or false

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }
  console.log('ITEM ID: ', selectedItems)
  collectedItems.value = selectedItems






}