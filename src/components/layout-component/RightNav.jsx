import SocialLogin from "../SocialLogin";
import FindUs from "../FindUs";
import Qzone from "../Qzone";
import Advertise from "../Advertise";
import NewsletterSubscribe from "../NewsletterSubscribe";
import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";

const RightNav = () => {
  return (
    <div className="space-y-6">
      {/* Newsletter Signup Widget */}
      <NewsletterSubscribe variant="card" />

      {/* Pro Membership Banner */}
      <div className="p-5 bg-gradient-to-br from-amber-50 via-white to-amber-100/40 border-2 border-amber-200/80 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 bg-amber-500 text-white rounded-lg shadow-2xs">
            <Crown className="w-4 h-4" />
          </span>
          <h4 className="font-black text-gray-950 text-sm">
            Dragon Insider VIP
          </h4>
        </div>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed font-normal">
          Unlock weekly investigative deep dives, uncurated raw source documents, and ad-free audio narration.
        </p>
        <Link
          href="/pricing"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-600/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explore Membership Plans</span>
        </Link>
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Find Us */}
      <FindUs />

      {/* Q-Zone */}
      <Qzone />

      {/* Sponsor / Advertise */}
      <Advertise />
    </div>
  );
};

export default RightNav;