import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ItemListArticle } from "./ItemListArticle";
import { AuthContext } from "../../context/user-context/AuthContext";
import { ItemMyArticle } from "./ItemMyArticle";
import deleteSvg from "../../assets/delete.svg";
import { closestCenter, closestCorners, DndContext } from "@dnd-kit/core";
import { EditArticle } from "./EditArticle";
import { DraggableArticleWrapper } from "./DraggableArticleWrapper";
import { DroppableArticleWrapper } from "./DroppableArticleWrapper";
import { ModalConfirm } from "../../core/components/ModalConfirm";

export const MyArticles = () => {
  const { data } = useLoaderData();  
  
  const [dataSelectedArticle, setDataSelectedArticle] = useState({})
  const { authState } = useContext(AuthContext);
  const { idUser, token } = authState;
  const [showModal, setshowModal] = useState(false)
  const [listaFiltrada, setlistaFiltrada] = useState([]);
  const isDraggingRef = useRef(false)
  const [articleToDelete, setArticleToDelete] = useState(null);
  
  

  const handleOnClickArticle = (data) => {
    if(!isDraggingRef.current) {
      setDataSelectedArticle(data);     
    }
    console.log("Articulo seleccionado", data)
  };

  useEffect(() => {
    if (data !== null) {
      const prelistaFiltrada = data.results.filter(
        (article) => article.author === idUser
      );
  
      const listadoCompleto = prelistaFiltrada.map((article) => {
        return {
          id: article.id,
          author: article.author,
          title: article.title,
          abstract: article.abstract,
          caption: article.caption,
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

      setlistaFiltrada(listadoCompleto);
    }
  
  }, [data, idUser]);

  const handleDragStart = () => {
   isDraggingRef.current = true;
  };
  

  const handleDragEnd = (event) => {
    const { active, over } = event;    

    if (isDraggingRef.current && over && over.id === 'delete-area') {
      console.log("ESTE ES EL ID QUE SE BORRARA", active.id)
      setArticleToDelete(active.id)
      setshowModal(true)
      // setlistaFiltrada((prevItems) => prevItems.filter(item => item.id !== active.id));
    }
    isDraggingRef.current = false
  };

  //metodo asincronico para borrar articulo
  const deleteArticle = async (articleId) => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    try {
      const res = await fetch(`${base_url}/infosphere/articles/${articleId}/`, {
        headers: {          
          "Authorization": `Token ${token}`
        },
        method: "DELETE",
      });
      console.log(res)

      if (res.ok) {        
        setlistaFiltrada((prevItems) =>
          prevItems.filter((item) => item.id !== articleId)
        );
      } else {
        console.error("Error al eliminar el artículo.");
      }
    } catch (error) {
      console.error("Error en la petición para eliminar el artículo:", error);
    }
  };

  const handleConfirmDelete = () => {
    if (articleToDelete) {
      deleteArticle(articleToDelete);
      setlistaFiltrada((prevItems) => prevItems.filter(item => item.id !== active.id));
    }
    setshowModal(false);
  };

  const handleCancelDelete = () => {    
    setshowModal(false);
  };

  
  

  return (
    <>
      <ModalConfirm showModal={showModal} setshowModal={setshowModal} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete}/>
      {listaFiltrada.length < 1 ? (
        <h1>No tienes articulos</h1>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="columns is-8" style={{ marginTop: "30px" }}>
            <div className="column is-two-fifths">
              {listaFiltrada.map((article) => (
                <>
                <DraggableArticleWrapper id={article.id} data={article}/>
                <button className="button is-light"  key={article.id} onClick={() => setDataSelectedArticle(article)}>                
                  EditArticle
                </button>
                </>
              ))}
            </div>
            <div className="column"  >              
              <div style={{ width: "100%",height:"20%", 
              alignItems:'center',
              justifyContent:'center',display:"flex", flexDirection:'column' }}>

              <DroppableArticleWrapper id='delete-area' />

              </div>


              <EditArticle dataArticle={dataSelectedArticle}/>
            </div>
          </div>
        </DndContext>
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
