
# SEQUENCE DIAGRAM GENERATION PROMPT FOR CHATGPT

## Project Overview
**Project Name:** Phillip Trustee Website
**Architecture:** Full-Stack Web Application
**Generated:** 2025-07-28T11:11:53.777Z

## Request to ChatGPT:
Please create sequence diagrams for the following flows in the Phillip Trustee Website project. The project is a full-stack web application with a NestJS backend and Nuxt.js frontend.

## System Architecture Summary:
- **Backend:** NestJS (Node.js) with PostgreSQL database and Prisma ORM
- **Frontend:** Nuxt.js 3 (Vue.js) with TailwindCSS and PrimeVue
- **Authentication:** JWT with refresh tokens
- **Authorization:** Role-based (ADMIN, EDITOR roles)

## Database Models:
- **User** (id, email, password, role, timestamps) → RefreshToken (1:M)
- **Event** (id, title, slug, description, published, timestamps) → EventImage (1:M)  
- **Partner** (id, name, logo, description, website, timestamps)
- **FAQ** (id, question, answer, category, order, isActive, timestamps)

## Key API Endpoints:
### AUTHENTICATION
- **POST /auth/login**: User authentication
- **POST /auth/refresh**: Token refresh
- **POST /auth/logout**: User logout (Auth Required)
- **POST /auth/register**: User registration

### ADMIN
- **GET /admin/dashboard**: Dashboard statistics (Auth Required) [ADMIN, EDITOR]

### EVENTS
- **GET /events**: Public events listing (published only)
- **GET /admin/events**: Admin events listing (all events) (Auth Required) [ADMIN, EDITOR]
- **POST /events**: Create new event (Auth Required) [ADMIN, EDITOR]
- **PATCH /events/:id**: Update event (Auth Required) [ADMIN, EDITOR]
- **DELETE /events/:id**: Delete event (Auth Required) [ADMIN]
- **PATCH /admin/events/:id/publish**: Publish event (Auth Required) [ADMIN, EDITOR]

### USERS
- **GET /users**: List users with pagination (Auth Required) [ADMIN, EDITOR]
- **POST /users**: Create new user (Auth Required) [ADMIN, EDITOR]
- **PATCH /users/:id**: Update user (Auth Required) [ADMIN, EDITOR]
- **DELETE /users/:id**: Delete user (Auth Required) [ADMIN, EDITOR]

### PARTNERS
- **GET /partners**: List all partners
- **POST /partners**: Create partner (Auth Required) [ADMIN, EDITOR]
- **PATCH /partners/:id**: Update partner (Auth Required) [ADMIN, EDITOR]
- **DELETE /partners/:id**: Delete partner (Auth Required) [ADMIN, EDITOR]

### FAQS
- **GET /faqs**: List all active FAQs
- **POST /faqs**: Create FAQ (Auth Required) [ADMIN, EDITOR]
- **PUT /faqs/:id**: Update FAQ (Auth Required) [ADMIN, EDITOR]
- **DELETE /faqs/:id**: Delete FAQ (Auth Required) [ADMIN, EDITOR]
- **PUT /faqs/reorder**: Reorder FAQs (Auth Required) [ADMIN, EDITOR]

### HEALTH
- **GET /health**: System health check

## REQUESTED SEQUENCE DIAGRAMS:

### 1. Admin Login Flow
**Actors:** User, Frontend (Nuxt.js), AuthController, AuthService, Database
**Flow:** User login → credential validation → JWT generation → token storage → dashboard redirect

### 2. Admin Dashboard Data Loading
**Actors:** Admin User, Frontend, AdminController, PrismaService, Database
**Flow:** Dashboard access → authentication check → statistics aggregation → data display

### 3. Event Creation Flow (Admin)
**Actors:** Admin User, Frontend, EventsController, EventsService, Database
**Flow:** Event form submission → validation → database storage → response handling

### 4. Public Event Viewing Flow
**Actors:** Public User, Frontend, EventsController, EventsService, Database
**Flow:** Public page access → published events retrieval → content display

### 5. Token Refresh Flow
**Actors:** Frontend, AuthController, AuthService, Database
**Flow:** Token expiry detection → refresh request → validation → new token generation

## Technical Details for Diagrams:

### Authentication Flow Components:
- **JwtAuthGuard**: Validates access tokens on protected routes
- **RolesGuard**: Checks user roles (ADMIN/EDITOR)
- **Admin Middleware**: Frontend route protection
- **AuthStore**: Pinia store managing auth state

### Request Flow Pattern:
1. Frontend request with Authorization header
2. Guards validate token and roles
3. Controller receives request
4. Service handles business logic
5. Database operations via Prisma
6. Response back through chain

### Error Handling:
- 401 for authentication failures
- 403 for authorization failures  
- Token auto-refresh on expiry
- Automatic logout on refresh failure

Please create detailed sequence diagrams showing:
- Message flows between components
- Authentication/authorization checks
- Database interactions
- Error handling paths
- State management updates
- UI feedback loops

Use PlantUML or Mermaid syntax for the diagrams, showing the complete interaction flow for each scenario.
