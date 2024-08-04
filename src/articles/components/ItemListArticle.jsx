import React from "react";

export const ItemListArticle = ({article}) => {
  return (
    <>
      <div className="card fixed-grid has-4-cols">
        
        <div className="grid">
            <div className="card-content cell is-col-span-3">
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                    <h1>{article.title}</h1>
                  <p>
            
            <br />
            {article.content}
                  </p>
            
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-reply"></i></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-retweet"></i></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-heart"></i></span>
            </a>
                  </div>
                </nav>
              </div>
              <div className="media-right">
                <button className="delete"></button>
              </div>
             
            </article>
            
              <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                nec iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
            <div className="card-image cell">
              <figure className="image">
                <img
                  src="https://bulma.io/assets/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
        </div>
      </div>
    </>
  );
};
