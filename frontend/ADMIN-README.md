# Admin Login and Dashboard Implementation

This README describes how the admin login and dashboard functionality is implemented.

## Components Created

1. **Admin Login Page**

   - Located at: `pages/Login.vue`
   - Designed specifically for administrators to log in
   - Validates admin role after successful authentication
   - Redirects to the admin dashboard upon successful login

2. **Admin Dashboard**

   - Located at: `pages/admin/dashboard.vue`
   - Protected by middleware that ensures only admins can access
   - Displays stats, recent activities, and quick actions
   - Uses a dedicated admin layout

3. **Admin Layout**

   - Located at: `layouts/admin/default.vue`
   - Includes a sidebar with navigation menu
   - Shows user info and logout button
   - Fully responsive design with collapsible sidebar

4. **Admin Middleware**
   - Located at: `middleware/admin.js`
   - Checks if the user is authenticated
   - Verifies the user has the ADMIN role
   - Redirects unauthorized users to login

## Authentication Flow

1. Admin navigates to `/login`
2. Admin enters credentials
3. System validates credentials against the backend
4. System checks if the user has the ADMIN role
5. If valid admin, redirects to `/admin/dashboard`
6. If not an admin, shows error message and logs out

## Security Features

- Role-based access control (RBAC) for admin routes
- JWT token authentication using access and refresh tokens
- Automatic redirection of unauthorized users
- Session persistence using localStorage

## Backend Integration

The frontend connects to the backend authentication API:

- Login endpoint: `POST /auth/login`
- Token refresh endpoint: `POST /auth/refresh`

## Future Enhancements

- Implement more admin pages for complete content management
- Add user management functionality
- Implement form validation for better user experience
- Add session timeout and automatic token refresh
