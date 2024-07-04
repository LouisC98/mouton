const readline = require('readline-sync')
const NB_PIONS_PAR_COULEUR = 6
const TAILLE = NB_PIONS_PAR_COULEUR * 2 + 1


function saisir(message) {
    return readline.question(message);
}

function init(plateau) {

    for (let i = 0; i < NB_PIONS_PAR_COULEUR; i++) {
        plateau[i] = '>';
    }

    plateau[NB_PIONS_PAR_COULEUR] = ' ';

    for (let i = NB_PIONS_PAR_COULEUR + 1; i < TAILLE; i++) {
        plateau[i] = '<';
    }
}

function afficher(plateau) {
    for (let i = 1; i <= TAILLE; i++) {
        process.stdout.write(i.toString() + ' ');
    }

    console.log();

    for (let i = 0; i < TAILLE; i++) {
        process.stdout.write(plateau[i] + ' ');
    }

    console.log();
}

function gagne(plateau) {
    let debutOk = true;
    let i = 0;

    while (debutOk && i < NB_PIONS_PAR_COULEUR) {
        debutOk = (plateau[i] === '<');
        i++;
    }

    return debutOk && (plateau[NB_PIONS_PAR_COULEUR] === ' ');
}

function bloque(plateau) {
    let posCB = 0;

    while (plateau[posCB] !== ' ') {
        posCB++;
    }

    return !(
        (posCB > 0 && plateau[posCB - 1] === '>') ||
        (posCB > 1 && plateau[posCB - 2] === '>' && plateau[posCB - 1] === '<') ||
        (posCB < TAILLE - 1 && plateau[posCB + 1] === '<') ||
        (posCB < TAILLE - 2 && plateau[posCB + 2] === '<' && plateau[posCB + 1] === '>')
    );
}

function jouerUnCoup(plateau) {
    let pos = parseInt(saisir("Quel pion voulez-vous deplacer ?")) - 1;

    if (pos < 0 || pos >= TAILLE) {
        console.log('Position hors du plateau de jeu !');
    } else if (plateau[pos] === ' ') {
        console.log('Case vide, déplacement impossible !');
    } else if (plateau[pos] === '>') {
        if (pos < TAILLE - 1 && plateau[pos + 1] === ' ') {
            plateau[pos] = ' ';
            plateau[pos + 1] = '>';
        } else if (pos < TAILLE - 2 && plateau[pos + 1] === '<' && plateau[pos + 2] === ' ') {
            plateau[pos] = ' ';
            plateau[pos + 2] = '>';
        } else {
            console.log('Déplacement non autorisé');
        }
    } else if (plateau[pos] === '<') {
        if (pos > 0 && plateau[pos - 1] === ' ') {
            plateau[pos] = ' ';
            plateau[pos - 1] = '<';
        } else if (pos > 1 && plateau[pos - 1] === '>' && plateau[pos - 2] === ' ') {
            plateau[pos] = ' ';
            plateau[pos - 2] = '<';
        } else {
            console.log('Déplacement non autorisé');
        }
    }
}


plateau = []
victoire = null

init(plateau)
afficher(plateau)
do {
    jouerUnCoup(plateau)
    afficher(plateau)
    victoire = gagne(plateau)
} while (!victoire && !bloque(plateau))

if (victoire) {
    console.log("Bravo ! Vous avez réussi !!!");
} else {
    console.log("Perdu ! Vous êtes bloqué...");
}