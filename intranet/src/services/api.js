import axios from 'axios';
import { useState, useEffect } from 'react'

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

