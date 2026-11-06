# Himanshu ♥ Stuti — Premium Wedding Invitation

## Run locally
1. Install Node.js 18.17+.
2. In this folder run `npm install`
3. Run `npm run dev` and open http://localhost:3000

## Deploy to a public URL
1. Push this folder to a GitHub repository.
2. Import the repository at https://vercel.com/new
3. Framework preset: Next.js. Build command: `npm run build`.
4. Deploy. Vercel will provide the public website URL.

## Before publishing
- In `app/weddingData.js`, replace `91XXXXXXXXXX` with the family's WhatsApp number including country code.
- Add a licensed/owned music file at `public/wedding-music.mp3`. The audio toggle is included; browsers require a visitor interaction before playback.
- Replace the sample gallery photos with approved wedding photographs if available.
- Verify the exact venue pin and map directions before sharing the invitation.
- RSVP currently confirms locally in the visitor's browser; connect a form backend (e.g. Formspree/Supabase) to collect responses centrally.

All wedding copy, names, dates, and schedule are editable in `app/weddingData.js` and `app/page.js`.
# himanshustuti
