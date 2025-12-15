import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Download, CheckCircle, Loader2, Youtube, Instagram, Facebook, Command } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const App = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, processing, success, error

    const handleDownload = async () => {
        if (!url) return;
        setLoading(true);
        setStatus('processing');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
        }, 2000);
    };

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
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
            </div>

            {/* Main Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-xl px-4"
            >
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
                            <Youtube className="h-6 w-6 hover:text-white transition-colors cursor-pointer" />
                            <Instagram className="h-6 w-6 hover:text-white transition-colors cursor-pointer" />
                            <Facebook className="h-6 w-6 hover:text-white transition-colors cursor-pointer" />
                            <Command className="h-6 w-6 hover:text-white transition-colors cursor-pointer" /> {/* X/Twitter placeholder */}
                        </div>

                        {/* Input Section */}
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Link2 className="h-5 w-5 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                                </div>
                                <Input
                                    type="url"
                                    placeholder="Paste URL here..."
                                    className="pl-11 h-14 bg-black/20 border-white/10 text-white placeholder:text-slate-400 hover:bg-black/30 focus:bg-black/40 focus:border-violet-500/50 rounded-2xl transition-all duration-300 text-lg"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>

                            <Button
                                onClick={handleDownload}
                                disabled={loading || !url}
                                className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-900/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? (
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
        </div>
    );
};

export default App;
