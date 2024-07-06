import { useState, useEffect } from "react";
import FavPoke from "./FavPoke";
import ReactLoading from "react-loading";

const Pokemon = () => {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState([]);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        await setLoading(true);
        await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
          .then((response) => response.json())
          .then((response) => setPoke(response));
      } catch (error) {
        console.error(error.message);
      } finally {
        await setLoading(false);
      }
    };

    getData();
  }, [number]);

  const nextPoke = () => setNumber(number + 1);

  const prevPoke = () => {
    setNumber(number - 1);
    if (number < 2) {
      setNumber(1);
    }
  };

  const addFav = () => {
    setFav((fav) => [...fav, poke]);
  };

  const deleteFav = (favItem) => {
    const newFav = fav.filter((item) => favItem.name !== item.name);
    setFav(newFav);
  };


  if (loading) {
    return (
          <div className="m-auto text-center absolute top-40 left-[40%]">
            <ReactLoading
              type={"spin"}
              color={"#8900EE "}
              height={250}
              width={250}
            />
          </div>
    );
  } else {
    return (
      <div className="border rounded bg-gray-100 flex flex-wrap items-center justify-center max-w-screen-lg m-auto mt-3 shadow">
        <div className="text-center p-2 flex flex-1 flex-wrap flex-col items-center justify-between">
          <h1 className="text-3xl underline">{poke.name}</h1>

          <img
            src={poke.sprites?.other.home.front_default}
            alt={poke.name}
            style={{ height: "" }}
          />
          <button
            className="bg-white p-2 rounded text-indigo-500 hover:bg-slate-200"
            onClick={addFav}
          >
            Favorite
          </button>
          <ul>
            <p className="text-lg underline mt-4">Skill</p>
            {poke.abilities?.map((skill, index) => (
              <li key={index}>{skill.ability.name}</li>
            ))}
          </ul>
          <div className="flex mt-4">
            <button
              className="bg-indigo-500 p-2 rounded text-white hover:bg-indigo-400 mr-3"
              onClick={prevPoke}
            >
              Previous
            </button>
            <button
              className="bg-indigo-500 p-2 rounded text-white hover:bg-indigo-400"
              onClick={nextPoke}
            >
              Next
            </button>
          </div>
        </div>
        <div className="inline-block  min-h-full w-0.5 self-stretch bg-white opacity-100"></div>
        <div className="text-center flex-1 ">
          <FavPoke fav={fav} deleteFav={deleteFav} />
        </div>
      </div>
    );
  }
};

export default Pokemon;
