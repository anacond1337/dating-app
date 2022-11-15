import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { Fab, Typography, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import SignalWifiBadIcon from "@mui/icons-material/SignalWifiBad";
import Confetti from "react-confetti";

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
	const [itsAMatch, setItsAMatch] = useState(false);

  /* The visual effect lasts 2,5 sec after a match. */
	useEffect(() => {
		setTimeout(() => {
			setItsAMatch(false);
		}, 2500);
	}, [matchCounter]);

	function handleLikes() {
    setLikesCounter(likesCounter + 1);
    /* Setting the match chance to 40%. */
		let rolledNumber = Math.floor(Math.random() * 100) + 1;
		if (rolledNumber <= 40) {
			setMatchCounter(matchCounter + 1);
			setItsAMatch(true);
		}
		refetch();
	}

	function handleRejects() {
		setRejectCounter(rejectCounter + 1);
		refetch();
	}

  /* Loading handling. */
	if (isLoading) {
		return (
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "90vh",
					flexDirection: "column",
				}}>
				<CircularProgress />
				<Typography>Loading...</Typography>
			</Container>
		);
	}

  /* Error handling. */
	if (isError) {
		return (
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "90vh",
					flexDirection: "column",
				}}>
				<SignalWifiBadIcon />
				<Typography color="error">Failed to load the page!</Typography>
			</Container>
		);
	}

  /* Confetti effect on match. */
	if (itsAMatch) {
		return (
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "90vh",
				}}>
				<Confetti />
				<Typography
					color="error"
					sx={{ fontSize: "30px", fontFamily: "cursive" }}>
					ITS A MATCH!!!
				</Typography>
			</Container>
		);
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
        {/* Person name */}
			<Typography
				sx={{
					fontSize: "30px",
				}}>{`${person.name.first} ${person.name.last}`}</Typography>
        {/* Person picture */}
			<img src={person.picture.large} />
        {/* Person location */}
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
      {/* Counter container */}
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
