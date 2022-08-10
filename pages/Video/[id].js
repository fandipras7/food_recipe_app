import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './video.module.css'
import moment from 'moment'
import axios from 'axios'
import MyLayout from '../../component/layout/MyLayout'

const Video = ({ recipe, isLogin }) => {
    const [title, setTitle] = useState()
    const [video, setVideo] = useState()
    const [create, setCreate] = useState()

    useEffect(() => {
        setTitle(recipe.title)
        setVideo(recipe.video)
        setCreate(recipe.created_at)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MyLayout isAuth={isLogin} title="Detail Video">
                <main className='mt-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8 mt-5'>
                                <h5 className='mb-2'>{title}</h5>
                                {video && (
                                    <video width="700"
                                        className={`${styles.videos} mt-2`}
                                        controls
                                    >
                                        <source src={video} />
                                    </video>
                                )}
                                <h3 className={`${styles.titleVideo} mt-3 `}>{title}</h3>
                                <p className="text-secondary mt-2">
                                    {moment(create).format("LLLL")}
                                </p>
                            </div>
                            <div className={`${styles.sugestion} col-lg-3 mb-5 `}>
                                <h3 className={`${styles.next}`}>Next </h3>
                                <div className={`${styles.imageStep} mt-3`}>
                                    <img src="/assets/img/Rectangle 90.png" alt="" />
                                    <h4 className={`${styles.step}  text-white`}>[Step 5]</h4>
                                    <p className={`${styles.caption} `}>
                                        Beef Steak with Curry Sauce - [Step 5] Saute condiments
                                        together until turn brown
                                    </p>
                                    <p className={`${styles.subCaption}  text-secondary`}>
                                        HanaLohana - 3 month ago
                                    </p>
                                </div>
                                <div className={`${styles.imageStep} mt-5`}>
                                    <img src="/assets/img/Rectangle 330.png" alt="" />
                                    <h4 className={`${styles.step}`}>[Step 5]</h4>
                                    <p className={`${styles.caption} `}>
                                        Beef Steak with Curry Sauce - [Step 5] Saute condiments
                                        together until turn brown
                                    </p>
                                    <p className={`${styles.subCaption}  text-secondary`}>
                                        HanaLohana - 3 month ago
                                    </p>
                                </div>
                                <div className={`${styles.imageStep} mt-5`}>
                                    <img src="/assets/img/Rectangle 91.png" alt="" />
                                    <h4 className={`${styles.step}  text-white`}>[Step 5]</h4>
                                    <p className={`${styles.caption} `}>
                                        Beef Steak with Curry Sauce - [Step 5] Saute condiments
                                        together until turn brown
                                    </p>
                                    <p className={`${styles.subCaption}  text-secondary`}>
                                        HanaLohana - 3 month ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </MyLayout>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
      const token = context.req.cookies;
      console.log(token);
      const recipeID = context.params.id;
      console.log(recipeID);
      
      let isLogin = false;
  
      if (context.req.cookies) {
        isLogin = true;
      }
      const { data: RespData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipeID}`
      );
      console.log(RespData.data);
      return {
        props: {
          isLogin,
          recipe: RespData.data,
        },
      };
    } catch (error) {
      console.log(error);
    }

    return {
        props: {}
    }
  }

export default Video