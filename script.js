const searchbtn = document.getElementsByClassName("search-button")[0]

const switchElement = document.getElementById('switch');

  switchElement.addEventListener('click', function () {
    const currentText = switchElement.textContent;
    if (currentText === 'MOVIE'){
      switchElement.textContent = 'TV-SHOW'
      document.getElementById('search-box').setAttribute('placeholder',"Search for TV shows...")
    }else{
      switchElement.textContent = 'MOVIE'
      document.getElementById('search-box').setAttribute('placeholder',"Search for Movies...")
    }
  });

searchbtn.addEventListener('click',(e) => {
    e.preventDefault()
    var searchbox = document.getElementById("search-box")
    var input = searchbox.value
    var pageno  = 1
    const currentText = switchElement.textContent;
    if (currentText == "MOVIE"){
      searchMovie(input,pageno,"movie")
    }else if (currentText == "TV-SHOW"){
      searchMovie(input,pageno,"tv")
    }else{
      searchMovie(input,pageno,"movie")
    }
    localStorage.clear()
    
    // searchbox.value = ""
    
})   
//---------------------------------OMDB API - SEARCHING FOR MOVIES-----------------------------------------------------------//

async function searchMovie(input,pageno,type){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
    }
  };

  const response = await fetch('https://api.themoviedb.org/3/search/' + type + '?query=' + input + '&include_adult=false&language=en-US&page=' + pageno, options)
  const data = await response.json()
  console.log(data)
  localStorage.clear()
  localStorage.setItem('search',JSON.stringify(data))
  console.log(localStorage.getItem('search'))
  localStorage.setItem('resultfor',input)
  localStorage.setItem('pageno',pageno)
  localStorage.setItem('type',type)
  window.location.href = "searchresult.html"
}
//---------------------------------OMDB API - POPULAR MOVIES-----------------------------------------------------------//




