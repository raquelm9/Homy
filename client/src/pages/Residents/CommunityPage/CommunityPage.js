import React, {useState, useEffect} from 'react'
import SimpleBottomNavigation from '../../../components/Layouts/SimpleBottomNavigation'
import ResidentPost from '../../../components/ResidentPost/ResidentPost'
import './CommunityPage.css'
import HttpService from "../../../services/http-service";



function CommunityPage() {
    // const [posts, setPosts] = useState([
    //     {
    //     username:"arni", 
    //     caption:"I'll be back, homy",
    //     imageUrl:"https://miro.medium.com/max/700/1*WNr4o3XKVcb556Al3beWAQ.jpeg",
    //     userAvatarUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/220px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg"
    //     },
    //     {
    //     username:"VanDame", 
    //     caption:"I love challenges. If you don't have any and can do whatever you want, then it's probably time to die.",
    //     imageUrl:"https://fastly.syfy.com/sites/syfy/files/jean_claude_van_damme-jcvd-amazon_prime-syfy_wire.jpg",
    //     userAvatarUrl:"https://www.denofgeek.com/wp-content/uploads/2013/04/jean-claud-main.jpg?fit=640%2C380"
    //     }
    // ])

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        loadAllPosts()
    }, []);

    const loadAllPosts = () => {
        new HttpService().getAllPosts().then(
          (data) => {
            setAllPosts(data);
          },
          (err) => {}
        );
      };


    const mappingPosts = (posts) => {
        return (
        posts.map((post, key) => (
            <ResidentPost username={post.username} caption={post.caption} imageUrl={post.imageUrl} userAvatarUrl={post.avatarUrl} key={key} comments={post.comments}/>
        ))
        )
    }

    return (
        <div className="community--page">
            <div className="community--page__posts">

            
            { mappingPosts(allPosts) }
            {/* comment section  */}
            {/* Footer navbar */}
            </div>
            <div className="community--page__bottom">
            <SimpleBottomNavigation/>
            </div>
        </div>
    )
}

export default CommunityPage
