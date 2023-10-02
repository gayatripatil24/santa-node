// client-side js
// run by the browser each time your view template is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function (event) {
  // TODO: check the text isn't more than 100chars before submitting
 
   event.preventDefault();
  const name = document.getElementById('userid').value.toLowerCase();
  const wish = document.getElementById('wish').value;

 

axios.post('http://localhost:3000/checkUser', {name:name, wish:wish})
  .then(function (response) {
    // handle success
    
    const confirmationPopup = document.getElementById('confirmationPopup');
    const confirmButton = document.getElementById('confirmButton');
    const message= document.getElementById("message");
    if(response.data.success){
      message.innerHTML = response.data.success;
      message.style.color = "green";
    } else{
      message.innerHTML = response.data.error;
      message.style.color = "red";
    }
    confirmationPopup.style.display = 'flex';

    confirmButton.addEventListener('click', () => {
      confirmationPopup.style.display = 'none';
    });
  });
};
