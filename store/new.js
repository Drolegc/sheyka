async function urltoFile(url, filename, mimeType) {
    const res = await fetch(url)
    const blob = await res.blob()
    return new File([blob], filename, { type: 'image/png' })
        // return (fetch(url)
        //     .then(function(res) { return res.arrayBuffer(); })
        //     .then(function(buf) { return new File([buf], filename, { type: mimeType }); })
        // );
}

export const state = () => ({
    photos: [],
    nombre_apellido: '',
    calle_numero: '',
    piso_puerta_otros: '',
    pais: "",
    ciudad: "",
    codigo_postal: '',
    telefono: '',
    telefono_extra: '',
    documento: '',
    email: '',
    regalo: false,
    is_new_person: true,
    id_person: 0,
    terminos_y_condiciones: false,
    selected_frame: 1

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
    },
    setUserInitData(state, user_init_data) {
        state.documento = user_init_data.documento
        state.telefono = user_init_data.telefono
        state.nombre_apellido = user_init_data.nombre_apellido
        state.email = user_init_data.email
    },
    setEmail(state, email) {
        state.email = email
    },
    setRegalo(state, regalo) {
        state.regalo = regalo
    },
    removePhoto(state, index) {
        state.photos = state.photos.filter((photo, id) => id != index)
    },
    setIsNewPerson(state, is_new_person) {
        state.is_new_person = is_new_person
    },
    setIdPerson(state, id_person) {
        state.id_person = id_person
    },
    setTelefonoExtra(state, telefono_extra) {
        state.telefono_extra = telefono_extra
    },
    setTerminosYCondiciones(state, terminos_y_condiciones) {
        state.terminos_y_condiciones = terminos_y_condiciones
    },
    setSelectedFrame(state, selected_frame) {
        state.selected_frame = selected_frame
    },
    setAuxPreview(state, data) {
        let index = data.index
        let src = data.src
        state.photos[index].aux_preview = src
    },
    async changeFiles(state) {
        console.log("Changening files...")
        for (let i = 0; i < state.photos.length; i++) {
            console.log(state.photos[i])
            state.photos[i].file = await urltoFile(state.photos[i].preview, 'preview.png', 'image/png')

        }
        // for (const photo in state.photos) {
        //     photo.file = await urltoFile(photo.preview, 'preview.png', 'image/png')
        // }
        console.log("ready")
    },
    setPreview(state, index) {
        state.photos[index].preview = state.photos[index].aux_preview
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
    },
    setUserInitData({ commit }, user_init_data) {
        commit('setUserInitData', user_init_data)
    },
    setEmail({ commit }, email) {
        commit('setEmail', email)
    },
    setRegalo({ commit }, regalo) {
        commit('setRegalo', regalo)
    },
    removePhoto({ commit }, index) {
        commit('removePhoto', index)
    },
    setIsNewPerson({ commit }, is_new_person) {
        commit('setIsNewPerson', is_new_person)
    },
    setIdPerson({ commit }, id_person) {
        commit('setIdPerson', id_person)
    },
    setTelefonoExtra({ commit }, telefono_extra) {
        commit('setTelefonoExtra', telefono_extra)
    },
    setTerminosYCondiciones({ commit }, terminos_y_condiciones) {
        commit('setTerminosYCondiciones', terminos_y_condiciones)
    },
    setSelectedFrame({ commit }, selected_frame) {
        commit('setSelectedFrame', selected_frame)
    },
    setAuxPreview({ commit }, data) {
        commit('setAuxPreview', data)
    },
    async changeFiles({ commit }) {
        commit('changeFiles')
    },
    setPreview({ commit }, index) {
        commit('setPreview', index)
    }
}

export const getters = {
    photos(state) {
        return state.photos
    },
    checkOrderDirectionInformation(state) {
        return (
            state.calle_numero != '' &&
            state.piso_puerta_otros != '' &&
            state.pais != '' &&
            state.ciudad != ''
        )
    },
    checkOrderPersonInformation(state) {
        return (
            state.nombre_apellido != '' &&
            state.telefono != '' &&
            state.documento != '' &&
            state.email != ''
        )
    },
    checkTerminosYCondicionesForm(state) {
        return state.terminos_y_condiciones
    },
    frames(state) {
        var frames = 0
        state.photos.forEach(photo => frames += photo.cantidad)
        return frames
    },
    getNombreApellido(state) {
        return state.nombre_apellido
    },
    getCalleNumero(state) {
        return state.calle_numero
    },
    getPisoPuertaOtros(state) {
        return state.piso_puerta_otros
    },
    getPais(state) {
        return state.pais
    },
    getCiudad(state) {
        return state.ciudad
    },
    getCodigoPostal(state) {
        return state.codigo_postal
    },
    getTelefono(state) {
        return state.telefono
    },
    getDocumento(state) {
        return state.documento
    },
    getEmail(state) {
        return state.email
    },
    getRegalo(state) {
        return state.regalo
    },
    getIsNewPerson(state) {
        return state.is_new_person
    },
    getIdPerson(state) {
        return state.id_person
    },
    getTelefonoExtra(state) {
        return state.telefono_extra
    },
    getTerminosYCondiciones(state) {
        return state.terminos_y_condiciones
    },
    getSelectedFrame(state) {
        return state.selected_frame
    }

}