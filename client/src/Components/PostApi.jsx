import { apiUrl } from "../Config/vars";

export const addPost = (formdata, id) => {
  fetch(`${apiUrl}/newPost`, {
    method: "POST",
    body: formdata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response Was Not Ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Post created successfully:", data);
    })
    .catch((error) => console.log("Error While Posting The Data", error));
};

export const handleDelete = (postId) => {
  fetch(`${apiUrl}/deletePost/${postId}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network Response Was Not OK, Error While Deleting The Post"
        );
      }
      return response.json();
    })
    .then(() => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    })
    .catch((error) => console.error("Error While Deleting The Post", error));
};

export const editPost = (formdata, postId) => {
  fetch(`${apiUrl}/editPost/${postId}`, { method: "PUT", body: formdata })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network Response Was Not OK, Error While Deleting The Post"
        );
      }
      return response.json();
    })
    .then((data) => console.log("Post Has Been Edited Successfully", data))
    .catch((error) => console.error("Error While Deleting The Post", error));
};

export const viewPost = async (page, limit, title,status,publish) => {
  try {
    const paramsObj = { };
    if(title){
      paramsObj.title = title
    }

    if(status){
      paramsObj.status = status
    }
    if(publish !== undefined){
      paramsObj.publish= publish
    }

    let searchParams = new URLSearchParams(paramsObj);
      searchParams = searchParams.toString()


    let url = `${apiUrl}/viewPost?page=${page}&limit=${limit}`
    if(searchParams){
        url = `${url}&${searchParams}`
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
