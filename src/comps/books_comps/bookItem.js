import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../../services/service';
import { toast } from 'react-toastify';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";



export default function BookItem(props) {

  let item = props.item;
  const [isHovered, setIsHovered] = useState(false);
  const [isFavored, setIsFavored] = useState(props.isFavored);


  useEffect(() => { }, [isFavored])


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


  const onLikeClick = async (_bookId) => {
    let url = API_URL + "/wishes";
    console.log(_bookId);
    let dataBody = { book_id: _bookId };
    try {
      const resp = await doApiMethod(url, "POST", dataBody);
      console.log(resp.data);
      setIsFavored(true);
    } catch (err) {
      console.log(err);
      toast.error("There problem front- onLikeclick come back later");
    }
    console.log("hi");
  }


  const onDislikeClick = async (_bookId) => {
    // let url = API_URL + "/wishes";
    // console.log(_bookId);
    // let dataBody = { upload_id: _bookId };
    // try {
    //   const resp = await doApiMethod(url, "POST", dataBody);
    //   console.log(resp.data);
    //   setIsFavored(true);
    // } catch (err) {
    //   console.log(err);
    //   toast.error("There problem front- onLikeclick come back later");
    // }
    // console.log("hi");
  }


  return (
    <tr>
      {props.isAdmin && (<td>
        <button onClick={onDelClick} className='badge bg-danger'>
          Del
        </button>
      </td>)}
      <td>
        <div className={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {
            !isHovered && !isFavored &&
            <FavoriteBorderIcon sx={{ width: 33, height: 33 }} />
          }
          {
            isHovered && !isFavored &&
            <FavoriteIcon onClick={() => onLikeClick(item._id)} sx={{ color: "red", width: 33, height: 33 }} />
          }
          {
            isFavored &&
            <FavoriteIcon onClick={() => onDislikeClick(item._id)} sx={{ color: "red", width: 33, height: 33 }} />
          }
        </div></td>
      <td>{item.publisher}</td>
      <td>{item.author_name}</td>
      <td>{item.type}</td>
      <td>{item.supervision}</td>
      <td>{item.subjectId.subject}</td>
      <td>{item.class}</td>
      <td>{item.name}</td>
    </tr>
  )
}
