const db = new Dexie('ShoppingList')
db.version(1).stores({ lists: '++id,name,price,quantity,isPurchased'})

const itemForm = document.querySelector('#itemForm')
const listDiv = document.querySelector('.list-wrapper')
const clearAllButton = document.querySelector('.clear')
const cancelButton = document.querySelector('.cancel')
const confirmButton = document.querySelector('.confirm')
const editModalDiv = document.querySelector('.edit-modal-wrapper')

const toggleModalDisplay = (selector, value) => {
  document.querySelector(selector).style.display = value
  document.querySelector('.overlay').style.display = value
}

const openEditModal = (id, name, price, quantity) => {
  editModalDiv.innerHTML = `
    <form class="edit-modal">
      <label>
        <input type="text" class="new-list-input" value="${name}" placeholder="Enter New List" autoFocus required />
        <input type="number" class="new-quantity input" value="${quantity}" placeholder="Quantity"/>
        <input type="number" class="new-price input" value="${price}" placeholder="Price"/>
      </label>
      <div>
        <button 
          aria-label="clear" 
          type="button" 
          class="button" 
          onclick="toggleModalDisplay('.edit-modal', 'none')"
        >
          Cancel
        </button>
        <button 
          aria-label="submit" 
          type="submit" 
          class="button" 
          onclick="handleListButtonActions('editItem', ${id})"
        >
          Add
        </button>
      </div>
    </form>
  `
}

const populateListDiv = async () => {
  const lists = await db.lists.reverse().toArray()

  listDiv.innerHTML = lists.map(({ id, name, price, quantity, isPurchased }) => `
    <div class="list">
      <span class=${isPurchased && 'purchased'}>
        ${name} <br>$${price} X ${quantity}
      </span>
      <div>
        <button
          aria-label="complete"
          type="button"
          onclick="handleListButtonActions('markAsPurchased', ${id}, ${isPurchased})"
        >
          <img src="./assets/complete-icon.svg" alt="complete icon" />
        </button>
        <button 
          aria-label="edit" 
          type="button" 
          onclick="openEditModal(${id}, '${name}', ${price}, ${quantity})"
        >
          <img src="./assets/edit-icon.svg" alt="edit icon" />
        </button>
        <button
          aria-label="delete"
          type="button"
          onclick="handleListButtonActions('deleteItem', ${id})"
        >
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
  const price = document.querySelector('.price').value || 0
  const quantity = document.querySelector('.quantity').value || 0

  await db.lists.add({ name, price, quantity, isPurchased: false })
  await populateListDiv()
  itemForm.reset()
})

const handleListButtonActions = async (action, id, isPurchased) => {
  const name = document.querySelector('.new-list-input')?.value
  const price = document.querySelector('.new-price')?.value
  const quantity = document.querySelector('.new-quantity')?.value

  switch (action) {
    case 'markAsPurchased':
      await db.lists.update(id, {isPurchased: !isPurchased})
      break;
    case 'deleteItem':
      await db.lists.delete(id)
      break;
    case 'editItem':
      await db.lists.update(id, {name, price, quantity})
      toggleModalDisplay('.edit-modal', 'none')
      break;
    case 'clearData':
      await db.lists.clear()
      toggleModalDisplay('.clear-all-modal','none')
      break;
  }

  await populateListDiv()
}

clearAllButton.addEventListener('click', () =>
  toggleModalDisplay('.clear-all-modal','block')
)

cancelButton.addEventListener('click', () =>
  toggleModalDisplay('.clear-all-modal','none')
)

confirmButton.addEventListener('click', () => handleListButtonActions('clearData'))

window.onload = populateListDiv
