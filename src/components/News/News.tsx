"use client"

import { NewsResponse } from "@/model/News";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";

const BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";

function News() {
  const [news, setNews] = useState<NewsResponse>();
  const [articleNumber, setArticleNumber] = useState<number>(3);

  useEffect(() =>  {
    const getNews = async () => {
      const response = await fetch(BASE_URL);
      const results = await response.json();
      setNews(results);
    };

    getNews();
    
  }, []);

  return (
    <aside className="mx-auto mt-2">
      { 
        !news 
        ?
          (
            <CircleNotch
            className="animate-spin text-sky-500"  
            size={32} 
            weight="thin" />
          )
        :
          (
            <>
              <div className="text-gray-700 bg-gray-100 rounded-xl pt-2 space-y-3">
                <h1 className="font-bold text-xl px-4">What&#8217;s happening</h1>
                {
                  news.articles.slice(0, articleNumber).map((article, index) => (
                    <div 
                    key={index} >
                      <a 
                      href={article.url} target="_blank"
                      >
                        <div 
                        className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 rounded-xl transition duration-200"
                        >
                          <div className="space-y-0.5">
                            <h6 className="text-sm font-bold">{article.title}</h6>
                            <p className="text-xs font-medium text-gray-500">{article.source.name}</p>
                          </div>
                          {
                            article.urlToImage 
                            && 
                              (
                                <img 
                                src={article.urlToImage}
                                width={70} 
                                className="rounded-xl" 
                                onError={(e) => e.currentTarget.src = "/news-default.jpg"}
                                />
                              )
                          }
                        </div>
                      </a>
                      </div>
                  ))
                }
              </div>
              <button
              className="text-blue-300 pl-4 pb-3 hover:text-blue-400 transition duration-200" 
              onClick={() => setArticleNumber(prev => prev + 3)}>
                See more
              </button>
            </>
          )
      }
    </aside>
  )
}

export default News