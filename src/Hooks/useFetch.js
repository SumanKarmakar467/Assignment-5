import {useState, useEffect} from "react"

const useFetch = (url) => {
    // stores the data 
    const [data, setData] = useState([]);
    // store theloading data
    const [loading, setLoading] = useState(true);
    // store the error data
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
        
        .then((response) => {
            if(!response.ok){
                throw new Error("Error: Failed to Fetch");
            }
            return response.json();
        })
        .then((result) => {
            setData(result);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    },[url]);

    // return this variable stores data's
    return {data, loading, error};
}

export default useFetch;