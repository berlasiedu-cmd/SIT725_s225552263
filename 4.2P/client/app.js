fetch('/api/recipes')
  .then(response => response.json())
  .then(data => {
    console.log(data); // 

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


const modal = document.getElementById("signupForm");
const form = document.getElementById("actualForm");
const openBtn = document.getElementById("openModalBtn");

openBtn.onclick = () => {
  modal.style.display = "block";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};


document.querySelector("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confpassword: document.getElementById("confpassword").value
  };

  document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
  });

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    alert("Signup successful! "); 

    console.log(data);

    var modal = M.Modal.getInstance(document.getElementById('signupForm'));
    modal.close();

  } catch (err) {
    console.error(err);
    alert("Error signing up");
  }
});