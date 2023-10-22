const season = localStorage.getItem('seasonno')
const id = localStorage.getItem('id')
async function getepisodes(id,seasonno){
    const options2 = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
        }
      };


    const response6 = await fetch("https://api.themoviedb.org/3/tv/" + id + "/season/" + (parseFloat(seasonno)+parseFloat(1)) +"?language=en-US&page=1", options2)
    const seasondet = await response6.json()
    console.log(seasondet)
    const seasoncontainer = document.getElementById('season-container')
    for ( let i = 0 ; i < seasondet.episodes.length ; i++ ){
        const ep = document.createElement('div')
        const header = document.createElement('div')
        header.classList.add('ep-title')
        const airdate = document.createElement('div')
        const title = document.createElement('div')
        title.innerHTML = "<h2>" + seasondet.episodes[i].episode_number + " | " + seasondet.episodes[i].name + "</h2>"
        airdate.innerHTML = seasondet.episodes[i].air_date
        const epdetails = document.createElement('div')
        epdetails.classList.add('two-col-flex')
        const imgcontainer = document.createElement('div')
        const img = document.createElement('img')
        img.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + seasondet.episodes[i].still_path)
        img.setAttribute('height',"150px")
        imgcontainer.append(img)
        const plot = document.createElement('div')
        plot.textContent = seasondet.episodes[i].overview 
        epdetails.append(img)
        epdetails.append(plot)
        header.append(title)
        header.append(airdate)
        ep.append(header)
        ep.append(epdetails)
        
        seasoncontainer.append(ep)

    }
    
}

getepisodes(id,season)
