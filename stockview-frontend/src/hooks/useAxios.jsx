import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAxios(url, options = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios(url, {
                    ...options,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        ...options.headers
                    }
                });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, error, loading };
}