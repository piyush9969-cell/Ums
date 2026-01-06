import { useState, useEffect } from "react";
import "./App.css";
import type { User } from "../src/types/User";
import UserForm from "./components/UserForm";
import UserListView from "./components/UserListView";



const App = () => {
  const savedUsers = localStorage.getItem("users");
  const initialUsers = savedUsers ? JSON.parse(savedUsers) : [];
  
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [showForm, setShowForm] = useState<boolean>(false);

  //add to localStorage everytime, users changess.
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser: Omit<User,"id">) => {
    const updatedUser : User = {
      id: crypto.randomUUID(),
      ...newUser
    }

    setUsers([...users,updatedUser]);
    setShowForm(false);
  };

  const deleteUser = (id:string) => {
    const filteredUsers = users.filter((user)=> user.id !==id)
    setUsers (filteredUsers);
  }
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
        {showForm && (
          <div className="form-section">
            <UserForm
              onAddUser={addUser}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <UserListView users={users} onDeleteUser={deleteUser} />
      </main>
    </div>
  );

 


}

export default App;