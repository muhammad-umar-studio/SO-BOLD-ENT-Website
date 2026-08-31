'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Youtube, Radio, Music } from 'lucide-react';
import { MediaItem, Dispatch } from '@/types';
import { useCmsStore } from '@/lib/store/cmsStore';
import Marquee from '@/components/motion/Marquee';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function ChannelPage() {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [expandedDispatch, setExpandedDispatch] = useState<Dispatch | null>(null);

  const mediaItems = useCmsStore((state) => state.mediaItems);
  const dispatches = useCmsStore((state) => state.dispatches);
  const heroFeatured = mediaItems[0];

  const marqueeItems = [
    'VIRGIN MUSIC GROUP PARTNERSHIP',
    'YOU42 BROADCASTING',
    'NEW RELEASES',
    'BEHIND THE SCENES',
    'ARTIST INTERVIEWS',
    'LIVE PERFORMANCES',
    'SHORT FILMS',
  ];

  const channelLinks = [
    {
      title: 'SO BOLD ENT YOUTUBE',
      platform: 'YouTube',
      url: 'https://www.youtube.com/@soboldent',
      desc: 'Official music videos, premiere visualizers, and behind-the-scenes concert footage.',
      icon: <Youtube className="w-6 h-6 text-red-500" />,
    },
    {
      title: 'YOU42 BROADCAST CHANNEL',
      platform: 'You42 Network',
      url: 'https://www.you42.com/channels/30981',
      desc: 'Exclusive series, documentary features, and high-definition artist showcases.',
      icon: <Radio className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'SOUNDCLOUD AUDIO STREAM',
      platform: 'SoundCloud',
      url: 'https://soundcloud.com/so-bold-entertainment',
      desc: 'Album previews, unreleased remixes, and SoundCloud RepostExchange interviews.',
      icon: <Music className="w-6 h-6 text-orange-500" />,
    },
  ];

  return (
    <div className="w-full pt-32 pb-section-gap min-h-screen">
      {/* Channel Header Banner */}
      <section className="px-margin-mobile md:px-margin-desktop mb-16">
        <FadeIn direction="down">
          <div className="mb-8 border-b border-surface-variant pb-8">
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-2">
              Broadcast Networks &amp; Virgin Music Group Partnership
            </span>
            <h1 className="font-display text-display-xl-mobile md:text-display-xl lg:text-hero-massive text-primary uppercase leading-none tracking-tighter">
              SOBOLDENTS CHANNEL
            </h1>
          </div>
        </FadeIn>

        {/* Official Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {channelLinks.map((channel, idx) => (
            <FadeIn key={channel.platform} delay={idx * 0.1}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-surface-variant bg-surface-container-low p-6 flex flex-col justify-between hover:border-primary transition-all duration-300 h-full block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {channel.icon}
                    <ExternalLink className="w-4 h-4 text-silver-leaf/40 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-body text-[10px] text-silver-leaf uppercase tracking-widest block mb-1">
                    {channel.platform}
                  </span>
                  <h3 className="font-display text-headline-md text-primary uppercase mb-2 group-hover:translate-x-1 transition-transform">
                    {channel.title}
                  </h3>
                  <p className="font-body text-body-md text-silver-leaf/70">
                    {channel.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-variant/40 flex items-center justify-between">
                  <span className="font-body text-label-caps text-primary uppercase tracking-wider font-bold">
                    Launch Channel →
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Main Featured Broadcast Showcase */}
        {heroFeatured && (
          <FadeIn direction="up">
            <div className="relative border border-surface-variant bg-surface-container-low overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Thumbnail / Video Box */}
                <div className="lg:col-span-8 relative aspect-video bg-black overflow-hidden border-b lg:border-b-0 lg:border-r border-surface-variant">
                  <Image
                    src={heroFeatured.thumbnailUrl}
                    alt={heroFeatured.title}
                    fill
                    priority
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-onyx-black/40 group-hover:bg-onyx-black/20 transition-colors" />

                  <button
                    onClick={() => setSelectedVideo(heroFeatured)}
                    className="absolute inset-0 flex items-center justify-center group/btn"
                    aria-label={`Play ${heroFeatured.title}`}
                  >
                    <div className="w-20 h-20 bg-primary/90 text-onyx-black flex items-center justify-center rounded-full group-hover/btn:scale-110 transition-transform shadow-2xl backdrop-blur-sm">
                      <Play className="w-8 h-8 fill-onyx-black ml-1" />
                    </div>
                  </button>

                  <div className="absolute top-4 left-4 bg-onyx-black/80 border border-surface-variant px-3 py-1 text-label-caps text-primary uppercase tracking-widest font-bold">
                    FLAGSHIP PREMIERE
                  </div>
                </div>

                {/* Info Panel */}
                <div className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-body text-label-caps text-silver-leaf uppercase tracking-wider">
                        {heroFeatured.category}
                      </span>
                      <span className="text-silver-leaf/40">•</span>
                      <span className="font-body text-label-caps text-silver-leaf uppercase">
                        {heroFeatured.releaseDate}
                      </span>
                    </div>

                    <h2 className="font-display text-headline-lg lg:text-display-md text-primary uppercase leading-tight mb-4">
                      {heroFeatured.title}
                    </h2>

                    <p className="font-body text-body-md text-silver-leaf mb-6">
                      Directed by {heroFeatured.director}. Exclusive broadcast premiere powered by SOBOLDENTS Media Group.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    icon={<Play className="w-4 h-4 fill-onyx-black" />}
                    onClick={() => setSelectedVideo(heroFeatured)}
                    className="w-full justify-center"
                  >
                    Watch Full Broadcast
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </section>

      {/* Marquee Banner */}
      <div className="my-16 border-y border-surface-variant py-4 bg-surface-container-low">
        <Marquee items={marqueeItems} speed={30} />
      </div>

      {/* Video Grid Section */}
      <section className="px-margin-mobile md:px-margin-desktop mb-24">
        <div className="mb-12">
          <h2 className="font-display text-display-lg text-primary uppercase">
            FULL BROADCAST ARCHIVE ({mediaItems.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.1}>
              <div className="border border-surface-variant bg-surface-container-low overflow-hidden group flex flex-col justify-between h-full">
                <div>
                  {/* Video Thumbnail Box */}
                  <div className="relative aspect-video bg-black overflow-hidden border-b border-surface-variant">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <button
                      onClick={() => setSelectedVideo(item)}
                      className="absolute inset-0 flex items-center justify-center bg-onyx-black/30 group-hover:bg-onyx-black/10 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary text-onyx-black flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-onyx-black ml-0.5" />
                      </div>
                    </button>
                    <span className="absolute bottom-3 right-3 bg-onyx-black/80 text-silver-leaf font-body text-[10px] font-bold px-2 py-1 border border-surface-variant/80">
                      {item.duration || '03:45'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="font-body text-[10px] text-silver-leaf uppercase tracking-widest block mb-2">
                      {item.category} — {item.releaseDate}
                    </span>
                    <h3 className="font-display text-headline-md text-primary uppercase leading-snug mb-2 group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                    <p className="font-body text-body-md text-silver-leaf/70">
                      Directed by {item.director}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedVideo(item)}
                    className="font-body text-label-caps text-primary uppercase tracking-widest border-b border-primary pb-1 font-bold hover:opacity-80 transition-opacity"
                  >
                    Play Stream →
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Press & News Dispatches Section */}
      <section className="px-margin-mobile md:px-margin-desktop">
        <div className="border-t border-surface-variant pt-16 mb-12">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-2">
            Billboard &amp; Press Releases
          </span>
          <h2 className="font-display text-display-lg text-primary uppercase">
            PRESS DISPATCHES ({dispatches.length})
          </h2>
        </div>

        <div className="border border-surface-variant divide-y divide-surface-variant bg-surface-container-low">
          {dispatches.map((dispatch) => (
            <div
              key={dispatch.id}
              className="p-8 hover:bg-surface-variant/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 font-body text-xs text-silver-leaf/60 uppercase tracking-widest mb-2">
                  <span className="font-display text-primary font-bold">#{dispatch.number}</span>
                  <span>•</span>
                  <span>{dispatch.category}</span>
                  <span>•</span>
                  <span>{dispatch.date}</span>
                </div>
                <h3 className="font-display text-headline-md md:text-headline-lg text-primary uppercase mb-3 leading-snug">
                  {dispatch.title}
                </h3>
                <p className="font-body text-body-md text-silver-leaf line-clamp-2">
                  {dispatch.summary}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setExpandedDispatch(dispatch)}
                className="shrink-0"
              >
                Read Dispatch
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Video Lightbox Modal */}
      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
      >
        {selectedVideo && (
          <div className="space-y-6">
            <div className="relative aspect-video w-full bg-black border border-surface-variant overflow-hidden">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="font-body text-body-md text-silver-leaf space-y-2">
              <p>
                <strong>Category:</strong> {selectedVideo.category}
              </p>
              <p>
                <strong>Director:</strong> {selectedVideo.director}
              </p>
              <p>
                <strong>Release Date:</strong> {selectedVideo.releaseDate}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Dispatch Reader Modal */}
      <Modal
        isOpen={!!expandedDispatch}
        onClose={() => setExpandedDispatch(null)}
        title={expandedDispatch?.title}
      >
        {expandedDispatch && (
          <div className="space-y-6 font-body text-body-md text-silver-leaf">
            <div className="flex items-center gap-3 text-xs text-primary uppercase tracking-widest border-b border-surface-variant pb-3 font-bold">
              <span>#{expandedDispatch.number}</span>
              <span>•</span>
              <span>{expandedDispatch.category}</span>
              <span>•</span>
              <span>{expandedDispatch.date}</span>
            </div>
            <p className="text-body-lg text-primary leading-relaxed font-semibold">
              {expandedDispatch.summary}
            </p>
            <p className="leading-relaxed whitespace-pre-line text-silver-leaf/90">
              {expandedDispatch.content}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
