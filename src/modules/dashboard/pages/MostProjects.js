import React from "react";
import { useOutletContext } from "react-router-dom";
import DashboardContentLayout from "../../DashboardContentLayout";
import LatestChanges from "../../component/LatestChanges";
import RepositoryList from "../../component/RepositoryList";
import SEO from "../../../components/SEO";

const MostProjects = () => {
	const { user, projects, loading, error } = useOutletContext();

	return (
		<DashboardContentLayout user={user} loading={loading} error={error}>
			<SEO 
				title="Featured Projects - OpenNest-Africa"
				description="Browse popular projects and join teams working on impactful open source ideas from around the world."
			/>
			<div className="flex gap-5">
				<RepositoryList repos={projects} loading={loading} error={error} />
				<LatestChanges />
			</div>
		</DashboardContentLayout>
	);
};

export default MostProjects;
