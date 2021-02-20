import "./scss/main.scss";


/* composant carte */
//state de la carte :
let cardCounter = 0;
let lacarte = document.getElementById("card")
let shady = document.getElementById("shader")

// DEV
// Déclenchement manuel
let button = document.getElementById("zou")
button.addEventListener('click', () => {
    lacarte.classList.add('anim-flip-first_half')
}, false)



//listeners pour l'enchaînement des anim
lacarte.addEventListener("animationstart", (e) => {
    //Lorsqu'une carte se tourne, on commence par update le top du numéro arrière
    if (e.animationName == "tick") {
        updateCounter("c_behind", "counttop")
        shady.classList.add('animdarken')
        
    } 
})

lacarte.addEventListener("animationend", (e) => {
    //Hop on store le nom de l'anim qui se termine
    let animName = e.animationName;

    //Si c'est la première moitié de flip
    if (animName == "tick") {

    //alors ben on retire l'anim (puisqu'elle est finie quoi, d'uh)
    lacarte.classList.remove('anim-flip-first_half');
    //on en profite pour mettre à jour le compteur du dos de la carte
    updateCounter("c_back")

    //et on lance la seconde moitié du flip
    lacarte.classList.add('anim-flip-second_half')

    } else if (animName == "tack") {
        //dans le cas où la deuxième moitié du flip est terminée, on retire l'anim
        lacarte.classList.remove('anim-flip-second_half')
        //reset de l'ombre portée sur le bas par le volet du haut (damn jamais je me comprendrai à relire ça d'ici quelques mois)
        shady.classList.remove('animdarken')
        //on met à jour le bas de la carte, pré-animation
        updateCounter("c_behind", "countbottom")
        
        //enfin on met à jour le front du haut avant de relancer la boucle
        updateCounter("c_front")

        setTimeout(() => {
            lacarte.classList.add('anim-flip-first_half')
        }, 500)

    
    }
})



//UTILS : increment counter
//simple fonction pour incr le compteur en se basant sur le c_behind qui passe ensuite en state
//les attrs sont tous mis à jour un à un puisqu'utilisés pour display le compteur via le css
function updateCounter(target, atr = "count") {
    const elem = document.getElementById(target);
    let getcount = elem.getAttribute(atr)
    let newCount = parseInt(getcount, 10) + 1;
    if (target == "c_behind") {
         cardCounter = newCount;
        elem.setAttribute(atr, cardCounter)
    } else {
        elem.setAttribute(atr, cardCounter)
    }
}