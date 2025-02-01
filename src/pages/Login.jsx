import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Login = () => {

    const { loginUser } = useContext(AuthContext);
    const [error, setError] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    console.log(location);
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        loginUser(email, password)
            .then((result) => {
                const user = result.user;


                navigate(location?.state ? location.state : '/');


                console.log('succesfully logged in');
                console.log(result.user);
            })
            .catch((err ) => {
                setError({ ...error ,login: err.code})
            }
            );
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleLogin} className="fieldset  p-10 w-md mx-w-lg bg-base-200 border border-base-300  rounded-none">
                <h3 className="text-2xl my-7 font-semibold text-center">Login your Account</h3>
                <hr className=" text-base-300  mb-2" />

                <label for='email' className="fieldset-label font-bold">Email</label>
                <input id="email" type="email" className="input w-full rounded-none" placeholder="Email" />

                <label for="password" className="fieldset-label font-bold">Password</label>
                <input id="password" type="password" className="input w-full rounded-none" placeholder="Password" />

                {
                    error.login && (
                        <label className="label text-sm text-red-600">
                            {error.login}
                        </label>
                    )
                }

                <div><Link className="link link-hover">Forgot password?</Link></div>

                <button type="submit" className="btn btn-neutral my-4 rounded-none">Login</button>
                <div>
                    <p className="text-center">
                        Don't have an account?
                        <Link to={'/auth/register'} className="link link-hover text-red-400"> Register</Link>

                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;