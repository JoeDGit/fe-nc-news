import React from 'react';

export default function AuthorDeleteControls({
  failedDelete,
  confirmDelete,
  handleDelete,
  setConfirmDelete,
}) {
  return (
    <>     
      {failedDelete && (
        <div className="text-error ml-4">
          Something Went wrong, please try again
        </div>
      )}
      {!confirmDelete && (
        <button
          onClick={() => setConfirmDelete(true)}
          className="ml-2 bg-primary px-2 py-[0px] rounded-md text-xs"
        >
          Delete
        </button>
      )}
      {confirmDelete && !failedDelete ? (
        <div className=" ml-4 ">
          Are you sure?{' '}
          <button
            className="bg-warning px-2 py-[0px] rounded-md text-xs"
            onClick={handleDelete}
          >
            Yes
          </button>{' '}
          /{' '}
          <button
            className="bg-warning px-2 py-[0px] rounded-md text-xs"
            onClick={() => setConfirmDelete(false)}
          >
            No
          </button>
        </div>
      ) : null}
    </>
  );
}
