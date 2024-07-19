import React, { useEffect, useState } from "react";
import { apiUrl, imageUrl } from "../Config/vars";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./ViewPost.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import PostModel from "./PostModel";
import { handleDelete } from "./PostApi";

function ViewPost() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleChangeState = (posttype, post) => {
    setShow(true);
    setType(posttype);
    setSelectedPost(post);
    setPosts(selectedPost)
  };

  console.log(imageUrl, "imageUrl");

  useEffect(() => {
    fetch(`${apiUrl}/viewPost`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPosts(data.Post))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleClick = (postId) => {
    handleDelete();
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(postId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <button className="btn1" onClick={() => handleChangeState(1)}>
        Add Post
      </button>
      <PostModel
        show={show}
        setShow={setShow}
        type={type}
        selectedPost={selectedPost}
      />
      <div className="card-wrapper">
        <div className="card-component">
          <div className="card-container">
            {posts?.map((post) => (
              <Card key={post._id} className="card">
                <Card.Img variant="top" src={`${imageUrl}${post.image}`} />
                <Card.Body className="card-body">
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Card.Text>{post.publish}</Card.Text>
                  <Card.Text>{post.status}</Card.Text>
                  <Card.Text>{post.features}</Card.Text>
                  <div className="button-container">
                    <Button
                      style={{ backgroundColor: "#be3144" }}
                      onClick={() => handleClick(post._id)}
                    >
                      Delete Post
                    </Button>
                    <Button
                      style={{ backgroundColor: "#be3144" }}
                      onClick={() => handleChangeState(2,post)}
                    >
                      Edit Post
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPost;
