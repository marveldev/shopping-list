const db = new Dexie('ShoppingList')
db.version(1).stores({ lists: '++id,name,price,quantity,isPurchased'})

const itemForm = document.querySelector('#itemForm')
const listDiv = document.querySelector('.list-wrapper')

const markAsPurchased = async (id, isPurchased) => {
  await db.lists.update(id, {isPurchased: !isPurchased})
  await populateListDiv()
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
          class="complete-button"
          onclick="markAsPurchased(${id}, ${isPurchased})"
        >
          <i class="fas fa-check"></i>
        </button>
        <button aria-label="edit" type="button" class="edit-button">
          <i class="fa fa-edit"></i>
        </button>
        <button aria-label="delete" type="button" class="delete-button">
          <i class="fas fa-trash"></i>
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

window.onload = populateListDiv
