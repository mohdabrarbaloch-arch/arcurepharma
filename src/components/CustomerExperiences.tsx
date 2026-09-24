import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Play, 
  Pause,
  X, 
  Heart, 
  Instagram, 
  Volume2, 
  VolumeX, 
  Share2, 
  MessageCircle, 
  CheckCircle2, 
  Music2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface InstagramReel {
  id: number;
  videoUrl: string;
  posterUrl: string;
  tag: string;
  creatorName: string;
  creatorHandle: string;
  avatar: string;
  views: string;
  likes: number;
  commentsCount: number;
  audioTrack: string;
  caption: string;
  hashtags: string[];
  productMention: string;
  sampleComments: { user: string; text: string; time: string }[];
}

export const CustomerExperiences: React.FC = () => {
  const [activeReel, setActiveReel] = useState<InstagramReel | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likedReels, setLikedReels] = useState<Record<number, boolean>>({});
  const [activeTabModal, setActiveTabModal] = useState<'video' | 'comments'>('video');
  const [copyToast, setCopyToast] = useState<boolean>(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Photos of real customer experiences
  const customerPhotos = [
    {
      id: 1,
      image: "/jenpharm/result-huma.jpg",
      user: "Sana M.",
      location: "Lahore",
      product: "ArcuGleam Face Wash",
      handle: "@sana_skincare",
    },
    {
      id: 2,
      image: "/jenpharm/result-zoha.jpg",
      user: "Areeba T.",
      location: "Karachi",
      product: "ArcuDerm CS Serum",
      handle: "@areeba.glow",
    },
    {
      id: 3,
      image: "/jenpharm/result-shahid.jpg",
      user: "Hamza K.",
      location: "Islamabad",
      product: "Arcu-Shield Sunscreen",
      handle: "@hamza_dermatology",
    },
    {
      id: 4,
      image: "/jenpharm/result-mubeen.jpg",
      user: "Nimra S.",
      location: "Rawalpindi",
      product: "Glowing Skin Routine",
      handle: "@nimra_beauty_pk",
    },
    {
      id: 5,
      image: "/results/result-3-after.jpg",
      user: "Khadija P.",
      location: "Faisalabad",
      product: "ArcuGlow Vitamin Regimen",
      handle: "@khadija_wellness",
    },
    {
      id: 6,
      image: "/results/result-2-after.jpg",
      user: "Farhan Z.",
      location: "Multan",
      product: "Melasma Defense Protocol",
      handle: "@farhan_skinclinic",
    },
  ];

  // Verified Customer Instagram Video Reels for Arcure Pharma
  const instagramReels: InstagramReel[] = [
    {
      id: 1,
      videoUrl: "/reels/reel1.mp4",
      posterUrl: "/reels/poster1.jpg",
      tag: "ArcuGleam Morning Foam Routine 🫧",
      creatorName: "Arcure Clinical Care",
      creatorHandle: "@arcurepharma_official",
      avatar: "/logo-arcure.png",
      views: "34.8k",
      likes: 2140,
      commentsCount: 86,
      audioTrack: "Arcure Pharma • Original Audio",
      caption: "Why dermatologists recommend 2% Salicylic Acid for morning sebum regulation and clearing congested pores without drying your skin barrier.",
      hashtags: ["#ArcurePharma", "#ArcuGleam", "#SalicylicAcid", "#SkincareRoutine"],
      productMention: "ArcuGleam Face Wash",
      sampleComments: [
        { user: "ayesha_lahore", text: "Ordered this last week, completely removed my oily forehead shine!", time: "2d ago" },
        { user: "dr_madiha", text: "Excellent pharmaceutical formulation with gentle foaming surfactants.", time: "4d ago" },
      ]
    },
    {
      id: 2,
      videoUrl: "/reels/reel2.mp4",
      posterUrl: "/reels/poster2.jpg",
      tag: "ArcuDerm CS Serum 3-Week Results ✨",
      creatorName: "Zoha Malik",
      creatorHandle: "@zoha_skincareroutine",
      avatar: "/jenpharm/result-zoha.jpg",
      views: "48.2k",
      likes: 3420,
      commentsCount: 142,
      audioTrack: "Trending Aesthetic • Audio by Zoha",
      caption: "My stubborn post-inflammatory redness and dark marks faded visibly in 21 days! The Azelaic + Niacinamide formula is lightweight and non-greasy.",
      hashtags: ["#ArcuDerm", "#AzelaicAcid", "#Niacinamide", "#AcneMarks"],
      productMention: "ArcuDerm CS Serum",
      sampleComments: [
        { user: "maryam_k", text: "Can we use this twice a day? Loving my results so far!", time: "1d ago" },
        { user: "arcurepharma_official", text: "Yes Maryam! Apply morning and night followed by sunscreen 🌸", time: "1d ago" },
      ]
    },
    {
      id: 3,
      videoUrl: "/reels/reel3.mp4",
      posterUrl: "/reels/poster3.jpg",
      tag: "Arcu-Shield SPF 60: Zero White Cast ☀️",
      creatorName: "Arcure Lab Formulations",
      creatorHandle: "@arcurepharma_official",
      avatar: "/logo-arcure.png",
      views: "29.5k",
      likes: 1980,
      commentsCount: 74,
      audioTrack: "Arcure Lab • Formulation Insights",
      caption: "Watch how smoothly Arcu-Shield SPF 60 absorbs into Asian skin tones. Absolutely matte, no oily sheen, and leaves zero chalky white residue.",
      hashtags: ["#SunscreenPK", "#ArcuShield", "#SPF60", "#SunProtection"],
      productMention: "Arcu-Shield Sunscreen",
      sampleComments: [
        { user: "bilal_grooming", text: "First sunscreen in Pakistan that doesn't sweat off in the Karachi heat.", time: "3d ago" },
        { user: "skinbyfatima", text: "Doesn't burn eyes at all, 10/10 formula.", time: "5d ago" },
      ]
    },
    {
      id: 4,
      videoUrl: "/reels/reel4.mp4",
      posterUrl: "/reels/poster4.jpg",
      tag: "Doctor Explains: The Acne Triad 🩺",
      creatorName: "Dr. Faisal (Dermatology)",
      creatorHandle: "@dr.faisal_dermatology",
      avatar: "/jenpharm/hero-desktop.jpg",
      views: "52.1k",
      likes: 4230,
      commentsCount: 215,
      audioTrack: "Clinical Audio • Dr. Faisal",
      caption: "How pairing a targeted salicylic cleanser with azelaic serum produces synergistic acne-clearing efficacy for cystic outbreaks and hormonal acne.",
      hashtags: ["#Dermatologist", "#AcneTreatment", "#PakistaniSkin", "#ArcureScience"],
      productMention: "ArcuGleam + ArcuDerm Routine",
      sampleComments: [
        { user: "usman_rawalpindi", text: "Doc your video helped me choose the right product, thank you!", time: "1w ago" },
        { user: "hina_skincare", text: "So informative and evidence-backed!", time: "1w ago" },
      ]
    },
    {
      id: 5,
      videoUrl: "/reels/reel5.mp4",
      posterUrl: "/reels/poster5.jpg",
      tag: "Inside Arcure's Certified GMP Lab 🔬",
      creatorName: "Huma Tariq",
      creatorHandle: "@huma_wellness_pk",
      avatar: "/jenpharm/result-huma.jpg",
      views: "38.4k",
      likes: 2750,
      commentsCount: 98,
      audioTrack: "Arcure Pharma • Science & Vitality",
      caption: "Touring the cGMP pharmaceutical laboratory where Arcure's serums, supplements, and skin vitamins are tested under strict quality parameters.",
      hashtags: ["#GMPCertified", "#PharmaceuticalGrade", "#LabTour", "#ArcurePharma"],
      productMention: "Arcure Lab Quality Guarantee",
      sampleComments: [
        { user: "zainab_chemist", text: "Proud to see such high pharmaceutical standards produced locally in Pakistan!", time: "2d ago" },
      ]
    },
    {
      id: 6,
      videoUrl: "/reels/reel6.mp4",
      posterUrl: "/reels/poster6.jpg",
      tag: "Men's Skin Clearance Routine 🧴",
      creatorName: "Shahid Khan",
      creatorHandle: "@shahid_grooming",
      avatar: "/jenpharm/result-shahid.jpg",
      views: "26.3k",
      likes: 1840,
      commentsCount: 63,
      audioTrack: "Chill Vibes • Grooming Daily",
      caption: "Eliminated my razor irritation and afternoon nose shine with this quick 2-step routine. Real review after 4 weeks of consistent use.",
      hashtags: ["#MensGrooming", "#ClearSkinMen", "#ArcuGleam", "#CleanseDaily"],
      productMention: "ArcuGleam Cleanser",
      sampleComments: [
        { user: "danyal_k", text: "Bro did this help with razor bumps on neck?", time: "3d ago" },
        { user: "shahid_grooming", text: "Yes brother! Salicylic acid unclogs the ingrown hairs completely.", time: "3d ago" },
      ]
    },
  ];

  const handleOpenReel = (reel: InstagramReel) => {
    setActiveReel(reel);
    setIsPlaying(true);
    setIsMuted(false);
    setActiveTabModal('video');
  };

  const handleTogglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        modalVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleToggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleLike = (reelId: number) => {
    setLikedReels(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleShareReel = (reel: InstagramReel) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://www.instagram.com/arcurepharma_official/reels/");
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2400);
    }
  };

  return (
    <section className="py-12 sm:py-18 bg-white space-y-14 sm:space-y-20" aria-label="Customer Experiences & Instagram Videos">
      
      {/* 1. Real Customers, Real Experiences Photo Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#F43F96] block mb-1">
              COMMUNITY VOICES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 font-serif-heading">
              Real Customers, Real Experiences
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              See how Arcure's targeted dermatological regimens are transforming daily skin confidence across Pakistan.
            </p>
          </div>

          <a 
            href="https://www.instagram.com/arcurepharma_official" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold text-gray-800 hover:text-white inline-flex items-center gap-2 transition-all group shrink-0 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FDF2F8] to-[#FFF1F2] hover:from-[#F43F96] hover:to-[#E11D7A] border border-pink-200/80 shadow-2xs hover:shadow-md cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
              <Instagram className="w-3 h-3" />
            </div>
            <span>Follow @arcurepharma_official</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 6 Grid Customer Photos with modern rounded cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {customerPhotos.map((item) => (
            <div 
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden group bg-gray-100 border border-gray-100 shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              <img 
                src={item.image} 
                alt={item.user} 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
              />
              {/* Modern Frosted Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#161D3A]/90 via-[#161D3A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <span className="text-xs font-bold leading-tight flex items-center justify-between">
                  {item.user}
                  <span className="text-[9px] text-pink-300 font-normal">{item.location}</span>
                </span>
                <span className="text-[10px] text-gray-200 line-clamp-1 mt-0.5">{item.product}</span>
                <span className="text-[9px] text-pink-200 font-mono mt-0.5">{item.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Customer Videos Section with Verified Instagram Reels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Instagram Branding */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border border-pink-200 text-[#D81B60] text-[11px] font-extrabold uppercase tracking-widest mb-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#E1306C] animate-pulse" />
              INSTAGRAM REELS • PATIENT REVIEWS
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 font-serif-heading">
              Customer Videos
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Watch real patients, skincare creators, and doctors share application routines and verified results on Instagram.
            </p>
          </div>

          {/* Button Linking to Instagram Reels */}
          <a 
            href="https://www.instagram.com/arcurepharma_official/reels/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold text-white inline-flex items-center gap-2 transition-all group shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-md hover:shadow-lg hover:shadow-pink-500/25 active:scale-98 cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Watch Reels on Instagram</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 6 Video Reels Grid with Instagram Reel Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {instagramReels.map((reel) => {
            const isLiked = likedReels[reel.id] || false;
            return (
              <div
                key={reel.id}
                onClick={() => handleOpenReel(reel)}
                className="relative aspect-9/16 rounded-2xl overflow-hidden group bg-gray-950 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200/80 hover:border-pink-300"
              >
                {/* Background Video Poster / Thumbnail */}
                <img 
                  src={reel.posterUrl} 
                  alt={reel.tag} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />

                {/* Top Instagram Badges */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                  {/* View count pill */}
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>{reel.views}</span>
                  </span>

                  {/* Instagram Reel Icon */}
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-[#F43F96] group-hover:scale-115 transition-all duration-300 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Caption Pill & Creator Handle */}
                <div className="absolute bottom-2.5 inset-x-2 z-10 space-y-1">
                  <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl text-white border border-white/10">
                    <div className="flex items-center gap-1 text-[10px] text-pink-300 font-bold leading-none mb-0.5">
                      <span className="truncate">{reel.creatorHandle}</span>
                      <CheckCircle2 className="w-2.5 h-2.5 text-blue-400 fill-blue-400/20 shrink-0" />
                    </div>
                    <span className="text-[11px] font-bold block leading-snug line-clamp-2 text-white">
                      {reel.tag}
                    </span>
                    <div className="flex items-center justify-between text-[9px] text-gray-300 mt-1 pt-1 border-t border-white/10">
                      <span className="flex items-center gap-1">
                        <Heart className={`w-2.5 h-2.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                        <span>{reel.likes + (isLiked ? 1 : 0)}</span>
                      </span>
                      <span className="text-[8.5px] text-amber-300 font-medium">Watch Reel &rarr;</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Instagram Reel Modal Video Player */}
      {activeReel && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          onClick={() => setActiveReel(null)}
        >
          <div 
            className="bg-black rounded-3xl max-w-4xl w-full h-[88vh] max-h-[800px] flex flex-col md:flex-row overflow-hidden relative shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveReel(null)}
              aria-label="Close Instagram Reel"
              className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: 9:16 Video Player Container */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={modalVideoRef}
                src={activeReel.videoUrl}
                poster={activeReel.posterUrl}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-contain max-h-[88vh]"
                onClick={handleTogglePlay}
              />

              {/* Pause Overlay indicator */}
              {!isPlaying && (
                <div 
                  onClick={handleTogglePlay}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
                    <Play className="w-8 h-8 fill-white translate-x-1" />
                  </div>
                </div>
              )}

              {/* Top Controls on Video */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full font-bold">
                  {activeReel.views} views
                </span>
              </div>

              {/* Bottom In-Video Caption Bar (for mobile view) */}
              <div className="absolute bottom-4 inset-x-4 z-20 md:hidden bg-gradient-to-t from-black via-black/80 to-transparent p-3 rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-1">
                  <img src={activeReel.avatar} alt="Creator" className="w-6 h-6 rounded-full object-cover border border-white" />
                  <span className="text-xs font-bold">{activeReel.creatorHandle}</span>
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                </div>
                <p className="text-xs text-gray-200 line-clamp-2">{activeReel.caption}</p>
                <div className="mt-2 flex items-center justify-between">
                  <a
                    href="https://www.instagram.com/arcurepharma_official/reels/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-[10px] font-bold"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Watch on Instagram</span>
                  </a>
                  <button
                    onClick={() => handleToggleLike(activeReel.id)}
                    className="flex items-center gap-1 text-xs text-white"
                  >
                    <Heart className={`w-4 h-4 ${likedReels[activeReel.id] ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{activeReel.likes + (likedReels[activeReel.id] ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Instagram Reel Sidebar & Comments (Desktop & Tablet) */}
            <div className="hidden md:flex flex-col w-80 lg:w-96 bg-[#121212] text-white border-l border-white/10 p-5 justify-between">
              
              {/* Creator Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeReel.avatar} 
                      alt={activeReel.creatorName} 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E1306C]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold">{activeReel.creatorHandle}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                      </div>
                      <span className="text-[11px] text-gray-400">{activeReel.creatorName}</span>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/arcurepharma_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#E1306C] hover:text-white px-3 py-1 rounded-full border border-[#E1306C] hover:bg-[#E1306C] transition-all"
                  >
                    Follow
                  </a>
                </div>

                {/* Caption & Product Tag */}
                <div className="space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold uppercase tracking-wider">
                    {activeReel.productMention}
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {activeReel.tag}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed max-h-28 overflow-y-auto pr-1">
                    {activeReel.caption}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeReel.hashtags.map((h, i) => (
                      <span key={i} className="text-[11px] text-blue-400 font-medium hover:underline cursor-pointer">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Audio Track Marquee */}
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-gray-400">
                    <Music2 className="w-3.5 h-3.5 text-[#E1306C] animate-spin" />
                    <span className="truncate">{activeReel.audioTrack}</span>
                  </div>
                </div>

                {/* Verified Comments Section */}
                <div className="pt-3 border-t border-white/10 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Verified Customer Comments ({activeReel.commentsCount})
                  </span>
                  {activeReel.sampleComments.map((c, i) => (
                    <div key={i} className="text-xs space-y-0.5 bg-white/5 p-2 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-200 text-[11px]">@{c.user}</span>
                        <span className="text-[9px] text-gray-500">{c.time}</span>
                      </div>
                      <p className="text-gray-300 text-[11px] leading-snug">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & CTA */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {/* Like, Comment, Share Row */}
                <div className="flex items-center justify-around py-1">
                  <button 
                    onClick={() => handleToggleLike(activeReel.id)}
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 transition-transform active:scale-125 ${likedReels[activeReel.id] ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="font-semibold">{activeReel.likes + (likedReels[activeReel.id] ? 1 : 0)}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">{activeReel.commentsCount}</span>
                  </div>

                  <button 
                    onClick={() => handleShareReel(activeReel)}
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Direct Link to Instagram Reel */}
                <a
                  href="https://www.instagram.com/arcurepharma_official/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>View Original Reel on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {copyToast && (
                  <div className="text-center text-[11px] text-emerald-400 font-semibold animate-fade-in">
                    Link copied to clipboard!
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
