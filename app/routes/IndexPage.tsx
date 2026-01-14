import { Link } from "@remix-run/react";
import { GlassCard } from "~/components/GlassCard";
import { route } from "routes-gen";

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 mt-8 max-w-4xl mx-auto px-4 z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 animate-fade-in drop-shadow-sm">
          Kisan Diary
        </h1>
        <p className="text-xl md:text-2xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
          Empowering farmers with smart insights, crop tracking, and expert connections.
        </p>
        <div className="flex gap-4 justify-center mt-8">
            <Link 
                to={route("/login")} 
                className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:bg-primary-700 hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1"
            >
                Get Started
            </Link>
             <Link 
                to={route("/join")} 
                className="px-8 py-3 bg-white/80 backdrop-blur-md text-primary-700 border border-primary-200 rounded-full font-semibold shadow-sm hover:bg-white transition-all"
            >
                Sign Up
            </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
         <GlassCard className="text-center space-y-4 hover:scale-105 transition-transform duration-300">
             <div className="text-5xl mb-4">🌾</div>
             <h3 className="text-xl font-bold text-primary-800">Crop Management</h3>
             <p className="text-surface-600">Track your crops from sowing to harvesting. Manage expenses, yield, and schedules in one place.</p>
         </GlassCard>
         <GlassCard className="text-center space-y-4 hover:scale-105 transition-transform duration-300">
             <div className="text-5xl mb-4">👨‍🎓</div>
             <h3 className="text-xl font-bold text-primary-800">Expert Advice</h3>
             <p className="text-surface-600">Connect with agricultural experts for real-time guidance on pests, diseases, and best practices.</p>
         </GlassCard>
         <GlassCard className="text-center space-y-4 hover:scale-105 transition-transform duration-300">
             <div className="text-5xl mb-4">📊</div>
             <h3 className="text-xl font-bold text-primary-800">Smart Analytics</h3>
             <p className="text-surface-600">Get powerful insights into your farm's performance and profitability with visual dashboards.</p>
         </GlassCard>
      </section>
    </div>
  );
}
