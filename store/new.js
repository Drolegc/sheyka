export const state = () => ({
    photos: []
})

export const mutations = {
    setPhotos(state, photos) {
        state.photos = photos
    },
    addPhoto(state, photo) {
        state.photos.push(photo)
    }
}

export const actions = {
    setPhotos({ commit }, photos) {
        commit('setPhotos', photos)
    },
    addPhoto({ commit }, photo) {
        commit('addPhoto', photo)
    }
}

export const getters = {
    photos(state) {
        return state.photos

    }
}