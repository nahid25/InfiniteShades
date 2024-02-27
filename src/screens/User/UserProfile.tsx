import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Button } from '@chakra-ui/react';

const UserProfile = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login'); // Ensure this route matches your login page route
    });
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Name: {user.displayName || 'Anonymous'}</p>
          <p>Email: {user.email}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}

<Link to="/User/Settings">
      <Button
      fontWeight="400"
      color="#707070"
      borderColor="green"
      variant="outline"
      _hover={{ color: "#000000", borderColor: "green" }}
      size="md"
      fontSize="sm"
      >
      Settings

      </Button>
      </Link>
    </div>
)};

export default UserProfile;
