import { clerkMiddleware } from "@clerk/nuxt/server"

export default clerkMiddleware((event) => {
  const { userId } = event.context.auth
  const needAuth = event.path.startsWith("/dashboard")
  
  if (!userId && needAuth) {
    // redirect to home
    return sendRedirect(event, "/")
  }
})
