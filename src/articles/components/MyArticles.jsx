import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ItemListArticle } from "./ItemListArticle";

export const MyArticles = () => {
  const { data } = useLoaderData();
  let listadoCompleto = [];  

  let lista_aux = data.results;
  
  
    
   if (data !== null) {
    listadoCompleto = lista_aux.map((article) => {
      return {
            id: article.id,
            author: article.author,
            title: article.title,
            subtitle: article.abstract,
            image:
            article.image !== null
            ? article.image
            : `https://picsum.photos/seed/${article.id}/200/300`,
            created: article.created_at,
            reactions: article.reactions,
            view_count: article.view_count,
            content: article.content,
          };
    })
   }

   console.log(listadoCompleto)
    
  
  return (
    <>
    {
      // data? <ItemListArticle article={clearArticle}/> : <h1>No hay Articulo</h1>
      <h1>Listado de mis articulos</h1>
    }
    </>
    
  );
}

export const fetchAllArticles = async () => {
    
  
  const base_url = import.meta.env.VITE_API_BASE_URL;
  

  // setIsLoading(true);
  try {
    const res = await fetch(`${base_url}/infosphere/articles/?page=1&page_size=10000`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    

    if (!res.ok) {
      const message = `Error al obtener la lista de Articulos`;
      return new Promise((resolve, reject) => resolve(
        {data: null}
      ));
    }
    const data = await res.json();
    
    return  {data};
    
    
  } catch (error) {
    console.log(error);
  } finally {
  
  }

};
