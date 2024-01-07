import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./UserData.css";
import { useNavigate } from 'react-router-dom';
import { deleteUser, createUser } from '../../../controllers/userController';

const UserData = () => {
    const [data, setData] = useState({});
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        cash: 0,
        creditAmount: 0,
        creditLimit: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/users')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDeleteUser = async (userId) => {
        console.log(`user ID = ${userId}`)
        try {
            await deleteUser(userId);

            // Update state by filtering out the deleted user
            setData(prevData => {
                const newData = { ...prevData };
                delete newData[userId];
                return newData;
            });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await createUser(newUser);

            // Update state with the new user
            setData(prevData => ({
                ...prevData,
                [response.data._id]: response.data,
            }));

            // Reset the newUser state
            setNewUser({
                name: '',
                email: '',
                cash: 0,
                creditAmount: 0,
                creditLimit: 0,
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className='admin-page page'>
            <h1>User data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Cash</th>
                        <th>CreditAmount</th>
                        <th>CreditLimit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(key => {
                        const user = data[key];
                        if (user && Object.keys(user).length > 0) {
                            return (
                                <tr key={key}>
                                    <td>{user.name} </td>
                                    <td>{user.email}</td>
                                    <td>{user.cash}</td>
                                    <td>{user.creditAmount}</td>
                                    <td>{user.creditLimit}</td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user._id)}>X</button>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
            <br />
            <div>
                <h2>Add User</h2>
                <form>
                    <label>Name:</label>
                    <input type="text" name="name" value={newUser.name} onChange={handleChange} />
                    {/* ... Other input fields ... */}
                    <button type="button" onClick={handleAddUser}>Add User</button>
                </form>
            </div>
        </div>
    );
};

export default UserData;
