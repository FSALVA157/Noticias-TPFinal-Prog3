import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/user-context/AuthContext";
import "../../App.css";

const initialState = {
  title: "",
  abstract: "",
  caption: "",
  content: "",
  image: null,
};

export const EditArticle = ({dataArticle=initialState}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editArticle, setEditArticle] = useState(initialState);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const {authState} = useContext(AuthContext)
  const {token} = authState;

  useEffect(() => {
    setEditArticle({
      title: dataArticle.title,
      abstract: dataArticle.abstract,
      caption: dataArticle.caption,
      content: dataArticle.content      
    })
  
  }, [])
  
  

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    console.log("TARGET", e);
    setEditArticle({
      ...editArticle,
      [name]: files ? files[0] : value,
    });
    
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(editArticle);

     // FormData
     const formData = new FormData();
     formData.append("title", editArticle.title);
     formData.append("abstract", editArticle.abstract);
     formData.append("caption", editArticle.caption);
     formData.append("content", editArticle.content);
     if (editArticle.image) {
       formData.append("image", editArticle.image);
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
        throw new Error(message);
      }
      const data = await res.json();
      console.log(data);
      setEditArticle(initialState);
    } catch (error) {
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
                value={editArticle.title}
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
                value={editArticle.abstract}
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
                value={editArticle.caption}
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
              value={editArticle.content}
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
              <button type="submit" className="button is-link is-outlined">Submit</button>
            </div>
            <div className="control">
              <button  className="button is-link is-outlined">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
