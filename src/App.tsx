import "./App.css";
// https://github.com/fabian-hiller/modular-forms/issues/157
import { createForm, SubmitHandler } from "@modular-forms/solid";

type PostFormType = {
  title: string;
  content: string;
};
type CommentFormType = {
  content: string;
};

function App() {
  const URL_POSTS = `http://localhost:4000`;
  const URL_COMMENTS = `http://localhost:4001`;
  const URL_QS = `http://localhost:4002`;

  const [postFormStore, Post] = createForm<PostFormType>();
  const [commentFormStore, Comment] = createForm<CommentFormType>();
  const handlePostSubmit: SubmitHandler<PostFormType> = async (values) => {
    await fetch(`${URL_POSTS}/posts`, {
      method: "POST",
      body: JSON.stringify({ content: values.content, title: values.title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleCommentSubmit: SubmitHandler<CommentFormType> = async (
    values,
  ) => {
    const id = 1;
    await fetch(`${URL_COMMENTS}/posts/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: values.content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      <div class="flex mx-auto max-w-[600px] justify-center">
        <div class="">
          <h2>Create new post</h2>
          {/* POST FORM*/}
          <Post.Form onSubmit={handlePostSubmit}>
            <Post.Field name="title">
              {(field, props) => <input {...props} type="text" />}
            </Post.Field>
            <Post.Field name="content">
              {(field, props) => <input {...props} type="text" />}
            </Post.Field>
            <button>Submit</button>
          </Post.Form>
        </div>
        <div>
          <h2>Create a new comment</h2>
          {/* COMMENT FORM*/}
          <Comment.Form onSubmit={handleCommentSubmit}>
            <Comment.Field name="content">
              {(field, props) => <input {...props} type="text" />}
            </Comment.Field>
            <button class="">Submit</button>
          </Comment.Form>
        </div>
      </div>
    </>
  );
}

export default App;
