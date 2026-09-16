import {useState, useEffect, useCallback} from "react"

const useFetch = (url) => {
    // stores the data
    const [data, setData] = useState([]);
    // store theloading data
    const [loading, setLoading] = useState(true);
    // store the error data
    const [error, setError] = useState(null);
    // bumping this re-runs the effect to retry a failed fetch
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let ignore = false;

        // eslint-disable-next-line react-hooks/set-state-in-effect -- must reset before the new fetch starts, not after it resolves
        setLoading(true);
        setError(null);

        fetch(url)
        .then((response) => {
            if(!response.ok){
                throw new Error("Error: Failed to Fetch");
            }
            return response.json();
        })
        .then((result) => {
            if (ignore) return;
            setData(result);
            setLoading(false);
        })
        .catch((err) => {
            if (ignore) return;
            setError(err.message);
            setLoading(false);
        });

        return () => {
            ignore = true;
        };
    },[url, retryCount]);

    // re-runs the fetch without waiting for url to change
    const refetch = useCallback(() => {
        setRetryCount((count) => count + 1);
    }, []);

    // return this variable stores data's
    return {data, loading, error, refetch};
}

export default useFetch;