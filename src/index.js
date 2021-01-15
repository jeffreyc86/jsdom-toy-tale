let addToy = false;

const toyCollection = document.querySelector("#toy-collection")

function renderNewToy(toyObject){
  const newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.dataset.id = toyObject.id
    const newH2 = document.createElement("h2");
      newH2.textContent = toyObject.name
    const newImg = document.createElement("img");
      newImg.className = "toy-avatar"
      newImg.src = toyObject.image
    const newP = document.createElement("p")
      newP.textContent = `${toyObject.likes} Likes`
    const newButton = document.createElement("button")
      newButton.textContent = "Like <3"
      newButton.className = "like-btn"
    //delete button start
    const deleteButton = document.createElement("button")
      deleteButton.textContent = "X"
      deleteButton.className = "delete-btn"

      newDiv.append(newH2, newImg, newP, newButton, deleteButton)
      toyCollection.append(newDiv)
}

function initialize(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyObjects => {
      return toyObjects.forEach(renderNewToy)
    })
}

initialize()

const toyForm = document.querySelector(".add-toy-form")

toyForm.addEventListener("submit",(e) => {  
    e.preventDefault()

    const toyObject = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    fetch('http://localhost:3000/toys',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(toyObject)
          })
      .then(response => response.json())
      .then(newToyObject => {
        renderNewToy(newToyObject)
      })
  
  e.target.reset()
})




toyCollection.addEventListener('click', e => {
    const toyCard = e.target.closest("div.card")
    const id = toyCard.dataset.id

  if (e.target.matches('.like-btn')){
    
    const likesP = e.target.previousElementSibling
    let likesParsed = parseInt(likesP.textContent)
    likesParsed++

    fetch(`http://localhost:3000/toys/${id}`, {
          method: 'PATCH', 
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
          body: JSON.stringify({
            "likes": likesParsed
          })
    })
    .then(response => response.json())
    .then(updatedItem => {
      likesP.textContent = `${updatedItem.likes} Likes`
    })
  } else if (e.target.matches('.delete-btn')) {

    fetch(`http://localhost:3000/toys/${id}`, {
          method: 'DELETE'
        })
      .then(response => response.json())
      .then(data => {
        return console.log(`Delete successful`)
        })
        
    toyCard.remove()
  }
})


    
    




document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});