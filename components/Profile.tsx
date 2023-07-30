import React from 'react';

interface ProfileProps {
  name?: string | null,
  desc?: string,
  data?: {},
  handleEdit?: (post: any) => void,
  handleDelete?: (post: any) => void
}

const Profile: React.FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <div>
      
    </div>
  )
}

export default Profile
