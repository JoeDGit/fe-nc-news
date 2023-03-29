import React from 'react';

export default function AuthorEditControls({
  isBeingEdited,
  handleCancelEdit,
  handleEditClick,
  handleSaveEdit,
}) {
  return (
    <>
      {isBeingEdited ? (
        <div className="self-end">
          <button
            onClick={handleSaveEdit}
            className="mt-2 mr-2 self-end bg-primary px-2 py-[0px] rounded-md text-xs"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className="mt-2 self-end bg-primary px-2 py-[0px] rounded-md text-xs"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="mt-2 self-end bg-primary px-2 py-[0px] rounded-md text-xs"
          onClick={handleEditClick}
        >
          edit
        </button>
      )}
    </>
  );
}
