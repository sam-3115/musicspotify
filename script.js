console.log("Lets start")
let currentsong = new Audio();
let songs
let currfolder

function sectominsec(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    for (const song of songs) {
        songul.innerHTML += ` <ul>
        <li> <img class="invert" src="img/music.svg" alt="">
        <div class="info">
            <div> ${song.replaceAll("%20", " ")}</div>
            <div>Artist</div>
        </div>
        <div class="playnow">Playnow 
        <span><img src="img/play.svg" class="invert" alt=""></span>
    </div>   
    </li>`
    }
    //play fir

    //play audio
    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // })

    //event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        // console.log(e.getElementsByTagName("div")[0])
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    return songs;
}

const playmusic = (track) => {
    // let audio = new Audio("/song/"+ track);
    currentsong.src = `/${currfolder}/` + track

    currentsong.play();
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ")
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"



}
async function displayalbum() {
    let a = await fetch("/song/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchor = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    // Array.from(anchor).forEach(async e => {
        // console.log(e.href)


//         if (e.href.includes("/song")) {
//             let folder = e.href.split("/").slice(-1)[0]
//             //metadata of folderr
//             console.log(e.href, folder)
//             let a = await fetch(`/song/${folder}/info.json`)
//             let response = await a.json();
//             console.log(response)
//             cardcontainer.innerHTML += ` <div data-folder="${folder}" class="card ">
// <div data-folder="new" class="play">
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//         xmlns="https://www.w3.org/2000/svg">
//         <path fill="#000" d="M5 20V4L19 12L5 20Z" stroke="#141B34" stroke-width="1.5"
//             stroke-linejoin="round" />
//     </svg>
// </div>
// <img src=/song/${folder}/cover.jpg alt="">
//             < h2 > ${response.title}</h2 >
//                 <p>${response.description}</p>

// </div > `
//         }

// if (e.href.includes("/song/") && !e.href.includes(".htaccess")) {
//     let folder = e.href.split("/").slice(-1)[0]
//     // Get the metadata of the folder
//     console.log(folder,e.href)
//     let a = await fetch(`/song/${folder}/info.json`)
//     let response = await a.json(); 
//     console.log(response)
//     cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}" class="card">
//     <div class="play">
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//             xmlns="http://www.w3.org/2000/svg">
//             <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
//                 stroke-linejoin="round" />
//         </svg>
//     </div>

//     <img src="/song/${folder}/cover.jpg" alt="">
//     <h2>${response.title}</h2>
//     <p>${response.description}</p>
// </div>`
// }

//     })

        let array = Array.from(anchor)
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            // console.log(e.href)

            if (e.href.includes("/song") && !e.href.includes(".htaccess")) {
                let folder = e.href.split("/").slice(-2)[0]
                console.log(folder)
                let folder1 = e.href.split("/").slice(-1)[0]
                console.log(folder1)
                // Get the metadata of the folder
                // console.log(folder,e.href)
                let a = await fetch(`/song/${folder}/info.json`)
                let response = await a.json(); 
                // console.log(response)
                cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}" class="card">
                <div class="play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            
                <img src="/song/${folder}/cover.jpg" alt="">
                <h2>${response.title}</h2>
                <p>${response.description}</p>
            </div>`
            }
            
                }  


    // let array = Array.from(anchor)
    // for (let index = 0; index < array.length; index++) {
    //     const e = array[index]; 
    //     if (e.href.includes("/song") && !e.href.includes(".htaccess")) {
    //         let folder = e.href.split("/").slice(-2)[0]
    //         // Get the metadata of the folder
    //         console.log(folder,e.href)
    //         let a = await fetch(`/song/${folder}/info.json`)
    //         let response = await a.json(); 
    //         console.log(response)
    //         cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}" class="card">
    //         <div class="play">
    //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    //                 xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
    //                     stroke-linejoin="round" />
    //             </svg>
    //         </div>

    //         <img src="/song/${folder}/cover.jpg" alt="">
    //         <h2>${response.title}</h2>
    //         <p>${response.description}</p>
    //     </div>`
    //     }
    // }

//playlist when card clicked
Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
        songs = await getsongs(`song/${item.currentTarget.dataset.folder}/`)
        playmusic(songs[0])
        // console.log(item.currentTarget.dataset.folder)
    })
})
}


async function main() {

    //list of all songs
    await getsongs("song/ncs")
    playmusic(songs[0])
    // console.log(songs)
    // currentsong.src="/spotify/song/" +songs[0]

    //display albums
    await displayalbum()



    //attach event listner to pause play

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })
    //timeupdate
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration)
        document.querySelector(".songtime").innerHTML = `${sectominsec(currentsong.currentTime)} /${sectominsec(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    })
    //event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        // console.log(percent)
        //get bound is function
        document.querySelector(".circle").style.left = percent + "%"
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })
    //eventlistener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //eventlistner for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    //event listner to previous and next
    previous.addEventListener("click", () => {
        currentsong.pause()
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])

        // console.log(songs,index)
        if ((index + 1) >= 0) {
            playmusic(songs[index - 1])
        }
    })
    next.addEventListener("click", () => {
        currentsong.pause()
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        // console.log(songs,index)
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }
    })
    //add event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 1003
        // console.log(e.target,e.target.value)
    })

    //event listner to mute
    document.querySelector(".volume img").addEventListener("click", (e) => {
        if (e.target.src.includes("img/volume.svg")) {
            e.target.src = e.target.src.replace("img/volume.svg", "img/mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else {
            e.target.src = e.target.src.replace("img/mute.svg", "img/volume.svg")
            currentsong.volume = 0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10

        }
    })
}

main()
