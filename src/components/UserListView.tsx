import type { User } from "../types/User";  

interface UserListViewProps {
    users: User[];
    onDeleteUser: (id: string) => void;
}

export default function UserListView({users, onDeleteUser}: UserListViewProps) {
    if(users.length === 0){
        return (
          <div className="empty-state">
            <h3>No users yet</h3>
            <p>Add your first user to get started</p>
          </div>
        );
    }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="cell-name">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.companyName}</td>
              <td className="cell-address">{user.address}</td>
              <td className="cell-action">
                <button
                  className="btn-delete"
                  onClick={() => onDeleteUser(user.id)}
                  title="Delete user"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}