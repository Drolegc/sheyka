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
    }],
    nombre_apellido: '',
    calle_numero: '',
    piso_puerta_otros: '',
    pais: '',
    ciudad: '',
    codigo_postal: '',
    telefono: '',
    documento: ''

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
    },
    setNombreApellido(state, nombre_apellido) {
        state.nombre_apellido = nombre_apellido
    },
    setCalleNumero(state, calle_numero) {
        state.calle_numero = calle_numero
    },
    setPisoPuertaOtros(state, piso_puerta_otros) {
        state.piso_puerta_otros = piso_puerta_otros
    },
    setPais(state, pais) {
        state.pais = pais
    },
    setCiudad(state, ciudad) {
        state.ciudad = ciudad
    },
    setCodigoPostal(state, postal) {
        state.codigo_postal = postal
    },
    setTelefono(state, telefono) {
        state.telefono = telefono
    },
    setDocumento(state, documento) {
        state.documento = documento
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
    },
    setNombreApellido({ commit }, nombre_apellido) {
        commit('setNombreApellido', nombre_apellido)
    },
    setCalleNumero({ commit }, calle_numero) {
        commit('setCalleNumero', calle_numero)
    },
    setPisoPuertaOtros({ commit }, piso_puerta_otros) {
        commit('setPisoPuertaOtros', piso_puerta_otros)
    },
    setPais({ commit }, pais) {
        commit('setPais', pais)
    },
    setCiudad({ commit }, ciudad) {
        commit('setCiudad', ciudad)
    },
    setCodigoPostal({ commit }, codigo_postal) {
        commit('setCodigoPostal', codigo_postal)
    },
    setTelefono({ commit }, telefono) {
        commit('setTelefono', telefono)
    },
    setDocumento({ commit }, documento) {
        commit('setDocumento', documento)
    }
}

export const getters = {
    photos(state) {
        return state.photos
    },
    checkOrderInformation(state) {
        return (state.photos.length > 0 &&
            state.nombre_apellido != '' &&
            state.calle_numero != '' &&
            state.piso_puerta_otros != '' &&
            state.pais != '' &&
            state.ciudad != '' &&
            state.codigo_postal != '' &&
            state.telefono != '' &&
            state.documento != ''
        )
    },
    frames(state) {
        var frames = 0
        state.photos.forEach(photo => frames += photo.cantidad)
        return frames
    }

}