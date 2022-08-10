import React, { useState } from "react";
import style from "./add.module.css";
import MyLayout from "../../component/layout/MyLayout";
import Input from "../../component/base/Input";
import Button from "../../component/base/Button";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

const AddRecipe = ({token, isLogin}) => {
  // const isLogin = localStorage.getItem("isLogin");
  // const token = localStorage.getItem('token')
  const router = useRouter();
  const [dataRecipe, setDataRecipe] = useState({
    title: "",
    ingredients: "",
    image: "",
    video: "",
  });

  const [title, setTitle] = useState("Next");

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

  async function fetchData(dataform) {
    try {
      setTitle("Next...");
      // const result = await axios.post("http://localhost:4000/v1/recipes", dataform, { "content-type": "multipart/form-data", withCredentials: true });
      const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, dataform, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const recipes = result.data.data;
      Swal.fire({
        icon: "success",
        text: "Add Recipe Success"
      })
      router.push("/Home");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Add Recipe Failed"
      })
    }
  }

  const handleAddProduct = (e) => {
    const data = new FormData();
    data.append("title", dataRecipe.title);
    data.append("image", dataRecipe.image);
    data.append("ingredients", dataRecipe.ingredients);
    data.append("video", dataRecipe.video);
    e.preventDefault();
    fetchData(data);
  };

  return (
    <>
      <MyLayout isAuth={isLogin} title="Add Recipe">
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
              <div className={`${style.image} row`}>
                <img className="text-center" src={imagePriview} alt="" />
              </div>
              <div className={style.bingkai}>
                <input type="file" className={`form-control ${style.inputFile}`} accept="image/" onChange={(e) => uploadImage(e)} />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
              <Input name="title" onChange={handleChange} border="none" width="100%" placeholder="Title"></Input>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
              <textarea style={{ height: "250px" }} /*value={dataProduct.description} */ name="ingredients" onChange={handleChange} className="form-control" placeholder="Ingredients: example input(bawang merah,bawang putih,cabai)" aria-label="With textarea"></textarea>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className={`col-8 mt-5`}>
              <input type="file" className={`form-control`} accept="video/" onChange={(e) => uploadVideo(e)} />
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
              {title}
            </Button>
          </div>
        </div>
      </MyLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  let isLogin = false

  if(!token) {
    console.log('redirect halaman add recipe');

    return {
      redirect: {
        permanent: false,
        destination: "Auth/Login"
      }
    }
  } else{
    isLogin = true
  }
  // console.log(isAuth);

  return {
    props: {
      token,
      isLogin
      // isAuth
    }
  }
  
}

export default AddRecipe;
