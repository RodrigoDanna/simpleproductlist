import {useState, useEffect} from 'react';

export const useProducts = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callProducts, setCallProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const productsRequest = (data, method) => {
    if(method === "POST"){
      setConfig({
        method,
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
      })

      setMethod(method);
    }
  }

  //get
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      }catch(error){
        console.error(error.message);
        setError("An error has occured. Try again later.");
      }
      setLoading(false);
    }
    fetchData();
  }, [url, callProducts]);

  //set
  useEffect(() => {
    const httpRequest = async () => {
      if(method === "POST"){
        setLoading(true);
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();

        setCallProducts(json);
        setMethod(null);
      }
    }

    httpRequest();
  }, [config, method, url]);

  return { data, productsRequest, loading, error };
};