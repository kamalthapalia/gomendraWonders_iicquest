import { useState } from 'react';
import { UserType } from '../definations/frontendTypes';

function useUserStorage() {
    const [storedUser, setStoredUser] = useState<UserType>(() => {
        try {
            const item = localStorage.getItem("user");
            return item ? JSON.parse(item) : {};
        } catch (error) {
            console.log(error);
            return {};
        }
    });

    const setValue = (user: UserType) => {
        try {
            const toStoreUser = JSON.stringify(user);
            setStoredUser(user);
            localStorage.setItem("user", JSON.stringify(toStoreUser));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedUser, setValue];
}

export default useUserStorage;
