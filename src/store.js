import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function initStore() {
    return new Vuex.Store({
        state: {
            score: 0,
            highScore: 0,
        },

        mutations: {
            initHighScore(state) {
                state.highScore = localStorage.highScore || 0
            },

            setScoreToZero(state) {
                state.score = 0
            },

            increaseScoreByOne(state) {
                state.score++
            },

            updateHighScore(state) {
                if (state.score > state.highScore)
                    state.highScore = localStorage.highScore = state.score
            },
        }
    })
}
