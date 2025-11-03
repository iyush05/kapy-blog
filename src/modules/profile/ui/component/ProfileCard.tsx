'use client';

import React from 'react';
import { Mail, User, PenTool, Hash } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  username: string;
  email: string;
  blogCount: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name, 
  username, 
  email, 
  blogCount 
}) => {
  return (
    <>
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>
                    </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{name}</p>
                            <p className="text-xs text-gray-500">Full Name</p>
                        </div>
                    </div>
                <div className="flex items-center space-x-3">
                    <Hash className="w-5 h-5 text-gray-500" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">@{username}</p>
                        <p className="text-xs text-gray-500">Username</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-40">{email}</p>
                        <p className="text-xs text-gray-500">Email</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <PenTool className="w-5 h-5 text-gray-500" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{blogCount}</p>
                        <p className="text-xs text-gray-500">Blogs Posted</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
);
};

export default ProfileCard;