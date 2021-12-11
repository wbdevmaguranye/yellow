export default function({ store, redirect }) {
  try {
    if (store.state.authUser === null || store.state.authUser.id === null) {
      return redirect("/login");
    }
  } catch {
    return redirect("/login");
  }
}
