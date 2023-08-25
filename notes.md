# Invoise MERN CRUD Application

## Table of Contents

1. [Requirements](#requirements)
2. [Functional Explanation](#functional-explanation)
3. [Technical Explanation](#technical-explanation)
4. [Alternative 3rd Party Integrations](#alternative-3rd-party-integrations)
5. [Future Improvements](#with-more-time)

---

## Requirements

- CRUD application
- Filtering and sorting
- Multiple sort options
- External filters
- Store data in the database
- Technology stack
- 3rd party enrichment integration
- Tests on frontend and backend
- GitHub repo link
- Screen recording with a demo and explanation
- Code: Architecture, layers, functions, and endpoints

---

## Functional Explanation

![App Screenshot](https://raw.githubusercontent.com/AhmedAGadir/invoise-mern-crud-demo/main/screenshot.png?raw=true)

### Introduction

- **App Overview**
- **Invoise Logo and Headline**: Recently read a book on UX and aimed to improve the design.

### AG Grid SSRM Features

- Dynamic data loading
- Loading filter values
- Row updates and deletions
- Sorting and multiple sorts
- Filter + bound external filters

### Additional Grid Info

- Custom cell renderers for avatar, status, and actions columns
- Value getters and formatters for the amount column
- Custom menu tabs and theming

### Grid Control Panel

- Add, delete all, and reset users
- External filter
- Currency converter via ExchangeRate-API

### Optimizations

- Image compression for grid performance
- Placeholder grid for a better loading experience (same number of columns as grid, variable rowcount)

---

## Technical Explanation

### Stack

- **MERN Stack**: MongoDB, Express, React, and Node.js
- **Mongoose**: For object modeling and schema validation with MongoDB
- **AG Grid**: Advanced data grid capabilities (Server-Side Row Model)
- **ExchangeRate-API**: For currency conversion
- **TypeScript**: Strong typing and code maintainability
- **Bootstrap, SASS, CSS modules**: UI styling and theming
- **Jest & Enzyme**: Comprehensive frontend and backend testing
- **Axios**: For HTTP requests

### Architecture

#### Data Movement

##### FrontEnd:

###### Grid Component

- Initialises a `userService` service to communicate with the backend via `get`, `post`, `put`, and `delete` requests using Axios.
  - Abstracting RESTful logic effectively decouples UI rendering logic from the backend API communications.
- Also initialises a `serverSideDataSource` interface for fetching grid data and filter values directly.
- Data flows in 1 or 2 ways:

- **Method 1**: AG Grid invokes the following SS DataSource methods when scrolling or opening the filter menu:

  - `getRows`:
    - Invokes `userService.getUsers`.
    - Sends an Axios GET request with serialised query parameters (`startRow`, `endRow`, `filterModel`, `sortModel`).
    - Executes `params.success` callback.
  - `getFilterValues`:
    - Invokes `userService.getFilterValues` from within the column definition.
    - Sends an Axios GET request with `field` as query parameter.
    - Returns filter values asynchronously.

- **Method 2**: UI actions post/update/delete data, and then grid is refreshed on promise resolution to reflect changes.
  - **Posting Data**:
    - Click "Add New" button.
    - Opens a form component with empty user fields.
    - form submission invokes `userService.addUser` to update the backend database.
    - user data is passed in request body
    - Refreshes the grid upon promise resolution.
    - Note: New rows appear at the top by sorting data by the `createdAt` field by default.
  - **Updating Data**:
    - Click Edit button on row.
    - Opens the form component with populated user fields.
    - form submission invokes `userService.updateUser` to update the backend database.
    - user id is passed in query params and updated user data is passed in request body
    - Refreshes the grid upon promise resolution.
  - **Deleting Data**:
    - same as above but invokes `userService.deleteUser` to delete the record from the backend database.
  - Additional methods for `deleteAllUsers` and `resetUsers` are also included.

##### Backend:

- server.js specifies a user data route (`userRoute`) that imports methods from `userController`.

###### Methods in userController

- **getUsers**:
  - Receives query parameters (`startRow`, `endRow`, `filterModel`, `SortModel`).
  - Creates an aggregation pipeline using Mongoose Model for filtering.
  - Chains sorting logic.
    - If no sorting model is applied, sorts by `createdAt`.
  - Skips `startRow` and limits to the difference between `start` and `end` row.
  - Executes the query and returns data.
  - Note: (mongoose queries are NOT promises)
- **Other Methods**:
  - `setUser`: Validates and takes the user in the request body -> uses `Model.create`
  - `updateUser`: Accepts an `id` in query parameters and updated user in request body -> uses `findByIdAndUpdate`
  - `deleteUser`, `deleteUsers`, `resetUsers`, and `getValues` work similarly.

#### Custom Hook

- useCurrencyExchange

#### External Filters

<!-- Explanation -->

#### Column Definitions

<!-- Explanation -->

#### Testing

<!-- Explanation -->

---

## Alternative 3rd Party Integrations

- Download to PDF
- Data visualizations
- Payments
  - **Note**: Exchange rates seem the most relevant for this application

---

## With More Time

### General

- Handle error states
- More tests -> useCurrencyExchange custom hook etc.

### AG Grid Skills Showcase

- Persist grid state
- Date picker filter
- Pagination

### UX/Web Design Practice

- Responsive columns
- Date formatting rules
- Image edits in modal + saving on server etc
- Form UX
- Search bar

### Technologies I'm Interested In

- Next.js
- Styling with Tailwind
- 3D Animations

### Backend Practices

- Database Initialization
- More tests
- Authentication
- Deployment (must change network access https://cloud.mongodb.com/v2/64e13d0f7860ee7a5c60d63b#/security/network/accessList)
- alternative Database / Backend Language + framework
