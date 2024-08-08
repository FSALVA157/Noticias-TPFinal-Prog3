export const ItemMyArticle = ({ data }) => {
  return (
    <>
      <div className="card" style={{ width: "100%" }}>
        <header className="card-header">
          <p className="card-header-title">{data.title}</p>
        </header>
        <div className="card-content">
          <div className="content">
            {data.content.split(" ").slice(0, 10).join(" ")}...
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Edit
          </a>
          <a href="#" className="card-footer-item">
            Delete
          </a>
        </footer>
      </div>
    </>
  );
};
