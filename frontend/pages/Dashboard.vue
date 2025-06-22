<template>
    <div class="dashboard-page relative overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-white min-h-screen">
        <!-- Decorative Background Elements -->
        <div class="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-[#13325e]/10 to-[#0e2a52]/5 blur-3xl -z-10"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-[#f15a22]/10 to-orange-400/5 blur-3xl -z-10"></div>

        <!-- Page Header -->
        <section class="pt-10 pb-6 px-6">
            <div class="container mx-auto">
                <div class="flex flex-wrap items-center justify-between">
                    <div v-motion-slide-visible-once-bottom>
                        <h1 class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#13325e] to-[#0e2a52]">
                            Dashboard Overview
                        </h1>
                        <p class="text-[#13325e]/70 mt-2">Welcome to your personalized Phillip Trustee dashboard</p>
                    </div>
                    <div class="flex items-center gap-4" v-motion-slide-visible-once-bottom>
                        <div class="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                            <span class="text-[#13325e]/60">Last updated:</span>
                            <span class="font-semibold text-[#13325e]">{{ new Date().toLocaleDateString() }}</span>
                        </div>
                        <button class="bg-gradient-to-r from-[#f15a22] to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-orange-500/20 flex items-center gap-2 hover:shadow-orange-500/30 transition-all duration-300 transform hover:translate-y-[-2px]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh Data
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Dashboard Content -->
        <section class="px-6 pb-16">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Left Column - Text and Info -->
                    <div class="lg:col-span-1">
                        <!-- Overview Card -->
                        <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 mb-8" v-motion-slide-visible-once-bottom>
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-xl font-bold text-[#13325e]">Account Summary</h2>
                                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#13325e] to-[#0e2a52] flex items-center justify-center shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-[#13325e]/10 flex items-center justify-center text-[#13325e]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-[#13325e]/60">Email</div>
                                        <div class="font-medium text-[#13325e]">client@example.com</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-[#13325e]/10 flex items-center justify-center text-[#13325e]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-[#13325e]/60">Phone</div>
                                        <div class="font-medium text-[#13325e]">+855 23 922 222</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-[#13325e]/10 flex items-center justify-center text-[#13325e]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-[#13325e]/60">Member Since</div>
                                        <div class="font-medium text-[#13325e]">January 15, 2023</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-[#f15a22]/10 flex items-center justify-center text-[#f15a22]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-[#13325e]/60">Status</div>
                                        <div class="font-medium text-[#f15a22]">Active Client</div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 pt-6 border-t border-[#e6eaf0]">
                                <button class="w-full bg-[#13325e]/10 hover:bg-[#13325e]/20 text-[#13325e] font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                        
                        <!-- Trust Information Card -->
                        <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 mb-8" v-motion-slide-visible-once-bottom>
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-xl font-bold text-[#13325e]">Trust Information</h2>
                                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#f15a22] to-orange-500 flex items-center justify-center shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="space-y-4">
                                <div class="bg-gradient-to-r from-[#13325e]/10 to-[#0e2a52]/5 p-4 rounded-lg">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Trust Type</div>
                                    <div class="font-medium text-[#13325e]">Property Protection Trust</div>
                                </div>
                                
                                <div class="bg-gradient-to-r from-[#13325e]/10 to-[#0e2a52]/5 p-4 rounded-lg">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Trust ID</div>
                                    <div class="font-medium text-[#13325e]">PT-2023-10542</div>
                                </div>
                                
                                <div class="bg-gradient-to-r from-[#13325e]/10 to-[#0e2a52]/5 p-4 rounded-lg">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Trust Manager</div>
                                    <div class="font-medium text-[#13325e]">Mr. Sopheap Lay</div>
                                </div>
                                
                                <div class="p-4 bg-gradient-to-r from-[#f15a22]/10 to-orange-500/5 rounded-lg">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Next Review Date</div>
                                    <div class="font-medium text-[#f15a22]">September 15, 2025</div>
                                </div>
                            </div>
                            
                            <div class="mt-6 pt-6 border-t border-[#e6eaf0]">
                                <button class="w-full bg-gradient-to-r from-[#f15a22] to-orange-500 text-white font-medium py-2 rounded-lg shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Trust Details
                                </button>
                            </div>
                        </div>
                        
                        <!-- Support Card -->
                        <div class="bg-gradient-to-br from-[#13325e] to-[#0e2a52] text-white rounded-2xl shadow-xl p-6" v-motion-slide-visible-once-bottom>
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-xl font-bold">Need Assistance?</h2>
                                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p class="text-white/80 mb-6">
                                Our team of trust experts is available to assist you with any questions or concerns regarding your trust.
                            </p>
                            <div class="space-y-4">
                                <a href="tel:+85523922222" class="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+855 23 922 222</span>
                                </a>
                                <a href="mailto:support@philliptrustee.com.kh" class="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>support@philliptrustee.com.kh</span>
                                </a>
                            </div>
                            <div class="mt-6 pt-6 border-t border-white/20">
                                <button class="w-full bg-white text-[#13325e] font-bold py-2 rounded-lg hover:bg-white/90 transition-colors">
                                    Schedule a Meeting
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column - Main Dashboard Components -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- Trust Overview Card -->
                        <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6" v-motion-slide-visible-once-bottom>
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h2 class="text-xl font-bold text-[#13325e]">Portfolio Overview</h2>
                                    <p class="text-[#13325e]/60 text-sm">Current trust asset valuation summary</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="text-[#13325e]/60 text-sm">
                                        Last updated: <span class="font-medium text-[#13325e]">June 15, 2025</span>
                                    </div>
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#13325e]/5 text-[#13325e]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Portfolio Chart -->
                            <div class="h-64 mb-6 bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                                <!-- Sample chart placeholder -->
                                <div class="text-center">
                                    <div class="mb-3 text-[#13325e]/40">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16h16" />
                                        </svg>
                                    </div>
                                    <p class="text-[#13325e]/60">Interactive chart visualization</p>
                                    <p class="text-sm text-[#13325e]/40">Asset performance over time</p>
                                </div>
                            </div>
                            
                            <!-- Asset summary -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-[#13325e]/5 rounded-lg p-4">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Total Trust Value</div>
                                    <div class="font-bold text-xl text-[#13325e]">$2,950,000</div>
                                    <div class="flex items-center mt-1 text-green-600 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <span class="ml-1">+4.2% since last quarter</span>
                                    </div>
                                </div>
                                <div class="bg-[#13325e]/5 rounded-lg p-4">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Property Assets</div>
                                    <div class="font-bold text-xl text-[#13325e]">3 Properties</div>
                                    <div class="flex items-center mt-1 text-[#f15a22] text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span class="ml-1">Total area: 850m²</span>
                                    </div>
                                </div>
                                <div class="bg-[#13325e]/5 rounded-lg p-4">
                                    <div class="text-sm font-medium text-[#13325e]/70 mb-1">Annual Return</div>
                                    <div class="font-bold text-xl text-[#13325e]">8.5%</div>
                                    <div class="flex items-center mt-1 text-green-600 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <span class="ml-1">+1.3% from previous year</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Properties Card -->
                        <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6" v-motion-slide-visible-once-bottom>
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h2 class="text-xl font-bold text-[#13325e]">Trust Properties</h2>
                                    <p class="text-[#13325e]/60 text-sm">Your property portfolio</p>
                                </div>
                                <button class="bg-[#13325e]/10 hover:bg-[#13325e]/20 text-[#13325e] font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    View All Properties
                                </button>
                            </div>
                            
                            <!-- Property Cards -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Property 1 -->
                                <div class="bg-gradient-to-br from-[#13325e]/5 to-[#0e2a52]/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
                                    <div class="h-48 relative overflow-hidden">
                                        <img src="/images/partners/1_Rose_Mavel.jpg" alt="Property 1" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110">
                                        <div class="absolute top-3 left-3">
                                            <span class="bg-[#f15a22] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                                Commercial
                                            </span>
                                        </div>
                                    </div>
                                    <div class="p-4">
                                        <h3 class="font-bold text-[#13325e] text-lg mb-2">Rose Marvel Building</h3>
                                        <p class="text-[#13325e]/70 text-sm mb-4">Monivong Blvd., Sangkat Boeung Keng Kang, Khan Chamkarmon, Phnom Penh</p>
                                        
                                        <div class="flex items-center justify-between text-sm">
                                            <div class="flex items-center gap-2">
                                                <div class="w-6 h-6 rounded-full bg-[#13325e]/10 flex items-center justify-center text-[#13325e]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <span>Office Complex</span>
                                            </div>
                                            <div class="font-semibold text-[#f15a22]">$1,250,000</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Property 2 -->
                                <div class="bg-gradient-to-br from-[#13325e]/5 to-[#0e2a52]/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
                                    <div class="h-48 relative overflow-hidden">
                                        <img src="/images/partners/2_La_Maision.jpg" alt="Property 2" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110">
                                        <div class="absolute top-3 left-3">
                                            <span class="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                                Residential
                                            </span>
                                        </div>
                                    </div>
                                    <div class="p-4">
                                        <h3 class="font-bold text-[#13325e] text-lg mb-2">La Maison Residence</h3>
                                        <p class="text-[#13325e]/70 text-sm mb-4">Street 63, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh</p>
                                        
                                        <div class="flex items-center justify-between text-sm">
                                            <div class="flex items-center gap-2">
                                                <div class="w-6 h-6 rounded-full bg-[#13325e]/10 flex items-center justify-center text-[#13325e]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                </div>
                                                <span>Condominium</span>
                                            </div>
                                            <div class="font-semibold text-[#f15a22]">$950,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Recent Activities -->
                        <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6" v-motion-slide-visible-once-bottom>
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h2 class="text-xl font-bold text-[#13325e]">Recent Activities</h2>
                                    <p class="text-[#13325e]/60 text-sm">Latest updates on your trust</p>
                                </div>
                                <button class="text-[#13325e] hover:text-[#f15a22] transition-colors">
                                    View All
                                </button>
                            </div>
                            
                            <!-- Activity Timeline -->
                            <div class="space-y-6">
                                <div class="flex gap-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex justify-between">
                                            <h3 class="font-semibold text-[#13325e]">Annual Trust Review Completed</h3>
                                            <span class="text-[#13325e]/60 text-sm">2 days ago</span>
                                        </div>
                                        <p class="text-[#13325e]/70 mt-1">The annual review of your trust has been completed. No immediate actions required.</p>
                                    </div>
                                </div>
                                
                                <div class="flex gap-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex justify-between">
                                            <h3 class="font-semibold text-[#13325e]">Property Valuation Scheduled</h3>
                                            <span class="text-[#13325e]/60 text-sm">1 week ago</span>
                                        </div>
                                        <p class="text-[#13325e]/70 mt-1">A new property valuation has been scheduled for La Maison Residence on July 10, 2025.</p>
                                    </div>
                                </div>
                                
                                <div class="flex gap-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 rounded-full bg-[#f15a22]/10 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex justify-between">
                                            <h3 class="font-semibold text-[#13325e]">Quarterly Distribution Processed</h3>
                                            <span class="text-[#13325e]/60 text-sm">2 weeks ago</span>
                                        </div>
                                        <p class="text-[#13325e]/70 mt-1">Quarterly distribution of $42,500 has been processed and transferred to your designated account.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-6 pt-6 border-t border-[#e6eaf0] text-center">
                                <button class="text-[#13325e] hover:text-[#f15a22] transition-colors text-sm font-medium flex items-center justify-center gap-1 mx-auto">
                                    <span>Load more activities</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-motion-slide-visible-once-bottom>
                            <!-- Action 1 -->
                            <div class="bg-gradient-to-br from-[#13325e] to-[#0e2a52] text-white rounded-xl p-5 shadow-xl transition-transform hover:-translate-y-1 cursor-pointer">
                                <div class="flex justify-between items-start">
                                    <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div class="text-white/50 text-sm">Quick Access</div>
                                </div>
                                <h3 class="font-bold text-xl mb-2">Financial Statements</h3>
                                <p class="text-white/80 text-sm mb-4">Access your latest financial reports and statements</p>
                                <div class="flex justify-end">
                                    <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action 2 -->
                            <div class="bg-gradient-to-br from-[#f15a22] to-orange-500 text-white rounded-xl p-5 shadow-xl transition-transform hover:-translate-y-1 cursor-pointer">
                                <div class="flex justify-between items-start">
                                    <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div class="text-white/50 text-sm">Quick Access</div>
                                </div>
                                <h3 class="font-bold text-xl mb-2">Schedule Meeting</h3>
                                <p class="text-white/80 text-sm mb-4">Book an appointment with your trust manager</p>
                                <div class="flex justify-end">
                                    <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action 3 -->
                            <div class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-5 shadow-xl transition-transform hover:-translate-y-1 cursor-pointer">
                                <div class="flex justify-between items-start">
                                    <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div class="text-white/50 text-sm">Quick Access</div>
                                </div>
                                <h3 class="font-bold text-xl mb-2">Trust Documents</h3>
                                <p class="text-white/80 text-sm mb-4">View and download your legal trust documents</p>
                                <div class="flex justify-end">
                                    <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Import any necessary components or composables
</script>

<style scoped>
/* Add animations for float effect */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    33% {
        transform: translateY(-10px);
    }
    66% {
        transform: translateY(5px);
    }
}

.animate-float {
    animation: float 8s ease-in-out infinite;
}

.animate-float-delay {
    animation: float 10s ease-in-out 2s infinite;
}

/* Add animation for bounce effect */
@keyframes bounce-slow {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 4s infinite ease-in-out;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
</style>
