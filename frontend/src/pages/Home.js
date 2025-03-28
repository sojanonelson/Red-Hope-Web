import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '../components/component';
import Aboutdonation from '../components/Aboutdonation';
import { Link } from 'react-router-dom';
import CallToActionSection from '../components/CallToAction';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
          
          </div>
        </div>
      </nav>

      {/* Hero sectic f fn */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 bg-white md:pb-20 lg:w-full lg:max-w-2xl">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Save Lives with</span>
                  <span className="block text-red-600">Blood Donation</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                  Connect with blood donors in your area. Find the blood type you need or help others by donating. Every donation can save up to three lives.
                </p>
               
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link to='/register' state={{ userType: 'recipient' }}>
                <button className="px-8 py-6 bg-red-600 hover:bg-red-700 text-white">I Need Blood</button></Link>
                <Link to='/register' state={{ userType: 'donor' }}><button variant="outline" className="px-8 py-6">Become a Donor</button></Link>
                 
                  
                </div>
               
               
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-red-100">
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-red-500 opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Search section */}
      {/* <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow-lg rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Find Blood Donors Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <select className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500">
                  <option>Select Blood Type</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2">
                <Search size={16} />
                Search Donors
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Stats section */}

      <Aboutdonation/>

      {/* How it works section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">Simple steps to donate or receive blood</p>
          </div>

          <Tabs defaultValue="need" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="need">I Need Blood</TabsTrigger>
              <TabsTrigger value="donate">I Want to Donate</TabsTrigger>
            </TabsList>
            <TabsContent value="need">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">1</div>
                    <CardTitle>Register</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Create an account and complete your profile with all necessary details</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">2</div>
                    <CardTitle>Search</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Search for donors matching your blood type requirements and location</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">3</div>
                    <CardTitle>Connect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Contact donors directly through our secure messaging system</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="donate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">1</div>
                    <CardTitle>Register</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Create your donor profile with blood type and contact information</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">2</div>
                    <CardTitle>Verify</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Complete health screening and verification process for donor approval</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">3</div>
                    <CardTitle>Donate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Respond to donation requests and help save lives</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

     

     <CallToActionSection/>


</div>
  )}