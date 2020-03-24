const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg',//黑桃
  'https://image.flaticon.com/icons/svg/105/105220.svg',//紅心
  'https://image.flaticon.com/icons/svg/105/105212.svg',//方塊
  'https://image.flaticon.com/icons/svg/105/105219.svg'//梅花
]

const view = {
  //渲染牌背元件
  getCardElement(index) {
    return `<div data-index="${index}" class="card back"></div>`
  },
  //渲染牌面元件:使用者觸發
  getCardContent(index) {
    const number = this.transformNumber((index % 13) + 1)
    const symbol = Symbols[Math.floor(index / 13)]
    return `
    <p>${number}</p>
    <img src="${symbol}" alt="suit">
    <p>${number}</p>
    `
  },
  //翻牌
  flipCard(card) {
    // console.log(card)
    if (card.classList.contains('back')) {
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index))
      return
    }
    card.classList.add('back')
    card.innerHTML = null
  },
  //替換數字為AJQK
  transformNumber(number) {
    switch (number) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return number
    }
  },
  //渲染所有牌
  displayCards() {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = utility.getRandomNumberArray(52).map(index => this.getCardElement(index)).join('')
  }
}
const utility = {
  //洗牌演算法
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
        ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  }
}
view.displayCards()

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    view.flipCard(card)
  })
})