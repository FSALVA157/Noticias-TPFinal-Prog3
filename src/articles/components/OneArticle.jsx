import React, { useState } from "react";
import { ItemListArticle } from "./ItemListArticle";
import { useLoaderData } from "react-router-dom";

export const OneArticle = () => {
  const { currentArticle } = useLoaderData

  return (
    <>
    {
      currentArticle !== null? <ItemListArticle article={currentArticle} />:<h1>No hay articulo</h1>
    }
    </>
    
  );
}

export const fetchOneArticle = async ({ params }) => {
    
// //   const [isLoading, setIsLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_BASE_URL;
 

//   setIsLoading(true);
  try {
    const res = await fetch(`${base_url}/infosphere/articles/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!res.ok) {
      const message = `Error al obtener el  Articulo Buscado: ${res.status}`;
      throw new Error(message);
    }
    const data = await res.json();

    console.log(data.results);

    const articleData = data.results;

    //limpiemos la lista para el renderizado de articulos
    const clearArticle = {
      title: articleData.title,
      subtitle: articleData.abstract,
      image:
        articleData.image !== null
          ? articleData.image
          : `https://picsum.photos/seed/${articleData.id}/200/300`,
      created: articleData.created_at,
      reactions: articleData.reactions,
      view_count: articleData.view_count,
      content: articleData.content,
    };

    return  clearArticle;
  } catch (error) {
    console.log(error);
  } finally {
    // setIsLoading(false);
  }
};
