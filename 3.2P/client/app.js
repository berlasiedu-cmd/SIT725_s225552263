fetch('/api/recipes')
  .then(response => response.json())
  .then(data => {
    console.log(data); // 👈 check if data is coming

    const container = document.getElementById('recipe-list');

    data.forEach(recipe => {
      const card = `
        <div class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <img src="${recipe.image}">
            </div>
            <div class="card-content">
              <span class="card-title">${recipe.title}</span>
              <p>${recipe.description}</p>
            </div>
          </div>
        </div>
      `;

      container.innerHTML += card;
    });
  })
  .catch(error => console.error('Error:', error));