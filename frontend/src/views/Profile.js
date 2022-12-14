import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } =  useAuth0();
    const [userMusicList, setUserMusicList] = React.useState([]);
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        if(user) {
            //infinite re-render is caused as the function is re-created every single time page is re-rendered, causing a loop
            const getUserMusic = async (userId) => { //declare function inside useEffect hook, since otherwise it will infinitely re-render
                try {
                    const token = await getAccessTokenSilently();

                    const response = await fetch(
                        `${serverUrl}/api/user-music/get-user-music?userId=${userId}`,  
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    
                    const responseData = await response.json();
                    setUserMusicList(responseData)
        
                } catch (error) {
                    console.log(error)
                }
              };
            getUserMusic(user.sub)
        }
    }, [user, serverUrl]);
    
    return (
        isAuthenticated && (
            <div>
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {/* <div> {JSON.stringify(user, null, 2)}</div> */}
            </div>
            <ListGroup as="ol" numbered>
                {userMusicList.map((item, index) => (
                        <ListGroup.Item key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{ item.videoTitle}</div>
                          {item.videoUrl}
                        </div>
                        <Badge bg="primary" pill>
                        {/* we eventually want this to be the actual genre!! */}
                        {item.musicGenre ? item.musicGenre : "Not Classified"} 
                        </Badge>
                      </ListGroup.Item>
                ))}
        
          </ListGroup>
          </div>

        )
    )
}

export default Profile