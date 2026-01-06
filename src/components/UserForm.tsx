import { useState } from "react";
import type { User } from "../types/User";

interface UserFormsProps {
    onAddUser : (user : Omit<User,"id">) => void;
    onCancel : () => void;

}

export default function UserForm ({onAddUser,onCancel}: UserFormsProps) {
const [formData, setFormData] = useState<Omit<User, "id">>({
        email: "",
        name: "",
        phone: "",
        username: "",
        companyName: "",
        address: "",
      });

const [errors, setErrors] = useState<Record<string, string>>({});


const validateForm = () => {
    const newErrors : Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    //key could be name/address/... from User interface : value
    setFormData((prev:Omit<User, "id">) => ({
        ...prev, [name]:value
    }))

    //this clears the error when user start typing
    if(errors[name]) {
        setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
    }
}

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()){
        onAddUser(formData);
        setFormData({
            email: "",
            name: "",
            phone: "", 
            username: "",
            companyName: "",
            address: "",
        })
    }
}

return (
  <div className="add-user-form">
    <h2>Add New User</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Tech Corp"
            className={errors.companyName ? "input-error" : ""}
          />
          {errors.companyName && (
            <span className="error-message">{errors.companyName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, City, State"
            className={errors.address ? "input-error" : ""}
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Add User
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
);



}