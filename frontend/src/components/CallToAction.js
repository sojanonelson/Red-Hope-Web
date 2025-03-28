import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  UserPlus, 
  Search, 
  HandHeart, 
  HeartPulse 
} from 'lucide-react';

const CallToActionSection = () => {
  return (
    <div className="bg-gradient-to-br from-red-600 to-red-800 py-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <HeartPulse className="absolute top-10 left-20 text-white" size={200} />
        <HeartPulse className="absolute bottom-10 right-20 text-white" size={150} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-4 mb-4">
            <Heart className="text-white fill-red-500" size={48} />
            Ready to Make a Difference?
            <Heart className="text-white fill-red-500" size={48} />
          </h2>
          <p className="mt-4 text-xl text-red-100 max-w-2xl mx-auto">
            Join our community of compassionate donors and help save lives today. 
            Every donation can be a lifeline for someone in need.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            <Link 
              to='/register' 
              state={{ userType: 'donor' }} 
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <UserPlus 
                  className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" 
                  size={64} 
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Register as Donor
                </h3>
                <p className="text-sm text-gray-600">
                  Become a hero by registering to donate blood
                </p>
              </div>
            </Link>

            <Link 
              to='/search' 
              state={{ userType: 'recipient' }} 
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <Search 
                  className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" 
                  size={64} 
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Find Donors
                </h3>
                <p className="text-sm text-gray-600">
                  Search and connect with potential blood donors
                </p>
              </div>
            </Link>

            <Link 
              to='/donate' 
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <HandHeart 
                  className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" 
                  size={64} 
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Donate Now
                </h3>
                <p className="text-sm text-gray-600">
                  Make an immediate impact by donating today
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;