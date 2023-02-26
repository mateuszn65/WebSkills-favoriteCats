
class Carousel{
    constructor(carouselElement, cats){
        this.carouselElement = carouselElement;
        this.cats = cats;
        this.imageElement = this.carouselElement.querySelector('.carousel-image');
        this.titleElement = this.carouselElement.querySelector('#title');
        this.descriptionElement = this.carouselElement.querySelector('#description');
        this.numFavoritesElement = this.carouselElement.querySelector('#num-favorites');
        this.optionsElement = this.carouselElement.querySelector('.carousel-option-container');
        this.leftButton = this.carouselElement.querySelector('#arrow-left');
        this.rightButton = this.carouselElement.querySelector('#arrow-right');
        this.leftButton.addEventListener('click', () => this.selectLeft())
        this.rightButton.addEventListener('click', () => this.selectRight())
        this.imageElement.addEventListener('click', () => goToCat(this.cats[this.index]._id))
        this.index = 0;
        this.noCats = this.cats.length;
        this.render()
    }

    selectLeft(){
        this.optionsElement.children[this.index].classList.remove('selected')
        this.index = (this.index - 1 + this.noCats) % this.noCats
        this.render()
    }
    selectRight(){
        this.optionsElement.children[this.index].classList.remove('selected')
        this.index = (this.index + 1) % this.noCats
        this.render()
    }
    selectByIndex(index){
        this.optionsElement.children[this.index].classList.remove('selected')
        this.index = index;
        this.render()
    }
    render(){
        const cat = this.cats[this.index]
        this.imageElement.src = cat.imageUrl;
        this.titleElement.textContent = cat.imageTitle;
        this.descriptionElement.textContent = cat.shortDescription;
        this.numFavoritesElement.textContent = cat.numFavorites;
        this.optionsElement.children[this.index].classList.add('selected')
    }
}

function goToCat(catId){
    window.location.href = `/cats/${catId}`
}

let carousel

function carouselHandler(button){
    if (!carousel) return
    carousel.selectByIndex(button.dataset.index)
}

async function initCarousel(){
    if (window.location.pathname !== '/') return
    const carouselElement = document.querySelector('#carousel')
    if (!carouselElement) return
    
    const cats = await fetch('/topCats').then(res => res.json()).catch(err => console.log(err))
    if (!cats) return

    carousel = new Carousel(carouselElement, cats)
}

window.onload = initCarousel