import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/user-context/AuthContext";
import "../../App.css";
import Message from "../../core/components/Message";

const initialState = {
  title: "",
  abstract: "",
  caption: "",
  content: "",
  image: null,
};

export const NewArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorState, setErrorState] = useState({
    tipo: 'is-primary',
    mensaje:'Se ha creado el nuevo articulo '
  })
  
  const [newArticle, setNewArticle] = useState(initialState);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const {authState} = useContext(AuthContext)
  const {token} = authState;
  
  
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    console.log("TARGET", e);
    setNewArticle({
      ...newArticle,
      [name]: files ? files[0] : value,
    });
    
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

     // FormData
     const formData = new FormData();
     formData.append("title", newArticle.title);
     formData.append("abstract", newArticle.abstract);
     formData.append("caption", newArticle.caption);
     formData.append("content", newArticle.content);
     if (newArticle.image) {
       formData.append("image", newArticle.image);
     }

    try {      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/infosphere/articles/`, {
        body: formData,
        headers: {          
          "Authorization": `Token ${token}`
        },
        method: "POST",
      });      
      console.log(res)
      if (!res.ok) {
        const message = `Error al crear Articulo: ${res.status}`;
        setTimeout(() => { 
          setShowMessage(false)
          setErrorState({ tipo: 'is-warning', mensaje: message });
        }, 2000)
        setIsLoading(false)
        setShowMessage(true)
      return;
      }
      else {
        setTimeout(() => { 
          setShowMessage(false)
        }, 2000)
        setIsLoading(false)
        setShowMessage(true)
      }
      const data = await res.json();      
      setNewArticle(initialState);
        // const message = `Se ha creado el articulo con Exito: ${res.status}`;
        // setTimeout(() => { 
        //   setShowMessage(false)
        //   setErrorState({ tipo: 'is-primary', mensaje: message });
        // }, 2000)
        // setIsLoading(false)
        // setShowMessage(true)

    
    } catch (error) {
      setErrorState ({ tipo:'is-warning', mensaje: error.message });
      setShowMessage(true);
      setIsError(true);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="card" style={{ width: "70%", padding: "60px" }}>
        <form  onSubmit={handleOnSubmit}>
          <div className="field">
            <label className="label">Titulo</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="title"
                className="input is-link"
                type="text"
                placeholder="titulo del Articulo"
                value={newArticle.title}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Subtitulo</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="abstract"
                className="input is-link"
                type="text"
                placeholder="Subtitulo"
                value={newArticle.abstract}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Caption</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="caption"
                className="input is-link"
                type="text"
                placeholder="caption de la imagen"
                value={newArticle.caption}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Contenido</label>
            <textarea
              name="content" 
              className="textarea is-link"
              placeholder="texto del articulo"
              value={newArticle.content}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <div
            className="field"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label className="label">Archivo de Imagen</label>
            <div className="file is-link is-boxed">
              <label className="file-label">
                <input 
                  className="file-input"
                  type="file"
                  name="image" 
                  onChange={handleOnChange}
                  />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span className="file-label"> Archivo de Imagen </span>
                </span>
              </label>
            </div>
          </div>

          <div className="field is-grouped">
         
            <div className="control">
            
              <button disabled={isLoading} type="submit" className={`button is small is-link ${isLoading ? "is-loading" : ""}`}>Submit</button>
            </div>
            <div className="control">
              <button  className="button is-link is-outlined">Cancel</button>
            </div>
          </div>
          <div className="" style={{ display: showMessage ? 'block' : 'none' }}>
          <Message mensaje={errorState.mensaje} tipo={errorState.tipo}/>
        </div>
        </form>
      </div>
    </>
  );
};
