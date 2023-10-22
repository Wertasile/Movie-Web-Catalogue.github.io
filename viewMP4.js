async function getvids(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
        }
      };
      
      const response = await fetch('https://api.themoviedb.org/3/'+ localStorage.getItem('type') + '/' + localStorage.getItem('id') + '/videos?language=en-US', options)
      const videos = await response.json()
      
      console.log(videos)

      for(let i=0;i<videos.results.length;i++){
        console.log('hi')
        const grid= document.getElementsByClassName('view-grid')[0]
        const div = document.createElement('div')
        const iframe = document.createElement('iframe')
        iframe.classList.add('video')
        iframe.setAttribute('height',"180px")
        iframe.setAttribute('width',"320px")
        iframe.setAttribute('src',"https://www.youtube.com/embed/" + videos.results[i].key)
        div.append(iframe)
        grid.append(div)
        
      }

      const error = document.getElementsByClassName('ytp-error').length
      console.log(error)
}

getvids()