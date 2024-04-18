import { useState } from "react";
import { CommentData, HandleNewReply, Reply } from "../types/types";
import WriteCommentField from "./WriteCommentField";
import Score from "./Score";
import ReplyOrEdit from "./ReplyOrEdit";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

type Props = {
  commentData: CommentData | Reply;
  isCurrentUser: boolean;
  replyingTo?: string;
  currentUserPfp: string;
  changeScoreComment: (id: number, operation: 1 | 0) => void;
  updateComment: (id: number, newText: string) => void;
  startDeleteSequence: (id: number) => void;
  addNewReply: HandleNewReply;
};

export default function Comment({
  commentData,
  isCurrentUser,
  replyingTo,
  currentUserPfp,
  addNewReply,
  changeScoreComment,
  startDeleteSequence,
  updateComment,
}: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [textContent, setTextContent] = useState(commentData.content);
  const [isReplyFieldOpen, setIsReplyFieldOpen] = useState(false);

  const endUpdateSequence = () => {
    setIsEditable(false);
    updateComment(commentData.id, textContent);
    setTextContent(commentData.content);
  };

  const formatDate = (timestamp: number) => {
    const diffInMinutes = differenceInMinutes(Date.now(), timestamp);
    const diffInHours = differenceInHours(Date.now(), timestamp);
    const diffInDays = differenceInDays(Date.now(), timestamp);
    const diffInWeeks = differenceInWeeks(Date.now(), timestamp);
    const diffInMonths = differenceInMonths(Date.now(), timestamp);
    const diffInYears = differenceInYears(Date.now(), timestamp);

    switch (true) {
      case diffInMinutes < 1:
        return "Now";
      case diffInMinutes < 60:
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
      case diffInHours < 24:
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
      case diffInDays < 7:
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
      case diffInWeeks < 4:
        return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
      case diffInMonths < 12:
        return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
      case diffInYears >= 1:
        return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
      default:
        throw new Error("Incorrect date format");
    }
  };

  return (
    <>
      <div
        className={`bg-white rounded-md p-4 sm:p-6 w-full ${
          isReplyFieldOpen ? "mb-2" : "mb-4"
        } flex flex-col sm:flex-row gap-3 sm:gap-5 shadow-sm`}
      >
        <div className="hidden sm:block shrink-0">
          <Score
            score={commentData.score}
            increaseScore={() => changeScoreComment(commentData.id, 1)}
            decreaseScore={() => changeScoreComment(commentData.id, 0)}
          />
        </div>
        <div className="flex flex-col gap-3 w-full sm:w-[91%]">
          <div className="flex items-center gap-4">
            <img
              className="w-8"
              src={commentData.user.image.png}
              alt="Avatar"
            />
            <span className="flex items-center gap-2">
              <span className="font-medium text-dark-blue">
                {commentData.user.username}
              </span>
              {isCurrentUser && (
                <span className="text-white bg-moderate-blue rounded-sm text-xs font-medium px-[6px] pt-[1px] pb-[2px]">
                  you
                </span>
              )}
            </span>
            <span className="text-grayish-blue">
              {formatDate(commentData.createdAt)}
            </span>
            <span className="hidden sm:block ml-auto">
              <ReplyOrEdit
                isCurrentUser={isCurrentUser}
                isEditable={isEditable}
                endUpdateSequence={() => endUpdateSequence()}
                openEditMenu={() => setIsEditable(true)}
                toggleReplyField={() => setIsReplyFieldOpen((prev) => !prev)}
                startDeleteSequence={() => startDeleteSequence(commentData.id)}
              />
            </span>
          </div>
          <span className="text-grayish-blue max-w-full break-words">
            {isEditable ? (
              <div
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: textContent }}
                onBlur={(e) =>
                  setTextContent(e.currentTarget.textContent as string)
                }
                className="overflow-y-auto text-black outline-none border border-moderate-blue rounded-md px-4 py-2"
              />
            ) : (
              <>
                {replyingTo ? (
                  <span className="font-medium text-moderate-blue">
                    @{replyingTo}{" "}
                  </span>
                ) : (
                  ""
                )}
                {commentData.content}
              </>
            )}
          </span>
        </div>
        <div className="sm:hidden flex justify-between items-center h-9">
          <Score
            score={commentData.score}
            increaseScore={() => changeScoreComment(commentData.id, 1)}
            decreaseScore={() => changeScoreComment(commentData.id, 0)}
          />
          <ReplyOrEdit
            isCurrentUser={isCurrentUser}
            isEditable={isEditable}
            endUpdateSequence={() => endUpdateSequence()}
            openEditMenu={() => setIsEditable(true)}
            toggleReplyField={() => setIsReplyFieldOpen((prev) => !prev)}
            startDeleteSequence={() => startDeleteSequence(commentData.id)}
          />
        </div>
      </div>
      {isReplyFieldOpen && (
        <WriteCommentField
          pfp={currentUserPfp}
          isReplyField
          _id={commentData.id}
          closeReplyWindow={() => setIsReplyFieldOpen(false)}
          replyingTo={commentData.user.username}
          addNewReply={addNewReply}
        />
      )}
    </>
  );
}
