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
        axios.get('https://bankserver23.onrender.com/api/v1/users')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [data]);

    const handleDeleteUser = async (userId) => {
        console.log(`user ID = ${userId}`);
    
        // Check if userId is defined
        if (!userId) {
            console.error('Error: userId is undefined');
            return;
        }
    
        try {
            // Send a request to delete the user
            await deleteUser(userId);
    
            // const newData = data;
            // if (newData[userId]) {
            //     delete newData[userId];
            // }
            // setData("dgdgd");
            // Update state to trigger re-render
            setData(prevData => {
                const newData = { ...prevData };
                if (newData[userId]) {
                    delete newData[userId];
                }
                return newData;
            });
            // window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    
    
    const handleAddUser = async () => {
        try {
            // Check if newUser has the required properties
            if (!newUser.name || !newUser.email || newUser.cash === undefined || newUser.creditAmount === undefined || newUser.creditLimit === undefined) {
                console.error('Error: Missing required user information');
                alert('Missing required user information')
                return;
            }
    
            // Make a POST request to create a new user
            const response = await axios.post('https://bankserver23.onrender.com/api/v1/users', newUser);
    
            // Handle success, update UI, etc.
            console.log('User created successfully:', response.data);
    
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
    
    
    
const handleChangeName = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
};

const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
};

const handleChangeCash = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
};

const handleChangeCreditAmount = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
};

const handleChangeCreditLimit = (e) => {
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
    <input type="text" name="name" value={newUser.name} onChange={handleChangeName} />
    
    <label>Email:</label>
    <input type="email" name="email" value={newUser.email} placeholder='example@test.com' onChange={handleChangeEmail} required />
        <br />
    <label>Cash:</label>
    <input type="number" name="cash" min="1" max="10000000" value={newUser.cash} onChange={handleChangeCash} />

    <label>Credit Amount:</label>
    <input type="number" name="creditAmount" min="1" max="10000000" value={newUser.creditAmount} onChange={handleChangeCreditAmount} />

    <label>Credit Limit:</label>
    <input type="number" name="creditLimit" min="1" max="10000000" value={newUser.creditLimit} onChange={handleChangeCreditLimit} />

    <button type="button" onClick={handleAddUser}>Add User</button>
</form>

          
            </div>
        </div>
    );
};

export default UserData;
