import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    // Function to fetch all posts at once
    const fetchPosts = async () => {
        try {
            const response = await appwriteService.getPosts();
            if (response && response.data) {
                setPosts(response.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Error fetching posts.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                {error && <p className="text-red-500">{error}</p>}
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {posts.map((post) => (
                        <div key={post._id} className='p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
