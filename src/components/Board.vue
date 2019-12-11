<template>
    <div class="board">
        <div v-for="(row, rowI) in cards">
            <card
                v-for="(card, cardI) in row"
                v-bind="card"
                :style="{marginRight: cardI === 4 ? '0' : null, marginBottom: rowI === 4 ? '0' : null}"
                @click="handleClickOnCard(card)"
            />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Card from "./Card";

    import {shuffleArray, getWeightedRand, getRandomNumber} from '../common-functions.js'
    import * as cards from '../cards.js'

    export default {
        name: "Board",

        props: ['start-new-game', 'finish-game', 'app-status'],

        components: {
            Card
        },

        data() {
            return {
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

            createCard(y, x, initOptions) {
                if ('subtype' in initOptions && 'subsubtype' in initOptions)
                    return new (initOptions.cardClass)(y, x, initOptions.subtype, initOptions.subsubtype)
                else if ('subtype' in initOptions)
                    return new (initOptions.cardClass)(y, x, initOptions.subtype)
                else
                    return new (initOptions.cardClass)(y, x)
            },

            createRandomCard(y, x, except = null) {
                let score = this.$store.state.score
                let chances

                if (score >= 0 && score < 50)
                    chances = cards.chancesLevel1
                else if (score >= 50 && score < 100)
                    chances = cards.chancesLevel2
                else if (score >= 100)
                    chances = cards.chancesLevel3

                if (except) {
                    let val = chances[except]
                    delete chances[except]
                    let sum = 0;
                    for (let item in chances)
                        sum += chances[item]
                    Object.keys(chances).forEach(function(key) {
                        chances[key] += val * (chances[key]/sum)
                    })
                }

                let index = getWeightedRand(chances)
                return this.createCard(y, x, cards.initOptions[index])
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
                            this.setCard(y, x, new cards.NothingCard(y, x))
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

                        this.setCard(y, x, new cards.NothingCard(y, x))

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
                            [cards.id.CARD_WEAPON_DAGGER_NORMAL]    : 0.05,
                            [cards.id.CARD_WEAPON_DAGGER_POISONED]  : 0.03,
                            [cards.id.CARD_WEAPON_SWORD_NORMAL]     : 0.05,
                            [cards.id.CARD_WEAPON_SWORD_POISONED]   : 0.03,
                            [cards.id.CARD_WEAPON_AXE_NORMAL]       : 0.05,
                            [cards.id.CARD_WEAPON_AXE_POISONED]     : 0.03,

                            [cards.id.CARD_POTION_SMALL]            : 0.125,
                            [cards.id.CARD_POTION_BIG]              : 0.125,

                            [cards.id.CARD_LIGHTNING]               : 0.26,

                            [cards.id.CARD_SHUFFLE]                 : 0.25,
                        }

                        let index = getWeightedRand(chances)
                        let newCard = this.createCard(y, x, cards.initOptions[index])
                        this.setCard(y, x, newCard)

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
                                        this.setCard(i, j, new cards.NothingCard(i, j))
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
                                    this.setCard(i, j, new cards.NothingCard())
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
                                                this.setCard(i, k, new cards.NothingCard(i, k))
                                        } else {
                                            this.setCard(i, k, new cards.NothingCard(i, k))
                                        }
                                    }
                                }

                                if (subtype === 'vertical') {
                                    for (let k = 0; k < 5; k++) {
                                        if ('hp' in this.cards[k][j] && this.cards[k][j].type !== 'potion') {
                                            this.cards[k][j].hp -= power
                                            if (this.cards[k][j].hp <= 0)
                                                this.setCard(k, j, new cards.NothingCard(k, j))
                                        } else {
                                            this.setCard(k, j, new cards.NothingCard(k, j))
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

                this.setCard(this.playerCardY, this.playerCardX, new cards.PlayerCard(this.playerCardY, this.playerCardX))
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
