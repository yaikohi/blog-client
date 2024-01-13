import { createResource, For } from "solid-js";
import "./App.css";
import { CommentForm, PostForm } from "./forms";
// https://github.com/fabian-hiller/modular-forms/issues/157
async function fetchPosts() {
  const url = `http://localhost:4002/posts`;
  const resp = await fetch(url, { method: "GET" });
  const res = await resp.json();

  return res;
}

function App() {
  const [posts] = createResource(fetchPosts);

  return (
    <>
      <div class="flex-col mx-auto max-w-[400px] justify-center">
        <h1>Blog!</h1>
        <h2>Posts</h2>
        <PostForm />
        <div>
          {/* POSTS */}
          {posts.loading && <p>Posts are loading...</p>}
          {posts.error && <p>Error...</p>}
          {posts() && (
            <>
              <For each={posts()}>
                {(post) => (
                  <>
                    <div class="p-4 border-2 border-green-700 rounded-xl my-8">
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <CommentForm postId={post.id} />
                      {/* COMMENTS */}
                      <div class="">
                        {post.comments && (
                          <>
                            <For each={post.comments}>
                              {(c) => (
                                <>
                                  <div class="flex justify-between my-12">
                                    <p>{c.content}</p> <span>{"<<"}</span>
                                  </div>
                                </>
                              )}
                            </For>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </For>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
