import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import Group1Image from "../Imagecomponent/Images/Group1.png"
import KeazonBookImage from "../Imagecomponent/Images/KeazoNBOOKS.png"
import findImage from "../Imagecomponent/Images/find.png"
import bx_bx_Image from "../Imagecomponent/Images/bx_bx-book-heart.png"
import fluentImage from "../Imagecomponent/Images/fluent_premium-person-20-regular.png"
import ic_roundImage from "../Imagecomponent/Images/ic_round-notifications-none.png"
import imgImage from "../Imagecomponent/Images/IMG20210528181544.png"

const SearchBar=()=>{

    const [data, setData] = useState([]);
    const[display ,setDisplay] = useState("")

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response1 = await axios.get("https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes");
          const response2 = await axios.get("https://www.googleapis.com/books/v1/volumes?q=harry+potter");
  
          const combinedData = [...response1.data.items, ...response2.data.items];
          setData(combinedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
  
    function displayDetails(volumeInfo){
      setDisplay(volumeInfo)
       console.log(volumeInfo)
  
    }
   
    
     function nowRead(link){
      window.location.href = link
     }
     function moreInfo(link){
    
      window.location.href = link
     }
  
  
    return (
      <div>
       
        <div className="navbar">
          <div className="left">
            <div className="logo">
              <img src= {Group1Image} alt="image1" />
            </div>
            <div className="textlogo">
            <img src= {KeazonBookImage} alt="image2" />
            </div>
          </div>
          <div className="middle">
            <div className="searchImg">
            <img src={findImage} alt="seachImg" />
            </div>
            <input type="text" placeholder="Search for the book you want and read it now... Sherlock Holmes, Harry Pot..."/>
            <button className="searchBtn">Search</button>
  
          </div>
          <div className="right">
            <div className="image1"><img src = {bx_bx_Image}/></div>
            <div className="image2"><img src = {ic_roundImage}/></div>
            <div className="image3"><img src = {fluentImage}/></div>
            <div className="image4"><img src = {imgImage}/></div>
          </div>
        </div>
      {
        (display !== "")  && <div className="display">
          <div className="display-img">
             <img src = {display.imageLinks.thumbnail} />
          </div>
          <div className="restDetails">
              <h1 className="heading">{display.title}</h1>
              <div className="authorDetails">
                 <h3>{display.authors}</h3>
                 <p><span>{display.publishedDate}</span></p>
              </div>
              <p className="para">{display.description}</p>
              <div className="Extra-info">
                  <p>Avg Rating : <span>{display.averageRating || 5}</span></p>
                  <p>Rating Count : <span>{display.ratingsCount || 8}</span></p>
                  <p>Publisher : <span>{display.publisher}</span></p>
                  <p>Language : <span>{display.language.toUpperCase()}</span></p>
              </div>
              <div className="btn">
                <button onClick={e => nowRead(display.previewLink)}>Now Read</button>
                <button onClick={e => moreInfo(display.infoLink)}>More Info</button>
              </div>
          </div>
        </div>
        }
        <div className="data">
          <div className="container">
            {data.map((Element) => (
              <div className="books" onClick={(e) => displayDetails(Element.volumeInfo)}  >
               l
                  <img src={Element.volumeInfo.imageLinks.thumbnail} />
                
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchBar;