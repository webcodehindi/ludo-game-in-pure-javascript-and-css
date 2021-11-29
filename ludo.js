let PH, PW, RW, RH, POS, GH, GW, GG, PAG=[], WP = 1, KG=false, CAP, PCM = false, CPP, DCN=1, CR = true, TP=0, PC=1, GD={}, DG=[5],
GP = {
    yellow: [66,67,68,69,74,73,72,71,70,21,20,19,18,17,16,10,4,5,6,7,8,9,31,30,29,28,27,26,32,38,39,40,41,42,43,48,49,50,51,52,53,59,65,64,63,62,61,60,82,83,84,85,86,87,81,88],
    green: [44,45,46,47,64,63,62,61,60,82,83,84,85,86,87,81,75,74,73,72,71,70,21,20,19,18,17,16,10,4,5,6,7,8,9,31,30,29,28,27,26,32,38,39,40,41,42,43,48,49,50,51,52,53,59,58,57,56,55,54,88],
    blue: [22,23,24,25,39,40,41,42,43,48,49,50,51,52,53,59,65,64,63,62,61,60,82,83,84,85,86,87,81,75,74,73,72,71,70,21,20,19,18,17,16,10,4,5,6,7,8,9,31,30,29,28,27,26,32,33,34,35,36,37,88],
    red: [0,1,2,3,5,6,7,8,9,31,30,29,28,27,26,32,38,39,40,41,42,43,48,49,50,51,52,53,59,65,64,63,62,61,60,82,83,84,85,86,87,81,75,74,73,72,71,70,21,20,19,18,17,16,10,11,12,13,14,15,88],
},
DP = {
    red: [0,1,2,3],
    green: [44,45,46,47],
    yellow: [66,67,68,69],
    blue: [22,23,24,25]
}
CP = {
    red: [0,1,2,3],
    green: [44,45,46,47],
    yellow: [66,67,68,69],
    blue: [22,23,24,25]
},
SP = [5,28,39,51,64,85,74,18],
PG = ['red', 'blue', 'green', 'yellow'],
MC = document.querySelectorAll('.color div'),
MP = document.querySelectorAll('.player div'),
SB = document.querySelector('.game-option button'),
DC = document.querySelector('.dice');

MC.forEach((e, i) => {
    e.addEventListener('click', () => {
        MC[TP].classList.remove('active')
        e.classList.add('active')
        TP = i
    })
})

MP.forEach((e, i) => {
    e.addEventListener('click', () => {
        MP[PC].classList.remove('active')
        e.classList.add('active')
        PC = i
    })
})

DC.addEventListener('click', () => rollDice())
SB.addEventListener('click', () => startGame())

const startGame = () => {
    let menu = document.querySelector('.game-option');

    menu.classList.add('show')
    setTimeout(() => {
       menu.style.display = 'none'
    }, 100);

    createDice();
    createPlayerGoti();
    getSize();
    getPosition();
    init();
}

const createDice = () => {
    let html = "", line = "", div = document.querySelector('.dice .inner')

    for (let i = 0; i < 6; i++) {
        for(let e = 0; e < i+1; e++) {
            line += `<span></span>`
            if (i == e) {
                html += `<div class="face"><div class="fin center">${line}</div></div>`
                line = ""
            }
        }    
    }

    div.innerHTML = html
}

const createPlayerGoti = () => {
    let html = "", arr = ['red','blue','green','yellow','red','blue'],
    player = [], div = document.querySelector('.game-goti .inner'),
    board = document.querySelector('.board'), CO=1,
    game = document.querySelector('.game-goti'), goti = [];

    // switch (arr[TP]) {
    //     case 'red':
    //         board.style.transform = 'rotateZ(-90deg)';
    //         game.style.transform = 'rotateZ(-90deg)';break;
    //     case 'blue':
    //         board.style.transform = 'rotateZ(180deg)';
    //         game.style.transform = 'rotateZ(180deg)';break;
    //     case 'green':
    //         board.style.transform = 'rotateZ(90deg)';
    //         game.style.transform = 'rotateZ(90deg)';break;
    //     default:break;
    // }

    if (PC==1) {
        player.push(arr[TP])
        player.push(arr[TP+2])
    } else if (PC==0) {
        player.push(arr[TP])
        player.push(arr[TP+2])
        player.push(arr[TP+1])
    } else if (PC==2) {
        player = ['red','blue','green','yellow']
    }

    for(let i = 0; i < player.length; i++) {
        for(let e = 0; e < 4; e++) {
            html += `<div class="${player[i]} goti center"><div goti="${CO}-${player[i]}"></div></div>`; 
            CO++;
        }
    }

    CAP = player,CPP = CAP[0],DC.classList.add(CPP)
    CO = 0;
    player.forEach(e => {
        let index = []

        for (let i = 0; i < 4; i++){
            CO++;index.push(CO)
            if (3==i) {
                GD[e] = index;
                index = []
            }
        }
    })

    div.innerHTML = html
    GG = document.querySelectorAll('.game-goti .goti')
}

