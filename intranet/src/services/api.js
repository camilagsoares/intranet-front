import axios from 'axios';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const tokenInStorage = localStorage.getItem('token');

const axiosApi = axios.create({
    baseURL: `http://10.1.0.187:4001/api`,
    headers: {
        Authorization: `Bearer ${tokenInStorage}`,
        'Content-Type': 'application/json',
    },
})


const configHeaders = () => ({
    Authorization: `Bearer ${tokenInStorage}`,
    'Content-Type': 'application/json',
});


const useApiLogin = () => {
    const [loginData, setLoginData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (payload) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post(`http://10.1.0.187:4001/api/auth/login`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setLoginData(response.data);
            toast('Login efetuado com sucesso!', {
                type: 'success',
            });
        } catch (error) {
            toast(error.response.message, {
                type: 'error',
            });
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
}

const useApiRequestGet = (path, payload) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://10.1.0.187:4001/api${path}`, {
          data: payload,
          headers: configHeaders(),
        });
        setData(response.data.content);
      } catch (error) {
        toast(error.response.data.message, {
          type: 'error',
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { data, error, loading, refetchData: fetchData };
  };

  export { useApiLogin, useApiRequestGet, axiosApi };
