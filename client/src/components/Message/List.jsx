import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";

function List({ item, handleUpdate, handleDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => {
    setIsExpanded((s) => !s);
  };

  return (
    item && (
      <li>
        {item.content}
        <BsThreeDotsVertical onClick={toggle} />
        {isExpanded && (
          <React.Fragment>
            <AiFillEdit onClick={() => handleUpdate(item._id, item.content)} />
            <MdOutlineDeleteForever onClick={() => handleDelete(item._id)} />
          </React.Fragment>
        )}
      </li>
    )
  );
}

export default List;
