"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Heart,
  Link2,
  LoaderCircle,
  MapPin,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import {firebase } from "../../Firebase/config";

export default function CreateInvitationPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invitations, setInvitations] = useState([]);
const db = firebase.firestore()
  // Fetch all created invitations in real-time
  useEffect(() => {
    const q = query(
      collection(db, "weddingInvitations"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inviteDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvitations(inviteDocs);
    });

    return () => unsubscribe();
  }, []);

  const generateLink = async (event) => {
    event.preventDefault();
    setError("");
    setGeneratedLink("");

    const guestName = name.trim();
    const guestLocation = location.trim();

    if (!guestName || !guestLocation) {
      setError("Please enter both guest name and location.");
      return;
    }

    setLoading(true);

    try {
      const invitationRef = await addDoc(collection(db, "weddingInvitations"), {
        name: guestName,
        location: guestLocation,
        createdAt: serverTimestamp(),
      });

      const invitationUrl = new URL("/", window.location.origin);
      invitationUrl.searchParams.set("invite", invitationRef.id);

      setGeneratedLink(invitationUrl.toString());
      setCopied(false);
      
      // Clear form after successful creation
      setName("");
      setLocation("");
    } catch (err) {
      console.error("Invitation creation failed:", err);
      setError("Could not create the invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async (linkToCopy) => {
    if (!linkToCopy) return;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Copy failed. Please select and copy the link manually.");
    }
  };

  const shareWhatsApp = (link, guestName) => {
    if (!link) return;

    const message =
      `Dear ${guestName.trim()},\n\n` +
      "You are cordially invited to the wedding celebration of Himanshu & Stuti.\n\n" +
      `Please open your personalized wedding invitation:\n${link}\n\n` +
      "With love and blessings ❤️";

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Helper to construct URLs for the list
  const getInviteUrl = (id) => {
    if (typeof window === "undefined") return "";
    const url = new URL("/", window.location.origin);
    url.searchParams.set("invite", id);
    return url.toString();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#260b16] px-4 py-8 text-[#fff1d7] sm:py-12">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(132,65,55,0.3),transparent_65%)]" />

      <div className="relative mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b46b]/50 bg-[#3b1420]">
            <Heart size={25} className="text-[#e5bd72]" fill="currentColor" />
          </div>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#d8b46b]">
            H ♥ S · WEDDING 2026
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
            Invitation Generator
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#e9c77e]/70 sm:text-sm">
            Create a unique, personalized wedding invitation link for every guest.
          </p>
        </header>

        {/* Form Section */}
        <section className="mb-8 rounded-2xl border border-[#d8b46b]/40 bg-[#3b1420]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="text-[#e5bd72]" size={20} />
            <div>
              <h2 className="font-serif text-xl">Create Guest Link</h2>
              <p className="text-[10px] text-[#e9c77e]/60">
                NO LOGIN REQUIRED
              </p>
            </div>
          </div>

          <form onSubmit={generateLink}>
            <label className="mb-2 block text-xs font-semibold text-[#e5bd72]">
              Guest Full Name
            </label>
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#d8b46b]/30 bg-[#260b16]/60 px-4 focus-within:border-[#e5bd72]">
              <UserRound size={17} className="shrink-0 text-[#d8b46b]" />
              <input
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setGeneratedLink("");
                }}
                placeholder="e.g. Rohit Kumar"
                className="w-full bg-transparent py-3.5 text-sm text-[#fff1d7] outline-none placeholder:text-[#fff1d7]/35"
              />
            </div>

            <label className="mb-2 block text-xs font-semibold text-[#e5bd72]">
              Guest Location
            </label>
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#d8b46b]/30 bg-[#260b16]/60 px-4 focus-within:border-[#e5bd72]">
              <MapPin size={17} className="shrink-0 text-[#d8b46b]" />
              <input
                type="text"
                required
                maxLength={150}
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setGeneratedLink("");
                }}
                placeholder="e.g. Sasaram, Bihar"
                className="w-full bg-transparent py-3.5 text-sm text-[#fff1d7] outline-none placeholder:text-[#fff1d7]/35"
              />
            </div>

            <div className="mb-6 rounded-xl border border-[#d8b46b]/20 bg-[#260b16]/40 p-4">
              <p className="mb-4 text-center text-[9px] font-semibold tracking-[0.25em] text-[#d8b46b]">
                LIVE INVITATION PREVIEW
              </p>
              <div className="rounded-xl border border-[#d8b46b]/25 bg-[#260b16]/50 px-3 py-5 text-center">
                <p className="text-[9px] tracking-[0.3em] text-[#d8b46b]">
                  A SPECIAL INVITATION FOR
                </p>
                <h3 className="mt-2 break-words font-serif text-2xl italic text-[#fff1d7]">
                  {name.trim() || "Guest Name"}
                </h3>
                <div className="my-2 text-xs text-[#e5bd72]">── ✦ ──</div>
                <p className="flex items-center justify-center gap-2 text-[10px] text-[#e9c77e]/80">
                  <MapPin size={12} />
                  {location.trim() || "Guest Location"}
                </p>
                <p className="mt-2 text-[9px] tracking-wider text-[#e9c77e]/70">
                  YOUR PRESENCE WILL MAKE OUR DAY SPECIAL
                </p>
              </div>
            </div>

            {error && (
              <p className="mb-4 rounded-lg border border-red-400/30 bg-red-950/30 px-3 py-2 text-xs text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e4c17c] via-[#f5e2b7] to-[#c9984e] px-5 py-3.5 text-xs font-bold tracking-wider text-[#3c1420] shadow-lg transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Link2 size={17} />
              )}
              {loading ? "CREATING LINK..." : "GENERATE INVITATION LINK"}
            </button>
          </form>

          {generatedLink && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-[#e5bd72]">
                <Check size={17} />
                <p className="text-xs font-semibold">
                  INVITATION LINK CREATED SUCCESSFULLY
                </p>
              </div>
              <div className="break-all rounded-xl border border-[#d8b46b]/30 bg-[#260b16] p-3 text-[11px] leading-6 text-[#e9c77e]">
                {generatedLink}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => copyLink(generatedLink)}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#d8b46b]/50 px-3 py-3 text-xs font-semibold text-[#fff1d7] transition hover:bg-[#d8b46b]/10"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "COPIED" : "COPY LINK"}
                </button>
                <button
                  type="button"
                  onClick={() => shareWhatsApp(generatedLink, name)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#d8b46b] px-3 py-3 text-xs font-bold text-[#260b16] transition hover:bg-[#edcf91]"
                >
                  <Share2 size={15} />
                  WHATSAPP
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Database List Section */}
        <section className="rounded-2xl border border-[#d8b46b]/40 bg-[#3b1420]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <h2 className="mb-5 font-serif text-xl text-[#e5bd72]">
            Created Invitations ({invitations.length})
          </h2>
          
          <div className="max-h-96 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {invitations.length === 0 ? (
              <p className="text-center text-xs text-[#e9c77e]/60 py-6">
                No invitations created yet.
              </p>
            ) : (
              invitations.map((invite) => {
                const inviteLink = getInviteUrl(invite.id);
                return (
                  <div
                    key={invite.id}
                    className="flex flex-col gap-3 rounded-xl border border-[#d8b46b]/20 bg-[#260b16]/60 p-4 transition hover:border-[#d8b46b]/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-serif text-lg text-[#fff1d7]">
                        {invite.name}
                      </h3>
                      <p className="flex items-center gap-1.5 text-xs text-[#e9c77e]/70">
                        <MapPin size={12} />
                        {invite.location}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <a
                        href={inviteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-[#d8b46b]/30 bg-transparent px-3 py-2 text-[10px] font-semibold text-[#e5bd72] transition hover:bg-[#d8b46b]/10"
                      >
                        <Link2 size={12} />
                        VIEW
                      </a>
                      <button
                        onClick={() => shareWhatsApp(inviteLink, invite.name)}
                        className="flex items-center gap-1.5 rounded-full bg-[#d8b46b] px-3 py-2 text-[10px] font-bold text-[#260b16] transition hover:bg-[#edcf91]"
                      >
                        <Share2 size={12} />
                        SHARE
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <p className="mt-7 text-center text-[9px] tracking-[0.2em] text-[#d8b46b]/60">
          H ♥ S · MADE WITH LOVE & BLESSINGS
        </p>
      </div>
    </main>
  );
}