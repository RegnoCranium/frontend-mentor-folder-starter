import { useEffect, useRef } from "react";
import { HandleNewReply } from "../types/types";

type Props = {
  pfp: string;
  _id?: number;
  replyingTo?: string;
  isReplyField?: boolean;
  closeReplyWindow?: () => void;
  addNewComment?: (text: string) => void;
  addNewReply?: HandleNewReply;
};

export default function WriteCommentField({
  pfp,
  addNewComment,
  closeReplyWindow,
  _id,
  replyingTo,
  isReplyField = false,
  addNewReply,
}: Props) {
  const inputField = useRef<HTMLDivElement>(null);

  if (!addNewComment) {
    addNewComment = () => {
      throw new Error("Did not add addNewComment function");
    };
  }
  if (!addNewReply) {
    addNewReply = () => {
      throw new Error("Did not add addNewReply function");
    };
  }
  if (!closeReplyWindow) {
    closeReplyWindow = () => {
      throw new Error("Did not add closeReplyWindow function");
    };
  }

  //placeholder implementation
  useEffect(() => {
    const element = inputField.current;

    const handleInput = () => {
      if (element && !isReplyField) {
        if (element.textContent === "" && !element.matches(":focus")) {
          element.textContent = "Add a comment...";
        } else if (element.textContent === "Add a comment...") {
          element.textContent = "";
        }
      }
    };

    if (element) {
      element.addEventListener("focus", handleInput);
      element.addEventListener("blur", handleInput);
    }

    return () => {
      if (element) {
        element.removeEventListener("focus", handleInput);
        element.removeEventListener("blur", handleInput);
      }
    };
  }, []);

  const ReplyOrSendFunc = () => {
    if (!inputField.current) return;
    isReplyField
      ? addNewReply(
          _id as number,
          replyingTo as string,
          inputField.current.textContent as string
        )
      : addNewComment(inputField.current.textContent as string);
    if (!isReplyField) {
      inputField.current.textContent = "Add a comment...";
    } else {
      closeReplyWindow();
    }
  };

  return (
    <div
      className={`bg-white w-full sm:flex sm:justify-between p-4 sm:p-5 rounded-md shadow-sm ${
        isReplyField ? "mb-4" : ""
      }`}
    >
      <div className="hidden sm:block sm:mt-1">
        <img className="w-9" src={pfp} alt="Profile picture" />
      </div>
      <div
        contentEditable
        ref={inputField}
        suppressContentEditableWarning={true}
        className="min-h-24 sm:w-3/4 border break-words border-light-gray px-5 py-3 rounded-md text-grayish-blue outline-none transition-colors duration-200 focus:border-moderate-blue focus:text-black"
      >
        {isReplyField ? "" : "Add a comment..."}
      </div>
      <div className="hidden sm:block">
        <button
          onClick={() => ReplyOrSendFunc()}
          className="uppercase h-12 bg-moderate-blue w-24 font-medium text-white rounded-md hover:opacity-60 transition-opacity duration-300"
        >
          {isReplyField ? "Reply" : "Send"}
        </button>
      </div>
      <div className="flex justify-between items-center h-12 mt-4 sm:hidden">
        <img className="w-8" src={pfp} alt="Profile picture" />
        <button
          onClick={() => ReplyOrSendFunc()}
          className="uppercase h-12 bg-moderate-blue w-24 font-medium text-white rounded-md hover:opacity-60 transition-opacity duration-300"
        >
          {isReplyField ? "Reply" : "Send"}
        </button>
      </div>
    </div>
  );
}
