import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Field, Formik, Form, ErrorMessage } from "formik";
import Switch from "react-switch";
import "./PostModel.css";
import { addPost, editPost } from "./PostApi";
import * as Yup from "yup";
import { imageUrl } from "../Config/vars";

function PostModel({ show, setShow, type, selectedPost }) {
  const initialValues = {
    title: selectedPost?.title || "",
    description: selectedPost?.description || "",
    image: selectedPost?.image || "",
    publish: selectedPost?.publish || false,
    status: selectedPost?.status || 0,
    features: selectedPost?.features || [],
  };

  const handleClose = () => setShow(false);
  const onsubmit = (values) => {
    console.log(values);

    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("description", values.description);
    formdata.append("image", values.image);
    formdata.append("publish", values.publish);
    formdata.append("status", values.status);
    formdata.append("features", JSON.stringify(values.features));

    handleClose();
    {
      type === 1 ? addPost(formdata) : editPost(formdata, selectedPost._id);
    }
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title Feild Is Required"),
    description: Yup.string().required("Description Feild Is Required"),
    image: Yup.string().required("Image Feild Is Reuqired"),
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{type === 1 ? "Create" : "Edit"} Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={onsubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <label htmlFor="title">Title</label>
                <Field type="text" name="title" id="title" />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="title"
                  component={"div"}
                />

                <label htmlFor="description">Description</label>
                <Field as="textarea" name="description" id="description" />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="description"
                  component={"div"}
                />
                <div className="switch">
                  <Switch
                    onChange={(checked) => setFieldValue("publish", checked)}
                    checked={values.publish}
                  />
                </div>
                <div className="radio-group">
                  <label htmlFor="status">Status</label>
                  <label>
                    <Field type="radio" name="status" value="0" /> In-Active
                  </label>
                  <label>
                    <Field type="radio" name="status" value="1" /> Active
                  </label>
                </div>
                <div className="checkbox-group">
                  <label htmlFor="features">Features</label>
                  <label>
                    <Field type="checkbox" name="features" value="MERN" /> MERN
                  </label>
                  <label>
                    <Field type="checkbox" name="features" value="MEAN" /> MEAN
                  </label>
                  <label>
                    <Field type="checkbox" name="features" value="MEVN" /> MEVN
                  </label>
                  <label>
                    <Field type="checkbox" name="features" value="SQL" /> SQL
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="features"
                      value="PROSTAGE-SQL"
                    />{" "}
                    PROSTAGE-SQL
                  </label>
                  <label>
                    <Field type="checkbox" name="features" value="GRAPH-QL" />{" "}
                    GRAPH-QL
                  </label>
                  <label>
                    <Field type="checkbox" name="features" value="AWS" /> AWS
                  </label>
                </div>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="image" component={"div"} />
                {values.image && (
                  <div>
                    <img
                      src={
                        selectedPost?.image
                          ? `${imageUrl}${values.image}`
                          : URL.createObjectURL(values.image)
                      }
                    />
                  </div>
                )}
                <div className="modal-footer">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="close-btn"
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    {type === 1 ? "Add Post" : "Update Changes"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostModel;
