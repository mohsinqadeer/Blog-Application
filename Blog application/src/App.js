import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import UserService from './services/UserService';
import PostService from './services/PostService';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';





export default function OutlinedCard() {

  const [loading, setLoading] = useState(false)             // to check data is loaded. 
  const [users, setUsers] = useState([])                     /// state variable for user. Varibale update it render the page  hold all the users that fetching user form user api                                                        
  const [posts, setPosts] = useState([])                  /// State variable for posts. variable update it render the page
  const [current_user, setId] = useState("None")          /// to update the current state of user hold the currently selected user id
  const [filteredUsers, setfilterUsers] = useState([])    /// state variable for  filter user in array with first letter.  render the list of user

  // const [filterpost, setFilterpost] = useState("")




  const loadUsers = async () => {
    setLoading(true)                                          
    let loaded_users = await UserService.getUsers()          /// function check laoded user if true condition used below got excuted and show set loading and false to remove that loading after rendering 
    setLoading(false)
    setUsers(loaded_users)

    console.log(users)                                       
    setfilterUsers(loaded_users)
  }

  const loadPosts= async (event)=>{                          /// this function laod posts and target the post by id so id corrosponding with user got selectd only and don't show all the posts
    setId(String(event.target.id))
    let user_posts=await PostService.getPosts(event.target.id)
    setPosts(user_posts)

  }

  const searchUser= (event)=>{                                     /// 
   var filteredText = event.target.value 
    
    if(users.length != 0){
      const tempUsers = users.filter(user => {                                /// Search the user by name
       if( user.name.toLowerCase().startsWith(filteredText.toLowerCase()))
       return user
        });
        setfilterUsers(tempUsers)
    }
  }

  return (

    <Grid container spacing={0} direction="row" alignitems="center" justifyContent="center" style={{ padding: '100px' }}>
    
        <Grid item xs={6} >
          <CardContent style={{ border: '2px', borderStyle: 'solid', paddingLeft: '10px' }}>
            <p>Select User Id: {current_user} </p>
            <TextField
              id="filled-search"
              label="Search"
              type="search"
              variant="filled"
              onChange={searchUser}
              style={{ paddingRight: '50px' }}
            />
             <ol>
            {filteredUsers.map((user) => (
              <li id={user.id} onClick={loadPosts}>
                <Link id={user.id} href="#">
                  {" "}
                  {user.name}
                </Link>
              </li>
            ))}
          </ol>
            {(loading==true) ? <p>Loading...</p> : <></>}                // condtion if nothing is selected it shows not loaded, If you select the user it will show its loading and it will disappear                                                                        
            {(current_user=='None') ? <p>Not Loaded</p> : <></>}         // Post section will also disapper until user is selected   
           
               
                <Stack spacing={2} direction="row">
                <Button onClick={loadUsers} variant="contained">Load Users</Button>
                </Stack>
          </CardContent >
          </Grid>

          {(current_user=='None') ? <></> :                            /// here its none then it won't show the section of the side users. because there are no posts to display.
          <Grid item xs={6} >
          <CardContent style={{ border: '2px', borderStyle: 'solid', paddingRight: '20px' }}>
            <TextField 
              id="filled-search"
              label="Please select user"
              type="search"
              //onchange={setFilterpost(event.target.value)}
              variant="filled"
            />
            <ol>
              {posts.map(post=>(<li>{post.body}</li>))}

              {/* // {posts.map(post=>{

                return post.body.include(filterPost) ? <li>post.body</li> : <li></li>
              })} */}
            </ol>

          </CardContent>
          </Grid>
}


        </Grid>
  

  );
}