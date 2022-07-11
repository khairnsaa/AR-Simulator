import logoAplikasi from '../../asset/logoAplikasi.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const AdminPanelLogin = () => {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`http://localhost:8010/api/user/login`,{ 
            email: data.get('email'), password: data.get('password')
        }).then(res => {
            const username = res.data.username
            const token = res.data.accessToken
            console.log(username, token)
            Cookies.set('token', token, { expires: 1 })
            Cookies.set('username', username, { expires: 1 })
            navigate('/')
        }).catch(err => alert(err.message))
    };
    
    return ( 
        <div className="admin-login-container">
            <div className="logo">
                <img src={logoAplikasi} alt="logo aplikasi filter frekuensi AR simulator" />
            </div>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <input type="text" className='input-text nama' placeholder='Email' name="email" />
                    <input type="password" className='input-text password' placeholder='Password' name="password" />
                    <button className='login-btn btn-edited'>Login</button>
                </form>
            </div>
        </div>
    );
}
 
export default AdminPanelLogin;