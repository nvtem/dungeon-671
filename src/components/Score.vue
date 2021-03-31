<template>
    <div class="score">
        <span class="high">High score: {{ $store.state.highScore }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="current">Score: {{ $store.state.score }}</span>
    </div>
</template>

<script>
    export default {
        name: "Score",

        created() {
            this.$store.commit('initHighScore')
        }
    }
</script>

<style lang="sass" scoped>
    .score
        .current
            color: #fff
            font-size: 20px

        .high
            color: #888
</style>
