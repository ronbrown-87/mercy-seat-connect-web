import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Reply, Heart, Share2, Trash2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginDialog } from './LoginDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number; // epoch ms
  likes: number;
  likedBy: Set<string>; // Track who liked the comment
  replies: Comment[];
}

interface SermonCommentsProps {
  sermonId: number;
  sermonTitle: string;
}

export const SermonComments: React.FC<SermonCommentsProps> = ({ sermonId, sermonTitle }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginReason, setLoginReason] = useState('');

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      setLoginReason(`Please sign up or log in to ${action}`);
      setShowLoginDialog(true);
      return false;
    }
    return true;
  };

  const handleCommentSubmit = () => {
    if (!handleAuthRequired('comment on sermons')) return;
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: user!.name || 'Anonymous',
      content: newComment,
      timestamp: Date.now(),
      likes: 0,
      likedBy: new Set(),
      replies: []
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleReplySubmit = (parentId: string) => {
    if (!handleAuthRequired('reply to comments')) return;
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: user!.name || 'Anonymous',
      content: replyContent,
      timestamp: Date.now(),
      likes: 0,
      likedBy: new Set(),
      replies: []
    };
    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    setReplyContent('');
    setReplyTo(null);
  };

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (!handleAuthRequired('like comments')) return;
    
    const userId = user!.id || user!.email || 'anonymous';
    
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply.id === commentId) {
                  const newLikedBy = new Set(reply.likedBy);
                  if (newLikedBy.has(userId)) {
                    newLikedBy.delete(userId);
                    return { ...reply, likes: Math.max(0, reply.likes - 1), likedBy: newLikedBy };
                  } else {
                    newLikedBy.add(userId);
                    return { ...reply, likes: reply.likes + 1, likedBy: newLikedBy };
                  }
                }
                return reply;
              })
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          const newLikedBy = new Set(comment.likedBy);
          if (newLikedBy.has(userId)) {
            newLikedBy.delete(userId);
            return { ...comment, likes: Math.max(0, comment.likes - 1), likedBy: newLikedBy };
          } else {
            newLikedBy.add(userId);
            return { ...comment, likes: comment.likes + 1, likedBy: newLikedBy };
          }
        }
        return comment;
      }));
    }
  };

  const handleDelete = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== commentId)
            }
          : comment
      ));
    } else {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/sermons#${sermonId}`;
    navigator.clipboard.writeText(url);
    // You can add a toast notification here if you have a toast system
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const CommentComponent: React.FC<{ comment: Comment; isReply?: boolean; parentId?: string }> = ({ 
    comment, 
    isReply = false, 
    parentId 
  }) => {
    const userId = user?.id || user?.email || 'anonymous';
    const isLiked = comment.likedBy.has(userId);
    
    return (
      <div className={`${isReply ? 'ml-8 pl-4 border-l-2 border-gray-200' : 'border-l-2 border-blue-200 pl-4'}`}>
        <div className="flex space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
              {comment.author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-sm text-gray-900">{comment.author}</span>
              <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
            </div>
            
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs h-8 px-3 transition-all duration-200 ${
                  isLiked 
                    ? 'text-red-500 hover:text-red-600 bg-red-50' 
                    : 'text-gray-500 hover:text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => handleLike(comment.id, isReply, parentId)}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{comment.likes}</span>
              </Button>
              
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-3 text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              )}
              
              {isAuthenticated && user?.name === comment.author && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(comment.id, isReply, parentId)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
            
            {replyTo === comment.id && (
              <div className="mt-4 space-y-3 p-3 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="text-sm resize-none"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleReplySubmit(comment.id)}>
                    Post Reply
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {comment.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {comment.replies.map(reply => (
              <CommentComponent 
                key={reply.id} 
                comment={reply} 
                isReply={true} 
                parentId={comment.id} 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6">
        {/* New Comment Form */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {isAuthenticated ? user?.name : 'Guest User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isAuthenticated ? 'Share your thoughts on this sermon' : 'Please sign up or log in to comment'}
                  </p>
                </div>
              </div>
              
              <Textarea
                placeholder={isAuthenticated ? "What did you think about this sermon? Share your insights..." : "Please sign up or log in to comment"}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none border-0 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={!isAuthenticated}
                onClick={() => !isAuthenticated && handleAuthRequired('comment')}
              />
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {isAuthenticated ? 'Share your thoughts respectfully and thoughtfully' : 'Sign up to join the conversation'}
                </p>
                <Button 
                  onClick={handleCommentSubmit}
                  disabled={!isAuthenticated || !newComment.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Comments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Comments ({comments.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-gray-600 hover:text-gray-800"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Sermon
            </Button>
          </div>
          
          {comments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No comments yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to share your thoughts on this sermon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map(comment => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        reason={loginReason}
      />
    </>
  );
};