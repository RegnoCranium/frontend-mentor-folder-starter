type Props = {
  isCurrentUser: boolean;
  isEditable: boolean;
  endUpdateSequence: () => void;
  openEditMenu: () => void;
  toggleReplyField: () => void;
  startDeleteSequence: () => void;
};

export default function ReplyOrEdit({
  isCurrentUser,
  isEditable,
  endUpdateSequence,
  openEditMenu,
  toggleReplyField,
  startDeleteSequence,
}: Props) {
  return (
    <span className="flex items-center font-medium">
      {isCurrentUser ? (
        isEditable ? (
          <button
            className="h-9 w-24 bg-moderate-blue text-white rounded-md uppercase"
            onClick={endUpdateSequence}
          >
            Update
          </button>
        ) : (
          <>
            <button
              onClick={startDeleteSequence}
              className="flex items-center h-full gap-2 text-soft-red"
            >
              <img src="/icon-delete.svg" alt="Delete" />
              Delete
            </button>
            <button
              onClick={openEditMenu}
              className="ml-4 flex items-center h-full gap-2 text-moderate-blue"
            >
              <img src="/icon-edit.svg" alt="Edit" />
              Edit
            </button>
          </>
        )
      ) : (
        <button
          onClick={toggleReplyField}
          className="flex items-center gap-2 h-full"
        >
          <img className="shrink-0" src="/icon-reply.svg" alt="Reply-icon" />
          <span className="text-moderate-blue">Reply</span>
        </button>
      )}
    </span>
  );
}
