import React from 'react';
import { Users, GraduationCap, Building, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Abin',
      role: 'Developer',
      department: 'BCA',
      email: 'abin@example.com',
      phone: '+91 9999999999',
      github: 'github.com/abin',
      linkedin: 'linkedin.com/in/abin'
    },
    {
      id: 2,
      name: 'Aswin',
      role: 'Designer',
      department: 'BCA',
      email: 'aswin@example.com',
      phone: '+91 8888888888',
      github: 'github.com/aswin',
      linkedin: 'linkedin.com/in/aswin'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            About <span className="text-red-600">Red Hope</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Connecting blood donors with recipients for a healthier community.
          </p>
        </div>

        {/* College Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 max-w-3xl mx-auto">
          <div className="flex items-center mb-4">
            <Building className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">East West College of Management</h2>
          </div>
          
          <div className="flex items-center mb-4 text-gray-600">
            <GraduationCap className="h-5 w-5 text-red-500 mr-2" />
            <span>BCA Department</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 text-red-500 mr-2" />
            <address className="not-italic">
              123 College Road, Bangalore, Karnataka, India - 560001
            </address>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-red-600 h-3"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role} • {member.department}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 text-red-500 mr-2" />
                      <a href={`mailto:${member.email}`} className="hover:text-red-600">
                        {member.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Phone className="h-4 w-4 text-red-500 mr-2" />
                      <a href={`tel:${member.phone}`} className="hover:text-red-600">
                        {member.phone}
                      </a>
                    </div>
                    
                    <div className="flex space-x-4 mt-4">
                      <a 
                        href={`https://${member.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a 
                        href={`https://${member.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default About;