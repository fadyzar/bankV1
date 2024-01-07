// import axios from 'axios';
import User from '../models/User';

// // Function to deposit cash for a user
// export const depositCash = async (userId, depositAmount) => {
//   try {
//     // Fetch the user's data
//     const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
//     const userData = response.data;

//     // Update user's cash and creditAmount based on the deposit
//     userData.cash -= depositAmount;
//     userData.creditAmount += depositAmount;

//     // Send a PUT request to update the user's information
//     await axios.put(`http://localhost:3000/api/v1/users/${userId}`, userData);

//     // Return the updated user data
//     return userData;
//   } catch (error) {
//     throw new Error(`Error depositing cash: ${error.message}`);
//   }
// };






const withdraw = async (userId, amount) => {
  try {
    // Fetch user from the database using the userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has enough credit to withdraw
    if (user.creditAmount >= amount) {
      // Update user's creditAmount and cash accordingly
      user.creditAmount -= amount;
      user.cash += amount;

      // Save the updated user data
      await user.save();

      return { message: 'Withdraw successful', user };
    } else {
      throw new Error('Insufficient credit to withdraw');
    }
  } catch (error) {
    console.error('Error withdrawing from credit:', error);
    throw new Error('Withdrawal failed');
  }
};

export default withdraw;

