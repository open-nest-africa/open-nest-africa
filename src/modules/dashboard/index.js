import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";
import useFetchUser from "../../hooks/useFetchUser";
import SEO from "../../components/SEO";

const Dashboard = () => {
	const { user, error: userError, loading: userLoading } = useFetchUser();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const navigate = useNavigate(); 

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			navigate("/signup");
		} else {
			const fetchProjects = async () => {
				try {
					const response = await axios.get(
						"https://api.github.com/search/repositories?q=topic:hacktoberfest+is:public&sort=stars&order=desc"
					);
					setProjects(response?.data?.items);
				} catch (err) {
					setError("Error fetching projects: " + err.message);
				} finally {
					setLoading(false);
				}
			};

			fetchProjects();
		}
	}, [navigate]);

	return (
		<Layout
			userName={user?.login}
			fullName={user?.name}
			githubAvatar={user?.avatar_url}
		>
			<SEO 
				title="Dashboard - OpenNest-Africa"
				description="Manage your OpenNest-Africa profile, track your contributions, and access project resources. Your central hub for open source collaboration."
			/>
			<Outlet context={{ user, projects, loading, error }} />
		</Layout>
	);
};

export default Dashboard;
