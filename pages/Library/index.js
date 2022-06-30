import React from "react";
import MyLayout from "../../component/layout/MyLayout";
import Card from "../../component/base/Card";
import axios from "axios";
import { useRouter } from "next/router";

const Library = ({ recipes }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h3>loading......</h3>;
  }
  return (
    <div>
      <MyLayout title="Library">
        <div className="row">
          {recipes.map((item) => (
            <div key={item.id} className="col">
              <Card
                key={item.id}
                img={item.image}
                title={item.title}
                onClick={() => {
                  router.push(`/Library/${item.id}`);
                }}
              ></Card>
            </div>
          ))}
        </div>
      </MyLayout>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data: RespData } = await axios.get("http://localhost:4000/v1/recipes");
  return {
    props: {
      recipes: RespData.data,
    },
  };
};

export default Library;