const getSize = () => {
    let rest = document.querySelector('.rest'),
    path = document.querySelector('.run div'),
    win = document.querySelector('.win');

    GH = {
        rest: rest.offsetHeight,
        path: path.offsetHeight
    }
    GW = {
        path: path.offsetWidth, 
        rest: rest.offsetWidth,
    }
    GM = {
        width: win.offsetWidth,
        height: win.offsetHeight,
        top: win.getBoundingClientRect().top,
        left: win.getBoundingClientRect().left
    }
}

const getPos = (goti, type = true) => {
    let count = type ? [0,0,0,0] : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    count.forEach((_, i) => {
        let el = document.querySelector(
           type ?  `.box.bg${goti} .rest:nth-child(${i+1})` : `.run${goti} div:nth-child(${i+1})`
        )
        el = el.getBoundingClientRect();
    
        count[i] = {
            top: el.y,
            left: el.x 
        }
    })

    return count;
}  

const getPosition = () => {
    let rest = {}, path = {};

    PG.forEach(t => { rest[t] = getPos(t) })
    PG.forEach((t, i)=> { path[t] = getPos(i + 1, false) })

    POS = { path: path, rest: rest};
}

const init = () => {
    let goti = document.querySelectorAll('.game-goti .goti'), n = 0;
    
    goti.forEach(e => {
        e.style.height = `${GH.rest}px`,
        e.style.width = `${GW.rest}px`
    })

    for (let G in GD) {
        for(let i = 0; i < 4; i++) {
            setPosition(GD[G][i], CP[G][i])
            n++
        }
    }
    
    GG.forEach(e => {
        e.addEventListener('click', n => {
            if (!PCM) return; let cls = n.target.getAttribute('goti').split('-');
            moveGoti(cls[1],cls[0],DCN);
        })
    })

    document.querySelector(':root').style.setProperty('--dice', `${(GM.width*45)/100}px`)
    document.querySelector('.game-goti').style.display = 'block'
}

const setPosition = (el,index) => {
    el = document.querySelector(`.game-goti .goti:nth-child(${el})`)

    if (index <= 21) {
        if (index <= 3) {
            setIndex(el,'rest','red',index)
        } else {
            setIndex(el,'path','red',index - 4)
        }
    } else if (index <= 43) {
        if (index <= 25) {
            setIndex(el,'rest','blue',index - 22)
        } else {
            setIndex(el,'path','blue',index - 26)
        }
    } else if (index <= 65) {
        if (index <= 47) {
            setIndex(el,'rest','green',index - 44)
        } else {
            setIndex(el,'path','green',index - 48)
        }
    } else if (index <= 87) {
        if (index <= 69) {
            setIndex(el,'rest','yellow',index - 66)
        } else {
            setIndex(el,'path','yellow',index - 70)
        }
    } else {
        el.style.top = `${GM.top+((GM.width*45)/100)}px`
        el.style.left = `${GM.left+((GM.width*45)/100)}px`
        setTimeout(() => {
            el.style.display = 'none'
        },1000)
    }
}

const whoCanMove = (type,num) => {
    let canMove = [];

    CP[type].forEach((e, i) => {
        let index = GP[type].findIndex(n => n == e),
        m = DP[type].every(n => n !== e);

        if ((!m&&num==6)||(m&&60 - index >= num)) {
            canMove.push(GD[type][i])
        } 
    })

    return canMove;
}

const moveGoti = (type,el,num) => {
    PAG.forEach(e => GG[e].classList.remove('anime'))
    if (type!== CPP) return;

    let elm = el>4?el-5:el-1, pos = CP[type][elm],
    index = GP[type].findIndex(e => e == pos);

    // DG.some(e => e == pos)&&makeResposiveGoti(pos,elm+1,true);
    // DG.some(e => e == index)&&makeResposiveGoti(index,elm+1,false);

    if (index == 0 || index == 1 || index == 2 || index == 3) {
        if (num == 6) {
            CP[type][elm] = GP[type][index + (4 - index)]
            setPosition(GD[type][elm], GP[type][index + (4 - index)])
            setNextTurn();
        }
    } else if (typeof GP[type][index + num] == 'undefined') {
        if (GP[type][GP[type].length - 1] == pos) {
            if (num === 1) {
                CP[type][elm] = 61;
                setNextTurn();
                setPosition(GD[type][elm], 88)
            }
        } else if (60 - index >= num) {
            gotiMoveWay(type, elm, index + num, index)
        } else if (60 - index === num) {
           CP[type][elm] = 61;
           setNextTurn();
           setPosition(GD[type][elm], 88)
        } 
    }  else {
        gotiMoveWay(type, elm, index + num, index)
    }
}

