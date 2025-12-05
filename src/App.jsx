import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [data, setData] = useState([]);
	const url = "https://randomuser.me/api/?results=10";
	const getData = async () => {
		try {
			const response = await axios.get(url);
			const usersSzamlaloval = response.data.results.map(user => ({...user, likes: 0, dislikes: 0 }));
			setData(usersSzamlaloval);
		} catch (error) {
			alert("nem sikerult az api fetch " + error.toString());
		}
	};

	const Like = (index) => {
		setData(prev => prev.map((user, i) => i === index ? { ...user, likes: user.likes + 1 } : user) );
	};

	const Dislike = (index) => {
		setData(prev => prev.map((user, i) => i === index ? { ...user, dislikes: user.dislikes + 1 } : user));
	};
	
	return (
	<>
	  <h1>Userlike</h1>
	  <button onClick={getData}>Lekérdezés</button>
	  {data.map((user, i) => (
		<div className="usercard" key={i}>
		  <div>
			<p>{user.name.first} {user.name.last}</p>
			<img src={user.picture.large} alt={user.name.first} />
		  </div>
		  <div>
			<button onClick={() => Like(i)}>👍</button>
			<button onClick={() => Dislike(i)}>👎</button>
		  </div>
		  <div className="aaa">
			<p>{user.likes}</p>
			<p>{user.dislikes}</p>
		  </div>
		</div>
	  ))}
	</>
	);
	}
export default App;