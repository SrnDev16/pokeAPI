import { FaTrashAlt } from "react-icons/fa";

const FavPoke = ({fav,deleteFav}) => {
    if(fav.length === 0){
        return <h1>Your favorite is empty....</h1>
    }else{

        return (
          <>
                   <h1>Your favorite</h1>
              <div className="flex flex-wrap text-center">
                  {fav.map((item,index)=> (
                      <div key={index}>
                          <img src={item.sprites?.other.home.front_default} alt=""  style={{height: "100px", width:"100px"}}/>
                          <button className="p-2 bg-indigo-300 rounded" onClick={()=>deleteFav(item)}>{<FaTrashAlt style={{color:"white"}}/>}</button>
                      </div>
                  ))}
              </div>
          </>
        )
    }
}

export default FavPoke