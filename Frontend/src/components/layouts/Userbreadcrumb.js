import React, { Component,useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { loginuser } from '../../api';
import { useHistory } from 'react-router';

const Userbreadcrumb =()=>  {
    const [user,setuser]=useState({});
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState("");

    const displayImage= {
        
        width: 140,
        height: 160,
        zIndex: 2,
        padding: 10,
        borderRadius: 40 / 2,
        marginTop: 20,
        marginLeft: 10,
        justifycontent:'center',
        alignItems:'center'
    }

    useEffect(() => {
        loginuser({
            user:Cookies.get('id')
        })
            .then(function (response) {
                  console.log("data:::   ",response);
                if (response.data.message == true) {
                   try {
                   setuser(response.data.user);                
                  } catch (e) {
                    return null;
                  } 
                } else if (response.data.message === false) {
                    console.log("rror: ", response.data.error)
                }
    
            })
            .catch(function (error) {
    
            });
        
    }, [])

    

        return (
            <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(/images/img2.png)" }}>
                <div className="container">
                    <div className="media" style={{display:'flex',flexDirection:'row'}}>
                        {user.picture==null?<img src={process.env.PUBLIC_URL + "/assets/img/people/1.jpg"} alt="agent" />:<img src={user.picture} style={displayImage} alt="agent" />}
                        {/* <img src={process.env.PUBLIC_URL + "/assets/img/people/1.jpg"} alt="agent" /> */}
                        <div className="media-body">
                            <h3 className="text-white">{user.name}</h3>
                            <span className="user-email">{user.email}</span>
                        </div>
                    
                         {/* (<button  className="btn-custom secondary mr-0"  onClick={()=>onRequest()}>Request Listings <i className="fas mr-0 fa-plus" /> </button>)} */}
                        
                    </div>
                </div>
            </div>
        );
    }


export default Userbreadcrumb;