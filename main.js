let arrayOfPhoto = [];

let status = start();

function createDiv(){
    let div = document.createElement("div");
    div.setAttribute("class", "grid-item");
    let grid = document.querySelector('.grid');
    grid.appendChild(div);
}

function createPhoto(url) {
    let photo = document.createElement("img");
    photo.setAttribute("class", "meme");
    photo.setAttribute("src", url);
    photo.setAttribute("alt", "img");
    return photo;
}

function createPhotos(data) {
    let memes;
    for (let i = 0; i < data['funnyImages'].length; i++) {
        createDiv();
        memes = document.querySelectorAll('.grid-item');
        arrayOfPhoto[i] = data['funnyImages'][i]['url'];
        console.log(arrayOfPhoto[i]);
        let photo = createPhoto(arrayOfPhoto[i])
        memes[i].appendChild(photo);
    }
}

function connectJson() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "imgs.json");
    xhr.responseType = 'json'
    return xhr;
}

async function start() {
    let promise = new Promise((resolve, reject) => {
        let xhr = connectJson();
        xhr.onprogress = () => {
            console.log(xhr.statusText);
        }
        xhr.onloadend = () => {
            if (xhr.status === 200) {
                resolve(xhr);
            }
            else {
                reject(xhr);
            }
        }
        xhr.send();
    })
        promise.then(xhr => {
            createPhotos(xhr.response)
        })
        promise.then(() => {
            setTimeout(() => {
                let elem = document.querySelector('.grid');
                let msnry = new Masonry( elem, {
                    itemSelector: '.grid-item',
                    columnWidth: 200,
                    gutter: 10,
                }).initialize();
            }, 500)
        })
        promise.catch(xhr => {
            console.log("Errors: " + xhr.statusText);
        })
        promise.then(() => {
            msnry.update();
        })
}



