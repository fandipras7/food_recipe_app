import React from "react";
import MyLayout from "../../component/layout/MyLayout";
import style from "../../styles/profile.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Card from "../../component/base/Card";
import Button from "../../component/base/Button";
import { useRouter } from "next/router";

const Profile = ({ myrecipe }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("my recipe");
  const deleteRecipe = (id) => {
    axios
      .delete(`http://localhost:4000/v1/recipes/${id}`, { withCredentials: true })
      .then((res) => {
        alert("success");
      })
      .catch((err) => {
        alert("error");
      });
  };
  return (
    <>
      <MyLayout title="profile">
        <main>
          <div className={style.profile}>
            <img src="/assets/img/profile.png" alt="" />
            <img src="/asset/svg/edit.svg" className={style.edit} alt="" style={{ cursor: "pointer" }} onClick={() => setEdit((edit) => !edit)} />
            <div className={edit ? style.menu : style.menuActive}>
              <p>
                <Link href="/profile/edit">Change photo profile</Link>
              </p>
              <hr style={{ margin: "0" }} />
              <p>
                <Link href="/profile/edit">Change password</Link>
              </p>
            </div>
          </div>
          {/* <h2 style={{ margin: "40px auto", textAlign: "center" }}>{myrecipe[0].name}</h2>  */}
          <h2 style={{ margin: "40px auto", textAlign: "center" }}>{myrecipe.name}</h2>
          <div className={style.navigation}>
            <ul>
              <li className={selected == "my recipe" ? style.recipeActive : ""} onClick={() => setSelected("my recipe")}>
                My Recipe
              </li>
              <li className={selected == "saved recipe" ? style.recipeActive : ""} onClick={() => setSelected("saved recipe")}>
                Saved Recipe
              </li>
              <li className={selected == "liked recipe" ? style.recipeActive : ""} onClick={() => setSelected("liked recipe")}>
                Liked Recipe
              </li>
            </ul>
            <div className="row row-cols-3 justify-content-center">
              {myrecipe?.map((item) => (
                <Card
                  key={item.id}
                  img={item.image}
                  title={item.title}
                  onClick={() => {
                    router.push(`/DetailRecipe/${item.id}`);
                  }}
                >
                  <div className="row mb-2">
                    <div className="col-2">
                      <Button
                        onClick={() => {
                          deleteRecipe(item.id);
                        }}
                        backgroundColor="#EFC81A"
                        color="white"
                        border="none"
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="col-2">
                      <Button
                        className="px-4"
                        onClick={() => {
                          router.push(`/EditRecipe/${item.id}`);
                        }}
                        backgroundColor="#EFC81A"
                        color="white"
                        border="none"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  {/* <div className="row mt-5">
                    <div className="col">
                      <Button
                        onClick={() => {
                          deleteRecipe(recipes.id);
                          router.push("/Home");
                        }}
                        backgroundColor="#EFC81A"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/EditRecipe/${recipes.id}`);
                        }}
                        backgroundColor="#EFC81A"
                      >
                        Edit
                      </Button>
                    </div>
                  </div> */}
                </Card>
              ))}
            </div>
            {/* <div className={style.area}>{data ? data.map((recipe) => <Card key={recipe.id} title={recipe.title} id={recipe.id} image={recipe.image} />) : <h1>Sorry No Recipe Found</h1>}</div> */}
          </div>
        </main>
      </MyLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  // const cookie = context.req.headers.cookie;
  const { token } = context.req.cookies;
  // console.log(cookie);
  if (!token) {
    // Router.replace('/login')
    console.log("apakah redirect jalan");
    // context.res.writeHead(302, {
    //   Location: `http://localhost:3000/Auth/Login`,
    // });

    return {
      redirect: {
        permanent: false,
        destination: "/Auth/Login",
      },
    };
  }
  // const { data: responData } = await axios.get(`http://localhost:4000/v1/myrecipe`, {
  //   withCredentials: true,
  //   headers: {
  //     Cookie: token,
  //   },
  // });

  // coba pake bearer token
  const { data: responData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/myrecipe`, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
  });

  return {
    props: {
      myrecipe: responData.data,
    }, // will be passed to the page component as props
  };
}

export default Profile;
