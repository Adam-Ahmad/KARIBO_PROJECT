# Karibu Groceries LTD - Produce Management System

## Project Overview

This is a full-stack web application built for Karibu Groceries LTD (KGL), a wholesale cereals distributor in Uganda with two branches (Maganjo and Matugga).
The system replaces manual record-keeping in ruled books with a secure, role-based digital solution for managing procurement, sales, credit sales, and inventory.

## Features

- Role-Based Access Control:
  - Director: Views only aggregated reports and totals across both branches.
  - Manager: Records procurement, sets selling prices, views and records sales, manages inventory.
  - Sales Agent: Records cash sales and credit sales at their branch only.

- Core Functionalities:
  - Procurement recording with dealer details and stock addition.
  - Cash sales with automatic stock deduction and price pre-population.
  - Credit/deferred sales with buyer verification (National ID, due date).
  - Real-time inventory tracking per branch.
  - Low stock alerts (below 100kg).
  - Input validations as per business requirements (min lengths, formats, numeric constraints).

- Business Rules Enforced:
  - Only available stock can be sold.
  - Stock tonnage reduced on every sale/credit dispatch.
  - Selling prices set only by managers.
  - Sales agents cannot record procurement.
  - Director sees only summaries, no transaction details.

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js + Express.js
- Database: MongoDB

## Project Structure

kgl-app/
├── backend/
│ ├── models/ (Mongoose schemas)
│ ├── routes/ (Express routes)
│ ├── controllers/ (Business logic)
│ ├── middleware/ (Auth)
│ ├── config/ (DB connection)
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── css/ (styles.css)
│ ├── js/ (scripts.js, auth.js)
│ ├── index.html (login)
│ ├── dashboard.html
│ ├── procurement.html
│ ├── sales.html
│ ├── credit.html
│ ├── stocks.html
│ └── reports.html
└── README.md
