// import React from "react";
// import Navbar from "../../component/module/Navbar";
// import Footer from "../../component/module/Footer";
// import styles from "./detail.module.css";
// import Button from "../../component/base/Button";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// const DetailLibrary = ({ recipe }) => {
//   const router = useRouter();
//   // console.log(id);

//   console.log(recipe);

//   return (
//     <div className="position-relative">
//       <Navbar></Navbar>
//       <div className="mb-5">
//         <div className="container">
//           <div className="row justify-content-center mt-5 text-center">
//             <p className="fs-3">{recipe.title}</p>
//             <div className={styles.frameImage + "  position-relative"}>
//               <img className="img-fluid" src={recipe.image} alt="" />
//             </div>
//           </div>
//           <div className="row mt-5">
//             <div className="col">
//               <p className="fs-5">Ingredients</p>
//               {recipe.ingredients && recipe.ingredients.split(",").map((item) => <p key={item.id}>- {item}</p>)}
//             </div>
//           </div>
//           <div className="row mt-5">
//             <div className="col">
//               <p className="fs-5">Video step</p>
//               <Button
//                 onClick={() => {
//                   router.push(recipe.video);
//                 }}
//                 backgroundColor="#EFC81A"
//               >
//                 <i className="bi bi-play-fill"></i>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer></Footer>
//     </div>
//   );
// };

// export async function getStaticPaths(context) {
//   // const id = context.params.id
//   const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes`);
//   const paths = RespData.data.map((item) => {
//     return {
//       params: {
//         id: item.id + "",
//       },
//     };
//   });
//   console.log(paths);
//   return {
//     paths: paths,
//     fallback: false, // false or 'blocking'
//   };
// }

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   console.log(id);
//   const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes/${id}`);
//   return {
//     props: {
//       recipe: RespData.data,
//     },
//   };
// };

// export default DetailLibrary;
