import { useDroppable } from "@dnd-kit/core";
import deleteSvg from "../../assets/delete.svg";

export const DroppableArticleWrapper = ({ id }) => {
    const { setNodeRef } = useDroppable({
      id,
    });
  
    return (
      <div ref={setNodeRef} className="droppable-area">
        <figure className="image is-64x64">
          <img src={deleteSvg} alt="Delete" />
        </figure>
      </div>
    );
  };
  