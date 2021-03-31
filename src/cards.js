import {getRandomNumber} from './common-functions.js'

//======================================================================================================================

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
            dagger: 5,
            sword:  7,
            axe:    10
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

//======================================================================================================================

export const id = {
    CARD_ENEMY_BEE                  : 0,
    CARD_ENEMY_SCORPION             : 1,
    CARD_ENEMY_HEDGEHOG             : 2,
    CARD_ENEMY_SPIDER               : 3,
    CARD_ENEMY_WARRIOR_1            : 4,
    CARD_ENEMY_WARRIOR_2            : 5,
    CARD_ENEMY_MUTANT               : 6,
    CARD_ENEMY_GREEN_DRAGON         : 7,
    CARD_ENEMY_BLUE_DRAGON          : 8,
    CARD_ENEMY_RED_DRAGON           : 9,

    CARD_LIGHTNING                  : 10,

    CARD_POTION_SMALL               : 11,
    CARD_POTION_BIG                 : 12,

    CARD_CHEST                      : 13,
    CARD_SHUFFLE                    : 14,

    CARD_WEAPON_SWORD_NORMAL        : 15,
    CARD_WEAPON_SWORD_POISONED      : 16,
    CARD_WEAPON_AXE_NORMAL          : 17,
    CARD_WEAPON_AXE_POISONED        : 18,
    CARD_WEAPON_DAGGER_NORMAL       : 19,
    CARD_WEAPON_DAGGER_POISONED     : 20,

    CARD_BOMB_HORIZONTAL            : 21,
    CARD_BOMB_VERTICAL              : 22,
    CARD_BOMB_SUPER                 : 23,
    CARD_SPIKES_SINGLE              : 24,
    CARD_SPIKES_DOUBLE              : 25,
    CARD_SPIKES_DOUBLE_180          : 26,
    CARD_SPIKES_TRIPLE              : 27,

    CARD_NOTHING                    : 28,
}


//======================================================================================================================

export const initOptions = [
    {
        cardClass: EnemyCard,
        subtype: 'bee'
    },
    {
        cardClass: EnemyCard,
        subtype: 'scorpion'
    },
    {
        cardClass: EnemyCard,
        subtype: 'hedgehog'
    },
    {
        cardClass: EnemyCard,
        subtype: 'spider'
    },
    {
        cardClass: EnemyCard,
        subtype: 'warrior-1'
    },
    {
        cardClass: EnemyCard,
        subtype: 'warrior-2'
    },
    {
        cardClass: EnemyCard,
        subtype: 'mutant'
    },
    {
        cardClass: EnemyCard,
        subtype: 'green-dragon'
    },
    {
        cardClass: EnemyCard,
        subtype: 'blue-dragon'
    },
    {
        cardClass: EnemyCard,
        subtype: 'red-dragon'
    },
    {
        cardClass: LightningCard
    },
    {
        cardClass: PotionCard,
        subtype: 'small'
    },
    {
        cardClass: PotionCard,
        subtype: 'big'
    },
    {
        cardClass: ChestCard,
    },
    {
        cardClass: ShuffleCard
    },
    {
        cardClass: WeaponCard,
        subtype: 'sword',
        subsubtype: 'normal'
    },
    {
        cardClass: WeaponCard,
        subtype: 'sword',
        subsubtype: 'poisoned'
    },
    {
        cardClass: WeaponCard,
        subtype: 'axe',
        subsubtype: 'normal'
    },
    {
        cardClass: WeaponCard,
        subtype: 'axe',
        subsubtype: 'poisoned'
    },
    {
        cardClass: WeaponCard,
        subtype: 'dagger',
        subsubtype: 'normal'
    },
    {
        cardClass: WeaponCard,
        subtype: 'dagger',
        subsubtype: 'poisoned'
    }
    ,
    {
        cardClass: BombCard,
        subtype: 'horizontal'
    }
    ,
    {
        cardClass: BombCard,
        subtype: 'vertical'
    },
    {
        cardClass: BombCard,
        subtype: 'super'
    },
    {
        cardClass: SpikesCard,
        subtype: 'single'
    },
    {
        cardClass: SpikesCard,
        subtype: 'double'
    },
    {
        cardClass: SpikesCard,
        subtype: 'double-180'
    },
    {
        cardClass: SpikesCard,
        subtype: 'triple'
    },
    {
        cardClass: NothingCard,
    },
]

//======================================================================================================================

