// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../../../_metronic/_partials/controls";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UploadInput from "../../../../../../../../_metronic/_partials/controls/forms/UploadInput";
// Validation schema

export function ArticleEditForm({
  saveArticle,
  article,
  actionsLoading,
  onHide,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", process.env.REACT_APP_BASE_URL + "/auth/upload");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        
        reject(error);
      });
    });
  }

  const ArticleEditSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Minimum 2 symboles")
      .max(200, "Maximum 200 symboles")
      .required("Le titre de l'article est obligatoire"),
    priority: Yup.number()
      .min(0, "Minimum 1")
      .max(100, "Maximum 100")
      .required("La Priorité est obligatoire"),
    content: Yup.string(),
    articleImg: article?._id ? Yup.mixed().optional() : Yup.mixed().required(),
  });

  useEffect(() => {
    if (article?.content) {
      const contentBlock = htmlToDraft(article.content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [article]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={article}
        validationSchema={ArticleEditSchema}
        onSubmit={(values) => {
          
          saveArticle(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="title"
                      component={Input}
                      placeholder="Titre d'article"
                      label="Titre d'article"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="priority"
                      component={Input}
                      type="number"
                      placeholder="Priorité"
                      label="Priorité"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="tw-pb-4">Choisir image d'article</div>
                    <UploadInput
                      type="file"
                      name="articleImg"
                      href={article.articleImg ? article.articleImg : undefined}
                      placeholder="L'image d'article"
                      setFieldValue={setFieldValue}
                      error=""
                      errorText=""
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="tw-pb-4">Entrer le contenu d'article</div>
                    <Editor
                      editorState={editorState}
                      initialContentState
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName tw-border tw-h-96"
                      toolbar={{
                        image: {
                          uploadCallback: uploadImageCallBack,
                        },
                      }}
                      onEditorStateChange={(editorState) => {
                        setEditorState(editorState);
                        setFieldValue(
                          "content",
                          draftToHtml(
                            convertToRaw(editorState.getCurrentContent())
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Annuler
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Enregistrer
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
