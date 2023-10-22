const type = localStorage.getItem('type')
const ID = localStorage.getItem('id')
console.log(ID)


async function getdetails(id,type){
    const options2 = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ0ZTM2NDA1ZmMzOTc0NzczZGQwNjM3ZmQ5MzI2YiIsInN1YiI6IjY0ZWYwYWUxY2FhNTA4MDEyYjA1OTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHCSXVoGjarkRIX5VK-DfHBgbZVWhzdCk54HC4gZ5xk'
        }
      };
    // GETTING MOVIE DETAILS
    
    if (type==="movie"){
        const response = await fetch("https://api.themoviedb.org/3/movie/"+ id + "?language=en-US", options2)
        const data = await response.json()
        const poster = document.getElementById('movie-img')
        const imgcontainer = document.createElement('img')
        imgcontainer.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + data.poster_path)
        imgcontainer.setAttribute('id','poster')
        
        poster.appendChild(imgcontainer)

        document.getElementById('movie-title').innerHTML = "<h1>" + data.original_title +  "</h1>"
        document.getElementById('release-year').textContent = data.release_date 
        document.getElementById('vote_average').textContent = data.vote_average
        document.getElementById('runtime').textContent = " " +data.runtime + "mins"
        document.getElementById('movie-plot').textContent = data.overview

        for (let i=0;i<data.genres.length;i++){
            const genre = document.getElementById('genre')
            const div = document.createElement('div')
            div.classList.add('genre-item')
            div.textContent = data.genres[i].name
            genre.append(div)
        }

        
        //-----------------------BEHIND THE SCENES INFO---------------------------------
        const BTS = document.getElementById('BTS')
        const div3 = document.createElement('div')
        div3.setAttribute('id',"Budget")
        BTS.append(div3)

        
        const div4 = document.createElement('div')
        div4.setAttribute('id',"Box-Office")
        BTS.append(div4)
        const numFor = Intl.NumberFormat('en-US');
        var num1 = data.budget
        var num2 = data.revenue
        document.getElementById('Budget').textContent = "Budget: " +  numFor.format(num1)
        document.getElementById('Box-Office').textContent = "Revenue: " + numFor.format(num2)

        const prodcomp = document.getElementById('Production-Companies')
        const div1 = document.createElement('div')
        div1.textContent = "Production Companies: "
        for (let i=0;i<data.production_companies.length;i++){
            div1.classList.add('prod-item')
            div1.textContent += data.production_companies[i].name + " - "
            prodcomp.append(div1)
        }

        const prodcntry = document.getElementById('Production-Countries')
        const div2 = document.createElement('div')
        div2.textContent = "Production Countries: "
        for (let i=0;i<data.production_countries.length;i++){
            div2.classList.add('prodctry-item')
            div2.textContent += data.production_countries[i].name + " - "
            prodcntry.append(div2)
        }

        const div5 = document.createElement('div')
        div5.innerHTML = "website: " + "<a>" + data.homepage + "</a>"
        BTS.append(div5)

        //--------------------------ACTORS AND DIRECTORS-------------------------
        const response2 = await fetch("https://api.themoviedb.org/3/movie/" + id +"/credits?language=en-US'", options2)
        const credits = await response2.json()
        
        for(let i=0;i<3;i++){
            if (credits.cast[i].known_for_department=="Acting"){
                document.getElementById('movie-actors').textContent += credits.cast[i].name + ", "
            }
        }
        for(let i=0;i<credits.crew.length;i++){
            let x=1
            if (x<3 && credits.crew[i].known_for_department=="Directing"){
                document.getElementById('movie-staff').textContent += credits.crew[i].name + ", "
                x++
            }
        }

        //--------------------------MEDIA CONTAINER-------------------------
        const response3 = await fetch("https://api.themoviedb.org/3/movie/" + id +"/images", options2)
        const images = await response3.json()
        
        
        for(let i=0;i<8;i++){
            document.getElementsByClassName('image')[i].setAttribute('src',"http://image.tmdb.org/t/p/w500/" + images.posters[i].file_path)
        }

        const response4 = await fetch("https://api.themoviedb.org/3/movie/" + id +"/videos?language=en-US", options2)
        const videos = await response4.json()
        
        const videocontainer = document.getElementById('video-container')
        if (videos.results.length>6){
            for(let i=0;i<6;i++){
                
                const divelement = document.createElement('div')
                const iframe = document.createElement('iframe')
                iframe.classList.add('video')
                iframe.setAttribute('height',"180px")
                iframe.setAttribute('width',"320px")
                iframe.setAttribute('src',"https://www.youtube.com/embed/" + videos.results[i].key)
                divelement.append(iframe)
                videocontainer.append(divelement)
            }
        }else{
            for(let i=0;i<videos.results.length;i++){
                
                const divelement = document.createElement('div')
                const iframe = document.createElement('iframe')
                iframe.classList.add('video')
                iframe.setAttribute('height',"180px")
                iframe.setAttribute('width',"320px")
                iframe.setAttribute('src',"https://www.youtube.com/embed/" + videos.results[i].key)
                divelement.append(iframe)
                videocontainer.append(divelement)
            }
        }

        

        const response5 = await fetch("https://api.themoviedb.org/3/movie/" + id + "/recommendations?language=en-US&page=1", options2)
        const similar = await response5.json()
        console.log(similar)
        
        const similarcontainer = document.getElementById('similar-container')
        for(let i=0 ; i < 12;i++){
            if(similar.results[i].poster_path===null){
                continue
            }else{
                const divv = document.createElement('div')
                const img = document.createElement('img')
                const title = document.createElement('div')
                title.textContent = similar.results[i].title
                img.setAttribute('src',"http://image.tmdb.org/t/p/w500/"+similar.results[i].poster_path)
                divv.append(img)
                divv.append(title)
                similarcontainer.append(divv)
                divv.addEventListener('click',() => {
                    localStorage.setItem('type',"movie")
                    const ID = similar.results[i].id
                    console.log(ID)
                    localStorage.setItem('id',ID)
                    window.location.href = "griditem.html"
                  })
            }
            
            
            
        }
        



        
        
    }
    
    // GETTING TV SHOW DETAILS

    else if(type==="tv"){
        const response = await fetch("https://api.themoviedb.org/3/tv/"+ id + "?language=en-US", options2)
        const data = await response.json()
        
        console.log(data)
        const poster = document.getElementById('movie-img')
        const imgcontainer = document.createElement('img')
        imgcontainer.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + data.poster_path)
        imgcontainer.setAttribute('id','poster')
        
        poster.appendChild(imgcontainer)
        if (type=="movie"){
            document.getElementById('movie-title').innerHTML = "<h1>" + data.original_title +  "</h1>"
        }else{
            document.getElementById('movie-title').innerHTML = "<h1>" + data.name +  "</h1>"
        }
        
        document.getElementById('release-year').textContent = data.first_air_date + " | "
        document.getElementById('vote_average').textContent = data.vote_average + " | "
        document.getElementById('runtime').textContent = data.episode_run_time + " min(s)"
        document.getElementById('movie-plot').textContent = data.overview

        for (let i=0;i<data.genres.length;i++){
            const genre = document.getElementById('genre')
            const div = document.createElement('div')
            div.classList.add('genre-item')
            div.textContent = data.genres[i].name
            genre.append(div)
        }

        //---------------------------------------------------GETTING BEHIND THE SCENES INFO------------------
        
        const prodcomp = document.getElementById('Production-Companies')
        const div1 = document.createElement('div')
        div1.textContent = "Production Companies: "
        for (let i=0;i<data.production_companies.length;i++){
            div1.classList.add('prod-item')
            div1.textContent += data.production_companies[i].name + " - "
            prodcomp.append(div1)
        }

        const prodcntry = document.getElementById('Production-Countries')
        const div2 = document.createElement('div')
        div2.textContent = "Production Countries: "
        for (let i=0;i<data.production_countries.length;i++){
            div2.classList.add('prodctry-item')
            div2.textContent += data.production_countries[i].name + " - "
            prodcntry.append(div2)
        }

        const BTS = document.getElementById('BTS')
        const div3 = document.createElement('div')
        div3.innerHTML = "website: " + "<a>" + data.homepage + "</a>"
        BTS.append(div3)

        const div4 = document.createElement('div')
        div4.textContent = "Networks on: "
        for (let i=0;i<data.networks.length;i++){
            div4.textContent += data.networks[i].name + "(" + data.networks[i].origin_country + ")" + " - " 
            BTS.append(div4)
        } 

        //---------------------------------------------------GETTING EPISODE DETAILS---------------------//
        const body1 =document.getElementById('seasons')
        const seasons = document.createElement('div')
        seasons.innerHTML = "<h2>Seasons</h2>"
        const seasongrid = document.createElement('div')
        seasongrid.classList.add('season-grid')
        
        const noofseasons = data.number_of_seasons
        for(let i = 0 ; i < noofseasons ; i++){
            const season = document.createElement('div')
            season.classList.add('toggle')
            season.innerHTML = "SEASON " + (parseInt(i)+parseInt(1))
            season.addEventListener('click',() => {
                window.localStorage.setItem('seasonno',i)
                window.location.href = "season.html"
            }) 
            seasongrid.append(season)

        }
        
        body1.append(seasons)
        body1.append(seasongrid)
        
        
        
        //---------------------------------------------------GETTING ACTORS AND DIRECTORS INFO------------------
        const response2 = await fetch("https://api.themoviedb.org/3/tv/" + id +"/credits?language=en-US'", options2)
        const credits = await response2.json()
        console.log(credits)
        for(let i=0;i<3;i++){
            if (credits.cast.length=="0"){
                continue
            }
            else if (credits.cast[i].known_for_department=="Acting"){
                document.getElementById('movie-actors').textContent += credits.cast[i].name + ", "
            }else{
                continue
            }
        }
        for(let i=0;i<credits.crew.length;i++){
            let x=1
            if (x<3 && credits.crew[i].known_for_department=="Directing"){
                document.getElementById('movie-staff').textContent += credits.crew[i].name + ", "
                x++
            }else{
                continue
            }
        }

        //---------------------------------------------------GETTING MEDIA CONTAINER INFO------------------
        const response3 = await fetch("https://api.themoviedb.org/3/tv/" + id +"/images", options2)
        const images = await response3.json()
        
        
        for(let i=0;i<8;i++){
            document.getElementsByClassName('image')[i].setAttribute('src',"http://image.tmdb.org/t/p/w500/" + images.posters[i].file_path)
        }

        const response4 = await fetch("https://api.themoviedb.org/3/tv/" + id +"/videos?language=en-US", options2)
        const videos = await response4.json()
        
        const videocontainer = document.getElementById('video-container')
        if (videos.results.length>6){
            for(let i=0;i<6;i++){
                
                const divelement = document.createElement('div')
                const iframe = document.createElement('iframe')
                iframe.classList.add('video')
                iframe.setAttribute('height',"180px")
                iframe.setAttribute('width',"320px")
                iframe.setAttribute('src',"https://www.youtube.com/embed/" + videos.results[i].key)
                divelement.append(iframe)
                videocontainer.append(divelement)
            }
        }else{
            for(let i=0;i<videos.results.length;i++){
                
                const divelement = document.createElement('div')
                const iframe = document.createElement('iframe')
                iframe.classList.add('video')
                iframe.setAttribute('height',"180px")
                iframe.setAttribute('width',"320px")
                iframe.setAttribute('src',"https://www.youtube.com/embed/" + videos.results[i].key)
                divelement.append(iframe)
                videocontainer.append(divelement)
            }
        }

        const response5 = await fetch("https://api.themoviedb.org/3/tv/" + id + "/recommendations?language=en-US&page=1", options2)
        const similar = await response5.json()
        console.log(similar)
        
        const similarcontainer = document.getElementById('similar-container')
        for(let i=0 ; i < 12;i++){
            if(similar.results[i].poster_path===null){

            }else{
                const divv = document.createElement('div')
                const img = document.createElement('img')
                const title = document.createElement('div')
                title.textContent = similar.results[i].name
                img.setAttribute('src',"http://image.tmdb.org/t/p/w500/"+similar.results[i].poster_path)
                divv.append(img)
                divv.append(title)
                similarcontainer.append(divv)
                divv.addEventListener('click',() => {
                    localStorage.setItem('type',"tv")
                    const ID = similar.results[i].id
                    console.log(ID)
                    localStorage.setItem('id',ID)
                    window.location.href = "griditem.html"
                  })
            }
        }

        
    }

    

    //GETTING SERIES DETAILS
    console.log()
    
}

getdetails(ID,type)

const viewimg = document.getElementById('view-images')
const viewvid = document.getElementById('view-videos')

viewimg.addEventListener('click',() => {
    console.log('hi')
    window.location.href = "viewFiles.html"
})

viewvid.addEventListener('click',() => {
    console.log('hi')
    window.location.href = "viewMP4.html"
})