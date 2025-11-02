'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PenSquare, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { generateSlug } from '@/lib/generateSlug';
import Image from 'next/image';

export default function Navbar({ user, slug }: { user: any, slug: string }) {
    const name = user.name.charAt(0).toUpperCase();
    
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/kapybara_logo.jpeg" alt='logo' height={50} width={40}/>
            <span className="text-xl font-semibold text-gray-900">KapyBlog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/my-blogs">
                <BookOpen className="w-4 h-4 mr-2" />
                My Blogs
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={slug}>
                <PenSquare className="w-4 h-4 mr-2" />
                Create Post
              </Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </Button>
        </div>

        <div className="md:hidden flex justify-center space-x-8 pb-3 border-t border-gray-200 mt-2 pt-3">
          <Button variant="ghost" size="sm" className="flex flex-col" asChild>
            <Link href="/my-blogs">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs mt-1">My Blogs</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col" asChild>
            <Link href="/create">
              <PenSquare className="w-5 h-5" />
              <span className="text-xs mt-1">Create</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}