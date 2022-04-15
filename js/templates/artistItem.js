export const artistItem = ({ name, genre, description, image, id }) => `
<div class="Artist__item">
<img
  class="Artist__item__img"
  src="${image}"
  alt=""
/>
<ul class="Artist__item__info">
  <li class="Artist__item__title">${name}</li>
  <li class="Artist__item__genere">${genre}</li>
  <li class="Artist__item__description">${description}</li>
</ul>
<div class="Artist__item__icons">
  <span class="material-icons Artist__item__edit" data-id="${id}"> edit </span>
  <span class="material-icons Artist__item__delete" data-id="${id}"> delete </span>
</div>
</div>
`;
