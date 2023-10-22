async function getimages(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
        }
      };
      
      const response = await fetch('https://api.themoviedb.org/3/'+ localStorage.getItem('type') + '/' + localStorage.getItem('id') + '/images', options)
      const images = await response.json()
      
      console.log(images)

      for(let i=0;i<images.backdrops.length;i++){
        console.log('hi')
        const grid= document.getElementsByClassName('view-grid')[0]
        const div = document.createElement('div')
        const img = document.createElement('img')
        img.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + images.backdrops[i].file_path)
        div.append(img)
        grid.append(div)
      }

      for(let i=0;i<images.posters.length;i++){
        console.log('hi')
        const grid= document.getElementsByClassName('view-grid')[0]
        const div = document.createElement('div')
        const img = document.createElement('img')
        img.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + images.posters[i].file_path)
        div.append(img)
        grid.append(div)
      }
}

getimages()
    