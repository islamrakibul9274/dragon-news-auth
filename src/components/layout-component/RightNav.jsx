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
      <div className="p-4 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/30 rounded-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 bg-amber-500 text-white rounded-lg">
            <Crown className="w-4 h-4" />
          </span>
          <h4 className="font-bold text-gray-900 text-sm">
            Dragon Insider VIP
          </h4>
        </div>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          Unlock weekly investigative deep dives, uncurated raw source documents, and ad-free audio narration.
        </p>
        <Link
          href="/pricing"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-black text-amber-300 font-semibold text-xs rounded-xl transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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