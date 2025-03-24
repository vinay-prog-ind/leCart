import React, { useState } from 'react'
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(user);
        console.log(res);
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/register');
    }
  return (
      <div className="login-div">
          <div className="login-div-inner">
              <h1>Welcome back</h1>
              <form className="login-form" onSubmit={handleSubmit}>
                  <Input
                        label="Email address"
                      name="email"
                      onChange={handleOnChange}
                      type={"email"}
                      value={user.email}
                      
                  />
                  <Input
                        label = "Password"
                      name="password"
                      onChange={handleOnChange}
                      type={"password"}
                      value={user.password}
                  />
                  <Button
                      text={"Login"}
                      onClick={handleSubmit}
                      type={"login"}
                  />
              </form>
              <div className="form-dotted-div">
                  <p> OR </p>
              </div>
              <p>
                  <span id='text-dim'>Don't have an account?</span> <span onClick={handleNavigate} id='text-highlight'> Register. </span>
              </p>
          </div>
      </div>
  );
}
