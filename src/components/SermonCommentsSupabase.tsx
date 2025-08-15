import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Reply, Heart, Share2, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginDialog } from './LoginDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  user_id: string;
  sermon_id: string;
  content: string;
  likes: number;
  created_at: string;
  parent_id?: string;
  profiles?: {
    name: string;
    avatar_url?: string;
  };
}

interface SermonCommentsProps {
  sermonId: string;
  sermonTitle: string;
}

export const SermonCommentsSupabase: React.FC<SermonCommentsProps> = ({ sermonId, sermonTitle }) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginReason, setLoginReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('sermon-comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `sermon_id=eq.${sermonId}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sermonId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles!inner(name, avatar_url)
        `)
        .eq('sermon_id', sermonId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      setLoginReason(`Please sign up or log in to ${action}`);
      setShowLoginDialog(true);
      return false;
    }
    return true;
  };

  const handleCommentSubmit = async () => {
    if (!handleAuthRequired('comment on sermons')) return;
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            user_id: user!.id,
            sermon_id: sermonId,
            content: newComment.trim()
          }
        ]);

      if (error) throw error;
      
      setNewComment('');
      toast({
        title: "Success",
        description: "Your comment has been posted!",
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!handleAuthRequired('reply to comments')) return;
    if (!replyContent.trim()) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            user_id: user!.id,
            sermon_id: sermonId,
            content: replyContent.trim(),
            parent_id: parentId
          }
        ]);

      if (error) throw error;
      
      setReplyContent('');
      setReplyTo(null);
      toast({
        title: "Success",
        description: "Your reply has been posted!",
      });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!handleAuthRequired('like comments')) return;
    
    try {
      const comment = comments.find(c => c.id === commentId);
      if (!comment) return;

      const { error } = await supabase
        .from('comments')
        .update({ likes: comment.likes + 1 })
        .eq('id', commentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error liking comment:', error);
      toast({
        title: "Error",
        description: "Failed to like comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user!.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Comment deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/sermons#${sermonId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Success",
      description: "Sermon link copied to clipboard!",
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = Date.now();
    const commentTime = new Date(timestamp).getTime();
    const diff = now - commentTime;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const topLevelComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  const CommentComponent: React.FC<{ comment: Comment; isReply?: boolean }> = ({ 
    comment, 
    isReply = false 
  }) => {
    const replies = getReplies(comment.id);
    
    return (
      <div className={`${isReply ? 'ml-8 pl-4 border-l-2 border-gray-200' : 'border-l-2 border-blue-200 pl-4'}`}>
        <div className="flex space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.profiles?.avatar_url} />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
              {comment.profiles?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-sm text-gray-900">{comment.profiles?.name || 'User'}</span>
              <span className="text-xs text-gray-500">{getTimeAgo(comment.created_at)}</span>
            </div>
            
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-3 text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                onClick={() => handleLike(comment.id)}
              >
                <Heart className="w-4 h-4 mr-1" />
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
              
              {isAuthenticated && user?.id === comment.user_id && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(comment.id)}
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
                  <Button 
                    size="sm" 
                    onClick={() => handleReplySubmit(comment.id)}
                    disabled={submitting || !replyContent.trim()}
                  >
                    {submitting ? 'Posting...' : 'Post Reply'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {replies.map(reply => (
              <CommentComponent 
                key={reply.id} 
                comment={reply} 
                isReply={true} 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading comments...</div>;
  }

  return (
    <>
      <div className="space-y-6">
        {/* New Comment Form */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.avatarUrl} />
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
                  disabled={!isAuthenticated || !newComment.trim() || submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Comments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Comments ({topLevelComments.length})
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
          
          {topLevelComments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No comments yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to share your thoughts on this sermon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {topLevelComments.map(comment => (
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