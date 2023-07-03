import React, { useState } from 'react';
import { API_URL, doApiMethod } from '../../services/service';
import { Avatar, Button, IconButton, Popover } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";



export default function BookItem(props) {

  let item = props.item;
  const [isHovered, setIsHovered] = useState(false);
  

  const onDelClick = async () => {

    let url = API_URL + "/books/" + item._id;
    try {
      let resp = await doApiMethod(url, "DELETE")
      console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem deleteBook - books");
    }
  }

  const onLikeClick = async () => {
    // let url = API_URL + "/foods/changeLike/" + foodId;
    // try {
    //     const resp = await doApiMethod(url, "PATCH");
    //     // console.log(resp.data)
    //     setIsLiked(!isLiked);
    // } catch (err) {
    //     console.log(err);
    //     toast.error("There problem try come back later");
    // }
    console.log("hi");
  }




  return (
    <tr>
      {props.isAdmin && (<td>
        <button onClick={onDelClick} className='badge bg-danger'>
          Del
        </button>
      </td>)}
      <td> <div className={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >{
          !isHovered &&
          <IconButton
            sx={{ width: 33, height: 33 }}
            aria-label="add to favorites"
            onClick={() => {
              // onLikeClick(item._id, user._id);
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        }
        {isHovered &&
          <IconButton
            sx={{ width: 33, height: 33 }}
            aria-label="add to favorites"
          >
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        }
      </div></td>
      <td>{item.publisher}</td>
      <td>{item.author_name}</td>
      <td>{item.type}</td>
      <td>{item.supervision}</td>
      <td>{item.subjectId.subject}</td>
      <td>{item.class}</td>
      <td>{item.name}</td>
      <td>{props.index + 1}</td>
    </tr>
  )
}
