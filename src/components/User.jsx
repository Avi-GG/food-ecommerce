import React, { useEffect } from "react";
import { useState } from "react";
import Shimmer from "./Shimmer";

//example of functional component
const User = () => {
	const token = process.env.REACT_APP_GITHUB_TOKEN;
	console.log(token);

	const [useData, setUseData] = useState([]);
	const [repo, setRepo] = useState([]);
	useEffect(() => {
		fetchData();
		fetchRepos();
	}, []);

	const fetchData = async () => {
		const data = await fetch("https://api.github.com/users/Avi-GG", {
			headers: {
				Authorization: `token ${token}`,
			},
		});
		const json = await data.json();
		setUseData(json);
		console.log(json);
	};
	const fetchRepos = async () => {
		const data = await fetch("https://api.github.com/users/Avi-GG/repos", {
			headers: {
				Authorization: `token ${token}`,
			},
		});
		const json = await data.json();
		setRepo(json);
		console.log(json);
	};

	if (!useData && !repo) {
		return <Shimmer />;
	}

	return (
		<>
			<div className="user-card flex items-center flex-col w-full">
				<h1 className="m-5 font-bold text-2xl text-center">About me</h1>
				<div className="flex justify-center w-8/12 h-72 rounded-lg shadow-black-50 shadow-lg m-5">
					{console.log(useData)}
					<div className="w-full flex justify-center items-center">
						<img
							className="w-52 rounded-[50%]"
							src={useData.avatar_url}
							alt=""
						/>
					</div>
					<div className="flex justify-center items-center my-auto w-full">
						<div>
							<h2 className="font-bold text-2xl mb-2">{useData.name}</h2>
							<p>{useData.bio}</p>
						</div>
					</div>
				</div>

				<div className=" flex flex-col items-center  w-8/12 m-5 rounded-lg ">
					{Array.isArray(repo) &&
						repo.length > 0 &&
						repo.map((repos) => (
							<div
								key={repos.id}
								className="w-full h-52 border-b-2 border-gray-200 m-5 flex "
							>
								<div className="w-9/12 flex justify-center items-center">
									<div className="w-9/12">
										<h1 className="font-bold text-xl">{repos.name}</h1>
										<p>{repos.description}</p>
										<p className="text-gray-400 text-sm">
											Updated on {repos.updated_at.slice(0, 10)}{" "}
											{repos.updated_at.slice(11, -1)}
										</p>
									</div>
								</div>
								<div className="w-3/12 flex justify-center items-center">
									<a
										href={repos.html_url}
										className="p-3 rounded-lg bg-green-600 text-white"
									>
										Visit Repo
									</a>
								</div>
							</div>
						))}
				</div>

				<h5>Location - Muzaffarnagar</h5>
				<p>Contact - heyitsyoavi@gmail.com</p>
			</div>
		</>
	);
};

export default User;
