import React, { useState, useEffect } from "react";
// import {Card} from 'react-bootstrap';

// import SimpleBottomNavigation from "../../../components/Layouts/SimpleBottomNavigation";
import ResidentPost from "../ResidentPost/ResidentPost";
import Announcements from '../../pages/Residents/CommunityPage/Announcements';
import "../../pages/Residents/CommunityPage/CommunityPage.css";
import HttpService from "../../services/http-service";
import SimpleBottomNavigationManager from "../Layouts/SimpleBottomNavigationManager";


function MngrCommuneView() {
  const [allPosts, setAllPosts] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  useEffect(() => {
    loadAllPosts();
    loadAllAnnouncements();
  }, []);

  const loadAllPosts = () => {
    new HttpService().getAllPosts().then(
      (data) => {
        const newData = [...data].reverse()
        setAllPosts(newData);
      },
      (err) => {}
    );
  };

  const loadAllAnnouncements = () => {
    new HttpService().getAllAnnouncements().then(
      (data) => {
        setAllAnnouncements(data);
      },
      (err) => {}
    );
  };

  const mappingPosts = (posts) => {
    // console.log(posts)
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


  const mappingAnnouncements = (announcements) => {
    // console.log(announcements)
    return announcements.map((announcement, key) => (
      <Announcements
      username={announcement.username}
      image={announcement.image}
      title={announcement.title}
      announcement={announcement.announcement}
      key={key}
      />
    ));
  };




  return (
    <div className="community--page">
      {/* {allAnnouncements && wrapAnnoucements} */}
      {mappingAnnouncements(allAnnouncements)}
      <div className="community--page__posts">
        {mappingPosts(allPosts)}
        {/* comment section  */}
        {/* Footer navbar */}
      </div>
      <div className="community--page__bottom">
        <SimpleBottomNavigationManager/>
      </div>
    </div>
  );
}

export default MngrCommuneView;

