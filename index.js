function handleSubmit() {

  $('#search-form').submit(function(event){
    event.preventDefault();
    userSearch = $('#user-input').val()
    formatURL(userSearch);

  })
}

function formatURL(input) {
  //formats the user input to be appropriate for the URL
  newURL = `https://api.github.com/users/${input}/repos`
  fetchURL(newURL);
}

function fetchURL(URL) {
  //fetches the URL and displays it to console
 
  fetch(URL)
  .then(response => { 
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.message);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => alert `Somthing went wrong. Please try again`)
}

function displayResults(results) {
  //displays results to the user
  console.log(results[0].name)
  console.log(results[0].description)
  console.log(results[0].html_url)
  $('#search-results').empty()
  repoNum = results.length
  for(i = 0; i < repoNum; i++) {
   $('#search-results').append(
     `<li class = "repo-list"
     <div id="title">${results[i].name}</div>
     <p id="description">${results[i].description}</p>
     <a href="${results[i].html_url}">${results[i].html_url}</a>
     </li>`
    )
  }
}

$(handleSubmit)