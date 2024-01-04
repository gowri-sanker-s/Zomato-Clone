import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../Styles/userUpdate.css'
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
const UpdateUser = (props) => {
  const [loggedUserFullName, setLoggedUserFullName] = useState('')
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  useEffect(()=> {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedUser = jwtDecode(token);
      setLoggedUserFullName(decodedUser.name)
      
    } 

  },[])

  const id = props.match.params.id;
    const history = useHistory();
  console.log("passed Id : ",id);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8900/updateUser/${id}`, userData);
      alert('User details updated successfully');
      history.push('/');
      window.location.reload();
    } catch (error) {
      alert('Sorry, an error has occurred');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>UpdateUser</h2>
        <p className='User-UpdateName'>User : {loggedUserFullName}</p>

      <form onSubmit={handleOnSubmit} className='user-Form'>

        <input
          type="email"
          name="email"
          placeholder="Enter Updated Email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Updated Password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <button type="submit" className='submitChange'>Update</button>
        <p className='note'>Note: Please Login again to reflect changes</p>
      </form>
    </div>
  );
};

export default UpdateUser;
