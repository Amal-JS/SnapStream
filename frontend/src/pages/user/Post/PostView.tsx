import { useEffect, useState } from "react";
import { CustomModal } from "../../../Components/Modal/Modal";
import { ModalTitle } from "../../../Components/Modal/ModalTitle";
import { useModal } from "../../../hooks/useModal";
import { ModalBody } from "../../../Components/Modal/ModalBody";
import { commentPath, mediaPath, postPath } from "../../../utils/url";
import { Image } from "@nextui-org/react";
import axiosInstance from "../../../axios/axiosInstance";
import { customErrorToast, customSuccessToast } from "../../../Toast";
import { PostAction } from "./PostAction";
import { PostHeader } from "./PostHeader";
import CommentDiv from "./CommentDiv";
import { useAppSelector } from "../../../hooks/redux";

interface PostViewProps {
  postDataIdUserClicked: string;
  openModal: boolean;
}

interface PostDataType {
  id: string;
  media: string;
  description: string;
  location?: string;
  userId: string;
  username: string;
  profilePictureUrl: string;
  isUserCommentedOnPost: boolean;
  isUserSavedThePost: boolean;
  isUserLikedThePost: boolean;
  totalCommentsCount: number;
  totalLikesCount: number;
}

export const PostView: React.FC<PostViewProps> = ({
  postDataIdUserClicked,
  openModal,
}) => {
  const { isModalOpened, handleModalToggle } = useModal(true);
  const [commentsCount, setCommentsCount] = useState<number>(0);

  const [post, setPost] = useState<PostDataType>({
    id: "",
    media: "",
    description: "",
    location: "",
    userId: "",
    username: "",
    profilePictureUrl: "",
    isUserCommentedOnPost: false,
    isUserSavedThePost: false,
    isUserLikedThePost: false,
    totalCommentsCount: 0,
    totalLikesCount: 0,
  });

  const [content, setContent] = useState<string>("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isCommentAdded, setCommentAdded] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.user.userId);
  const [commentCount, setCommentCount] = useState<number>(0);

  const fetchUserPosts = async () => {
    const response = await axiosInstance.get(
      postPath + `post/?post_id=${postDataIdUserClicked}`
    );

    if (response.data.posts && response.status === 200) {
      setPost(response.data.posts);
      !response.data.posts.isUserCommentedOnPost &&
        setIsPlaceholderVisible(true);
    } else {
      customErrorToast("Error fetching posts.");
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLDivElement>) => {
    const { textContent } = event.target;

    if (textContent) {
      setContent(textContent);
      setIsPlaceholderVisible(textContent.trim().length === 0);
      setCommentAdded(textContent.trim().length > 1);
    }
  };

  const handleFocus = () => {
    setIsPlaceholderVisible(false);
  };

  const handleBlur = () => {
    setIsPlaceholderVisible(content.trim().length < 2);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);
  useEffect(() => {
    fetchUserPosts();
  }, [commentCount]);

  useEffect(() => {
    handleModalToggle();
  }, [openModal]);

  //   useEffect(()=>{console.log('useEffect modal post :',post)},[post])
  const handleCommentsCountChange = (count: number) => {
    if (count === 0) {
      fetchUserPosts();
    }
  };
  const handleNewCommentCreation = async () => {
    const response = await axiosInstance.post(postPath + commentPath, {
      user_id: userId,
      post_id: post.id,
      description: content,
    });
    if (response.data.commentCreated) {
      customSuccessToast("Comment Added.");
      setCommentAdded((prev) => !prev);
      fetchUserPosts();
    } else {
      customErrorToast("please try to add comment after some time.");
    }
  };

  return (
    <CustomModal isDismissable={true} modalToggle={isModalOpened} size="4xl">
      <ModalTitle
        handleModalToggle={handleModalToggle}
        isDismissable={true}
      ></ModalTitle>
      <ModalBody>
        <div className="w-full  h-full bg-secondary dark:bg-primary p-5 ">
          {/* <PostHeader postHeaderData={post}/> */}
          <div className="w-full bg-secondary my-2 dark:bg-primary md:flex md:justify-center">
            <div className=" mb-3 md:w-1/2">
              <img
                className="object-contain h-80  "
                alt="profile picture"
                src={mediaPath + `${post.media}`}
              />
              <div className="my-2">
                {" "}
                <PostAction post={post} />
              </div>

              <p className="text-primary  dark:text-secondary text-start text-base my-4 p-3">
                {post.description}
              </p>
            </div>
            <div className="md:hidden mt-2">
              <p className="text-xl text-primary dark:text-secondary text-center my-2">
                {" "}
                Comments
              </p>
              {post.totalCommentsCount === 0 && (
                <p className="text-base text-primary dark:text-secondary mt-4 text-center">
                  No comments added.
                </p>
              )}

              {!post.isUserCommentedOnPost && (
                <div className="flex mt-3">
                  <div
                    className="bg-secondary text-primary  dark:text-secondary dark:bg-primary w-10/12 w-max-10/12 border-2 focus:outline-none focus:border-0 focus:ring-2 p-2 border-secondary-border dark:border-primary-border"
                    contentEditable="true"
                    onInput={handleInput}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    suppressContentEditableWarning={true}
                  >
                    {isPlaceholderVisible && (
                      <div className="placeholder text-primary dark:text-secondary border-b-2 border-secondary-border dark:border-primary-border">
                        Add a new comment...
                      </div>
                    )}
                  </div>
                  <div className="w-2/12 flex items-center ml-2">
                    {isCommentAdded && (
                      <p
                        className="font-bold text-small text-btn-enabled hover:cursor-pointer"
                        onClick={handleNewCommentCreation}
                      >
                        Post
                      </p>
                    )}
                  </div>
                </div>
              )}
              <CommentDiv
                postId={post.id}
                handleCommentsCountChange={handleCommentsCountChange}
                postViewCommentUpdate={isCommentAdded}
              />

              <div className="h-16"></div>
            </div>
            <div className="hidden md:block md:w-1/2 bg-secondary dark:bg-primary border-l-3 border-l-secondary-border dark:border-l-primary-border pl-7">
              <p className="text-xl text-primary dark:text-secondary text-center my-2">
                {" "}
                Comments
              </p>
              {post.totalCommentsCount === 0 && (
                <p className="text-base text-primary dark:text-secondary mt-4 text-center">
                  No comments added.
                </p>
              )}

              {!post.isUserCommentedOnPost && (
                <div className="flex mt-3">
                  <div
                    className="bg-secondary text-primary  dark:text-secondary dark:bg-primary w-10/12 w-max-10/12 border-2 focus:outline-none focus:border-0 focus:ring-2 p-2 border-secondary-border dark:border-primary-border"
                    contentEditable="true"
                    onInput={handleInput}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    suppressContentEditableWarning={true}
                  >
                    {isPlaceholderVisible && (
                      <div className="placeholder text-primary dark:text-secondary border-b-2 border-secondary-border dark:border-primary-border">
                        Add a new comment...
                      </div>
                    )}
                  </div>
                  <div className="w-2/12 flex items-center ml-2">
                    {isCommentAdded && (
                      <p
                        className="font-bold text-small text-btn-enabled hover:cursor-pointer"
                        onClick={handleNewCommentCreation}
                      >
                        Post
                      </p>
                    )}
                  </div>
                </div>
              )}
              <CommentDiv
                postId={post.id}
                handleCommentsCountChange={handleCommentsCountChange}
                postViewCommentUpdate={isCommentAdded}
              />
            </div>
          </div>
        </div>
      </ModalBody>
    </CustomModal>
  );
};
