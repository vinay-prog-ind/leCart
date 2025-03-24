import React from 'react'
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const handleOnChange = (e) => {
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/login');
    }

  return (
      <div className="login-div">
          <div className="login-div-inner">
              <h1>Create Account</h1>
              <form className="login-form" onSubmit={handleSubmit}>
                  <Input
                        label={"Enter username"}
                      name="username"
                      onChange={handleOnChange}
                      type={"text"}
                  />
                  <Input
                        label={"Email address"}
                      name="email"
                      onChange={handleOnChange}
                      type={"email"}
                  />
                  <Input
                        label={"Password"}
                      name="password"
                      onChange={handleOnChange}
                      type={"password"}
                  />
                  <Input
                        label={"Confirm password"}
                      name="Confirm password"
                      onChange={handleOnChange}
                      type={"password"}
                  />
                  <Button
                      text={"Register"}
                      onClick={handleSubmit}
                      type={"login"}
                  />
              </form>
              <div className="form-dotted-div">
                  <p> OR </p>
              </div>
              <p>
                  <span id='text-dim'>Already have an account?</span> <span onClick={handleNavigate} id='text-highlight'> Login. </span>
              </p>
          </div>
      </div>
  );
}
