# AccessFlow

AccessFlow is a web application designed for managing users, their statuses, roles, and permissions efficiently.It allows admins to assign roles and customize permissions while providing users a clear view of their responsibilities and access.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Suresh1061/AccessFlow.git
    cd AccessFlow
    ```

2. Install the dependencies:
    ```bash
    pnpm install
    ```

3. Start the development server:
    ```bash
    pnpm run dev
    ```

## Features

## 1. User Registration

### Registration Process
- New users can register by providing:
  - **Name**
  - **Email**
  - **Password**

### Behavior after Registration
- After successfully registering:
  - The user is marked as **active** in the system.
  - No specific **role** or **permissions** are assigned at this stage.
  - The admin is responsible for assigning roles and permissions later.

---

## 2. **User Login**

### Unified Login Page
- There is a **single login page** for both:
  - **Regular Users**
  - **Admins**

### Login Credentials
- Users (including admins) log in using:
  - **Email**
  - **Password**

### Middleware Role-Based Redirection
- A middleware determines the type of user based on stored information (whether it's "user" or "admin").
- Based on the role:
  - **Regular Users**: Redirected to their **dashboard** and **status page**.
  - **Admins**: Redirected to the **admin interface**.

## 3. **Session Management**
- use the `jose` package to manage user sessions.

## 4. **Regular User Features**

- **Dashboard Page**:
  - The dashboard provides information about the application specifically tailored for regular users.
  - It includes a **Status Button** located in the navbar, allowing users to view their current status and assigned permissions.

- **Status Page**:
  - Users can access this page to view detailed information, including:
    - **Personal Information**
    - **Current Status**
    - **Assigned Role**
    - **Granted Permissions**

---

## 5. **Admin Features**

- **Users Page**:
  - Displays a comprehensive list of all registered users.
  - Features include:
    - A **Search Bar** to quickly locate specific users.
    - A **Filter Bar** to sort users by criteria such as:
      - **Status**: Active, Inactive
      - **Role**: Manager, HR, Developer, Tester, Analyst

- **User Stats**:
  - Provides an overview of user statistics, including:
    - **Total Number of Users**
    - **Total Active Users**
    - **Total Inactive Users**
  - Includes a **Create User Button**:
    - Allows the admin to select existing registered users who have no assigned role or permissions.
    - Enables the admin to assign roles and permissions to the selected users.

- **User Management**:
  - The admin can perform the following actions directly from the user table:
    - **Edit User Details**: Modify the user’s status, role, and permissions.
    - **Delete User**: Remove a user from the system.

![My Image](https://res.cloudinary.com/dxcw44ypq/image/upload/v1732726689/Screenshot_2024-11-27_222225_wm0241.png)



### Description:
1. **Admin Folder (`(admin)/`)**:
   - Contains components for the admin dashboard and user management.
   - Includes files for displaying user lists and managing layouts.

2. **Auth Folder (`(auth)/`)**:
   - Manages authentication features such as login and registration.
   - Each subfolder contains the respective page and layout files.

3. **User Folder (`(user)/`)**:
   - Contains components for user-specific features like the dashboard and status pages.
   - Includes layout and page files for proper structure.

4. **API Folder (`api/`)**:
   - Houses backend API endpoints for authentication and user management.
   - Includes routes for actions such as login, register, updating users, and handling unassigned roles.


## Tech Tools

### Frontend:
- Next.js
- React
- Tailwind CSS
- Radix UI & Shadcn UI
- Lucide React
- React Hook Form

### Backend:
- MongoDB
- Mongoose
- bcryptjs

### Authentication:
- Jose

### State Management and Utilities:
- clsx
- zod

### Development Tools:
- Axios
- React Hot Toast