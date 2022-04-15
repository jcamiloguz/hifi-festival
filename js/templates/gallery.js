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
                <span class="material-icons Gallery__item__edit"> edit </span>
                <span class="material-icons Gallery__item__delete" data-id="${id}">
                  delete
                </span>
              </div>
            </div>
          </div>
`;
