import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import type { User } from "../src/types/User";
import UserForm from "./components/UserForm";
import UserListView from "./components/UserListView";
import { useUser } from "./hooks/useUser";



const App = () => {
  // const savedUsers = localStorage.getItem("users");
  // const initialUsers = savedUsers ? JSON.parse(savedUsers) : [];
  
  const {users, setUsers,loading,error} =  useUser();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  //const [users, setUsers] = useState<User[]>(initialUsers);
  // //add to localStorage everytime, users changess.
  // useEffect(() => {
  //   localStorage.setItem("users", JSON.stringify(users));
  // }, [users]);


  const addUser = useCallback((newUser: Omit<User, "id">) => {
    const updatedUser: User = {
      id: crypto.randomUUID(),
      ...newUser,
    };

    setUsers((prev) => [...prev,updatedUser])
    setShowForm(false);
  }, [setUsers]);

  const onDeleteUser = useCallback((id:string)=> {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  },[setUsers]);

  const onSelectUser = useCallback((user:User) => {
    console.log("Selected user:", user);
  },[])


  //heavy calc, only recompute when users or query changes
  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter((user) => 
      user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
    )
  },[users,query])
  
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>User Management</h1>
          <p>Manage your users efficiently</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add User"}
        </button>
      </header>

      <main className="app-main">
        <input
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <p>Loading users...</p>}
        {error && <p className="error">{error}</p>}

        {showForm && (
          <div className="form-section">
            <UserForm onAddUser={addUser} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {!loading && !error && (
          <UserListView users={filteredUsers} onSelectUser = {onSelectUser} onDeleteUser={onDeleteUser} />
        )}
      </main>
    </div>
  );

 


}

export default App;