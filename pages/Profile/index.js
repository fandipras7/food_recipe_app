import React, { useEffect } from "react";
import MyLayout from "../../component/layout/MyLayout";
import style from "../../styles/profile.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Card from "../../component/base/Card";
import Button from "../../component/base/Button";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Profile = ({ myrecipe, token, profile }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("my recipe");
  const [avaPreview, setAvaPreview] = useState('')
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('')
  const deleteRecipe = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      })
      .then((res) => {
        alert("success");
      })
      .catch((err) => {
        alert("error");
      });
  };

  const onChangeAva = (e) => {
    let file = e.target.files[0]
    // console.log(file);
    setAvaPreview(URL.createObjectURL(file))
    setAvatar(file)
    // setIsChangePhoto(true);
    // file = null
  }

  const onHandleChange = (e) => {
    setName(e.target.value)
  }

  const updateProfile = async (id) => {
    const dataUser = new FormData();
    dataUser.append("image", avatar)
    dataUser.append("name", name)
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, dataUser, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "update data succes",
          icon: "success",
        });
        setEdit(false)
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: `Gagal Update data`,
          icon: "error",
        });
        setEdit(false)
      });
    setAvaPreview(profile.avatar)
  };

  console.log(name);

  useEffect(() => {
    setName(profile.name)
    setAvaPreview(profile.photo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <MyLayout title="profile">
        <main>
          <div className={style.profile}>
            <img className={style.ava} src={profile ? avaPreview : "/assets/img/profile.png"} alt="" />
            <img src="/assets/pencil.svg" className={style.edit} alt="" style={{ cursor: "pointer" }} onClick={() => setEdit((edit) => !edit)} />
            {/* <p className={style.name}>{profile && profile.name}</p> */}
            <div className={edit ? style.menu : style.menuActive}>
              <label className="text-center" htmlFor="files">Change Photo</label>
              <input
                className="hidden"
                hidden
                type="file"
                id="files"
                onChange={(e) => {
                  onChangeAva(e)
                }}
              />
              <hr style={{ margin: "0" }} />
            </div>
            {/* <p className={style.name}>{profile.name}</p> */}
            <input onChange={(e) => { onHandleChange(e) }} value={name} style={edit ? { border: '1px solid' } : { border: "none" }} disabled={edit ? false : true} className={style.name} placeholder={name} type="text" />
            <button onClick={() => updateProfile(profile.id)} hidden={edit ? false : true} className={style.save}>Save</button>
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
  console.log(context.req.cookies);
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

  const { data: profile } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
  });

  console.log(profile);

  return {
    props: {
      myrecipe: responData.data,
      profile: profile.data,
      token
    }, // will be passed to the page component as props
  };
}

export default Profile;
