import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Download, CheckCircle, Loader2, Youtube, Instagram, Facebook, Command, LogOut, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Downloader State
    const [url, setUrl] = useState('');
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, processing, success, error

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUrl('');
        setStatus('idle');
    };

    const handleDownload = async () => {
        if (!url) return;
        setProcessing(true);
        setStatus('processing');

        // Simulate API call or Real call
        // In a real app, you'd fetch(`${BACKEND_URL}/api/download`, ...)
        setTimeout(() => {
            setProcessing(false);
            setStatus('success');
        }, 2000);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] text-white">
                <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans text-slate-50">

            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/assets/background.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px]" />
            </div>

            <AnimatePresence mode="wait">
                {!user ? (
                    /* AUTH SCREEN */
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 w-full max-w-md px-6"
                    >
                        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-[24px] overflow-hidden border">
                            <CardHeader className="text-center pb-8 pt-10">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-900/30">
                                    <Download className="h-10 w-10 text-white" />
                                </div>
                                <CardTitle className="text-3xl font-bold tracking-tight text-white mb-2">
                                    Welcome Back
                                </CardTitle>
                                <CardDescription className="text-slate-300 text-base">
                                    Sign in to access the Universal Downloader
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 pb-10 px-8">
                                <Button
                                    onClick={handleLogin}
                                    className="w-full h-14 bg-white hover:bg-slate-100 text-slate-900 font-medium text-lg rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign in with Google
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    /* DOWNLOADER SCREEN */
                    <motion.div
                        key="app"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full max-w-xl px-4"
                    >
                        {/* User Profile Header */}
                        <div className="absolute -top-16 right-4 flex items-center gap-3">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-white">{user.displayName}</span>
                                <button onClick={handleLogout} className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors">
                                    <LogOut className="h-3 w-3" /> Sign Out
                                </button>
                            </div>
                            <div className="h-10 w-10 rounded-full border-2 border-white/20 overflow-hidden bg-slate-700">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="User" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-full w-full p-2 text-slate-400" />
                                )}
                            </div>
                        </div>

                        <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                            <CardHeader className="text-center pb-2">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 shadow-lg"
                                >
                                    <Download className="h-8 w-8 text-white" />
                                </motion.div>
                                <CardTitle className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                                    Universal Downloader
                                </CardTitle>
                                <CardDescription className="text-slate-200 text-lg font-medium">
                                    Save videos from your favorite platforms
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 pt-6">

                                {/* Platform Icons */}
                                <div className="flex justify-center gap-6 text-slate-300">
                                    <Youtube className="h-6 w-6 hover:text-white transition-colors cursor-pointer hover:scale-110" />
                                    <Instagram className="h-6 w-6 hover:text-white transition-colors cursor-pointer hover:scale-110" />
                                    <Facebook className="h-6 w-6 hover:text-white transition-colors cursor-pointer hover:scale-110" />
                                    <Command className="h-6 w-6 hover:text-white transition-colors cursor-pointer hover:scale-110" />
                                </div>

                                {/* Input Section */}
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Link2 className="h-5 w-5 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                                        </div>
                                        <Input
                                            type="url"
                                            placeholder="Paste video URL here..."
                                            className="pl-11 h-16 bg-black/20 border-white/10 text-white placeholder:text-slate-400 hover:bg-black/30 focus:bg-black/40 focus:border-violet-500/50 rounded-2xl transition-all duration-300 text-lg shadow-inner"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        onClick={handleDownload}
                                        disabled={processing || !url}
                                        className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-900/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : status === 'success' ? (
                                            <>
                                                <CheckCircle className="mr-2 h-5 w-5" />
                                                Ready to Download
                                            </>
                                        ) : (
                                            <>
                                                <Download className="mr-2 h-5 w-5" />
                                                Download Video
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Disclaimer */}
                                <p className="text-center text-xs text-slate-400/80 mt-4">
                                    By using this tool, you agree to our Terms of Service. Please respect copyright laws.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
