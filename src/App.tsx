import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card, Button, Col } from 'react-bootstrap';
import { ArticleInterface } from './interfaces';

const App: React.FC = () => {
  const [posts, setPosts] = useState<ArticleInterface[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<ArticleInterface[]>([]);

  const ARTICLES_URL = 'https://jsonplaceholder.typicode.com/posts';

  const fetchData = async (url: string) => {
    try {
      const response = await Axios.get<ArticleInterface[]>(url);
      const date = new Date();
      setPosts(
        response.data.map((post) => ({
          ...post,
          date: date.toLocaleDateString('en-GB'),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    fetchData(ARTICLES_URL); 
  }, []);

  const handlePostSelection = (post: ArticleInterface) => {
    if (selectedPosts.find((selectedPost) => selectedPost.id === post.id)) {
      setSelectedPosts(selectedPosts.filter((selectedPost) => selectedPost.id !== post.id));
    } else if (selectedPosts.length < 10) {
      setSelectedPosts([...selectedPosts, post]);
    }
  };

  const handleSubmit = () => {
    console.log(selectedPosts);
  };

  return (
    <div>
      <h2 className="text-center mb-5">Articles</h2>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <Col key={post.id} xs={12} sm={6} md={4} lg={2} className="mb-5">
            <button className="button-wrap" onClick={() => handlePostSelection(post)}>
              <Card
                className={`${selectedPosts.find((selectedPost) => selectedPost.id === post.id)? 'selected': ''}`}>
                <Card.Body>
                  <Card.Title className="font-weight-bold text-center">
                    {post.title}
                  </Card.Title>
                  <Card.Text className="text-justify">{post.body}</Card.Text>
                  <Card.Text className="text-justify">{post.date}</Card.Text>
                </Card.Body>
              </Card>
            </button>
          </Col>
        ))}
      </div>
      {selectedPosts.length > 0 && (
        <Button className="button-submit" onClick={handleSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default App;