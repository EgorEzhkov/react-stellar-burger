import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./ConstructorElements.module.css";
import { useRef } from "react";
import { moveIngredient } from "../../../services/actions/constructorIngredientsData";
import PropTypes from "prop-types";

export function ConstructorElements({ el, index, func }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorElement",
    item: { el, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [, refDrop] = useDrop({
    accept: "constructorElement",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  dragRef(refDrop(ref));

  if (el.type !== "bun") {
    return (
      <li ref={ref} style={{ opacity }} className={`${styles.li}`}>
        <div className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            handleClose={() => {
              dispatch(func(index));
            }}
          />
        </div>
      </li>
    );
  }
}

ConstructorElements.propTypes = {
  el: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};
