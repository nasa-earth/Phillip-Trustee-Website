# Event Management System Documentation

## Overview

This documentation describes the dynamic event management system implemented for the Phillip Trustee website. The system allows administrators to create, edit, and delete events through an admin interface, with these events being displayed on the public website.

## Features Implemented

### 1. Admin Events Management (`EventsManagement.vue`)

The admin component provides a comprehensive interface for managing events with the following features:

#### Key Features:

- **Visual Event Grid**: Displays events in the same card layout as the public website
- **CRUD Operations**: Create, Read, Update, Delete events
- **Real-time Preview**: Preview button to view events as they appear on the website
- **Form Validation**: Client-side validation for required fields
- **Toast Notifications**: Success/error feedback for user actions
- **Responsive Design**: Works on desktop and mobile devices

#### Form Fields:

- **Title**: Event title (required)
- **Slug**: URL-friendly identifier (auto-generated from title, required)
- **Description**: Detailed event description (required)
- **Location**: Event venue/location (optional)
- **Thumbnail**: Main event image upload (optional, max 5MB)
- **Additional Images**: Multiple image uploads for event gallery (optional, max 5MB each)

#### User Actions:

- **Add Event**: Create new events with form validation
- **Edit Event**: Modify existing event details
- **Delete Event**: Remove events with confirmation dialog
- **Preview Event**: Open event details page in new tab

### 2. Public Events Display (`Event.vue`)

The public events page has been updated to dynamically fetch and display events:

#### Key Features:

- **Dynamic Loading**: Fetches events from backend API
- **Loading States**: Shows spinner while loading
- **Empty States**: Displays message when no events are available
- **Error Handling**: Graceful fallback when API fails
- **Responsive Grid**: Adapts to different screen sizes
- **Consistent UI**: Maintains the original design aesthetic

#### Event Card Information:

- Event thumbnail image
- Event title
- Event description
- Location (if available)
- "Read More" button linking to event details

### 3. Event Details Page (`EventDetails.vue`)

Updated to work with slug-based routing and dynamic data:

#### Key Features:

- **Slug-based Routing**: Uses `/EventDetails?slug=event-slug` format
- **Dynamic Content**: Fetches event data based on slug
- **Image Gallery**: Displays additional event images
- **Error Handling**: Shows "Event Not Found" for invalid slugs
- **SEO Friendly**: Dynamic meta tags based on event content

#### Content Display:

- Full-screen hero image
- Event title and location
- Complete event description
- Gallery of additional images
- Navigation back to events list

## Backend Requirements

### File Upload Endpoint

The system requires a backend file upload endpoint at `/api/upload` that:

- Accepts POST requests with multipart/form-data
- Returns a JSON response with the uploaded file URL
- Supports image file types (JPG, PNG, GIF, WebP)
- Implements file size validation (max 5MB)

**Note**: Currently, the frontend includes a fallback mechanism that uses data URLs for preview purposes when the upload endpoint is not available. For production use, implement the backend upload service as described in `UPLOAD_IMPLEMENTATION.md`.

### Existing API Endpoints

The system uses these existing backend endpoints:

