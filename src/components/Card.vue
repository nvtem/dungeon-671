<template>
    <div
        @click="$emit('click')"
        :class="['card', {'card--player': type === 'player', 'card--hover': isHovered, 'bg-red': type === 'player' && hp <= 0 }]"
        @mouseenter="() => {if (isNearPlayerCard()) isHovered = true}"
        @mouseleave="() => {if (isHovered) isHovered = false}"
    >
        <div class="hp" v-if="showHp">
            <img class="hp-icon" src="../images/icon-hp.png"><div class="hp-value">{{hp}}</div>
        </div>

        <div class="power" v-if="showPower">
            <img class="power-icon" :src="powerIconSrc"><div class="power-value">{{power}}</div>
        </div>

        <div class="poison-countdown" v-if="isPoisoned">
            <img class="poison-countdown-icon" src="../images/icon-poison-countdown.png"><div class="poison-countdown-value">{{poisonCountdown}}</div>
        </div>

        <div class="explosion-countdown" v-if="explosionCountdown > 0" :style="explosionCountdownStyle">
            <div class="explosion-countdown-value">{{explosionCountdown}}</div>
        </div>

        <img class="image" :src="imageSrc" :style="styleObject">
    </div>
</template>

<script>
    export default {
        name: "Card",

        props: ['type', 'subtype', 'subsubtype', 'hp', 'power', 'x', 'y', 'hasPoisonedWeapon', 'isPoisoned', 'poisonCountdown', 'canPoison', 'explosionCountdown', 'dangerousSides', 'direction'],

        data() {
            return {
                isHovered: false
            }
        },

        computed: {
            explosionCountdownStyle() {
                if (this.subtype === 'vertical')
                    return {left: '48px', top: '60px'}
            },

            imageSrc() {
                let suffix = ('subtype' in this && this.subtype) ? '-' + this.subtype : ''
                suffix += (('subsubtype' in this && this.subsubtype) ? '-' + this.subsubtype : '')
                return require("../images/" + this.type + suffix + ".png")
            },

            powerIconSrc() {
                return ('hasPoisonedWeapon' in this && this.hasPoisonedWeapon) ? require('../images/icon-power-poison.png') : require('../images/icon-power.png')
            },

            styleObject() {
                if ('direction' in this && this.direction !== undefined) {
                    let angle = {
                        up: 0,
                        right: 90,
                        down: 180,
                        left: 270
                    }[this.direction]

                    return {transform: 'rotate('+angle+'deg)'}
                } else
                    return {}
            },

            showHp() {
                return ('hp' in this && this.hp > 0)
            },

            showPower() {
                return ('power' in this && this.power > 0)
            },
        },

        methods: {
            isNearPlayerCard() {
                return ((this.y === this.$parent.playerCardY && Math.abs(this.x - this.$parent.playerCardX) === 1)
                        ||
                       (this.x === this.$parent.playerCardX && Math.abs(this.y - this.$parent.playerCardY) === 1))
            }
        },
    }
</script>

<style lang="sass" scoped>
    .card
        display: inline-flex
        align-items: center
        justify-content: center
        width: 120px
        height: 120px
        background-color: #191919
        margin-right: 8px
        margin-bottom: 8px
        border-radius: 5px
        position: relative
        color: #CCC
        vertical-align: top
        border: 1px solid #616161

        .hp
            display: flex
            background-color: inherit
            position: absolute
            top: 5px
            left: 5px
            &-icon
                margin-right: 2px
            &-value
                display: inline-block

        .power
            display: flex
            background-color: inherit
            position: absolute
            top: 5px
            right: 5px
            &-icon
                margin-right: 2px
            &-value
                display: inline-block

        .poison-countdown
            display: flex
            background-color: inherit
            position: absolute
            bottom: 5px
            right: 5px
            &-icon
                margin-right: 2px
            &-value
                display: inline-block

        .explosion-countdown
            background-color: #000000
            color: #fff
            border-radius: 50%
            border: 1px solid #fff
            font-size: 16px
            width: 23px
            height: 23px
            position: absolute
            top: 50px
            left: 38px
            &-value
                display: inline-block
                position: absolute
                top: 4px
                left: 8px

    .card--player
        background-color: #2f2f2f
        border: 1px solid #fff

    .card--hover
        background-color: #2a2a2a

    .bg-red
        background-color: #b22222
</style>
