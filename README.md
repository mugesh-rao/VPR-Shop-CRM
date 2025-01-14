# VPR Agro Spares CRM and Stock Management System

**VPR Agro Spares CRM and Stock Management** is a platform designed to manage customer relationships, inventory, and stock for the **VPR Agro Spares** business. The system is built using **React** for the frontend and **Firebase** for real-time database management, user authentication, and notifications.

## Features

- **Customer Management**: Efficiently manage customer profiles, orders, and communication.
- **Stock Management**: Track the availability of agro spare parts and manage inventory levels in real-time.
- **Order Processing**: Track and manage orders from customers, including status updates and history.
- **Real-Time Updates**: Firebase enables real-time updates for stock availability and order status.
- **User Authentication**: Firebase Authentication to manage different user roles (Admin, Sales, Customer).
- **Notifications**: Real-time notifications to users regarding stock updates, order status, and customer communications.

## Technologies Used

- **Frontend**:
  - **React**: For building the user interface, allowing for an interactive and responsive experience.
  - **React Router**: For handling navigation between different pages (Dashboard, Orders, Stock, Customer Management).
  - **TailwindCSS**: For responsive and modern UI styling.
  - **Axios**: For handling API requests to the backend (if any).
  
- **Backend**:
  - **Firebase**: 
    - **Firestore**: For storing and managing customer details, orders, and stock data.
    - **Firebase Authentication**: For managing user roles and authentication.
    - **Firebase Functions**: For handling backend logic such as order processing or stock updates.

## Features and Workflow

1. **Admin Dashboard**:
   - View and manage all customer profiles and orders.
   - Update stock details and track inventory levels in real-time.
   - Assign and track orders for the sales team.

2. **Customer Management**:
   - Add, edit, and view customer profiles.
   - Track order history and order status updates.
   - Provide communication tools to interact with customers.

3. **Stock Management**:
   - Real-time updates on stock levels.
   - Alerts for low stock or out-of-stock items.
   - Manage stock data and update inventory.

4. **Order Management**:
   - Create, view, and track customer orders.
   - Assign orders to the sales team and track progress.
   - Provide notifications to customers about their order status.

5. **Real-Time Updates**:
   - Stock levels, order status, and customer updates are reflected instantly through Firebase Firestore.

6. **User Authentication**:
   - Different access levels for users (Admin, Sales, and Customer).
   - Admin can view all records, while sales staff can only view and manage orders related to their customers.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mugesh-rao/vpr-agro-spares-crm.git
