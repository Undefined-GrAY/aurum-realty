"use client";

import React, { useState, useEffect, useRef } from "react";

// Types
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  details: string[];
  image: string;
  tag: string;
  city: string;
  featured?: boolean;
}

interface Slide {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
}

interface Advisor {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
}

export default function Home() {
  // --- States ---
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  // --- Refs ---
  const sliderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Data ---
  const sliderSlides: Slide[] = [
    {
      id: 1,
      title: "Architectural Integrity",
      location: "Bel Air, Los Angeles",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFy5SKQ1ilgV46AqRUWPFm24d4HgLjAWv2h-EBjnE_NSbXctmwOS4vl9mIC6fI5C_v30rfjGSSyq0XIhtiu1zXOZNt04VYokx34aznlviFTE6PqdT8ATUzE9c9IXs0NVuguSXOw2SEnV0eT9ZAiIMFtcMrnOL-CbhnjcB7-gtUIqsjrAHVTf83y1NaVOcBylSIZC-g2YzVxGJSDRc0GUy7VJ2ybk1X93vwbQfNse_0UhtNXVhQqY4oGA",
      price: "$24,500,000",
    },
    {
      id: 2,
      title: "Modernist Sanctuary",
      location: "Coconut Grove, Miami",
      image: "/images/slide2.png",
      price: "$18,200,000",
    },
    {
      id: 3,
      title: "Skyline Oasis",
      location: "Tribeca, New York",
      image: "/images/slide3.png",
      price: "$29,000,000",
    },
    {
      id: 4,
      title: "Oceanfront Estate",
      location: "Malibu, Los Angeles",
      image: "/images/slide4.png",
      price: "$32,500,000",
    },
    {
      id: 5,
      title: "Historic Grandeur",
      location: "Upper East Side, New York",
      image: "/images/slide5.png",
      price: "$22,000,000",
    },
  ];

  const featuredProperties: Property[] = [
    {
      id: 1,
      title: "The Maddox Penthouse",
      location: "Tribeca, New York",
      price: "$8,400,000",
      details: ["4 BED", "5 BATH", "6,200 SQFT"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXu0sZUidvhA8m7v7mucydRUi1x6xwbYBPnIqn3yt89gnmpssj3KQUbgGpTmrPYTmNbMjgvZH75Jt4aA7fbf8pZ8pAtrJx2oiKXaRyrhpIO6JDbkffUrtnnDAPKTHoGALf-5Va7PyDxNsIcLynkvfXDYXSdfah4MK49C5taAXs3N-xIvuqbNeJXnBx-lFYAxFxy3stk1vTbiaT0fEKPmfFekpuAK9YUZ9SMKAUcQgpdtqM2rDMRcK83mLg",
      tag: "FEATURED",
      city: "New York",
    },
    {
      id: 2,
      title: "Casa del Sol",
      location: "South Beach, Miami",
      price: "$5,750,000",
      details: ["5 BED", "6 BATH", "4,800 SQFT"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABldNsuMHHaKdaxKT444yLNvQZubUUcgWNHEbWW9KvEqdQRi85CW9Z2F2kO1augjHRV_n7cF2y_ux3gRkY31XuN4KPWnx3Er8aBVe44Nsr-ykexpTnGPfkUy_33b6RiqnEBj8CmlhU0N2YMcuSdr-baWepFSpYu_ah3hpUjqI7oNr0fDRb06VrG_MWLr9QokG-N62oW-lOdPgPd5bDQ2czGSoavb6PKg51ZN-K8cAvgCISG9Hxpbq0jg",
      tag: "NEW LISTING",
      city: "Miami",
    },
    {
      id: 3,
      title: "Laurel Canyon Estate",
      location: "Hollywood Hills, LA",
      price: "$12,200,000",
      details: ["6 BED", "8 BATH", "9,100 SQFT"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0u64E9cTwYk8ubL-niB6egilxKZMMkiy5U-hRx8cB6SSb_G-DmfjSIUF4RahzF5pnwiN6PSkBKYHAoSGyUkpEvr5BGh2w_nHvkvnESj6pnaNWrgS2G3ZbZvFOCoz8RR79N-NFRoJJVBVmZH_6VRe80aBo43cA8dAn4ZVuMEXQ3lEDdSDoWGgaYbLugXtbOJrWk1ihiOA0FtBzVnLVeVuNdg53C5_V3xUmePRcJn5Nkk5xqJyBXr2HPQ",
      tag: "SOLD",
      city: "Los Angeles",
    },
    {
      id: 4,
      title: "The Park Avenue Duplex",
      location: "Upper East Side, New York",
      price: "$14,500,000",
      details: ["5 BED", "6 BATH", "7,500 SQFT"],
      image: "/images/slide5.png",
      tag: "PRE-MARKET",
      city: "New York",
    },
    {
      id: 5,
      title: "Biscayne Bay Villa",
      location: "Key Biscayne, Miami",
      price: "$9,800,000",
      details: ["5 BED", "7 BATH", "6,800 SQFT"],
      image: "/images/slide2.png",
      tag: "FEATURED",
      city: "Miami",
    },
    {
      id: 6,
      title: "The Beverly Hills Manor",
      location: "Beverly Hills, LA",
      price: "$19,500,000",
      details: ["7 BED", "9 BATH", "11,200 SQFT"],
      image: "/images/slide4.png",
      tag: "NEW LISTING",
      city: "Los Angeles",
    },
  ];

  const advisors: Advisor[] = [
    {
      id: 1,
      name: "Victoria Harlow",
      role: "Senior Property Advisor · New York",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRM8jamlV3uOSuD0BfYgnKcIkze2rupc7V05R6DzsdGM3n6iSsFdPRMHU89xoJXHfqYhkfVpXCS8ulm4KzzjpDKWlnuPraKmhWwo_VkNqHzWB5McmCuob5mSvhfmfL2ugOJ5HcyH95yyGziIItr3-AeOTtMowirYcNCOjiTBGrWJXh4nenhCYLcQ132G1EVSdYrAmOGyun08inwlWzeufnjmeenx4g1_xSP8D8mdZ54vfyeZdhEurvdA",
      email: "v.harlow@aurumrealty.com",
    },
    {
      id: 2,
      name: "Marcus DeLeon",
      role: "Luxury Sales Director · Miami",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkAxq8rIlHb71kzkmFYU3ZIt78dJx_qa9oTYGQwq0BhiVnZJw52t9Q4WL_nNHrrPgQtHE24jymPZUHqFbf9-ADhA3m9Kh64IA3GVCVtw9ZCrcPxUUOzT87Q0dU7TrNlUhxsG8KEnQ6hhIDUr3GkW6YipRszWmFWxbMf51fIeryjK6DkplcMBMXL8HImFp8mnFfPn33s-Y3mGZi_4zvro7rVcZdxsjSTigzR-ufgDJUXFAaNYB0SI_8NA",
      email: "m.deleon@aurumrealty.com",
    },
    {
      id: 3,
      name: "Isabelle Chen",
      role: "Investment Specialist · Los Angeles",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGHdESoA4WKn8z3BAFMBNMhkpQaJI3eoQ-xKLr-H9kATBJ_m0Dzq-2x19RN6zLohwYUrk1GKTiGjdbNhGfvT_2D67NOBrzPcY86Az05ixq5nf0_8YFA609xbk1wMjiwirNlOlOsLbv4yKcVLMAllYneHSaqFVDdcLf0xxlGHFPhUF8DbDBbmpSDASoK-YxaTIVRzhz1KDador1Hdh7QWTDYdYB9d9OMcqADPuRQERUOxrUOZnR1mBnVw",
      email: "i.chen@aurumrealty.com",
    },
    {
      id: 4,
      name: "James Ashford",
      role: "Principal Broker · New York",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDt26bxHl4M2IogaNCCXgdtRtmLDeQsBXkd_qBO28GAEf7hQyA19HZ4CQcXkzi3Opq_cgNGxcWU4ij08LvGq_2NZUf0ByWgeU0K-Tomw9-pj82N62Du0WmIDW9aIDBAP7EJepPo6ofB3XizYb3wjrs471HzfOgE5mKe_uAbZDyOGuZ7JqFkRHEA_IwE99GVS4E1nkPO9-fo2xvJJIAlZt0OQ4DSyv9_yS7vLq4Fm4jGPlxp7kxzr-Wxw",
      email: "j.ashford@aurumrealty.com",
    },
  ];

  // --- Effects ---
  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeFilter]); // Re-observe when filter changes and elements are re-rendered

  // Scroll effect on Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fullscreen Slider Auto-advance logic
  useEffect(() => {
    if (!isSliderHovered) {
      sliderIntervalRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % sliderSlides.length);
      }, 7000);
    }
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [isSliderHovered, sliderSlides.length]);

  // Handle Manual Slide Change
  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sliderSlides.length) % sliderSlides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliderSlides.length);
  };

  // Form submission handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmailSubmitted(false);
        setEmailValue("");
      }, 5000);
    }
  };

  // Filter listings based on active filter state
  const filteredListings = featuredProperties.filter((property) => {
    if (activeFilter === "All") return true;
    return property.city.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="bg-[#0D0D0D] text-[#F5F0E8] font-body-md select-none">
      {/* 1. Sticky Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-white/5 luxury-blur ${
          scrolled ? "py-3 shadow-2xl bg-background/95" : "py-5"
        }`}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-aurum-ivory tracking-tighter uppercase font-bold cursor-pointer">
              Aurum Realty
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <a
              className="font-label-caps text-on-surface-variant hover:text-aurum-gold transition-colors duration-300"
              href="#listings"
            >
              Portfolio
            </a>
            <a
              className="font-label-caps text-on-surface-variant hover:text-aurum-gold transition-colors duration-300"
              href="#cities"
            >
              Collections
            </a>
            <a
              className="font-label-caps text-on-surface-variant hover:text-aurum-gold transition-colors duration-300"
              href="#process"
            >
              Process
            </a>
            <a
              className="font-label-caps text-on-surface-variant hover:text-aurum-gold transition-colors duration-300"
              href="#advisors"
            >
              Advisors
            </a>
          </div>

          {/* Action button and Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-aurum-gold hover:bg-opacity-90 text-on-primary font-label-caps py-2.5 px-6 rounded-lg transition-all duration-300 active:scale-95 shadow-lg shadow-aurum-gold/10 hover:shadow-aurum-gold/20">
              Request Access
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center p-2 text-aurum-ivory hover:text-aurum-gold transition-colors"
              aria-label="Open mobile menu"
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background/98 flex flex-col justify-between p-8 md:hidden transition-transform duration-500 luxury-blur ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-16">
            <span className="font-headline-sm text-aurum-ivory tracking-tighter uppercase font-bold">
              Aurum Realty
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-aurum-ivory hover:text-aurum-gold transition-colors"
              aria-label="Close mobile menu"
            >
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <a
              className="font-headline-md text-aurum-ivory hover:text-aurum-gold transition-colors text-left"
              href="#listings"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              className="font-headline-md text-aurum-ivory hover:text-aurum-gold transition-colors text-left"
              href="#cities"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </a>
            <a
              className="font-headline-md text-aurum-ivory hover:text-aurum-gold transition-colors text-left"
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </a>
            <a
              className="font-headline-md text-aurum-ivory hover:text-aurum-gold transition-colors text-left"
              href="#advisors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Advisors
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <button className="bg-aurum-gold text-on-primary font-label-caps py-4 px-8 rounded-lg w-full shadow-lg shadow-aurum-gold/15 active:scale-95 transition-transform">
            Request Access
          </button>
          <p className="font-label-caps text-[10px] text-center text-on-surface-variant/40 tracking-widest uppercase">
            Est. 2008 · NYC · MIA · LA
          </p>
        </div>
      </div>

      {/* 2. Full-viewport Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7c2GtE8qmZfxIRzTmrV1qqzc0OEE1nGBAedujEKEd4_W-zCnKNvgYTroRKpWi9ROkDe0DjMywZlD33eJofKqrAC7CbPVO5AFi1DN57b9Lz9IfnAXcUqzP68NOF-rYiOn3wKtH-Dx8sJcr08BtcdQhxaVc1vFuny2Vm3GlTF4N4oyv_dI5D2G2to6ltD84MZ0SNO-lnwe-01lvAyzO8lMJLKVVclpwJEwBeOv_KJpHjPT_C5rCZbWe5w')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-margin-mobile mt-16">
          <span className="font-label-caps text-aurum-gold block mb-6 tracking-[0.3em] uppercase reveal-on-scroll">
            Luxury Real Estate · Est. 2008
          </span>
          <h1 className="font-display-lg text-aurum-ivory mb-2 reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
            Where Luxury <br />
            <span className="italic text-aurum-gold font-headline-lg">Finds Its Address</span>
          </h1>
          <p
            className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 reveal-on-scroll"
            style={{ transitionDelay: "400ms" }}
          >
            Exclusive properties in New York, Miami and Los Angeles. Curated for those who expect the exceptional.
            Experience architectural mastery in every detail.
          </p>
          <div
            className="flex flex-col md:flex-row items-center justify-center gap-6 reveal-on-scroll"
            style={{ transitionDelay: "600ms" }}
          >
            <a href="#listings" className="w-full md:w-auto">
              <button className="bg-aurum-gold text-on-primary font-label-caps py-4 px-10 rounded-lg w-full md:w-auto hover:shadow-2xl hover:shadow-aurum-gold/20 transition-all active:scale-95">
                Explore Properties
              </button>
            </a>
            <a href="#contact" className="w-full md:w-auto">
              <button className="border border-aurum-ivory/30 text-aurum-ivory font-label-caps py-4 px-10 rounded-lg w-full md:w-auto hover:bg-aurum-ivory/10 transition-all active:scale-95">
                Book Consultation
              </button>
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="font-label-caps text-[10px]">SCROLL</span>
          <span className="material-symbols-outlined text-[18px]">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* 3. Four Column Stats Bar */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F0F0F] via-[#0D0D0D] to-[#0A0A0A] border-y border-aurum-gold/15 py-20">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-7 gap-y-12 gap-x-4 items-center">
          <div className="flex flex-col gap-2 text-center reveal-on-scroll md:col-span-1">
            <span className="font-headline-lg text-aurum-gold font-bold tracking-tight drop-shadow-[0_4px_12px_rgba(201,168,76,0.15)]">
              $4.2B+
            </span>
            <span className="font-label-caps text-on-surface-variant text-[10px] md:text-[11px]">Properties Sold</span>
          </div>

          <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-aurum-gold/20 to-transparent md:col-span-1 justify-self-center"></div>

          <div className="flex flex-col gap-2 text-center reveal-on-scroll md:col-span-1" style={{ transitionDelay: "100ms" }}>
            <span className="font-headline-lg text-aurum-ivory font-bold tracking-tight">1,200+</span>
            <span className="font-label-caps text-on-surface-variant text-[10px] md:text-[11px]">Happy Clients</span>
          </div>

          <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-aurum-gold/20 to-transparent md:col-span-1 justify-self-center"></div>

          <div className="flex flex-col gap-2 text-center reveal-on-scroll md:col-span-1" style={{ transitionDelay: "200ms" }}>
            <span className="font-headline-lg text-aurum-gold font-bold tracking-tight drop-shadow-[0_4px_12px_rgba(201,168,76,0.15)]">
              16
            </span>
            <span className="font-label-caps text-on-surface-variant text-[10px] md:text-[11px]">Years of Excellence</span>
          </div>

          <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-aurum-gold/20 to-transparent md:col-span-1 justify-self-center"></div>

          <div className="flex flex-col gap-2 text-center reveal-on-scroll md:col-span-1" style={{ transitionDelay: "300ms" }}>
            <span className="font-headline-lg text-aurum-ivory font-bold tracking-tight">3</span>
            <span className="font-label-caps text-on-surface-variant text-[10px] md:text-[11px]">Cities Serving</span>
          </div>
        </div>
      </section>

      {/* 4. Featured Listings Grid */}
      <section id="listings" className="py-32 md:py-40 bg-background border-b border-white/5">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
            <div>
              <span className="font-label-caps text-aurum-gold block mb-4">CURATED COLLECTION</span>
              <h2 className="font-headline-lg text-aurum-ivory">Featured Residences</h2>
            </div>
            {/* Interactive Filters */}
            <div className="flex flex-wrap gap-2 md:gap-4 border-b border-white/10 pb-2">
              {["All", "New York", "Miami", "Los Angeles"].map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveFilter(city)}
                  className={`font-label-caps pb-1 px-3 transition-all duration-300 relative ${
                    activeFilter === city
                      ? "text-aurum-gold font-semibold"
                      : "text-on-surface-variant hover:text-aurum-ivory"
                  }`}
                >
                  {city}
                  {activeFilter === city && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-aurum-gold animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter gap-y-16">
            {filteredListings.map((property, idx) => (
              <div
                key={property.id}
                className="group relative bg-surface-container rounded-3xl overflow-hidden reveal-on-scroll shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-white/5 hover:border-aurum-gold/25"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Image container - responsive aspect ratio */}
                <div className="relative h-[280px] sm:h-[340px] md:h-[400px] w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                    src={property.image}
                    alt={property.title}
                  />
                  <div className="absolute top-6 left-6 bg-aurum-gold text-on-primary font-label-caps py-1.5 px-4 rounded-full text-[10px] shadow-md font-semibold">
                    {property.tag}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70"></div>
                </div>
                {/* Card details */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-2">
                    <div>
                      <h3 className="font-headline-sm text-aurum-ivory group-hover:text-aurum-gold transition-colors duration-300 leading-tight">
                        {property.title}
                      </h3>
                      <p className="text-on-surface-variant font-body-md italic mt-1">{property.location}</p>
                    </div>
                    <span className="font-headline-sm text-aurum-gold font-semibold whitespace-nowrap">
                      {property.price}
                    </span>
                  </div>
                  <div className="flex gap-6 border-t border-white/10 pt-6 text-on-surface-variant">
                    {property.details.map((detail, index) => (
                      <span key={index} className="font-label-caps text-[10px] md:text-[11px] tracking-wider">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Fullscreen Property Slider */}
      <section
        className="relative h-[650px] md:h-[819px] overflow-hidden bg-surface-container-lowest"
        onMouseEnter={() => setIsSliderHovered(true)}
        onMouseLeave={() => setIsSliderHovered(false)}
      >
        <div className="relative h-full w-full">
          {sliderSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* background image */}
              <img className="absolute inset-0 w-full h-full object-cover" src={slide.image} alt={slide.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent"></div>

              {/* Slide text details */}
              <div className="absolute bottom-20 md:bottom-28 left-margin-mobile md:left-margin-desktop max-w-xl pr-6">
                <div className="h-px w-24 bg-aurum-gold mb-8 transition-transform duration-700 delay-300"></div>
                <h2 className="font-headline-lg text-aurum-ivory mb-4 translate-y-2 opacity-100 transition-all duration-700 delay-500">
                  {slide.title}
                </h2>
                <p className="font-body-lg text-on-surface-variant mb-8 italic translate-y-2 opacity-100 transition-all duration-700 delay-700">
                  {slide.location} · {slide.price}
                </p>
                <button className="group flex items-center gap-4 text-aurum-ivory font-label-caps tracking-widest hover:text-aurum-gold transition-colors">
                  EXPLORE{" "}
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-margin-mobile md:right-margin-desktop flex items-center gap-6 md:gap-12 z-20">
          <div className="flex gap-4">
            <button
              onClick={handlePrevSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-aurum-ivory hover:bg-white/10 hover:border-aurum-gold/40 transition-all active:scale-90"
              aria-label="Previous Slide"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={handleNextSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-aurum-ivory hover:bg-white/10 hover:border-aurum-gold/40 transition-all active:scale-90"
              aria-label="Next Slide"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="font-label-caps text-on-surface-variant tracking-widest text-base min-w-[70px] text-right">
            <span className="text-aurum-ivory font-semibold">{`0${activeSlide + 1}`}</span> / {`0${sliderSlides.length}`}
          </div>
        </div>
      </section>

      {/* 6. Three Cities Section */}
      <section id="cities" className="py-32 md:py-40 bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16">
            <span className="font-label-caps text-aurum-gold block mb-4">GLOBAL REACH</span>
            <h2 className="font-headline-lg text-aurum-ivory">Our Core Markets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter gap-y-8">
            {/* NY */}
            <div className="group relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer reveal-on-scroll border border-white/5 hover:border-aurum-gold/30 transition-all duration-500">
              <img
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuIqhMWKXSiXDEQjHfbpTmf5ZwKP7LG5vEaBBSAvEyGUejYsvG7DbvCUUHOaEpSAVqkPadi-CcEIOOlM3BO_0zCFS1oRIjlXYjX4Gkf28VsWP9R5W-qCYFrkv_kSSQmHWvMYW9d0aa_AMxYmVC_0mQvEcotFIHaew0gOc8b1KPsb_rYQXak-ry6ZAhotVZqYsPaYFYxvrEpGXuRHp7Wi7Ghw8jnz3JaN2dqUYO8M4NR-y-tzB4Vtagrw"
                alt="New York Skyline"
              />
              {/* Dark Gradient Mask - Tall overlay for high contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 group-hover:via-black/45 transition-all duration-500"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-headline-lg text-aurum-ivory mb-2 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  New York
                </h3>
                <p className="font-label-caps text-aurum-gold mb-4 font-semibold tracking-widest text-[11px] md:text-[12px]">
                  340+ PROPERTIES
                </p>
                <p className="text-on-surface-variant font-body-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Manhattan · Tribeca · Upper East Side
                </p>
                <div className="h-0.5 w-0 group-hover:w-full bg-aurum-gold transition-all duration-700 mt-4"></div>
              </div>
            </div>

            {/* Miami */}
            <div
              className="group relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer reveal-on-scroll border border-white/5 hover:border-aurum-gold/30 transition-all duration-500"
              style={{ transitionDelay: "100ms" }}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCstlvYWeoAQTpoh3yqutS7-2jssThxOyIB4atPL0z4tXs9pElpngCjAiOcPIgEXolHG7yuIh8ILYEdQWFsk-J8z6VR7jE-e0-Kji0oROLropCzh6BFMKtIBrwh4SQsRm4JmPfBWZvFC1JTqGxYYMXa2fVjpjMoL9-KK7xRu5syTJF7nAg1devuV7anT8aDaNEIMM-iQ0gmhHTXuFBe1HY-Xy5tySKH1NWbtz_aTqEDfme6f8kNryX6Iw"
                alt="Miami Shoreline"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 group-hover:via-black/45 transition-all duration-500"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-headline-lg text-aurum-ivory mb-2 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Miami
                </h3>
                <p className="font-label-caps text-aurum-gold mb-4 font-semibold tracking-widest text-[11px] md:text-[12px]">
                  215+ PROPERTIES
                </p>
                <p className="text-on-surface-variant font-body-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  South Beach · Coconut Grove · Coral Gables
                </p>
                <div className="h-0.5 w-0 group-hover:w-full bg-aurum-gold transition-all duration-700 mt-4"></div>
              </div>
            </div>

            {/* LA */}
            <div
              className="group relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer reveal-on-scroll border border-white/5 hover:border-aurum-gold/30 transition-all duration-500"
              style={{ transitionDelay: "200ms" }}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdv5J3luui-ktzFUjOfs2x6C7KFiSkkZ4J-3iSzEupsjsz1zKAnScqBzId6PP8ipNW03rrOQ4HGkTuTktnRag-iPJZC8Cp4DTDW_6mUymE1dQs7aypE5UOWg_-Ny98N06HuDMXptJIvdkVVzL1RFY04WnVpeSHHPrBTVULMHdexr9iuEy9jDAOjpWdk3SpPlux9iJRR-y_u_1XcWiLkYPhj5WlXNWbBFBYRaLxvIOVA-146af6uZC66Q"
                alt="Los Angeles Hills"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 group-hover:via-black/45 transition-all duration-500"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-headline-lg text-aurum-ivory mb-2 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Los Angeles
                </h3>
                <p className="font-label-caps text-aurum-gold mb-4 font-semibold tracking-widest text-[11px] md:text-[12px]">
                  180+ PROPERTIES
                </p>
                <p className="text-on-surface-variant font-body-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Beverly Hills · Malibu · Hollywood Hills
                </p>
                <div className="h-0.5 w-0 group-hover:w-full bg-aurum-gold transition-all duration-700 mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How It Works (The Collective Process) */}
      <section id="process" className="py-32 md:py-40 bg-surface-container-lowest relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative">
          <h2 className="font-headline-lg text-aurum-ivory mb-24 reveal-on-scroll">The Collective Process</h2>

          {/* Dotted lines - Responsive layouts */}
          <div className="relative">
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] dotted-line opacity-30"></div>

            {/* Mobile Vertical Connector Line (between steps 01 -> 02 -> 03) */}
            <div className="absolute left-[50%] -translate-x-[50%] top-12 bottom-12 w-px dotted-line-vertical md:hidden opacity-25"></div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-24 items-start">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center gap-8 reveal-on-scroll">
                <span className="font-headline-lg text-aurum-gold text-7xl md:text-[80px] bg-surface-container-lowest px-6 relative z-10 font-bold drop-shadow-[0_4px_12px_rgba(201,168,76,0.1)]">
                  01
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-headline-sm text-aurum-ivory tracking-widest uppercase font-semibold">Discover</h3>
                  <p className="text-on-surface-variant font-body-md max-w-xs mx-auto leading-relaxed">
                    Tell us your vision and budget. We curate a personal selection of properties that match your lifestyle.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative flex flex-col items-center gap-8 reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
                <span className="font-headline-lg text-aurum-gold text-7xl md:text-[80px] bg-surface-container-lowest px-6 relative z-10 font-bold drop-shadow-[0_4px_12px_rgba(201,168,76,0.1)]">
                  02
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-headline-sm text-aurum-ivory tracking-widest uppercase font-semibold">Experience</h3>
                  <p className="text-on-surface-variant font-body-md max-w-xs mx-auto leading-relaxed">
                    Private viewings at your convenience. No crowds, no pressure. Just you and your future home.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative flex flex-col items-center gap-8 reveal-on-scroll" style={{ transitionDelay: "400ms" }}>
                <span className="font-headline-lg text-aurum-gold text-7xl md:text-[80px] bg-surface-container-lowest px-6 relative z-10 font-bold drop-shadow-[0_4px_12px_rgba(201,168,76,0.1)]">
                  03
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-headline-sm text-aurum-ivory tracking-widest uppercase font-semibold">Close</h3>
                  <p className="text-on-surface-variant font-body-md max-w-xs mx-auto leading-relaxed">
                    Our experts handle every detail from negotiation to keys in hand. Seamless from offer to ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Agent Grid (Meet the Advisors) */}
      <section id="advisors" className="py-32 md:py-40 bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16">
            <span className="font-label-caps text-aurum-gold block mb-4">OUR SPECIALISTS</span>
            <h2 className="font-headline-lg text-aurum-ivory">Meet the Advisors</h2>
          </div>
          {/* Grid layout with increased margin/gap spacing for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
            {advisors.map((advisor, idx) => (
              <div key={advisor.id} className="group reveal-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative overflow-hidden rounded-3xl mb-8 grayscale hover:grayscale-0 transition-all duration-[800ms] aspect-[4/5] shadow-lg border border-white/5 group-hover:border-aurum-gold/20">
                  <img className="w-full h-full object-cover" src={advisor.image} alt={advisor.name} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 luxury-blur border-t border-white/5">
                    <a
                      href={`mailto:${advisor.email}`}
                      className="p-2 bg-background/50 rounded-full hover:bg-aurum-gold hover:text-on-primary transition-colors duration-300"
                    >
                      <span className="material-symbols-outlined text-aurum-gold group-hover:text-inherit">
                        alternate_email
                      </span>
                    </a>
                    <button className="p-2 bg-background/50 rounded-full hover:bg-aurum-gold hover:text-on-primary transition-colors duration-300">
                      <span className="material-symbols-outlined text-aurum-gold group-hover:text-inherit">share</span>
                    </button>
                  </div>
                </div>
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-headline-sm text-aurum-ivory mb-1 group-hover:text-aurum-gold transition-colors duration-300">
                    {advisor.name}
                  </h3>
                  <p className="font-label-caps text-on-surface-variant text-[10px] uppercase tracking-widest">
                    {advisor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-32 md:py-40 bg-surface-container-lowest border-y border-white/5">
        <div className="max-w-4xl mx-auto px-margin-mobile text-center reveal-on-scroll flex flex-col items-center">
          {/* Elegant serif Double Quotation mark instead of cartoonish material icon */}
          <span className="font-playfair text-aurum-gold text-8xl md:text-[140px] block h-10 leading-[0.3] select-none opacity-30 mb-8 font-serif">
            “
          </span>
          <p className="font-headline-md text-aurum-ivory italic mb-12 leading-relaxed tracking-wide px-4">
            "Aurum didn't just find us a home. They found us a life we didn't know was possible. Every detail was handled
            with a level of care I have never experienced from any agency."
          </p>
          <div className="h-px w-24 bg-aurum-gold mb-8"></div>
          <h4 className="font-label-caps text-aurum-ivory tracking-widest text-base md:text-lg mb-2">
            — Jonathan W., Manhattan
          </h4>
          <p className="font-body-md text-on-surface-variant italic">The Maddox Penthouse · $8.4M</p>
        </div>
      </section>

      {/* 10. Market Insights */}
      <section className="py-32 md:py-40 bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 rounded-3xl bg-surface-container border border-white/5 reveal-on-scroll shadow-lg flex flex-col justify-between">
              <span className="font-display-lg text-aurum-gold block mb-4 font-bold">+18%</span>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Luxury market appreciation in 2024 across our core three coastal markets.
              </p>
            </div>
            <div
              className="p-12 rounded-3xl bg-surface-container border border-white/5 reveal-on-scroll shadow-lg flex flex-col justify-between"
              style={{ transitionDelay: "200ms" }}
            >
              <span className="font-display-lg text-aurum-ivory block mb-4 font-bold">$2.1M</span>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Average transaction value closed by Aurum agents in the last fiscal year.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 reveal-on-scroll" style={{ transitionDelay: "400ms" }}>
            <span className="font-label-caps text-aurum-gold block mb-6">MARKET INTELLIGENCE</span>
            <h2 className="font-headline-lg text-aurum-ivory mb-8 leading-tight">The Luxury Market Is Outperforming</h2>
            <p className="font-body-lg text-on-surface-variant mb-10 leading-relaxed">
              Our proprietary market data provides our clients with an unfair advantage. We track not just sales, but the
              historical and cultural significance of assets that drive long-term value appreciation in the quiet luxury
              sector.
            </p>
            <a
              className="group inline-flex items-center gap-3 font-label-caps text-aurum-gold tracking-widest hover:text-aurum-ivory transition-colors"
              href="#"
            >
              READ OUR 2024 REPORT{" "}
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. Lead Capture (Redesigned as a Private Club Invite) */}
      <section id="contact" className="py-32 md:py-40 bg-surface-container-lowest relative overflow-hidden">
        {/* Glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-aurum-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile reveal-on-scroll">
          {/* Glassmorphic container with custom inner border */}
          <div className="relative bg-gradient-to-b from-[#161616]/80 to-[#0e0e0e]/95 border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl backdrop-blur-md overflow-hidden before:absolute before:inset-2 before:border before:border-aurum-gold/10 before:rounded-[20px] before:pointer-events-none">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-label-caps text-aurum-gold block mb-8 tracking-[0.25em]">GET EXCLUSIVE ACCESS</span>
              <h2 className="font-display-lg text-aurum-ivory mb-2 leading-tight">The finest properties,</h2>
              <h2 className="font-headline-lg italic text-aurum-gold mb-10">before they list.</h2>
              <p className="font-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto leading-relaxed">
                Join our private client list for early access to off-market properties and quarterly strategic market
                reports.
              </p>

              {emailSubmitted ? (
                <div className="bg-aurum-gold/10 border border-aurum-gold/30 rounded-lg p-6 text-center animate-fade-in">
                  <span className="material-symbols-outlined text-aurum-gold text-4xl mb-3">check_circle</span>
                  <h3 className="font-headline-sm text-aurum-ivory mb-1">Access Request Received</h3>
                  <p className="text-on-surface-variant font-body-md">
                    We will review your submission and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
                  <input
                    className="flex-grow bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4.5 text-aurum-ivory font-label-caps focus:outline-none focus:border-aurum-gold transition-colors placeholder:text-on-surface-variant/30 text-[12px] tracking-wider"
                    placeholder="YOUR EMAIL ADDRESS"
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-aurum-gold text-on-primary font-label-caps py-4.5 px-8 rounded-lg hover:shadow-xl hover:shadow-aurum-gold/20 hover:bg-opacity-95 transition-all active:scale-95 whitespace-nowrap cursor-pointer text-[12px]"
                  >
                    Join the Collective
                  </button>
                </form>
              )}

              <p className="font-label-caps text-[9px] text-on-surface-variant/40 tracking-widest uppercase mt-4">
                Privacy is our highest value. No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer (Redesigned structure for mobile) */}
      <footer className="bg-[#080808] pt-24 pb-16 border-t border-aurum-gold/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Main Footer Links - 2-column on mobile, 4-column on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 mb-20">
            {/* Col 1 */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-6 pr-4">
              <span className="font-headline-sm text-aurum-ivory tracking-tighter uppercase font-bold">
                Aurum Realty
              </span>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Where Luxury Finds Its Address. An architectural collective dedicated to the finest residential assets
                globally.
              </p>
              <div className="flex gap-4 mt-2">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-aurum-gold hover:border-aurum-gold/30 transition-all"
                  aria-label="Public channel"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-aurum-gold hover:border-aurum-gold/30 transition-all"
                  aria-label="Instagram camera"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-aurum-gold hover:border-aurum-gold/30 transition-all"
                  aria-label="Careers history"
                >
                  <span className="material-symbols-outlined text-[18px]">work_history</span>
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-8">
              <h4 className="font-label-caps text-aurum-ivory tracking-widest text-[11px]">Properties</h4>
              <ul className="flex flex-col gap-3 font-body-md text-on-surface-variant">
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Featured Listings
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    New York Portfolio
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Miami Collection
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Los Angeles Estates
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Off-Market Access
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-8">
              <h4 className="font-label-caps text-aurum-ivory tracking-widest text-[11px]">Company</h4>
              <ul className="flex flex-col gap-3 font-body-md text-on-surface-variant">
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Our Story
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#advisors">
                    Our Agents
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Market Reports
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Press Room
                  </a>
                </li>
                <li>
                  <a className="hover:text-aurum-gold transition-colors" href="#listings">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-8">
              <h4 className="font-label-caps text-aurum-ivory tracking-widest text-[11px]">Contact</h4>
              <ul className="flex flex-col gap-4 font-body-md text-on-surface-variant">
                <li>hello@aurumrealty.com</li>
                <li>+1 (212) 555-0190</li>
                <li className="pt-2">
                  <button className="border border-aurum-gold/40 text-aurum-gold font-label-caps py-2.5 px-6 rounded-lg hover:bg-aurum-gold hover:text-on-primary transition-all duration-300 w-full sm:w-auto">
                    Schedule a Call
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal / Copyright details */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-label-caps text-[10px] text-on-surface-variant/40 text-center md:text-left">
              © 2026 AURUM REALTY. AN ARCHITECTURAL COLLECTIVE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-wrap justify-center gap-6 font-label-caps text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
              <a className="hover:text-aurum-ivory transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-aurum-ivory transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-aurum-ivory transition-colors" href="#">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
