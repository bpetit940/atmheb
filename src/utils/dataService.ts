import users from '../data/users.json';

interface User {
    user_id: number;
    pin: number;
    account_balance: number;
    withdrawal_limit: number;
    withdrawals?: { date: string; amount: number }[];
}

let usersData: User[] = users as User[];

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const getUserIndex = (userId: number) => {
    return usersData.findIndex(user => user.user_id === userId);
};

export const getUser = async (pin: number): Promise<User> => {
    return new Promise((resolve, reject) => {
        const user = usersData.find(user => user.pin === pin);
        if (user) {
            resolve(user);
        } else {
            reject(new Error('User not found'));
        }
    });
};

export const withdraw = async (userId: number, pin: number, amount: number): Promise<{ message: string; new_balance: number }> => {
    return new Promise((resolve, reject) => {
        const userIndex = getUserIndex(userId);
        if (userIndex === -1) {
            reject(new Error('Invalid user ID or PIN'));
            return;
        }

        const user = usersData[userIndex];
        if (user.pin !== pin) {
            reject(new Error('Invalid user ID or PIN'));
            return;
        }

        const today = getTodayDate();
        user.withdrawals = user.withdrawals || [];
        const todayWithdrawals = user.withdrawals.filter(w => w.date === today);
        const totalWithdrawnToday = todayWithdrawals.reduce((sum, w) => sum + w.amount, 0);

        if (totalWithdrawnToday + amount > user.withdrawal_limit) {
            reject(new Error('Amount exceeds daily withdrawal limit'));
            return;
        }

        if (amount > user.account_balance) {
            reject(new Error('Insufficient funds'));
            return;
        }

        user.account_balance -= amount;
        user.withdrawals.push({ date: today, amount: amount });
        usersData[userIndex] = user;

        resolve({ message: 'Withdrawal successful', new_balance: user.account_balance });
    });
};

export const addUser = async (newUser: User): Promise<User> => {
    return new Promise((resolve, reject) => {
        const existingUser = usersData.find(user => user.pin === newUser.pin);
        if (existingUser) {
            reject(new Error('User already exists'));
        } else {
            // create new user id for new user
            const userIds = usersData.map(user => user.user_id);
            const newUserId = Math.max(...userIds) + 1;
            newUser.user_id = newUserId;

            usersData.push(newUser);
            resolve(newUser);
        }
    });
};

export const deposit = async (userId: number, pin: number, amount: number): Promise<{ message: string; new_balance: number }> => {
    return new Promise((resolve, reject) => {
        const userIndex = getUserIndex(userId);
        if (userIndex === -1) {
            reject(new Error('Invalid user ID or PIN'));
            return;
        }

        const user = usersData[userIndex];
        if (user.pin !== pin) {
            reject(new Error('Invalid user ID or PIN'));
            return;
        }

        user.account_balance += amount;
        usersData[userIndex] = user;

        resolve({ message: 'Deposit successful', new_balance: user.account_balance });
    });
};
