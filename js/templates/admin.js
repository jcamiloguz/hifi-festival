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
export const galleryItem = ({ title, description, image, id }) => `
          <div class="Gallery__item">
            <img
              class="Gallery__item__img"
              src="${image}"
              alt="${description}"
            />
            <div class="Gallery__item__info">
              <p class="Gallery__item__title">
                <span class="material-icons"> image </span>
                ${title}
              </p>
              <div class="Gallery__item__icons">
                <span class="material-icons Gallery__item__edit" data-id="${id}"> edit </span>
                <span class="material-icons Gallery__item__delete" data-id="${id}">
                  delete
                </span>
              </div>
            </div>
          </div>
`;
