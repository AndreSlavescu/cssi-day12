let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userID) => {
    console.log("logged in as user" + userID);
    // 1. get access to all current user's notes
    const dbRef = firebase.database().ref(`users/${userID}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val())
    })
    // 2. display them on the page
}

const renderData = (data) => {
    const destination = document.querySelector("#app");
    destination.innerHTML = "";
    console.log(data);
    for (let key in data){
        const note = data[key];
        
        destination.innerHTML += createCard(note);

    }
}

const createCard = (note) => {
    return `<div class="column is-one-quarter">
                <div class="card">
                    <header class="card-header">
                        <p class = "card-header-title">${note.title}</p>
                    </header> 
                    <div class="card-content">
                        <div class = "content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            </div>`
}