import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {

    const { createNewUser, setUser,updateUserProfile } = useContext(AuthContext);
    const [ error, setError ] = useState({});
    const navigate = useNavigate();


    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        if (name.length < 5) {
            setError({ ...error, name: "must be more than 5 character long" });
            return;
        }

        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        console.log({ name, photo, email, password });

        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                // console.log(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate('/');
                    })
                    .catch(err => console.error(err));
            })
            .catch((error)=>console.error(error));
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleRegister} className="fieldset  p-10 w-md mx-w-lg bg-base-200 border border-base-300  rounded-none">
                <h3 className="text-2xl my-7 font-semibold text-center">Register your Account</h3>
                <hr className=" text-base-300 mb-2" />

                <label for='name' className="fieldset-label font-bold">Name</label>
                <input id="name" name="name" type="text" className="input w-full rounded-none" placeholder="Name" />
                {
                    error.name && (
                        <label className="label text-xs text-rose-500">
                            {error.name} 
                        </label>
                    )
                }
                <label for="photo" className="fieldset-label font-bold">Photo Url</label>
                <input id="photo" name="photo" type="text" className="input w-full rounded-none" placeholder="Photo Url" />
                
                <label for='email' className="fieldset-label font-bold">Email</label>
                <input id="email" name="email" type="email" className="input w-full rounded-none" placeholder="Email" />

                <label for="password" className="fieldset-label font-bold">Password</label>
                <input id="password" name="password" type="password" className="input w-full rounded-none" placeholder="Password" />
                

                <button type="submit" className="btn btn-neutral my-4 rounded-none">Register</button>
                <div>
                <p className="text-center">
                        Already have an account?
                        <Link to={'/auth/login'} className="link link-hover text-red-400"> Login</Link>
                    
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;