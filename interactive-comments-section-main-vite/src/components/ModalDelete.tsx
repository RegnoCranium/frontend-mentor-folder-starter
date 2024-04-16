type Props = {
  closeModal: () => void;
  deleteComment: () => void;
};

export default function ModalDelete({ closeModal, deleteComment }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-modal-bg px-4">
      <div className="flex flex-col gap-4 sm:gap-5 bg-white rounded-md max-w-[345px] sm:max-w-[395px] px-6 py-4 sm:p-8 text-grayish-blue">
        <span className="font-medium text-xl text-dark-blue">
          Delete comment
        </span>
        <span>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </span>
        <div className="flex justify-between h-12 font-medium">
          <button
            onClick={closeModal}
            className="basis-[48%] bg-grayish-blue text-white h-full rounded-md uppercase"
          >
            No, cancel
          </button>
          <button
            onClick={deleteComment}
            className="basis-[48%] bg-soft-red text-white h-full rounded-md uppercase"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
