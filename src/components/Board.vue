<template>
    <div class="board">
        <div v-for="(row, rowI) in cards">
            <card
                v-for="(card, cardI) in row"
                v-bind="card"
                :style="{marginRight: cardI === 4 ? '0' : null, marginBottom: rowI === 4 ? '0' : null}"
                @click="handleClickOnCard(card)"
            ></card>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Card from "./Card";

    import {shuffleArray, getWeightedRand, getRandomNumber} from '../common-functions.js'
    import {PlayerCard, NothingCard} from '../cards.js'
    import {getCardVariants} from "../card_variants";

    export default {
        name: "Board",

        props: ['start-new-game', 'finish-game', 'app-status'],

        components: {
            Card
        },

        data() {
            return {
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

                cards: [],

                playerCardX: 0,
                playerCardY: 0,
            }
        },

        computed: {
            playerCard() {
                return this.cards[this.playerCardY][this.playerCardX]
            },
        },

        methods: {
            setCard(y, x, card) {
                Vue.set(this.cards[y], x, card)
            },

            createRandomCard(y, x, except = null) {
                let score = this.$store.state.score
                let chances

                if (score >= 0 && score < 50) {
                    chances = {
                        [this.CARD_ENEMY_BEE]               : 0.13,
                        [this.CARD_ENEMY_SCORPION]          : 0.13,
                        [this.CARD_ENEMY_HEDGEHOG]          : 0.09,
                        [this.CARD_ENEMY_SPIDER]            : 0.06,
                        [this.CARD_ENEMY_WARRIOR_1]         : 0.02,
                        [this.CARD_ENEMY_WARRIOR_2]         : 0.02,
                        [this.CARD_ENEMY_MUTANT]            : 0.01,
                        [this.CARD_ENEMY_GREEN_DRAGON]      : 0.01,
                        [this.CARD_ENEMY_BLUE_DRAGON]       : 0.01,
                        [this.CARD_ENEMY_RED_DRAGON]        : 0.01,

                        [this.CARD_WEAPON_DAGGER_NORMAL]    : 0.06,
                        [this.CARD_WEAPON_DAGGER_POISONED]  : 0.01,
                        [this.CARD_WEAPON_SWORD_NORMAL]     : 0.06,
                        [this.CARD_WEAPON_SWORD_POISONED]   : 0.01,
                        [this.CARD_WEAPON_AXE_NORMAL]       : 0.06,
                        [this.CARD_WEAPON_AXE_POISONED]     : 0.01,

                        [this.CARD_POTION_SMALL]            : 0.06,
                        [this.CARD_POTION_BIG]              : 0.06,

                        [this.CARD_SPIKES_SINGLE]           : 0.02,
                        [this.CARD_SPIKES_DOUBLE]           : 0.02,
                        [this.CARD_SPIKES_DOUBLE_180]       : 0.02,
                        [this.CARD_SPIKES_TRIPLE]           : 0.02,

                        [this.CARD_BOMB_HORIZONTAL]         : 0.01,
                        [this.CARD_BOMB_VERTICAL]           : 0.01,

                        [this.CARD_LIGHTNING]               : 0.02,

                        [this.CARD_SHUFFLE]                 : 0.03,

                        [this.CARD_CHEST]                   : 0.03,
                    }
                }

                if (score >= 50 && score < 100) {
                    chances = {
                        [this.CARD_ENEMY_BEE]               : 0.11,
                        [this.CARD_ENEMY_SCORPION]          : 0.11,
                        [this.CARD_ENEMY_HEDGEHOG]          : 0.08,
                        [this.CARD_ENEMY_SPIDER]            : 0.05,
                        [this.CARD_ENEMY_WARRIOR_1]         : 0.03,
                        [this.CARD_ENEMY_WARRIOR_2]         : 0.03,
                        [this.CARD_ENEMY_MUTANT]            : 0.02,
                        [this.CARD_ENEMY_GREEN_DRAGON]      : 0.02,
                        [this.CARD_ENEMY_BLUE_DRAGON]       : 0.02,
                        [this.CARD_ENEMY_RED_DRAGON]        : 0.02,

                        [this.CARD_WEAPON_DAGGER_NORMAL]    : 0.06,
                        [this.CARD_WEAPON_DAGGER_POISONED]  : 0.01,
                        [this.CARD_WEAPON_SWORD_NORMAL]     : 0.06,
                        [this.CARD_WEAPON_SWORD_POISONED]   : 0.01,
                        [this.CARD_WEAPON_AXE_NORMAL]       : 0.06,
                        [this.CARD_WEAPON_AXE_POISONED]     : 0.01,

                        [this.CARD_POTION_SMALL]            : 0.06,
                        [this.CARD_POTION_BIG]              : 0.06,

                        [this.CARD_SPIKES_SINGLE]           : 0.02,
                        [this.CARD_SPIKES_DOUBLE]           : 0.02,
                        [this.CARD_SPIKES_DOUBLE_180]       : 0.02,
                        [this.CARD_SPIKES_TRIPLE]           : 0.02,

                        [this.CARD_BOMB_HORIZONTAL]         : 0.01,
                        [this.CARD_BOMB_VERTICAL]           : 0.01,

                        [this.CARD_LIGHTNING]               : 0.02,

                        [this.CARD_SHUFFLE]                 : 0.03,

                        [this.CARD_CHEST]                   : 0.03,
                    }
                }

                if (score >= 100) {
                    chances = {
                        [this.CARD_ENEMY_BEE]               : 0.10,
                        [this.CARD_ENEMY_SCORPION]          : 0.10,
                        [this.CARD_ENEMY_HEDGEHOG]          : 0.06,
                        [this.CARD_ENEMY_SPIDER]            : 0.05,
                        [this.CARD_ENEMY_WARRIOR_1]         : 0.02,
                        [this.CARD_ENEMY_WARRIOR_2]         : 0.04,
                        [this.CARD_ENEMY_MUTANT]            : 0.03,
                        [this.CARD_ENEMY_GREEN_DRAGON]      : 0.03,
                        [this.CARD_ENEMY_BLUE_DRAGON]       : 0.04,
                        [this.CARD_ENEMY_RED_DRAGON]        : 0.04,

                        [this.CARD_WEAPON_DAGGER_NORMAL]    : 0.06,
                        [this.CARD_WEAPON_DAGGER_POISONED]  : 0.01,
                        [this.CARD_WEAPON_SWORD_NORMAL]     : 0.06,
                        [this.CARD_WEAPON_SWORD_POISONED]   : 0.01,
                        [this.CARD_WEAPON_AXE_NORMAL]       : 0.06,
                        [this.CARD_WEAPON_AXE_POISONED]     : 0.01,

                        [this.CARD_POTION_SMALL]            : 0.05,
                        [this.CARD_POTION_BIG]              : 0.05,

                        [this.CARD_SPIKES_SINGLE]           : 0.02,
                        [this.CARD_SPIKES_DOUBLE]           : 0.02,
                        [this.CARD_SPIKES_DOUBLE_180]       : 0.02,
                        [this.CARD_SPIKES_TRIPLE]           : 0.02,

                        [this.CARD_BOMB_HORIZONTAL]         : 0.01,
                        [this.CARD_BOMB_VERTICAL]           : 0.01,

                        [this.CARD_LIGHTNING]               : 0.02,

                        [this.CARD_SHUFFLE]                 : 0.03,

                        [this.CARD_CHEST]                   : 0.03,
                    }
                }

                if (except) {
                    let val = chances[except]
                    delete chances[except]
                    let sum = 0;
                    for (let item in chances)
                        sum += chances[item]
                    Object.keys(chances).forEach(function(key, index) {
                        chances[key] += val * (chances[key]/sum)
                    })
                }

                let index = getWeightedRand(chances)
                let cardInitOptions = getCardVariants()[index]

                if ('subtype' in cardInitOptions && 'subsubtype' in cardInitOptions)
                    return new (cardInitOptions.cardClass)(y, x, cardInitOptions.subtype, cardInitOptions.subsubtype)
                else if ('subtype' in cardInitOptions)
                    return new (cardInitOptions.cardClass)(y, x, cardInitOptions.subtype)
                else
                    return new (cardInitOptions.cardClass)(y, x)
            },

            attackCard(y, x, fromDirection) {
                let card = this.cards[y][x]
                let ret;

                switch (card.type) {
                    case 'potion':
                        ret = true

                        this.playerCard.hp += card.hp
                        if (this.playerCard.hp > 50)
                            this.playerCard.hp = 50
                        break

                    case 'enemy':
                        ret = false

                        if (this.playerCard.power > 0) {
                            if (card.hp >= this.playerCard.power) {
                                card.hp -= this.playerCard.power
                                this.playerCard.power = 0
                            } else {
                                this.playerCard.power -= card.hp
                                card.hp = 0
                            }

                        } else {
                            let damage = Math.min(this.playerCard.hp, card.hp)
                            this.playerCard.hp -= damage
                            card.hp -= damage
                        }

                        if (card.hp === 0) {
                            this.setCard(y, x, new NothingCard(y, x))
                        } else {
                            if (this.playerCard.hasPoisonedWeapon && !card.canPoison) {
                                card.isPoisoned = true
                                card.poisonCountdown = 5
                            }
                        }

                        if (card.canPoison) {
                            this.playerCard.isPoisoned = true
                            this.playerCard.poisonCountdown = 5
                        }

                        break

                    case 'weapon':
                        ret = true

                        this.playerCard.power = card.power

                        if (card.subsubtype === 'normal')
                            this.playerCard.hasPoisonedWeapon = false
                        else if (card.subsubtype === 'poisoned')
                            this.playerCard.hasPoisonedWeapon = true

                        break

                    case 'shuffle':
                        ret = false

                        this.setCard(y, x, new NothingCard(y, x))

                        let arr = []
                        for (let i = 0; i < 25; i++)
                            arr[i] = i

                        arr = shuffleArray(arr)

                        let newCards = []

                        for (let i = 0; i < 5; i++) {
                            newCards[i] = new  Array(5)
                            for (let j = 0; j < 5; j++) {
                                newCards[i][j] = null
                            }
                        }

                        for (let i = 0; i < 25; i++) {
                            let y1 = Math.floor(i / 5)
                            let x1 = i - y1 * 5

                            let y2 = Math.floor(arr[i] / 5)
                            let x2 = arr[i] - y2 * 5

                            newCards[y1][x1] = this.cards[y2][x2]

                            newCards[y1][x1].y = y1
                            newCards[y1][x1].x = x1

                            if (newCards[y1][x1].type === 'player') {
                                this.playerCardY = newCards[y1][x1].y
                                this.playerCardX = newCards[y1][x1].x
                            }
                        }

                        this.cards = newCards

                        break

                    case 'nothing':
                        ret = true

                        break

                    case 'chest':
                        ret = false

                        let chances = {
                            [this.CARD_WEAPON_DAGGER_NORMAL]    : 0.05,
                            [this.CARD_WEAPON_DAGGER_POISONED]  : 0.03,
                            [this.CARD_WEAPON_SWORD_NORMAL]     : 0.05,
                            [this.CARD_WEAPON_SWORD_POISONED]   : 0.03,
                            [this.CARD_WEAPON_AXE_NORMAL]       : 0.05,
                            [this.CARD_WEAPON_AXE_POISONED]     : 0.03,

                            [this.CARD_POTION_SMALL]            : 0.125,
                            [this.CARD_POTION_BIG]              : 0.125,

                            [this.CARD_LIGHTNING]               : 0.26,

                            [this.CARD_SHUFFLE]                 : 0.25,
                        }

                        let index = getWeightedRand(chances)

                        let cardInitOptions = getCardVariants()[index]

                        if ('subtype' in cardInitOptions && 'subsubtype' in cardInitOptions)
                            card = new (cardInitOptions.cardClass)(y, x, cardInitOptions.subtype, cardInitOptions.subsubtype)
                        else if ('subtype' in cardInitOptions)
                            card = new (cardInitOptions.cardClass)(y, x, cardInitOptions.subtype)
                        else
                            card = new (cardInitOptions.cardClass)(y, x)

                        this.setCard(y, x, card)

                        break

                    case 'lightning':
                        ret = true

                        let cardI;

                        for (let i = 0; i < 5; i++) {
                            for (let j = 0; j < 5; j++) {
                                cardI = this.cards[i][j]
                                if (cardI.type === 'enemy') {
                                    cardI.hp -= card.power
                                    if (cardI.hp <= 0)
                                        this.setCard(i, j, new NothingCard(i, j))
                                }
                            }
                        }

                        break

                    case 'spikes':
                        ret = true

                        if (card.dangerousSides.indexOf(fromDirection) !== -1)
                            this.playerCard.hp -= card.power

                        break

                    case 'bomb':
                        ret = false

                        let bombCard = Object.assign({}, card)
                        this.setCard(y, x, this.cards[this.playerCardY][this.playerCardX])
                        this.setCard(this.playerCardY, this.playerCardX, bombCard)

                        this.playerCardY = y
                        this.playerCardX = x
                }

                return ret;
            },

            movePlayer(direction) {
                let start;
                let end;

                switch (direction) {
                    case 'left':
                        start = this.playerCardX - 1
                        end = 4
                        for (let i = start; i < end; i++)
                            this.setCard(this.playerCardY, i, this.cards[this.playerCardY][i+1])
                        this.setCard(this.playerCardY, end, this.createRandomCard(this.playerCardY, end))
                        break
                    case 'right':
                        start = this.playerCardX + 1
                        end = 0
                        for (let i = start; i > end; i--)
                            this.setCard(this.playerCardY, i, this.cards[this.playerCardY][i-1])
                        this.setCard(this.playerCardY, end, this.createRandomCard(this.playerCardY, end))
                        break
                    case 'up':
                        start = this.playerCardY - 1
                        end = 4
                        for (let i = start; i < end; i++)
                            this.setCard(i, this.playerCardX, this.cards[i+1][this.playerCardX])
                        this.setCard(end, this.playerCardX, this.createRandomCard(end, this.playerCardX))
                        break
                    case 'down':
                        start = this.playerCardY + 1
                        end = 0
                        for (let i = start; i > end; i--)
                            this.setCard(i, this.playerCardX, this.cards[i-1][this.playerCardX])
                        this.setCard(end, this.playerCardX, this.createRandomCard(end, this.playerCardX))
                        break
                }
            },

            handleKeyPress(keyCode) {
                let direction

                switch (keyCode) {
                    case 'ArrowLeft' : case 'KeyA': direction = 'left' ; break
                    case 'ArrowRight': case 'KeyD': direction = 'right'; break
                    case 'ArrowUp'   : case 'KeyW': direction = 'up'   ; break
                    case 'ArrowDown' : case 'KeyS': direction = 'down' ; break
                }

                this.makeMove(direction)
            },

            handleClickOnCard(card) {
                if (card.y === this.playerCardY && card.x - this.playerCardX === -1)
                    this.makeMove('left')
                else if (card.y === this.playerCardY && card.x - this.playerCardX === 1)
                    this.makeMove('right')
                else if (card.x === this.playerCardX && card.y - this.playerCardY === -1)
                    this.makeMove('up')
                else if (card.x === this.playerCardX && card.y - this.playerCardY === 1)
                    this.makeMove('down')
            },

            makeMove(direction) {
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        let card = this.cards[i][j]

                        if ('isPoisoned' in card && card.isPoisoned) {
                            card.hp--
                            card.poisonCountdown--
                            if (card.poisonCountdown === 0)
                                card.isPoisoned = false
                            if (card.hp === 0) {
                                if (card.type === 'player') {

                                } else {
                                    this.setCard(i, j, new NothingCard())
                                }
                            }
                        }
                    }
                }

                let x;
                let y;

                switch (direction) {
                    case 'left':
                        if (this.playerCardX === 0) return
                        x = this.playerCardX - 1
                        y = this.playerCardY
                        break

                    case 'right':
                        if (this.playerCardX === 4) return
                        x = this.playerCardX + 1
                        y = this.playerCardY
                        break

                    case 'up':
                        if (this.playerCardY === 0) return
                        x = this.playerCardX
                        y = this.playerCardY - 1
                        break

                    case 'down':
                        if (this.playerCardY === 4) return
                        x = this.playerCardX
                        y = this.playerCardY + 1
                        break

                    default:
                        return
                }

                let fromDirection;

                if (direction === 'up')    fromDirection = 'down'
                if (direction === 'down')  fromDirection = 'up'
                if (direction === 'left')  fromDirection = 'right'
                if (direction === 'right') fromDirection = 'left'

                if (this.attackCard(y, x, fromDirection)) {
                    this.movePlayer(direction)
                    this.playerCardX = x
                    this.playerCardY = y
                }

                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {

                        let card = this.cards[i][j]

                        if (card.type === 'bomb') {
                            card.explosionCountdown--
                            let power = card.power
                            if (card.explosionCountdown === 0) {

                                let subtype = card.subtype

                                if (subtype === 'horizontal') {
                                    for (let k = 0; k < 5; k++) {
                                        if ('hp' in this.cards[i][k] && this.cards[i][k].type !== 'potion') {
                                            this.cards[i][k].hp -= power
                                            if (this.cards[i][k].hp <= 0)
                                                this.setCard(i, k, new NothingCard(i, k))
                                        } else {
                                            this.setCard(i, k, new NothingCard(i, k))
                                        }
                                    }
                                }

                                if (subtype === 'vertical') {
                                    for (let k = 0; k < 5; k++) {
                                        if ('hp' in this.cards[k][j] && this.cards[k][j].type !== 'potion') {
                                            this.cards[k][j].hp -= power
                                            if (this.cards[k][j].hp <= 0)
                                                this.setCard(k, j, new NothingCard(k, j))
                                        } else {
                                            this.setCard(k, j, new NothingCard(k, j))
                                        }
                                    }
                                }
                            }
                        }

                        if (card.type === 'spikes')
                            card.rotate()
                    }
                }

                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        this.cards[i][j].y = i
                        this.cards[i][j].x = j
                    }
                }

                if (this.playerCard.hp > 0) {
                    this.$store.commit('increaseScoreByOne')
                    this.$forceUpdate()
                } else
                    this.finishGame()
            },

            initBoard() {
                this.cards = new Array(5)
                for (let i = 0; i < 5; i++) {
                    this.cards[i] = new Array(5)
                    for (let j = 0; j < 5; j++)
                        this.setCard(i, j, this.createRandomCard(i, j))
                }

                this.playerCardY = getRandomNumber(4)
                this.playerCardX = getRandomNumber(4)

                this.setCard(this.playerCardY, this.playerCardX, new PlayerCard(this.playerCardY, this.playerCardX))
            }
        },

        created() {
            this.startNewGame(this.initBoard)

            document.addEventListener('keydown', (e) => {
                const keyCode = e.code

                if ((['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD', 'KeyW', 'KeyS'].includes(keyCode))
                && (this.appStatus === 'game_in_progress')) {
                    this.handleKeyPress(keyCode)
                    e.preventDefault()
                }
            })
        },
    }
</script>

<style lang="sass" scoped>
    .board
        margin-top: 15px
</style>
