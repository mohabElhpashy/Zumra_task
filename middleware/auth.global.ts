export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = localStorage.getItem("token");

  if (isLoggedIn) {
    // User is logged in, no need to redirect if they are on the login page
    if (to.path === "/login") {
      return;
    }
    // User is logged in and not on the login page, proceed to the requested route
    return;
  }

  // User is not logged in, redirect to the login page if they are not already on it
  if (to.path !== "/login") {
    return navigateTo("/login");
  }
});
