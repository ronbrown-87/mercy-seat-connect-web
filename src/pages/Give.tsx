import React, { useState } from 'react';
import { Heart, DollarSign, Users, BookOpen, Building2, Utensils, ArrowLeft, CreditCard, Shield, Lock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { useNavigate } from 'react-router-dom';

interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  goal: number;
  raised: number;
  color: string;
}

const Give = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const donationCategories: DonationCategory[] = [
    {
      id: "tithes",
      name: "Tithes",
      description: "Give your tithes to support the church's mission and ministry.",
      icon: <Heart className="w-6 h-6" />,
      goal: 50000,
      raised: 0,
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
    },
    {
      id: "offerings",
      name: "Offerings",
      description: "Give a special offering to support specific projects and needs.",
      icon: <DollarSign className="w-6 h-6" />,
      goal: 25000,
      raised: 0,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: "missions",
      name: "Missions",
      description: "Support our global missions and outreach programs.",
      icon: <Users className="w-6 h-6" />,
      goal: 30000,
      raised: 0,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      id: "building-fund",
      name: "Building Fund",
      description: "Contribute to the church's building and maintenance fund.",
      icon: <Building2 className="w-6 h-6" />,
      goal: 100000,
      raised: 0,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      id: "community-projects",
      name: "Community Projects",
      description: "Support local community development initiatives.",
      icon: <Utensils className="w-6 h-6" />,
      goal: 15000,
      raised: 0,
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
    {
      id: "youth-ministry",
      name: "Youth Ministry",
      description: "Support our youth programs and activities.",
      icon: <BookOpen className="w-6 h-6" />,
      goal: 20000,
      raised: 0,
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
  ];

  const handleDonate = (category: DonationCategory) => {
    setSelectedCategory(category.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !paymentMethod || !selectedCategory) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setAmount('');
        setPaymentMethod('');
        setSelectedCategory('');
        setNotes('');
        setIsAnonymous(false);
        setIsRecurring(false);
        setRecurringFrequency('');
      }, 3000);
    }, 2000);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <header className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="mr-2 h-6 w-6 text-red-500" /> Give
            </h1>
            <p className="text-gray-600">Support our ministry and make a difference</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Security Notice */}
        <Card className="mb-8 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold mb-1">Secure & Safe Giving</h3>
                <p className="text-green-100">
                  Your donations are processed securely through our trusted payment partners.
                  All transactions are encrypted and protected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {donationCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    ZMW {category.raised.toLocaleString()} / ZMW {category.goal.toLocaleString()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription className="text-gray-600">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{getProgressPercentage(category.raised, category.goal).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(category.raised, category.goal)}%`,
                        backgroundColor: category.color.includes('green') ? '#10b981' :
                                        category.color.includes('blue') ? '#3b82f6' :
                                        category.color.includes('purple') ? '#8b5cf6' :
                                        category.color.includes('orange') ? '#f97316' :
                                        category.color.includes('teal') ? '#14b8a6' :
                                        '#ec4899',
                      }}
                    ></div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDonate(category)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Donate to {category.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation Form */}
        {selectedCategory && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Donation</CardTitle>
              <CardDescription>
                You're donating to:{' '}
                <span className="font-semibold">
                  {donationCategories.find((c) => c.id === selectedCategory)?.name}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="amount">Donation Amount (ZMW) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      required
                      min="1"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-method">Payment Method *</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="apple-pay">Apple Pay</SelectItem>
                        <SelectItem value="google-pay">Google Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      />
                      <Label htmlFor="anonymous">Give Anonymously</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recurring"
                        checked={isRecurring}
                        onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
                      />
                      <Label htmlFor="recurring">Set up Recurring Donation</Label>
                    </div>
                  </div>
                  {isRecurring && (
                    <div>
                      <Label htmlFor="frequency">Recurring Frequency</Label>
                      <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any special instructions or prayer requests..."
                  />
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Your donation is secure</p>
                    <p>We use industry-standard encryption to protect your information</p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isProcessing || !amount || !paymentMethod || !selectedCategory}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Complete Donation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Success Message */}
        {isSuccess && (
          <Card className="mb-8 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Thank You!</h3>
                  <p className="text-green-100">
                    Your donation has been processed successfully. You will receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Giving Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Other Ways to Give</CardTitle>
            <CardDescription>You can also give through these alternative methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">In-Person</h3>
                <p className="text-gray-600 text-sm">
                  Give during Sunday services or visit our office during business hours.
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Bank Transfer</h3>
                <p className="text-gray-600 text-sm">
                  Transfer directly to our church account. Contact us for details.
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Heart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Legacy Giving</h3>
                <p className="text-gray-600 text-sm">
                  Include our church in your estate planning or will.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Give;