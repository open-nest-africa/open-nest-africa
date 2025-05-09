import React from 'react'
import SEO from '../../../components/SEO'

const DashboardHome = () => {
  return (
    <div className="p-6">
      <SEO 
        title="Sopo Home Projects - OpenNest-Africa"
        description="Discover and contribute to Sopo Home open source projects. Join our community of developers making an impact."
      />
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Your Contributions</h3>
          <p className="text-gray-600">Track your open source contributions and see your impact on the community.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
          <p className="text-gray-600">View and manage the open source projects you're currently contributing to.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Community Activity</h3>
          <p className="text-gray-600">Stay updated with the latest discussions and events in the OpenNest community.</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome;