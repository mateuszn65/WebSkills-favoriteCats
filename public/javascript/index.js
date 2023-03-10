const FAVORITE_PATH = '/user/favoriteCats'

function removeFromFavorites(button) {
    const catId = button.dataset.catId;
    fetch(`/user/favoriteCats/${catId}`, {method: 'DELETE'})
    .then(res => {
        if (res.ok) {
            if (window.location.pathname === FAVORITE_PATH) 
                return removeFavoriteCatFromList(catId)
            button.dataset.isFavorite = ''
            button.classList.remove('fi-ss-heart')
            button.classList.add('fi-rs-heart')
            return 
        }
    }).catch(err => console.log(err))

}

function addToFavorites(button) {
    const catId = button.dataset.catId;
    fetch(`/user/favoriteCats/${catId}`, {method: 'POST'})
    .then(res => {
        if (res.ok) {
            button.dataset.isFavorite = true
            button.classList.remove('fi-rs-heart')
            button.classList.add('fi-ss-heart')
            return 
        }
    }).catch(err => console.log(err))
}

function favoriteButtonHandler(button){
    if (button.dataset.isFavorite === 'true'){
        removeFromFavorites(button)
    } else {
        addToFavorites(button)
    }
}

function removeFavoriteCatFromList(catId){
    const cat = document.getElementById(catId)
    cat.remove()
}

