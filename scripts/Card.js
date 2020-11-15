export class Card {
  constructor(data, cardSelector, handlePreviewPicture) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector).content.querySelector('.cards');
    this._openCard = handlePreviewPicture;
  }

  _setEventListeners () {
    this._content.querySelector('.cards__like').addEventListener('click', () => this._handleLikeIcon());

    this._content.querySelector('.cards__trash').addEventListener('click', () => this._deleteCard());

    this._content.querySelector('.cards__image').addEventListener('click', () => this._openCard());
  }

  _deleteCard () {
    this._content.remove();
  }

  _handleLikeIcon () {
    this._content.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  generateCard(cardContainer) {
    this._content = this._cardSelector.cloneNode(true);

    this._content.querySelector('.cards__image').src = this._link;
    this._content.querySelector('.cards__text').textContent = this._name;
    this._content.querySelector('.cards__image').alt = this._name;

    this._setEventListeners();

    cardContainer.prepend(this._content);
  }


}