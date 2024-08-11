import { useDraggable } from "@dnd-kit/core";
import { ItemMyArticle } from "./ItemMyArticle";

export const DraggableArticleWrapper = ({
  id,
  data  
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      onDragStart: (event) => event.preventDefault(),   
    });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleOnClickArticle = () => {
    console.log("CLICKEANDO LA TARJERA")
  };

// console.log("DATA EN DRAGGABLE", data)
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <ItemMyArticle data={data} key={data.id} />
      {/* <button onClick={() => handleOnClickArticle()}>
        Edit Article
      </button> */}
    </div>
  );
};
