import { useState, useEffect } from 'react';
import { UserType } from '../definations/frontendTypes';

function useUserStorage(): [UserType, (user: UserType) => void] {
    const [storedUser, setStoredUser] = useState<UserType>({} as UserType);
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user)
            setStoredUser(JSON.parse(user)) 
    }, [])


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
