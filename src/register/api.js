
import axios from 'axios';
 // Export as default

const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/save', userData);
      if (response.status === 200) {
        console.log('User registered successfully');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  export default registerUser;