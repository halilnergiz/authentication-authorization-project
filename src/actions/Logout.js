import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    axios.get('http://localhost:5555/api/auth/logout')
        .then(() => {
            localStorage.setItem('login', false)
            localStorage.setItem('clientToken', undefined)
            navigate('/')
        })
        .catch(err => {
            console.log(err);
        })

}

export default Logout;