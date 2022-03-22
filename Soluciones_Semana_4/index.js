const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    const result = document.getElementById("result");
    result.style.visibility = 'visible';
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeInfo(`${pokeName} no encontrado`,0,0,"N/A","./pokemon-sad.png",[{name:"N/A",points:"0"}],[{name:"N/A"}]);
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            let type = data.types[0].type.name;
            let stats = getStats(data.stats);
            let height = data.height;
            let weight = data.weight;
            let moves = getMoves(data.moves.slice(0,6));
            pokeInfo(pokeName,height,weight,type,pokeImg,stats,moves);
        }
    });
}

const pokeInfo = (name,height,weight,type,url,stats,moves) => {
    const pokePhoto = document.getElementById("pokeImg");
    const nameLbl = document.getElementById("name");
    const heightLbl = document.getElementById("height");
    const weightLbl = document.getElementById("weight");
    const typeLbl = document.getElementById("type");
    const statsLbls = document.getElementById("stats");
    const movesLbls = document.getElementById("moves");
    pokePhoto.src = url;
    nameLbl.innerText = name.charAt(0).toUpperCase() + name.slice(1);
    heightLbl.innerText = height;
    weightLbl.innerText = weight;
    typeLbl.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    statsLbls.innerHTML = '';
    for (const i of stats) {
        statsLbls.innerHTML += `<li>${i.name} = ${i.points}</li>`;
    }
    movesLbls.innerHTML = '';
    for (const i of moves) {
        movesLbls.innerHTML += `<li>${i.name}</li>`;
    }
}
const getStats = (data) => {
    let stats = [];
    for (const i of data) {
        stats.push({
            name: i.stat.name,
            points: i.base_stat
        });
    }
    return stats;
}
const getMoves = (data) => {
    let moves = [];
    for (const i of data) {
        moves.push({
            name: i.move.name
        });
    }
    return moves;
}



