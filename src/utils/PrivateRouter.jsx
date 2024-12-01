import { useNavigate } from 'react-router-dom';
import {useEffect} from "react"
import { toast } from 'sonner';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
    const   navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('UserToken');
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You can not access this page unless you are logged in')
      navigate('/login'); 
      return;
    }
    async function verify(){
        try{
            let token = localStorage.getItem('UserToken');
            let result = await axios.get('http://localhost:3000/auth',{
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            // console.log(result.data)
            localStorage.setItem('idUser', result.data.id);
            localStorage.setItem('userName', result.data.name);
            localStorage.setItem('useremail',result.data.email );
            if(result.data == "not valid"){
                toast.error('You can not access this page unless you are logged in')
                navigate('/login'); 
                return;
            }
        }catch(e){
            // console.log(e)
            return "ops smth went wrooong "
        }
    }
    verify()
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null; 
};


export default ProtectedRoute;
