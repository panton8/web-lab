import React from 'react'
import { NavLink } from 'react-router-dom';

function AdminMenu() {
  return (
    <>
    <div className='text-center'>
        <div className="list-group">
            <h4>Admin Panel</h4>
            <NavLink to="/dashboard/admin/add-genre" className="list-group-item list-group-item-action">Add Genre</NavLink>
            <NavLink to="/dashboard/admin/add-film" className="list-group-item list-group-item-action">Add Film</NavLink>
            <NavLink to="/dashboard/admin/films" className="list-group-item list-group-item-action">Films</NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
        </div>
    </div>
    </>
  );
};

export default AdminMenu