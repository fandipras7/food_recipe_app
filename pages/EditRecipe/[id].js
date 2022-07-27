import React, { useState } from "react";
import MyLayout from "../../component/layout/MyLayout";
import Input from "../../component/base/Input";
import Button from "../../component/base/Button";
import style from "./edit.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

const EditRecipe = ({token}) => {

  const router = useRouter();
  const id = router.query.id;
  const [dataRecipe, setDataRecipe] = useState({
    title: "",
    ingredients: "",
    image: "",
    video: "",
  });

  const [title, setTitle] = useState("Next");

  const [videoTitle, setVideoTitle] = useState("");

  const handleChange = (e) => {
    setDataRecipe({
      ...dataRecipe,
      [e.target.name]: e.target.value,
    });
  };
  const [imagePriview, setImagePriview] = useState("assets/img/imagePreview.png");

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setDataRecipe({
      ...dataRecipe,
      image: file,
    });
    setImagePriview(URL.createObjectURL(file));
  };

  const uploadVideo = (e) => {
    const file = e.target.files[0];
    setDataRecipe({
      ...dataRecipe,
      video: file,
    });
  };

  //   console.log(dataRecipe);

  async function fetchData(dataform, id, token) {
    try {
      setTitle("Next...");
      const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, dataform, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const recipes = result.data.data;
      alert("Edit data success");
      router.push(`/DetailRecipe/${id}`);
      // console.log(recipes);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddProduct = (e) => {
    const data = new FormData();
    data.append("title", dataRecipe.title);
    data.append("image", dataRecipe.image);
    data.append("ingredients", dataRecipe.ingredients);
    data.append("video", dataRecipe.video);
    e.preventDefault();
    fetchData(data, id, token);
  };

  async function fetchDataId(id) {
    try {
      const result = await axios({
        method: "GET",
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        url: `/recipes/${id}`,
      });
      const recipes = result.data.data;
      setDataRecipe({
        ...dataRecipe,
        title: recipes.title,
        ingredients: recipes.ingredients,
      });
      setImagePriview(recipes.image);
      setVideoTitle(recipes.video);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(dataRecipe);

  useEffect(() => {
    // console.log(id);
    console.log("apakah ini jalan");
    console.log(id);
    fetchDataId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <MyLayout title="Add Recipe">
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
              <div className={`${style.image} row`}>
                <img className="img-fluid" src={imagePriview} alt="" />
              </div>
              <input type="file" className="form-control" accept="image/" onChange={(e) => uploadImage(e)} />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
              <Input value={dataRecipe.title} name="title" onChange={handleChange} border="none" width="100%" placeholder="title"></Input>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
              <textarea
                value={dataRecipe.ingredients}
                style={{ height: "250px" }}
                /*value={dataProduct.description} */ name="ingredients"
                onChange={handleChange}
                className="form-control"
                placeholder="Ingredients"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>
          <div className="row">
            {/* <p>{videoTitle}</p> */}
            <div className="mt-5 text-center">
              <label htmlFor="">{videoTitle}</label>
              <div className="row justify-content-center">
                <div className={`col-8 mt-5`}>
                  <input type="file" className={`form-control`} accept="video/" onChange={(e) => uploadVideo(e)} />
                </div>
              </div>
              {/* <input type="file" className="form-control" accept="video/" onChange={(e) => uploadVideo(e)} /> */}
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <Button
              onClick={(e) => {
                handleAddProduct(e);
              }}
              width="20%"
              border="none"
              backgroundColor="#EFC81A"
            >
              Next
            </Button>
          </div>
        </div>
      </MyLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  // const cookie = context.req.headers.cookie;
  const { token } = context.req.cookies;
  console.log(context.req.cookies);


  return {
    props: {
      token
    }, // will be passed to the page component as props
  };
}

export default EditRecipe;
