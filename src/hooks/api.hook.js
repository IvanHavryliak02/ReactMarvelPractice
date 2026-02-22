import { useState, useCallback } from "react";

export default function useAPI(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getDataFromAPI = useCallback(async (url) => {
        
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Error during request sending to API: ${response.status}`);
        }

        const APIData = await response.json();

        return APIData
    }, [])

    const onErrorOccurred = () => {
        setLoading(false);
        setError(true);
    }

    const reset = () => {
        setLoading(false);
        setError(false);
    }

    return {loading, error, setLoading, onErrorOccurred, reset, getDataFromAPI}
}