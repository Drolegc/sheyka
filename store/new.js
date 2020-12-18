export const state = () => ({
    photos: [{
        id: 0,
        file: "",
        url: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        cantidad: 1
    }, {
        id: 1,
        file: "",
        url: "https://picsum.photos/id/11/500/300",
        cantidad: 1
    }]
})

export const mutations = {
    setPhotos(state, photos) {
        state.photos = photos
    },
    addPhoto(state, photo) {
        state.photos.push(photo)
    },
    addCantidad(state, id) {
        state.photos[id].cantidad++
    },
    removeCantidad(state, id) {
        state.photos[id].cantidad--
    }
}

export const actions = {
    setPhotos({ commit }, photos) {
        commit('setPhotos', photos)
    },
    addPhoto({ commit }, photo) {
        commit('addPhoto', photo)
    },
    addCantidad({ commit }, id) {
        commit('addCantidad', id)
    },
    removeCantidad({ commit }, id) {
        commit('removeCantidad', id)
    }
}

export const getters = {
    photos(state) {
        return state.photos

    }
}