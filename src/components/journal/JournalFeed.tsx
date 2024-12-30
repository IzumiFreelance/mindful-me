import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Post, Comment } from '../../types';
import { getItem, setItem } from '../../utils/storage';
import { getCurrentUser } from '../../utils/auth';

export default function JournalFeed() {
  const posts = getItem<Post[]>('posts') || [];
  const currentUser = getCurrentUser();

  return (
    <div className="space-y-6">
      {posts.map(post => {
        const [newComment, setNewComment] = useState('');

        const addComment = (e: React.FormEvent) => {
          e.preventDefault();
          if (!currentUser || !newComment.trim()) return;

          const updatedPosts = posts.map(p => {
            if (p.id === post.id) {
              return {
                ...p,
                comments: [...p.comments, {
                  id: Date.now().toString(),
                  userId: currentUser.id,
                  postId: p.id,
                  content: newComment,
                  timestamp: new Date()
                }]
              };
            }
            return p;
          });

          setItem('posts', updatedPosts);
          setNewComment('');
        };

        return (
          <div key={post.id} className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {post.comments.length} Comments
                </span>
              </div>
              
              <div className="space-y-2">
                {post.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={addComment} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Comment
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}