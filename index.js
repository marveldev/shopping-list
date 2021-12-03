const db = new Dexie('ShoppingList')
db.version(1).stores({ lists: '++id,name,price,quantity,isPurchased'})

const itemForm = document.querySelector('#itemForm')
const listDiv = document.querySelector('.list-wrapper')
const clearButton = document.querySelector('.clear')
const cancelButton = document.querySelector('.cancel')
const confirmButton = document.querySelector('.confirm')

const toggleModalDisplay = value => {
  document.querySelector('.clear-modal').style.display = value
  document.querySelector('.overlay').style.display = value
}

const populateListDiv = async () => {
  const lists = await db.lists.reverse().toArray()

  listDiv.innerHTML = lists.map(({ id, name, price, quantity, isPurchased}) => `
    <div class="list">
      <span class=${isPurchased && 'purchased'}>
        ${name} <br>$${price} X ${quantity}
      </span>
      <div>
        <button
          aria-label="complete" 
          type="button" 
          onclick="handleButtonEvents(${id}, 'markAsPurchased', ${isPurchased})"
        >
          <img src="./assets/complete-icon.svg" alt="complete icon" />
        </button>
        <button aria-label="edit" type="button">
          <img src="./assets/edit-icon.svg" alt="edit icon" />
        </button>
        <button aria-label="delete" type="button" onclick="handleButtonEvents(${id}, 'deleteItem')">
          <img src="./assets/trash-icon.svg" alt="delete icon" />
        </button>
      </div>
    </div>
  `).join('')

  const totalPrice = lists.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0)
  document.querySelector('.total-price').innerHTML = `Total Price: ${totalPrice}`
}

itemForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const name = document.querySelector('.list-input').value
  const price = document.querySelector('.price-input').value
  const quantity = document.querySelector('.quantity-input').value

  await db.lists.add({ name, price, quantity, isPurchased: false })
  await populateListDiv()
  itemForm.reset()
})

const handleButtonEvents = async (id, event, isPurchased) => {
  if (event === 'markAsPurchased') {
    await db.lists.update(id, {isPurchased: !isPurchased})
  }

  if (event === 'deleteItem') {
    await db.lists.delete(id)
  }

  await populateListDiv()
}

const clearData = async () => {
  await db.lists.clear()
  await populateListDiv()
  toggleModalDisplay('none')
}

clearButton.addEventListener('click', () => toggleModalDisplay('block'))
cancelButton.addEventListener('click', () => toggleModalDisplay('none'))
confirmButton.addEventListener('click', clearData)
window.onload = populateListDiv
