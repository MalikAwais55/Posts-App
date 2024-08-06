import React, { useEffect, useState } from "react";
import { ENV } from "../Config/vars";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./ViewPost.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import PostModel from "./PostModel";
import { handleDelete, viewPost } from "./PostApi";
import Select from 'react-select';
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";

function ViewPost() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState();
  const [publish, setPublish] = useState();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [pagination, setPagination] = useState({})


  const handlePageChange = async (page) => {
    const { Post, pagination } = await viewPost(page, postPerPage, title, status, publish);
    setCurrentPage(page)
    setPosts(Post)
    setPagination(pagination)
  };

  const statusOptions = [
    { value: '1', label: 'Active' },
    { value: '0', label: 'In-Active' },
  ];

  const publishOptions = [
    { value: true, label: 'Publish' },
    { value: false, label: 'Un-Publish' },
  ];

  const handleSearchClick = async () => {
    const { Post, pagination } = await viewPost(currentPage, postPerPage, title, status, publish);
    setPosts(Post);
    setPagination(pagination)

  };

  const handleReset = () => {
    setTitle('');
    setStatus();
    setPublish(null);
    fetchData()
  };

  const handleChangeState = (posttype, post) => {
    setShow(true);
    setType(posttype);
    setSelectedPost(post);
    setPosts(selectedPost);
  };


  const fetchData = async () => {
    try {
      const { Post, pagination } = await viewPost(currentPage, postPerPage);
      setPosts(Post);
      setPagination(pagination)
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (postId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {handleDelete(postId); fetchData()}
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <>
      <div className="form-container">
        <div className="main-input">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="form-input m-0"
            style={{ height: "38px" }}
          />
        </div>
        <Select
          options={statusOptions}
          onChange={(option) => setStatus(option.value)}
          placeholder="Select status..."
          value={statusOptions.filter(option => option.value === status)}
        />
        <Select
          options={publishOptions}
          onChange={(option) => setPublish(option.value)}
          placeholder="Select publish status..."
          value={publishOptions.filter(option => option.value === publish)}
        />
        <button className="btn2" onClick={handleSearchClick}>Search Here</button>
        <button className="btn3" onClick={handleReset}>Reset Field</button>
        <div className="btn-outer">
          <button className="btn1" onClick={() => handleChangeState(1)}>
            Add Post
          </button>
        </div>
      </div>
      <PostModel
        show={show}
        setShow={setShow}
        type={type}
        selectedPost={selectedPost}
        fetchData={fetchData}
      />
      <div className="card-wrapper">
        <div className="card-component">
          <div className="card-container">
            {posts?.map((post) => (
              <Card key={post._id} className="card">
                <Card.Img variant="top" src={`${ENV.imageUrl}${post.image}`} />
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
                      onClick={() => handleChangeState(2, post)}
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
      <Pagination
        total={pagination?.total}
        pageSize={postPerPage}
        current={currentPage}
        onChange={(page) => handlePageChange(page)}
        className="pagination"
      />

    </>
  );
}

export default ViewPost;
