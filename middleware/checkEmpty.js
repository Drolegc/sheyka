export default function({ store, redirect, $auth, route }) {
    // If the user is not authenticated

    console.log(route)
    if (!$auth.loggedIn) {
        return redirect('/')
    }

    if ((store.getters['new/photos']).length < 3 && $auth.loggedIn && (route.name == 'new-frames' || route.name == 'confirmation')) {
        return redirect('/new')
    }

}