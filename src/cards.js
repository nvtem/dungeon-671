import {getRandomNumber} from './common-functions.js'

class Card {
    constructor(type, y, x, subtype = null, subsubtype = null) {
        this.type = type
        this.y = y
        this.x = x
        if (subtype) this.subtype = subtype
        if (subsubtype) this.subsubtype = subsubtype
    }
}

export class PlayerCard extends Card {
    constructor(y, x) {
        super('player', ...arguments)

        this.hp = 50
        this.power = 0
        this.hasPoisonedWeapon = false
        this.isPoisoned = false
        this.poisonCountdown = 0
    }
}

export class PotionCard extends Card {
    constructor(y, x, subtype) {
        super('potion', ...arguments)

        if (this.subtype === 'small')
            this.hp = 5
        else if (this.subtype === 'big')
            this.hp = 10
        this.power = 0;
    }
}

export class EnemyCard extends Card {
    constructor(y, x, subtype) {
        super('enemy', ...arguments)

        let stats = {
            'bee':          {hp: 2,  canPoison: false},
            'scorpion':     {hp: 3,  canPoison: false},
            'hedgehog':     {hp: 5,  canPoison: true},
            'spider':       {hp: 8,  canPoison: false},
            'warrior-1':    {hp: 10,  canPoison: false},
            'warrior-2':    {hp: 12,  canPoison: false},
            'mutant':       {hp: 15,  canPoison: true},
            'green-dragon': {hp: 20,  canPoison: true},
            'blue-dragon':  {hp: 25,  canPoison: false},
            'red-dragon':   {hp: 30, canPoison: false},
        }
        this.hp = stats[subtype].hp
        this.canPoison = stats[subtype].canPoison
        this.power = 0
        this.isPoisoned = false
        this.poisonCountdown = 0
    }
}

export class WeaponCard extends Card {
    constructor(y, x, subtype, subsubtype) {
        super('weapon', ...arguments)

        let stats = {
            dagger: 3,
            sword:  5,
            axe:    7
        }
        this.power = stats[subtype]
    }
}

export class ShuffleCard extends Card {
    constructor(y, x) {
        super('shuffle', ...arguments)
    }
}

export class ChestCard extends Card {
    constructor(y, x) {
        super('chest', ...arguments)
    }
}

export class LightningCard extends Card {
    constructor(y, x) {
        super('lightning', ...arguments)

        this.power = 5;
    }
}

export class BombCard extends Card {
    constructor(y, x, subtype) {
        super('bomb', ...arguments)

        this.power = 10;
        this.explosionCountdown = 5
    }
}

export class SpikesCard extends Card {
    constructor(y, x, subtype) {
        super('spikes', ...arguments)

        this.rotate = function () {
            if      (this.direction === 'up')    this.direction = 'right'
            else if (this.direction === 'right') this.direction = 'down'
            else if (this.direction === 'down')  this.direction = 'left'
            else if (this.direction === 'left')  this.direction = 'up'

            let newDangerousSides = []

            if (this.dangerousSides.indexOf('up')    !== -1) newDangerousSides.push('right')
            if (this.dangerousSides.indexOf('right') !== -1) newDangerousSides.push('down')
            if (this.dangerousSides.indexOf('down')  !== -1) newDangerousSides.push('left')
            if (this.dangerousSides.indexOf('left')  !== -1) newDangerousSides.push('up')

            this.dangerousSides = newDangerousSides
        }

        this.power = 5;
        this.direction = 'up'

        switch (subtype) {
            case 'single':
                this.dangerousSides = ['up']
                break
            case 'double':
                this.dangerousSides = ['up', 'right']
                break
            case 'double-180':
                this.dangerousSides = ['up', 'down']
                break
            case 'triple':
                this.dangerousSides = ['up', 'right', 'down']
                break
        }

        let rotationNumber = getRandomNumber(3)
        for (let i = 0; i < rotationNumber; i++)
            this.rotate()
    }
}

export class NothingCard extends Card {
    constructor(y, x) {
        super('nothing', ...arguments)
    }
}
