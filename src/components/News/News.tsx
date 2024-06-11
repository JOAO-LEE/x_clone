"use client"

import { useState, useEffect } from "react";

const BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";

function News() {
  const [news, setNews] = useState<any[]>();
  const [articleNumber, setArticleNumber] = useState<number>(3);

  useEffect(() =>  {

    const getNews = async () => {
      const response = await fetch(BASE_URL);
      console.log(response); 
      const results = await response.json();
      console.log(results);
      setNews(results);
    };

    getNews();
    
  }, []);

  return (
    <div>News</div>
  )
}

export default News