- `GET /api/events` - Fetch all published events
- `GET /api/events/admin` - Fetch all events for admin
- `GET /api/events/by-slug/:slug` - Fetch event by slug
- `POST /api/events` - Create new event
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/images` - Add image to event
- `DELETE /api/events/:id/images/:imageId` - Remove image from event

## Technical Implementation

The system works with the current Prisma schema:

```prisma
model Event {
  id              String   @id @default(uuid())
  title           String
  slug            String   @unique
  description     String
  location        String?
  thumbnail       String?
  images          EventImage[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model EventImage {
  id       String  @id @default(uuid())
  url      String
  eventId  String
  event    Event   @relation(fields: [eventId], references: [id], onDelete: Cascade)
}
```

### API Integration

The system uses the existing `useEventService` composable:

- `getEvents()`: Fetch all published events
- `getEventBySlug(slug)`: Fetch single event by slug
- `getAdminEvents()`: Fetch all events for admin (includes unpublished)
- `createEvent(data)`: Create new event
- `updateEvent(id, data)`: Update existing event
- `deleteEvent(id)`: Delete event

### PrimeVue Components

Added support for additional PrimeVue components:

- Dialog (for event forms)
- InputText (for text inputs)
- Textarea (for descriptions)
- FileUpload (for image uploads)
- Toast (for notifications)
- ConfirmDialog (for delete confirmations)
- Checkbox (for boolean fields)
- Calendar (for date selection)

## File Structure

```
frontend/
├── components/admin/
│   └── EventsManagement.vue      # Admin event management interface
├── pages/
│   ├── Event.vue                 # Public events listing page
│   └── EventDetails.vue          # Individual event details page
├── composables/
│   └── useEventService.js        # API service for events
└── plugins/
    └── primevue.js               # PrimeVue configuration (updated)
```

## Usage Instructions

### For Administrators:

1. **Access Admin Panel**: Navigate to the admin dashboard
2. **Select Events**: Click on "Events" in the admin menu
3. **Create Event**:
   - Click "Add New Event" button
   - Fill in the required fields (Title, Slug, Description)
   - Add optional fields (Location)
   - Upload thumbnail image using the file picker
   - Upload additional images for the gallery
   - Click "Create" to save
4. **Edit Event**:
   - Click the edit (pencil) icon on any event card
   - Modify the fields as needed
   - Click "Update" to save changes
5. **Delete Event**:
   - Click the delete (trash) icon on any event card
   - Confirm deletion in the dialog
6. **Preview Event**:
   - Click the preview (eye) icon or "Preview" button
   - Event opens in new tab showing public view

### For Visitors:

1. **View Events**: Navigate to `/Event` page
2. **Event Details**: Click "Read More" on any event card
3. **Navigation**: Use browser back button or "Back to Events" link

## Routing

The system uses the following routes:

- `/Event` - Public events listing
- `/EventDetails?slug=event-slug` - Individual event details
- `/admin/dashboard` - Admin panel (events management available in sidebar)

## Image Handling

### File Upload System:

- **File Upload Components**: Uses PrimeVue FileUpload for image selection
- **File Validation**: Automatic validation for file type, size, and dimensions
- **Image Previews**: Real-time preview of selected images
- **Supported Formats**: JPG, PNG, GIF, WebP
- **File Size Limit**: 5MB per image
- **Upload Process**: Files are uploaded to server/cloud storage

### Thumbnail Images:

- Single main image per event
- Displayed on event cards and as hero image on details page
- Drag-and-drop file upload interface
- Automatic preview generation

### Additional Images:

- Multiple images per event stored as EventImage records
- Displayed in gallery format on event details page
- Advanced file upload with progress indicators
- Batch upload support

## Error Handling

### Frontend:

- Loading states during API calls
- Error messages for failed operations
- Fallback content for missing data
- Form validation before submission

### User Feedback:

- Toast notifications for success/error states
- Confirmation dialogs for destructive actions
- Loading indicators during operations

## SEO Considerations

- Dynamic page titles based on event content
- Meta descriptions for each event
- Slug-based URLs for better search engine indexing
- Proper heading structure (H1, H2, etc.)

## Future Enhancements

### Potential Improvements:

1. **Rich Text Editor**: Replace textarea with WYSIWYG editor for descriptions
2. **Image Upload**: Direct image upload instead of URL input
3. **Date/Time Fields**: Add back event scheduling if needed
4. **Categories**: Event categorization and filtering
5. **Publishing Status**: Draft/published workflow
6. **Search**: Event search functionality
7. **Pagination**: For large numbers of events
8. **Bulk Operations**: Select multiple events for batch actions

## Troubleshooting

### Common Issues:

1. **Events Not Loading**:

   - Check backend API is running
   - Verify database connection
   - Check browser console for errors

2. **Images Not Displaying**:

   - Verify image URLs are accessible
   - Check CORS settings for external images
   - Ensure image URLs use HTTPS

3. **Slug Conflicts**:

   - Ensure event slugs are unique
   - Use descriptive, URL-friendly slugs
   - System will show error for duplicate slugs

4. **Form Validation Errors**:
   - Check all required fields are filled
   - Verify slug format (lowercase, hyphens only)
   - Ensure image URLs are valid

## Support

For technical issues or questions about the event management system, refer to:

- Backend API documentation
- PrimeVue component documentation
- Vue.js/Nuxt.js documentation
- Project's main README.md file
