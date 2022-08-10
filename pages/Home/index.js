import React, { useEffect } from "react";
import Image from 'next/image'
import MyLayout from "../../component/layout/MyLayout";
import styles from "./home.module.css";
import Card from "../../component/base/Card";
import Input from "../../component/base/Input";
import Button from "../../component/base/Button";
import Footer from "../../component/module/Footer";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Home = ({ recipes, pagination, isLogin }) => {
  // console.log(user);
  const router = useRouter();
  const [page, setPage] = useState({
    page: pagination.page,
    limit: pagination.limit,
  });
  const [keySearch, setKeySearch] = useState("");

  const onHandleChange = (e) => {
    setKeySearch((e.target.name = e.target.value));
  };

  const onHandleSearch = () => {
    router.push(`?search=${keySearch}`);
  };

  const buttonPagination = [];
  for (let i = 0; i < pagination.totalPage; i++) {
    buttonPagination.push(
      <button
        onClick={() => {
          setPage((current) => ({ ...current, page: i + 1 }));
          router.push(`?page=${i + 1}&limit=${page.limit}`);
        }}
      >
        {i + 1}
      </button>
    );
  }

  const option = ["ASC", "DESC"];

  console.log(recipes);

  return (
    <>
      <div className="container-fluid position-relative">
        <div className={styles.sideColor}></div>
        <MyLayout isAuth={isLogin} title="Home">
          <div className={styles.children + " row align-items-center mt-5"}>
            <div className="col-6 text-center">
              <p className="fs-3 fw-bold">
                Discover Recipe <br />& Delicious Food
              </p>
              <div className="position-relative text-center">
                <Input value={keySearch} onChange={(e) => onHandleChange(e)} backgroundColor="light" className="py-3 px-5" placeholder="search restaurant, food"></Input>
                <Button onClick={onHandleSearch} backgroundColor="white" border="none" className={styles.btnSearch + " text-center"}>
                  <i className="bi bi-search"></i>
                </Button>
                <Button
                  onClick={() => {
                    setKeySearch("");
                  }}
                  backgroundColor="white"
                  border="none"
                  className={styles.btnRemove + " text-center"}
                >
                  <i className="bi bi-x"></i>
                </Button>
              </div>
            </div>
            <div className="col-6">
              {/* <img className="img-fluid" src="/assets/img/image_1.png" alt="" /> */}
              <Image
              src="/assets/img/image_1.png"
              alt="pict"
              width={500}
              height={500}
              ></Image>
            </div>
          </div>
          <div className="row d-flex flex-column">
            <div className="col">
              <p
                onClick={() => {
                  router.push("/Library");
                }}
                className={styles.popular + " fs-3"}
              >
                Library OF Recipe
              </p>
            </div>
            <div className="row text-center mb-5">
              <div className="">
                <select
                  className="p-2"
                  style={{ border: "none", backgroundColor: "orange" }}
                  onChange={(e) => {
                    e.target.value !== "none" && router.push(`?sortby=${"title"}&sort=${e.target.value}`);
                  }}
                  name="sort"
                  id="sort"
                >
                  <option value="none">Sort</option>
                  <option value="ASC">SortByName(A-Z)</option>
                  <option value="DESC">sortByName(Z-A)</option>
                </select>
              </div>
            </div>
            <div className="row row-cols-4 justify-content-center">
              {recipes.map((item) => (
                <Card
                  key={item.id}
                  img={item.image}
                  title={item.title}
                  onClick={() => {
                    router.push(`/DetailRecipe/${item.id}`);
                  }}
                ></Card>
              ))}
            </div>
          </div>
          <div className="text-center mt-5 mb-5">{buttonPagination}</div>
        </MyLayout>
        {/* <Footer></Footer> */}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {

  const {token} = context.req.cookies

  let isLogin = false 

  if(token){
    isLogin = true
  }
  // console.log(context);
  let page = 1;
  let limit = 3;
  let search;
  let sort;
  let sortby;
  if (context.query.page || context.query.limit) {
    page = context.query.page;
    limit = context.query.limit;
  }

  if (context.query.search) {
    search = context.query.search;
  }

  if (context.query.sort && context.query.sortby) {
    sort = context.query.sort;
    sortby = context.query.sortby;
  }
  console.log("cek apakah jalan");
  // console.log(sort);
  // console.log(sortby);
  // const cookie = context.req.headers.cookie;

  // console.log(cookie);
  // if (!cookie) {
  //   // Router.replace('/login')
  //   context.res.writeHead(302, {
  //     Location: `http://localhost:3000/Auth/Login`,
  //   });
  //   return {};
  // }

  // , {
  //   withCredentials: true,
  //   headers: {
  //     Cookie: cookie,
  //   },
  // }
  // const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes?page=${page}&limit=${limit}${search && `&search=${search}`}`);
  const { data: RespData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recipes?page=${page}&limit=${limit}${search && `&search=${search}`}`);

  if (sort !== undefined && sortby != undefined) {
    console.log("sort jalan");
    const { data: RespData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recipes?page=${page}&limit=${limit}${sortby && `&sortby=${sortby}`}${sort && `&sort=${sort}`}`);
    return {
      props: {
        recipes: RespData.data,
        pagination: RespData.pagination,
      }, // will be passed to the page component as props
    };
  }

  console.log('apakah jalan');

  // console.log(data);
  return {
    props: {
      recipes: RespData.data,
      pagination: RespData.pagination,
      isLogin
      // isLogin: isLogin,
    }, // will be passed to the page component as props
  };
}

export default Home;
