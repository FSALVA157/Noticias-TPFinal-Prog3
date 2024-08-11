import React, { useContext, useEffect, useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/user-context/AuthContext";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { DraggableArticleWrapper } from "./DraggableArticleWrapper";
import { DroppableArticleWrapper } from "./DroppableArticleWrapper";
import { ModalConfirm } from "../../core/components/ModalConfirm";

export const MyArticles = () => {
  const { data } = useLoaderData();
  const { authState } = useContext(AuthContext);
  const { idUser } = authState;
  const [listaFiltrada, setlistaFiltrada] = useState([]);
  const [dataSelectedArticle, setDataSelectedArticle] = useState({});
  const [showModal, setshowModal] = useState(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (data) {
      const prelistaFiltrada = data.results.filter(
        (article) => article.author === idUser
      );
      const listadoCompleto = prelistaFiltrada.map((article) => ({
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
      }));
      setlistaFiltrada(listadoCompleto);
    }
  }, [data, idUser]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (isDraggingRef.current && over && over.id === "delete-area") {
      setlistaFiltrada((prevItems) =>
        prevItems.filter((item) => item.id !== active.id)
      );
    }
    isDraggingRef.current = false;
  };

  const handleOnClickArticle = (article) => {
    if (!isDraggingRef.current) {
      setDataSelectedArticle(article);
      console.log("Artículo seleccionado:", article);
    }
  };

  return (
    <>
      <ModalConfirm showModal={showModal} setshowModal={setshowModal} />
      {listaFiltrada.length < 1 ? (
        <h1>No tienes artículos</h1>
      ) : (
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="columns is-8" style={{ marginTop: "30px" }}>
            <div className="column is-two-fifths">
              {listaFiltrada.map((article) => (
                <div key={article.id}>
                  <DraggableArticleWrapper
                    id={article.id}
                    data={article}
                    onClick={() => handleOnClickArticle(article)}
                  />
                  <button
                    className="button"
                    onClick={() => setDataSelectedArticle(article)}
                  >
                    Editar Artículo
                  </button>
                </div>
              ))}
            </div>
            <div className="column">
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DroppableArticleWrapper id="delete-area" />
              </div>
              <EditArticle dataArticle={dataSelectedArticle} />
            </div>
          </div>
        </DndContext>
      )}
    </>
  );
};
