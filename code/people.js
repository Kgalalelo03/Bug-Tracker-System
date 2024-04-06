function submitPerson(e) {
  const getInputValue = id => document.getElementById(id).value;
  const name = getInputValue('personName');
  const surname = getInputValue('personSurname');
  const mail = getInputValue('personMail');
  const user = getInputValue('personUser');

  const id = Math.floor(Math.random() * 100000) + '';
  const status = 'Active';

  if ((mail.length == 0) || (user.length == 0)) {
    alert("Please fill all fields with required data.");
    document.getElementById('add-person').setAttribute("data-toggle", "modal");
    document.getElementById('add-person').setAttribute("data-target", "#emptyField")
  }
  else {
    document.getElementById('add-person').removeAttribute("data-toggle", "modal");
    document.getElementById('add-person').removeAttribute("data-target", "#emptyField")
    const person = { id, name, surname, mail, user, status };
    let people = [];
    if (localStorage.getItem('people')) {
      people = JSON.parse(localStorage.getItem('people'));
    }
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));


    fetchPeople();
  }
}



const deletePerson = id => {
  const people = JSON.parse(localStorage.getItem('people'));
  const remainingPeople = people.filter(person => ((person.id) != id))
  localStorage.removeItem('people');
  localStorage.setItem('people', JSON.stringify(remainingPeople));
  fetchPeople();
}
const fetchPeople = () => {

  const people = JSON.parse(localStorage.getItem('people'));
  const peopleList = document.getElementById('peopleList');
  peopleList.innerHTML = '';

  for (var i = 0; i < people.length; i++) {
    const { id, name, surname, mail,user, status } = people[i];

    peopleList.innerHTML += `<div class="well">
                              <h6>Person ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${name} </h3>
                              <p> ${surname}</p>
                              <p><span class="glyphicon glyphicon-mail"></span> ${mail}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${user}</p>
                              <button onclick="deletePerson(${id})" class="btn btn-danger">Delete</button>
                              </div>`;
  }
}
fetchPeople();