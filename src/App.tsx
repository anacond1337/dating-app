import React, { useState } from "react";
import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { Fab, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";

async function fetchPerson() {
	const res = await fetch("https://randomuser.me/api/");
	return res.json();
}

function App() {
	const { data, isLoading, isError, refetch } = useQuery(
		["person"],
		fetchPerson
	);
	const [rejectCounter, setRejectCounter] = useState(0);
	const [likesCounter, setLikesCounter] = useState(0);
	const [matchCounter, setMatchCounter] = useState(0);

	function handleLikes() {
		setLikesCounter(likesCounter + 1);
		let rolledNumber = Math.floor(Math.random() * 100) + 1;
		if (rolledNumber >= 40) {
			setMatchCounter(matchCounter + 1);
		}
		refetch();
	}

	function handleRejects() {
		setRejectCounter(rejectCounter + 1);
		refetch();
	}

	console.log(data);
	if (isLoading) {
		return <h1>Your page is loading...</h1>;
	}

	if (isError) {
		return <h1>Error</h1>;
	}

	const person = data.results[0];

	return (
		<Container
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "90vh",
				flexDirection: "column",
				gap: "1rem",
			}}>
			<Typography
				sx={{
					fontSize: "30px",
				}}>{`${person.name.first} ${person.name.last}`}</Typography>
			<img src={person.picture.large} />
			<Typography>{`${person.location.city}, ${person.location.country}`}</Typography>
			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
				}}>
				<Fab onClick={handleRejects} color="error">
					<ClearIcon />
				</Fab>
				<Fab onClick={handleLikes} color="success">
					<FavoriteIcon />
				</Fab>
			</Container>
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					marginTop: "1rem",
				}}>
				<Typography>{`You liked ${likesCounter} persons.`}</Typography>
				<Typography>{`You rejected ${rejectCounter} persons.`}</Typography>
				<Typography>{`You matched with ${matchCounter} persons.`}</Typography>
			</Container>
		</Container>
	);
}

export default App;
