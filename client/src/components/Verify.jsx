import { useParams } from 'react-router-dom';
import userAuth from '../lib/userAuth';
import { useState, useEffect } from 'react';

export default function Verify() {
    const { email, code } = useParams();
    console.log(email, code);

    const [isLoading, setIsLoading] = useState(true);

    const Verify = async () => {
        const response = await userAuth.login({ email, code }, "email");
        console.log(response);
        setIsLoading(false);
    }

    useEffect(() => {
        Verify();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {isLoading ? <div className="spinner"></div> : null}
        </div>
    )
}
