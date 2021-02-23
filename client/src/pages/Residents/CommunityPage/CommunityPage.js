import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';

import SimpleBottomNavigation from "../../../components/Layouts/SimpleBottomNavigation";
import ResidentPost from "../../../components/ResidentPost/ResidentPost";
import Announcements from '../CommunityPage/Announcements';
import "./CommunityPage.css";
import HttpService from "../../../services/http-service";

function CommunityPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  useEffect(() => {
    loadAllPosts();
    loadAllAnnouncements();
  }, []);



  const loadAllPosts = () => {

    new HttpService().getAllPosts().then(
      (data) => {
        if (!data.error) {
          const newData = [...data].reverse()
          setAllPosts(newData);
        }

      },
      (err) => { }
    );
  };

  const loadAllAnnouncements = () => {
    new HttpService().getAllAnnouncements().then(
      (data) => {
        if (!data.error) setAllAnnouncements(data);
      },
      (err) => { }
    );
  };

  const mappingPosts = (posts) => {
    console.log(posts)
    return posts.map((post, key) => (
      <ResidentPost
        postId={post._id}
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
    console.log(announcements)
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

  // const wrapAnnoucements = () => (
  //   <Card>
  //   <Card.Header as="h2">Announcements</Card.Header>
  //   {mappingAnnouncements(allAnnouncements)}
  //   </Card>
  // )


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
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}

export default CommunityPage;
