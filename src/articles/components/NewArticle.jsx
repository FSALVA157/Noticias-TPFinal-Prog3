import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/user-context/AuthContext";
import "../../App.css";

const initialState = {
  title: "",
  abstract: "",
  caption: "",
  content: "",
  image: null,
};

export const NewArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
    console.log(newArticle);

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
        throw new Error(message);
      }
      const data = await res.json();
      console.log(data);
      setNewArticle(initialState);
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
              class="textarea is-link"
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
            <div class="file is-info is-boxed">
              <label class="file-label">
                <input 
                  class="file-input"
                  type="file"
                  name="image" 
                  onChange={handleOnChange}
                  />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span class="file-label"> Archivo de Imagen </span>
                </span>
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-info">Submit</button>
            </div>
            <div class="control">
              <button  class="button is-link is-light">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
