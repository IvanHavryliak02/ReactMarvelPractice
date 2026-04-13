import { useState, useCallback } from "react";

export default function useAPI(){

    const [process, setProcess] = useState('idle')

    const getDataFromAPI = useCallback(async (url) => {
        
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Error during request sending to API: ${response.status}`);
        }

        const APIData = await response.json();

        return APIData
    }, [])

    return {process, setProcess, getDataFromAPI}
}