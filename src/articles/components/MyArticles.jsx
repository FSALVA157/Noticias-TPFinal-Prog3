import React, { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ItemListArticle } from "./ItemListArticle";
import { AuthContext } from "../../context/user-context/AuthContext";
import { ItemMyArticle } from "./ItemMyArticle";
import deleteSvg from "../../assets/delete.svg";

export const MyArticles = () => {
  const { data } = useLoaderData();
  let listadoCompleto = [];
  let lista_aux = data.results;
  const { authState } = useContext(AuthContext);  
  const { idUser } = authState;

  
  

  if (data !== null) {
    const listaFiltrada = lista_aux.filter(
      (article) => article.author === idUser
    );

    listadoCompleto = listaFiltrada.map((article) => {
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
    });
  }

  


  return (
    <>
      {listadoCompleto.length < 1 ? (
        <h1>No tienes articulos</h1>
      ) : (
        <div className="columns" style={{ marginTop: "30px" }}>
          <div className="column is-four-fifths">
            {listadoCompleto.map((article) => (              
                <ItemMyArticle data={article} key={article.id} />              
            ))}
          </div>
          <div className="column" style={{ justifyContent: "end" }}>
          <figure className="image is-64x64" >
            <img src={deleteSvg}></img>

          </figure>
          </div>
        </div>
      )}
    </>
  );
};

export const fetchAllArticles = async () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;

  // setIsLoading(true);
  try {
    const res = await fetch(
      `${base_url}/infosphere/articles/?page=1&page_size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    if (!res.ok) {
      const message = `Error al obtener la lista de Articulos`;
      return new Promise((resolve, reject) => resolve({ data: null }));
    }
    const data = await res.json();

    return { data };
  } catch (error) {
    console.log(error);
  } finally {
  }
};
