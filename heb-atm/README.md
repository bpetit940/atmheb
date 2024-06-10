# ATM Simulation Application

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
## Setup
`npm install`
`npm start`

## Overview

This is a simple ATM simulation application built with React and Material-UI. Users can log in with their PIN, view their account balance, withdraw funds, and deposit funds. The user data is stored in a JSON file. Additionally, users can create a new account.

## Features

- **Login:** Users can log in using their PIN.
- **Account Balance:** Users can view their current account balance.
- **Withdraw:** Users can withdraw funds, adhering to their daily withdrawal limit.
- **Deposit:** Users can deposit funds into their account.
- **User Creation:** Users can create a new account with a PIN, initial balance, and daily withdrawal limit.
- **Thank You Screen:** A thank you message is displayed after a successful withdrawal or deposit.

## User Data

User data is stored in a JSON file (`src/data/users.json`). The JSON file contains the following information for each user:

- `user_id`: Unique identifier for the user.
- `pin`: Personal Identification Number for the user.
- `account_balance`: Current balance of the user's account.
- `withdrawal_limit`: Daily withdrawal limit for the user.
- `withdrawals`: An array tracking withdrawals by date and amount.

Example of `users.json`:

```json
[
    {
        "user_id": 1,
        "pin": 1234,
        "account_balance": 1000.0,
        "withdrawal_limit": 500.0,
        "withdrawals": []
    },
    {
        "user_id": 2,
        "pin": 5678,
        "account_balance": 2000.0,
        "withdrawal_limit": 1000.0,
        "withdrawals": []
    },
    {
        "user_id": 3,
        "pin": 4321,
        "account_balance": 1500.0,
        "withdrawal_limit": 300.0,
        "withdrawals": []
    }
]
