'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function DemoContent() {
  const params = useSearchParams()

  const name = params.get('name') || 'Your Business Name'
  const phone = params.get('phone') || '0800000000'
  const category = params.get('category') || 'Service Business'
  const rating = params.get('rating') || '5.0'
  const reviews = params.get('reviews') || '0'
  const area = params.get('area') || 'Johannesburg'

  const stars = Math.round(parseFloat(rating))
  const waLink = `https://wa.me/27${phone.replace(/^0/, '')}`
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* Top bar */}
      <div className="bg-green-600 text-white text-center text-sm py-2 px-4 font-medium">
        ⚡ This is a free demo built by Fiksr — claim your live page in 10 minutes
      </div>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-8">

        {/* Business card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-2xl font-bold mb-5">
            {name.charAt(0)}
          </div>

          <h1 className="text-2xl font-bold mb-1">{name}</h1>
          <p className="text-zinc-400 text-sm mb-4">{category} · {area}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={i <= stars ? 'text-yellow-400' : 'text-zinc-700'} style={{fontSize: 16}}>★</span>
              ))}
            </div>
            <span className="text-white font-semibold">{rating}</span>
            <span className="text-zinc-400 text-sm">({reviews} Google reviews)</span>
          </div>

          {/* CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition-colors text-base"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.522 5.84L.057 23.5a.5.5 0 0 0 .61.61l5.66-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.677-.52-5.197-1.427l-.373-.22-3.865 1.001 1.001-3.865-.22-.373A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp {name.split(' ')[0]}
          </a>

          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-2 w-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium py-3 rounded-xl transition-colors text-sm mt-3"
          >
            📞 Call {phone}
          </a>
        </div>

        {/* What Werkr does */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold mb-4 text-zinc-300">What you're missing without a system</h2>
          <div className="space-y-3">
            {[
              ['Missed WhatsApp enquiries', 'Customers message, no reply, they move on'],
              ['No quote follow-up', 'You quote, never follow up, lose the job'],
              ['No lead capture', 'Calls come in, no record, no history'],
              ['Manual everything', 'Reminders, invoices, job tracking — all in your head'],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <span className="text-red-400 mt-0.5" style={{fontSize: 14}}>✕</span>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-zinc-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Werkr fixes */}
        <div className="bg-zinc-900 border border-green-900 rounded-2xl p-6 mb-8">
          <h2 className="text-base font-semibold mb-4 text-green-400">Werkr fixes all of this via WhatsApp</h2>
          <div className="space-y-3">
            {[
              'Every enquiry captured and replied to automatically',
              'Quotes sent as PDFs, followed up 48hrs later',
              'Full job history per client, tracked from quote to invoice',
              'All through WhatsApp — no app, no portal, no training',
            ].map(point => (
              <div key={point} className="flex gap-3">
                <span className="text-green-400 mt-0.5" style={{fontSize: 14}}>✓</span>
                <p className="text-sm text-zinc-300">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <p className="text-zinc-400 text-sm mb-4">From R349/mo · Setup in 24hrs · No contract</p>
          <a
            href="https://wa.me/27828203489?text=Hey%2C%20I%27d%20like%20to%20set%20up%20Fiksr%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Get Fiksr for {name.split(' ')[0]} →
          </a>
          <p className="text-zinc-600 text-xs mt-4">fiksr.co.za · hello@fiksr.co.za</p>
        </div>

      </div>
    </main>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <DemoContent />
    </Suspense>
  )
}
