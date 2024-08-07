import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ItemListArticle } from "./ItemListArticle";

export const OneArticle = () => {
  const { data } = useLoaderData();
  let clearArticle = null;  
  
  if (data !== null) {
    clearArticle = {
      id: data.id,
      title: data.title,
      subtitle: data.abstract,
      image:
      data.image !== null
      ? data.image
      : `https://picsum.photos/seed/${data.id}/200/300`,
      created: data.created_at,
      reactions: data.reactions,
      view_count: data.view_count,
      content: data.content,
    };
    console.log(clearArticle)

  }
    
  
  return (
    <>
    {
      data? <ItemListArticle article={clearArticle}/> : <h1>No hay Articulo</h1>
    }
    </>
    
  );
}

export const fetchOneArticle = async ({ params }) => {
    
  
  const base_url = import.meta.env.VITE_API_BASE_URL;
  console.log("PARAMS: ", params)

  // setIsLoading(true);
  try {
    const res = await fetch(`${base_url}/infosphere/articles/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    console.log(">>>>>RES>>>><", res)

    if (!res.ok) {
      const message = `Error al obtener el  Articulo Buscado: ${res.status}`;
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