export const chancesLevel1 = {
    [id.CARD_ENEMY_BEE]               : 0.13,
    [id.CARD_ENEMY_SCORPION]          : 0.13,
    [id.CARD_ENEMY_HEDGEHOG]          : 0.09,
    [id.CARD_ENEMY_SPIDER]            : 0.06,
    [id.CARD_ENEMY_WARRIOR_1]         : 0.02,
    [id.CARD_ENEMY_WARRIOR_2]         : 0.02,
    [id.CARD_ENEMY_MUTANT]            : 0.01,
    [id.CARD_ENEMY_GREEN_DRAGON]      : 0.01,
    [id.CARD_ENEMY_BLUE_DRAGON]       : 0.01,
    [id.CARD_ENEMY_RED_DRAGON]        : 0.01,

    [id.CARD_WEAPON_DAGGER_NORMAL]    : 0.06,
    [id.CARD_WEAPON_DAGGER_POISONED]  : 0.01,
    [id.CARD_WEAPON_SWORD_NORMAL]     : 0.06,
    [id.CARD_WEAPON_SWORD_POISONED]   : 0.01,
    [id.CARD_WEAPON_AXE_NORMAL]       : 0.06,
    [id.CARD_WEAPON_AXE_POISONED]     : 0.01,

    [id.CARD_POTION_SMALL]            : 0.06,
    [id.CARD_POTION_BIG]              : 0.06,

    [id.CARD_SPIKES_SINGLE]           : 0.02,
    [id.CARD_SPIKES_DOUBLE]           : 0.02,
    [id.CARD_SPIKES_DOUBLE_180]       : 0.02,
    [id.CARD_SPIKES_TRIPLE]           : 0.02,

    [id.CARD_BOMB_HORIZONTAL]         : 0.01,
    [id.CARD_BOMB_VERTICAL]           : 0.01,

    [id.CARD_LIGHTNING]               : 0.02,

    [id.CARD_SHUFFLE]                 : 0.03,

    [id.CARD_CHEST]                   : 0.03,
}

export const chancesLevel2 = {
    [id.CARD_ENEMY_BEE]               : 0.11,
    [id.CARD_ENEMY_SCORPION]          : 0.11,
    [id.CARD_ENEMY_HEDGEHOG]          : 0.08,
    [id.CARD_ENEMY_SPIDER]            : 0.05,
    [id.CARD_ENEMY_WARRIOR_1]         : 0.03,
    [id.CARD_ENEMY_WARRIOR_2]         : 0.03,
    [id.CARD_ENEMY_MUTANT]            : 0.02,
    [id.CARD_ENEMY_GREEN_DRAGON]      : 0.02,
    [id.CARD_ENEMY_BLUE_DRAGON]       : 0.02,
    [id.CARD_ENEMY_RED_DRAGON]        : 0.02,

    [id.CARD_WEAPON_DAGGER_NORMAL]    : 0.06,
    [id.CARD_WEAPON_DAGGER_POISONED]  : 0.01,
    [id.CARD_WEAPON_SWORD_NORMAL]     : 0.06,
    [id.CARD_WEAPON_SWORD_POISONED]   : 0.01,
    [id.CARD_WEAPON_AXE_NORMAL]       : 0.06,
    [id.CARD_WEAPON_AXE_POISONED]     : 0.01,

    [id.CARD_POTION_SMALL]            : 0.06,
    [id.CARD_POTION_BIG]              : 0.06,

    [id.CARD_SPIKES_SINGLE]           : 0.02,
    [id.CARD_SPIKES_DOUBLE]           : 0.02,
    [id.CARD_SPIKES_DOUBLE_180]       : 0.02,
    [id.CARD_SPIKES_TRIPLE]           : 0.02,

    [id.CARD_BOMB_HORIZONTAL]         : 0.01,
    [id.CARD_BOMB_VERTICAL]           : 0.01,

    [id.CARD_LIGHTNING]               : 0.02,

    [id.CARD_SHUFFLE]                 : 0.03,

    [id.CARD_CHEST]                   : 0.03,
}

export const chancesLevel3 = {
    [id.CARD_ENEMY_BEE]               : 0.10,
    [id.CARD_ENEMY_SCORPION]          : 0.10,
    [id.CARD_ENEMY_HEDGEHOG]          : 0.05,
    [id.CARD_ENEMY_SPIDER]            : 0.05,
    [id.CARD_ENEMY_WARRIOR_1]         : 0.02,
    [id.CARD_ENEMY_WARRIOR_2]         : 0.04,
    [id.CARD_ENEMY_MUTANT]            : 0.03,
    [id.CARD_ENEMY_GREEN_DRAGON]      : 0.03,
    [id.CARD_ENEMY_BLUE_DRAGON]       : 0.03,
    [id.CARD_ENEMY_RED_DRAGON]        : 0.03,

    [id.CARD_WEAPON_DAGGER_NORMAL]    : 0.06,
    [id.CARD_WEAPON_DAGGER_POISONED]  : 0.01,
    [id.CARD_WEAPON_SWORD_NORMAL]     : 0.06,
    [id.CARD_WEAPON_SWORD_POISONED]   : 0.01,
    [id.CARD_WEAPON_AXE_NORMAL]       : 0.06,
    [id.CARD_WEAPON_AXE_POISONED]     : 0.01,

    [id.CARD_POTION_SMALL]            : 0.07,
    [id.CARD_POTION_BIG]              : 0.07,

    [id.CARD_SPIKES_SINGLE]           : 0.02,
    [id.CARD_SPIKES_DOUBLE]           : 0.02,
    [id.CARD_SPIKES_DOUBLE_180]       : 0.02,
    [id.CARD_SPIKES_TRIPLE]           : 0.02,

    [id.CARD_BOMB_HORIZONTAL]         : 0.01,
    [id.CARD_BOMB_VERTICAL]           : 0.01,

    [id.CARD_LIGHTNING]               : 0.02,

    [id.CARD_SHUFFLE]                 : 0.03,

    [id.CARD_CHEST]                   : 0.02,
}

//======================================================================================================================
