import React, { useCallback, useEffect, useState } from 'react'
import { ItemListArticle } from './ItemListArticle';
import { NavLink } from 'react-router-dom';



export const Articles = () => {
  const [isLoading, setIsLoading] = useState(false)
  const base_url = import.meta.env.VITE_API_BASE_URL;
  
  let articulosList = [];
  const [articlesCleanList, setArticlesCleanList] = useState([])

  const fetchArticles = 
    async() => {
      setIsLoading(true);
      try {
        const res = await fetch(`${base_url}/infosphere/articles/`, {          
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });


        if (!res.ok) {
          const message = `Error al obtener lista de Articulos: ${res.status}`;
          throw new Error(message);
        }
        const data = await res.json();
        
        // console.log(data.results);

        articulosList = data.results;

        //limpiemos la lista para el renderizado de articulos
  const clearList = articulosList.map((article) => {
    let imageSrc = article.image !== null ? article.image : `https://picsum.photos/seed/${article.id}/200/300`;
    const truncatedContent = article.content.split(' ').slice(0, 20).join(' ') + '...';
    return {
      id: article.id,
      title: article.title,
      subtitle: article.abstract,
      image: imageSrc,
      created: article.created_at,
      reactions: article.reactions,
      view_count: article.view_count,
      content: truncatedContent,
    }
  })

  setArticlesCleanList(clearList)
        
        
        
      } catch (error) {
        console.log(error)
      }finally {
        setIsLoading(false);
        
      }
      
    }

  useEffect(() => {
    fetchArticles()
  }, [])
  
  
  

  return (
    <>
      {        
        articlesCleanList.map((article)=>{
          return (
            <NavLink to={`/article/${article.id}`}>
          <ItemListArticle article={article}/>
          </NavLink>
        )
        })
      }
    
    </>
  )
}
