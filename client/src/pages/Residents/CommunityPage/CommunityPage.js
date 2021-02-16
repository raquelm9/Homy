import React, { useState, useEffect } from "react";
import SimpleBottomNavigation from "../../../components/Layouts/SimpleBottomNavigation";
import ResidentPost from "../../../components/ResidentPost/ResidentPost";
import Announcements from '../CommunityPage/Announcements';
import "./CommunityPage.css";
import HttpService from "../../../services/http-service";

function CommunityPage() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    loadAllPosts();
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
    console.log(posts)
    return posts.map((post, key) => (
      <ResidentPost
        username={post.username}
        caption={post.caption}
        // imageUrl={post.imageUrl}
        image={post.image}
        userAvatarUrl={post.avatarUrl}
        key={key}
        comments={post.comments}
      />
    ));
  };

  return (
    <div className="community--page">
      <Announcements />
      <div className="community--page__posts">
        {mappingPosts(allPosts)}
        {/* comment section  */}
        {/* Footer navbar */}
      </div>
      <div className="community--page__bottom">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}

export default CommunityPage;
