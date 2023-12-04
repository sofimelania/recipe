import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4';
import MyRecipesComponents from './MyRecipesComponent';

function App() {
  const MY_ID="4e9e8e0b";
 const  MY_KEY="144572513fa06c21f7ce94fa55168f66";
  const [mySearch, setMySearch]=useState("");
  const [myRecipes, setMyRecipes]=useState([]);
  const [wordSubmitted, setWordSubmitted]=useState("avocado")

useEffect(() => {
  const getResipe=async() => {
    const responce=await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}_id=${MY_ID}_key=${MY_KEY}`);
    const data=await responce.json();
   setMyRecipes(data.hits);
console.log(data.hits)
 }
 getResipe()
}, [wordSubmitted])

const myRecipeSearch=(e) => {
  console.log(e.target.value)
  setMySearch(e.target.value)
}
const finalSearch=(e) =>{
  e.preventDefault()
  setWordSubmitted(mySearch)
}
  return (
    <div className="App">
<div className='container'>
<video autoPlay muted loop>
<source src={video} type='video/mp4'/>
</video>
<h1>Find the Recipe</h1>
</div>

<div className='container'>
     <form onSubmit={finalSearch}>
         <input className='search' placeholder='Search...'onChange={myRecipeSearch} value={mySearch}></input>
    </form>
</div>

<div className='container'>
     <button onClick={finalSearch}>
         <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
      </button>
</div>

{myRecipes.map((element, index )=> (
  <MyRecipesComponents key={index}
  label={element.recipe.label} 
  image={element.recipe.image} 
  calories={element.recipe.calories} 
  ingredients={element.recipe.ingredients}/>
))}


    </div>
  );
}

export default App;



