import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Comment from "./components/Comment";
import { User, CommentData, Reply, HandleNewReply } from "./types/types";
import React from "react";
import ModalDelete from "./components/ModalDelete";
import WriteCommentField from "./components/WriteCommentField";

function App() {
  const [dataComments, setDataComments] = useLocalStorage<CommentData[]>(
    "data-comments",
    []
  );
  const [dataCurrentUser, setDataCurrentUser] = useLocalStorage<User>(
    "data-current-user",
    {} as User
  );
  const [loading, setLoading] = useState(true);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        const { currentUser, comments } = jsonData;
        setDataComments(comments);
        setDataCurrentUser(currentUser);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const hasLocalStorageData =
      dataComments.length > 0 && Object.keys(dataCurrentUser).length > 0;

    if (!hasLocalStorageData) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dataComments, dataCurrentUser]);

  useEffect(() => {
    const body = document.body;

    if (isModalDeleteOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isModalDeleteOpen]);

  // 1 - add, 0 - decrease
  const changeScoreComment = (id: number, operation: 1 | 0) => {
    const newComments = dataComments.map((comment) => {
      if (comment.id === id) {
        operation ? (comment.score += 1) : (comment.score -= 1);
      } else if (comment.replies.length != 0) {
        comment.replies.map((reply) => {
          if (reply.id === id) {
            operation ? (reply.score += 1) : (reply.score -= 1);
          }

          return reply;
        });
      }

      return comment;
    });

    setDataComments(newComments);
  };

  const deleteComment = (id: number | null) => {
    if (null) return;
    const newComments = dataComments.filter((comment) => {
      if (comment.id === id) {
        if (comment.replies.length !== 0) {
          comment.content = "This comment has been deleted";
          return true;
        } else {
          return false;
        }
      } else if (comment.replies.length !== 0) {
        comment.replies = comment.replies.filter((reply) => reply.id != id);
      }

      return true;
    });

    setIdToDelete(null);
    setIsModalDeleteOpen(false);
    setDataComments(newComments);
  };

  const startDeleteSequence = (id: number) => {
    setIsModalDeleteOpen(true);
    setIdToDelete(id);
  };

  const updateComment = (id: number, newText: string) => {
    newText = newText.trim();
    const newComments = dataComments.map((comment) => {
      if (comment.id === id) {
        comment.content = newText;
        return comment;
      } else if (comment.replies.length != 0) {
        comment.replies.map((reply) => {
          if (reply.id === id) {
            reply.content = newText;
          }
          return reply;
        });
      }

      return comment;
    });

    setDataComments(newComments);
  };

  const addNewCommentToGeneral = (text: string) => {
    text = text.trim();
    if (!text.length || text === "Add a comment...") return;
    const content = text;
    const id = Math.floor(100000 + Math.random() * 900000);
    const createdAt = Date.now();
    const user = dataCurrentUser;
    const score = 0;
    const replies = [] as Reply[];

    setDataComments((prev) => [
      ...prev,
      { id, content, createdAt, replies, score, user },
    ]);
  };

  const addNewReply: HandleNewReply = (
    _id: number,
    replyingTo: string,
    text: string
  ) => {
    text = text.trim();
    if (!text.length) return;
    const score = 0;
    const createdAt = Date.now();
    const id = Math.floor(100000 + Math.random() * 900000);
    const user = dataCurrentUser;
    const content = text;
    const newComments = dataComments.map((comment) => {
      if (comment.id === _id) {
        comment.replies = [
          ...comment.replies,
          { replyingTo, score, createdAt, id, user, content, replies: [] },
        ];
      } else if (comment.replies.length != 0) {
        comment.replies.map((reply) => {
          if (reply.id === _id) {
            comment.replies = [
              ...comment.replies,
              { replyingTo, score, createdAt, id, user, content, replies: [] },
            ];
          }
          return reply;
        });
      }
      return comment;
    });

    setDataComments(newComments);
  };

  return (
    <div className="w-full h-full sm:w-[90%] sm:max-w-[750px] sm:m-auto px-4 py-6">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {dataComments.map((comment) => (
            <React.Fragment key={comment.id}>
              <Comment
                currentUserPfp={dataCurrentUser.image.png}
                commentData={comment}
                changeScoreComment={changeScoreComment}
                isCurrentUser={
                  comment.user.username === dataCurrentUser.username
                }
                updateComment={updateComment}
                startDeleteSequence={startDeleteSequence}
                addNewReply={addNewReply}
              />
              {comment.replies.length != 0 && (
                <div className="pl-4 sm:pl-10 sm:ml-10 border-l-2 border-light-gray">
                  {comment.replies.map((reply) => (
                    <Comment
                      key={reply.id}
                      currentUserPfp={dataCurrentUser.image.png}
                      changeScoreComment={changeScoreComment}
                      replyingTo={reply.replyingTo}
                      commentData={reply}
                      isCurrentUser={
                        reply.user.username === dataCurrentUser.username
                      }
                      updateComment={updateComment}
                      startDeleteSequence={startDeleteSequence}
                      addNewReply={addNewReply}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          <WriteCommentField
            addNewComment={addNewCommentToGeneral}
            pfp={dataCurrentUser.image.webp}
          />
        </>
      )}
      {isModalDeleteOpen && (
        <ModalDelete
          closeModal={() => {
            setIsModalDeleteOpen(false);
            setIdToDelete(null);
          }}
          deleteComment={() => deleteComment(idToDelete)}
        />
      )}
    </div>
  );
}

export default App;
