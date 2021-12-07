import { Cancel, Room } from "@material-ui/icons";
import { useRef, useState } from "react";
import "./login.css";
import axios from "axios";


export default function Login({setShowLogin, myStorage, setCurrentUsername}) {
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const res = await axios.post("/users/login", user);
            setCurrentUsername(res.data.username);
            myStorage.setItem('user', res.data.username);
            setShowLogin(false);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="loginContainer">
            <div className="logo">
                <Room className="logoIcon" />
                <span>LamaPin</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input autoFocus placeholder="username" ref={nameRef} />
                <input type="password" min="6" placeholder="password" ref={passwordRef} />
                <button className="loginBtn" type="submit">Login</button>
                {error && 
                <span className="failure">Oops! Something went wrong.</span> }
            </form>
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)}/>
        </div>
    );
}


