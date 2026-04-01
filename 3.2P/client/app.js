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

const modal = document.getElementById("signupModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");


openBtn.onclick = () => {
  modal.style.display = "block";
};

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

document.getElementById("signupModal").addEventListener("sign up", function(e) {
  e.preventDefault();

  alert("Signup successful! 🎉");

  modal.style.display = "none";
});


const submitForm = () => {
let formData = {};
formData.first_name = document.getElementById("first_name").value;
formData.last_name = document.getElementById("last_name").value;
formData.password = document.getElementById("password").value;
formData.confpassword = document.getElementById("confpassword").value;
formData.email = document.getElementById("email").value;
console.log("Form Data Submitted: ", formData);
}

$(document).ready(function(){
  $('.materialboxed').materialbox();
  $('#formSubmit').click(()=>{
  submitForm();
})

});
