import { createForm, SubmitHandler } from "@modular-forms/solid";
import { onMount } from "solid-js";

export const getCommentsURL = (postId: string) => {
  // if (env.NODE_ENV === "development") {
  // return `http://localhost:4000/posts/${postId}/comments`;
  // } else {
  return `http://posts.com/posts/${postId}/comments`;
  // }
};
export const getPostURL = () => {
  // if (env.NODE_ENV === "development") {
  // return `http://localhost:4000/posts/create`;
  // } else {
  return `http://posts.com/posts/create`;
  // }
};

type PostFormType = {
  title: string;
  content: string;
};
type CommentFormType = {
  content: string;
};
export function PostForm() {
  const [vals, Post] = createForm<PostFormType>();
  onMount(() => {
    vals.element?.click();
  });
  const handlePostSubmit: SubmitHandler<PostFormType> = async (values) => {
    console.log(values);
    const url = getPostURL();
    // const serverURL = `${URL_POSTS}/create`;

    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ content: values.content, title: values.title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div class="">
      <h2>Create new post</h2>
      {/* POST FORM*/}
      <Post.Form onSubmit={handlePostSubmit} class="flex-col gap-2 my-8">
        <div class="my-2">
          <Post.Field name="title">
            {(field, props) => {
              console.log({ field, props });
              return <input {...props} type="text" />;
            }}
          </Post.Field>
        </div>
        <div class="my-2">
          <Post.Field name="content">
            {(field, props) => {
              console.log({ field, props });
              return <input {...props} type="text" />;
            }}
          </Post.Field>
        </div>
        <button>Submit</button>
      </Post.Form>
    </div>
  );
}
export function CommentForm({ postId }: { postId: string }) {
  const url = getCommentsURL(postId);
  const [, Comment] = createForm<CommentFormType>();
  const handleCommentSubmit: SubmitHandler<CommentFormType> = async (
    values,
  ) => {
    console.log(values);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ content: values.content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      <div>
        <h4 class="text-xs italic">Create a new comment</h4>
        {/* COMMENT FORM*/}
        <Comment.Form
          onSubmit={handleCommentSubmit}
          class="flex-col my-8 gap-2"
        >
          <div class="my-2">
            <Comment.Field name="content">
              {(field, props) => {
                console.log({ field, props });
                return <input {...props} type="text" />;
              }}
            </Comment.Field>
          </div>
          <button class="">Submit</button>
        </Comment.Form>
      </div>
    </>
  );
}
