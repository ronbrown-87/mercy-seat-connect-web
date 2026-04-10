import React, { useState, useRef, useCallback } from 'react';
import { Phone, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

type PaymentStatus = 'idle' | 'submitting' | 'pending' | 'success' | 'failed';

interface MomoPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  categoryId: string;
  onSuccess: (categoryId: string, amount: number) => void;
}

export const MomoPaymentDialog: React.FC<MomoPaymentDialogProps> = ({
  open,
  onOpenChange,
  categoryName,
  categoryId,
  onSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [message, setMessage] = useState('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const resetState = () => {
    setPhoneNumber('');
    setAmount('');
    setStatus('idle');
    setMessage('');
    cleanup();
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      cleanup();
      // Don't reset if success so user sees confirmation
      if (status !== 'success') resetState();
      else setTimeout(resetState, 300);
    }
    onOpenChange(val);
  };

  const pollStatus = (referenceId: string, donationAmount: number) => {
    let attempts = 0;
    const maxAttempts = 18; // ~3 minutes at 10s intervals

    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const { data, error } = await supabase.functions.invoke('momo-pay', {
          body: { referenceId, action: 'status' },
        });

        if (error) {
          console.error('Status check error:', error);
          if (attempts >= maxAttempts) {
            cleanup();
            setStatus('failed');
            setMessage('Payment verification timed out. Please check your MoMo app.');
          }
          return;
        }

        const txStatus = data?.status;
        if (txStatus === 'SUCCESSFUL') {
          cleanup();
          setStatus('success');
          setMessage('🙏 Blessing Received! Thank you for your generous donation.');
          onSuccess(categoryId, donationAmount);
        } else if (txStatus === 'FAILED' || txStatus === 'REJECTED') {
          cleanup();
          setStatus('failed');
          setMessage(`Payment ${txStatus.toLowerCase()}. Please try again.`);
        } else if (attempts >= maxAttempts) {
          cleanup();
          setStatus('failed');
          setMessage('Payment verification timed out. Please check your MoMo app.');
        }
      } catch (err) {
        console.error('Poll error:', err);
        if (attempts >= maxAttempts) {
          cleanup();
          setStatus('failed');
          setMessage('Could not verify payment. Please check your MoMo app.');
        }
      }
    }, 10000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !amount) return;

    setStatus('submitting');
    setMessage('Initiating payment...');

    try {
      const { data, error } = await supabase.functions.invoke('momo-pay', {
        body: { amount, phoneNumber },
      });

      if (error) {
        setStatus('failed');
        setMessage(`Payment failed: ${error.message}`);
        return;
      }

      if (data?.referenceId) {
        setStatus('pending');
        setMessage('📱 Check your phone for the PIN prompt...');
        pollStatus(data.referenceId, parseFloat(amount));
      } else {
        setStatus('failed');
        setMessage(data?.error || 'Unexpected response from payment service.');
      }
    } catch (err: any) {
      setStatus('failed');
      setMessage('An error occurred. Please try again.');
    }
  };

  const isProcessing = status === 'submitting' || status === 'pending';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-yellow-500" />
            Pay with MTN MoMo
          </DialogTitle>
          <DialogDescription>
            Donate to <span className="font-semibold text-foreground">{categoryName}</span> using MTN Mobile Money
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <div className="flex flex-col items-center py-6 gap-3 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in" />
            <p className="text-lg font-semibold text-green-700">{message}</p>
            <Button onClick={() => handleClose(false)} className="mt-2">
              Close
            </Button>
          </div>
        ) : status === 'failed' ? (
          <div className="flex flex-col items-center py-6 gap-3 text-center">
            <XCircle className="h-16 w-16 text-red-500" />
            <p className="text-sm text-red-600">{message}</p>
            <Button onClick={resetState} variant="outline">
              Try Again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="momo-phone">MTN Phone Number</Label>
              <Input
                id="momo-phone"
                type="tel"
                placeholder="e.g. 260971234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isProcessing}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter your number with country code (260...)
              </p>
            </div>
            <div>
              <Label htmlFor="momo-amount">Amount (ZMW)</Label>
              <Input
                id="momo-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
                required
                min="1"
                step="0.01"
              />
            </div>

            {isProcessing && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <Loader2 className="h-4 w-4 animate-spin" />
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Confirm & Pay with MoMo'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
