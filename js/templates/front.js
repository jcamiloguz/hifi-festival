export const artistBubble = ({ id, image, name }) =>
  `  <div class="Artist__item--wrapper" data-id="${id}" >
          <img
            src="${image}"
            alt="${name}"
            class="Artist__img--wrapper"
          />
          <p class="Artist__title--wrapper">${name}</p>
        </div>`;

export const artistInfo = ({
  id,
  image,
  name,
  genre,
  description,
  spotify,
  instagram,
}) =>
  ` 

  <img
  src="${image}"
  class="Artist__image--display"
/>
<div class="Artist__info--display">
  <h1 class="Artist__title--display">${name}</h1>
  <p class="Artist__genre--display">${genre}</p>
  <p class="Artist__description--display">
${description}
  </p>
  <div class="Artist__social--display">
    <a href="${instagram}" target="_blank">
      <img
        src="../assets/images/insta.png"
        alt=""
        class="Artist__social--icon"
      />
    </a>
    <a href="${spotify}" target="_blank">
      <img
        src="../assets/images/spoti.png"
        alt=""
        class="Artist__social--icon"
      />
    </a>
  </div>`;

export const sliderItem = ({ image, name }) => `
  <div class="Slider__item">
              <img
                src="${image}"
                alt="frank ocean image"
                class="Slider__img"
              />
              <p class="Slider__text">${name}</p>
            </div>
`;

export const photoItem = ({ id, image, description }) => `
<div class="Photo__container" data-id="${id}">
<img
  src="${image}"
  alt="${description}"
  class="Photo"
/>
</div>
`;

export const photoBackground = ({ id, image, title, description }) => `

<div class="Hero__background" data-id="${id}">
        <img
          src="${image}"
          alt="${description}"
          class="Image__background"
        />
      </div>
      <div class="Hero__info" data-id="${id}">
        <h1 class="Hero__title">${title}</h1>
      </div>
`;
