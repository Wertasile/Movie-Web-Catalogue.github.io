
async function getpopular(content){

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
      }
    };
    const response2 = await fetch('https://api.themoviedb.org/3/'+ content + '/popular?language=en-US&page=1', options)
    const popular = await response2.json()
    console.log(popular)
    document.getElementById('popular').textContent = ""
    for(let i=0;i<20;i++){
      const popularcontainer = document.getElementById('popular')
      const popularitem = document.createElement('div')
      popularitem.classList.add('grid-item')
      const poster = document.createElement('img')
      poster.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + popular.results[i].poster_path)
      const title = document.createElement('div')
      if (content=="tv"){
        title.textContent = popular.results[i].name
      }else{
        title.textContent = popular.results[i].title
      }

      popularitem.addEventListener('click',() => {
        if (content =="tv"){
          localStorage.setItem('type',"tv")
        }else{
          localStorage.setItem('type',"movie")
        }
        const ID = popular.results[i].id
        console.log(ID)
        
        localStorage.setItem('id',ID)
        window.location.href = "griditem.html"
      })
      
      popularitem.append(poster)
      popularitem.append(title)
      popularcontainer.append(popularitem)
    }
    
}

async function gettoprated(content){

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
    }
  };
  const response3 = await fetch('https://api.themoviedb.org/3/'+ content + '/top_rated?language=en-US&page=1', options)
  const toprated = await response3.json()
  console.log(toprated)
  document.getElementById('top-rated').textContent = ""
    for(let i=0;i<20;i++){
      const popularcontainer = document.getElementById('top-rated')
      const popularitem = document.createElement('div')
      popularitem.classList.add('grid-item')
      const poster = document.createElement('img')
      poster.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + toprated.results[i].poster_path)
      const title = document.createElement('div')
      if (content=="tv"){
        title.textContent = toprated.results[i].name
      }else{
        title.textContent = toprated.results[i].title
      }
      
      popularitem.append(poster)
      popularitem.append(title)
      popularcontainer.append(popularitem)

      popularitem.addEventListener('click',() => {
        if (content =="tv"){
          localStorage.setItem('type',"tv")
        }else{
          localStorage.setItem('type',"movie")
        }
        const ID = toprated.results[i].id
        console.log(ID)
        localStorage.setItem('id',ID)
        window.location.href = "griditem.html"
      })
    }
}

async function gettrending(content){

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
    }
  };
  const response4 = await fetch('https://api.themoviedb.org/3/trending/'+ content + '/day?language=en-US&page=1', options)
  const trending = await response4.json()
  console.log(trending)
  document.getElementById('trending').textContent = ""
    for(let i=0;i<20;i++){
      const container = document.getElementById('trending')
      const item = document.createElement('div')
      item.classList.add('grid-item')
      const poster = document.createElement('img')
      poster.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + trending.results[i].poster_path)
      const title = document.createElement('div')
      if (content=="tv"){
        title.textContent = trending.results[i].name
      }else{
        title.textContent = trending.results[i].title
      }
      
      item.append(poster)
      item.append(title)
      container.append(item)
      
      item.addEventListener('click',() => {
        if (content =="tv"){
          localStorage.setItem('type',"tv")
        }else{
          localStorage.setItem('type',"movie")
        }
        const ID = trending.results[i].id
        console.log(ID)
        localStorage.setItem('id',ID)
        window.location.href = "griditem.html"
      })
    }
    
}

async function getairing(){

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
    }
  };
  const response5 = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
  const airing = await response5.json()
  console.log(airing)
  
    for(let i=0;i<20;i++){
      const container = document.getElementById('on-air')
      const item = document.createElement('div')
      item.classList.add('grid-item')
      const poster = document.createElement('img')
      poster.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + airing.results[i].poster_path)
      const title = document.createElement('div')
      title.textContent = airing.results[i].name
      item.append(poster)
      item.append(title)
      console.log(container)
      console.log(item)
      container.append(item)

      
      item.addEventListener('click',() => {
        localStorage.setItem('type',"tv")
        const ID = airing.results[i].id
        console.log(ID)
        localStorage.setItem('id',ID)
        window.location.href = "griditem.html"
      })
    }
    
}
getpopular("movie")
gettoprated("movie")
gettrending("movie")
getairing()


