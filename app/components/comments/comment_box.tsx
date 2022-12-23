import React, { FC, useState } from "react";
import CommentOrRecommendation from "~/models/Data/CommentOrRecommendation";
import useCommentsOrRecommendationsStore from "~/models/Data/StoreHooks/useCommentsOrRecommendationsStore";

export interface CommentOrRecommmendationBoxProps {
  isPrinting: boolean;
  comment: CommentOrRecommendation;
}

const CommentOrRecommendationBox: FC<CommentOrRecommmendationBoxProps> = (
  props
) => {
  const [isEditing, setIsEditing] = useState(false);
  const editCOR = useCommentsOrRecommendationsStore((state) => state.edit);
  const deleteCOR = useCommentsOrRecommendationsStore((state) => state.delete);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const editComment = () => {
    setValue(props.comment?.value);
    setIsEditing(true);
  };
  const saveComment = () => {
    editCOR(props.comment?.id, { ...props.comment, value: value });
    setIsEditing(false);
  };

  const deleteComment = () => {
    deleteCOR(props.comment.id);
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 8fr 1fr 1fr 1fr" }}
    >
      <p style={{ marginRight: "1em" }}>
        {props.comment?.date.toLocaleDateString()}
      </p>
      {isEditing ? (
        <>
          <textarea
            style={{ height: "auto" }}
            value={value}
            onChange={onChange}
          />
          <button onClick={saveComment} style={{ color: "blue" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={{ color: "red" }}>
            Cancel
          </button>
        </>
      ) : !props.isPrinting ? (
        <>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              maxWidth: "400px",
            }}
          >
            {props.comment?.value}
          </pre>
          <button onClick={editComment} style={{ color: "blue" }}>
            Reply
          </button>
          <button
            id="edit-button"
            onClick={editComment}
            style={{ color: "blue" }}
          >
            Edit
          </button>
          <button onClick={deleteComment} style={{ color: "red" }}>
            Delete
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentOrRecommendationBox;
