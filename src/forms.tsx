import { createForm, SubmitHandler } from "@modular-forms/solid";

type PostFormType = {
  title: string;
  content: string;
};
type CommentFormType = {
  content: string;
};
export function PostForm() {
  const URL_POSTS = `http://localhost:4000`;
  const [postFormStore, Post] = createForm<PostFormType>();

  const handlePostSubmit: SubmitHandler<PostFormType> = async (values) => {
    await fetch(`${URL_POSTS}/posts`, {
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
            {(field, props) => <input {...props} type="text" />}
          </Post.Field>
        </div>
        <div class="my-2">
          <Post.Field name="content">
            {(field, props) => <input {...props} type="text" />}
          </Post.Field>
        </div>
        <button>Submit</button>
      </Post.Form>
    </div>
  );
}
export function CommentForm({ postId }: { postId: string }) {
  const URL_COMMENTS = `http://localhost:4001`;
  const [commentFormStore, Comment] = createForm<CommentFormType>();
  const handleCommentSubmit: SubmitHandler<CommentFormType> = async (
    values,
  ) => {
    await fetch(`${URL_COMMENTS}/posts/${postId}/comments`, {
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
              {(field, props) => <input {...props} type="text" />}
            </Comment.Field>
          </div>
          <button class="">Submit</button>
        </Comment.Form>
      </div>
    </>
  );
}
