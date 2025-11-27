import { useEffect, useState } from "react";
import { fetchUsers } from "../api/api";

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((res) => setUsers(res.data));
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(u => (
                    <li key={u.id}>{u.name} – {u.role}</li>
                ))}
            </ul>
        </div>
    );
}
