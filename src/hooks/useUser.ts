import { useEffect, useState } from "react";

import type { User } from "../types/User";


export function useUser() {
    const[users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let mounted = true

        const fetchUsers = async() => {
            try{
                setLoading(true)
                setError(null)

                const res = await fetch("https://jsonplaceholder.typicode.com/users")
            
                if(!res.ok) {
                    throw new Error ("Failed to fetch users")
                }

                const data = await res.json()
                //map the data to match User interface
                      const mapped = data.map((u: { id: number; name: string; email: string; username: string; phone: string; company?: { name: string }; address?: { street: string; city: string } }) => ({
                        id: String(u.id),
                        name: u.name,
                        email: u.email,
                        username: u.username,
                        phone: u.phone,
                        companyName: u.company?.name ?? "",
                        address: `${u.address?.street}, ${u.address?.city}`,
                    }));
                
                if (mounted) setUsers (mapped);
            }
            catch(err){
                if (mounted) setError ((err as Error).message);
            }
            finally{
                if (mounted) setLoading (false);
            }
        }

        fetchUsers();

        return () => {
            mounted = false;
        };
    },[])

    return {users,setUsers,loading,error}
}