const gotiMoveWay = (type, el, index, current) => {
    let pos = GP[type].filter((_, e) => { return e > current && e <= index}), 
    timer, loop = 1, goti = GD[type][el];
    
    CP[type][el] = GP[type][index]
    document.querySelector(`.game-goti .goti:nth-child(${goti})`).classList.add('move')
    setPosition(goti,  pos[0])
    timer = setInterval(() => {
        if (pos.length==loop) {
            clearInterval(timer)
            killGoti(type, GP[type][index]);
            if (pos[loop-1]==88){
                let er = CP[type].every(e=>e==88);
                if (er) {
                    delete GD[type];
                    if (GD.length==1&&WP==1) {
                        alert(`Player ${type} is winner`)
                        window.location.href = window.location.href
                    } else if (GD.length==1&&WP!==1) {
                        alert('Game is over')
                        window.location.href = window.location.href
                    } else {
                        alert(`Player ${type} have completed game at position ${WP}`)
                        WP++;
                    }
                };
                KG=true;
            }
            setNextTurn();
            document.querySelector(`.game-goti .goti:nth-child(${goti})`).classList.remove('move')
            return;
        }

        setPosition(goti, pos[loop])
        loop += 1;
    }, 300);
}

const killGoti = (goti, index) => {
    if (SP.some(n => n == index)) return;

    const N = [];
    for (let m in GD) {N.push(m)}
    N.splice(N.indexOf(goti),1);
    
    N.forEach(e => {
        CP[e].forEach((i, t) => {
            if (i == index) {
                let SI = GP[e].findIndex(o => o == CP[e][t]),
                LI = GP[e].findIndex(l => l == 44), timer, loop = 0,
                pos = GP[e].filter((_, p) => { return p >= LI && p < SI }).reverse();
                
                GG[GD[e][t]].style.transition = '.03s'
                timer = setInterval(() => {
                    if (pos.length == loop) {
                        CP[e][t] = pos[loop];
                        GG[GD[e][t]].style.transition = '0.3s'
                        clearInterval(timer)
                        return
                    }
                    
                    setPosition(GD[e][t], pos[loop])
                    loop += 1;
                },30)
                
                KG=true;
            }
        })
    })
}

const setNextTurn = () => {
    if (DCN!==6||!KG) {
        let nextTurn = CAP.findIndex(e => e == CPP),
        turn = CAP.length-1==nextTurn ?  CAP[0] : CAP[nextTurn+1]
        DC.classList.remove(CPP),DC.classList.add(turn);
        CPP = turn
    }
    KG=false,PCM=false,CR=true,PAG=[];
}

const setIndex = (el,type,goti,index) => {
    el.style.height = `${GH[type]}px`
    el.style.width = `${GW[type]}px`
    el.style.left = `${POS[type][goti][index].left}px`
    el.style.top = `${POS[type][goti][index].top}px`
}

const makeResposiveGoti = (index, gotiIndex, type) => {
    // let goti = checkIfDoubleGoti(index), per;
    
    // if (type) {
    //     goti.splice(goti.indexOf(gotiIndex),1)
    //     goti.length==1&&DG.splice(index)
    // } else {
    //     goti.push(gotiIndex)
    // }

    // per = 100/goti.length;
    // console.log(goti)
    // goti.forEach(e => {
    //     let el = GG[e>4?e-5:e-1];
    //     console.log(el,per,goti)
    //     el.style.height = `${(GH[type]*per)/100}px`
    //     el.style.width = `${(GW[type]*per)/100}px`
    // })
}

const checkIfDoubleGoti = index => {
    let goti = [];

    for (let e in GD) {
        for (let i = 0; i < 4; i++) {
            if (CP[e][i]==index) {
                goti.push(GD[e][i])
            }
        }
    }

    return goti;
}

const rollDice = () => {
    if (!CR) return;
    CR = false;
    PCM = true;

    let arr = [1,5,6,6,3,4,2],move;

    DC.classList.remove(`n${DCN}`)
    DC.classList.add('active')
    DCN = arr[Math.floor(Math.random()*arr.length)]
    setTimeout(() => {
        DC.classList.add(`n${DCN}`)
        DC.classList.remove('active')
        move = whoCanMove(CPP, DCN);
        if (move.length==0) {
            setTimeout(() => {
                CR = true;
                setNextTurn();
            }, 400)
        } else {
            move.forEach(e => {
                PAG.push(e-1)
                GG[e-1].classList.add('anime')
            })
        }
    }, 450)
}

// document.addEventListener('DOMContentLoaded', () => startGame())
window.addEventListener('resize', () => {
    getSize();
    getPosition();
    init();
})