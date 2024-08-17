import React from "react";
import Button from "../../ui/Button";

function DeleteItem({onClick}) {
  return (
    <div>
      <Button type="small" onClick={onClick}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
