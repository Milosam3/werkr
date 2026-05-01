'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const SERVICE_MAP: Record<string, string[]> = {
  'electrician': ['Fault Finding', 'Distribution Boards', 'Emergency Callouts', 'General Electrical', 'COC Certificates', 'Solar Installation'],
  'plumber': ['Burst Pipes', 'Geyser Repairs', 'Drain Unblocking', 'Leak Detection', 'Bathroom Fitting', 'Emergency Callouts'],
  'panel beater': ['Accident Repairs', 'Spray Painting', 'Dent Removal', 'Bumper Repairs', 'Insurance Work', 'Full Respray'],
  'locksmith': ['Emergency Lockout', 'Lock Replacements', 'Key Cutting', 'Safe Opening', 'Security Upgrades', 'Transponder Keys'],
  'mechanic': ['Full Service', 'Engine Diagnostics', 'Brakes & Clutch', 'Tyres & Suspension', 'Gearbox Repairs', 'Roadworthy'],
  'nail': ['Acrylic Nails', 'Gel Nails', 'Nail Art', 'Manicure', 'Pedicure', 'Nail Repairs'],
  'hair': ['Cut & Style', 'Colour & Highlights', 'Keratin Treatment', 'Braids', 'Blowout', 'Extensions'],
  'barber': ['Haircut', 'Beard Trim', 'Hot Towel Shave', 'Fade & Taper', 'Kids Cuts', 'Hair Design'],
  'cellphone': ['Screen Repairs', 'Battery Replacement', 'Charging Port Fixes', 'Software Repairs', 'Water Damage', 'Unlocking'],
}

function getServices(category: string): string[] {
  const lower = category.toLowerCase()
  for (const key of Object.keys(SERVICE_MAP)) {
    if (lower.includes(key)) return SERVICE_MAP[key]
  }
  return ['Professional Service', 'Emergency Callouts', 'Free Quotes', 'Same Day Response', 'Quality Workmanship', 'Guaranteed Work']
}

function getTagline(category: string, area: string): [string, string] {
  const lower = category.toLowerCase()
  if (lower.includes('electri')) return [`${area}'s Trusted Electricians`, 'Available 24/7']
  if (lower.includes('plumb')) return [`Reliable Plumbers in ${area}`, 'Fast Response Guaranteed']
  if (lower.includes('panel') || lower.includes('autobody')) return [`Panel Beating Experts in ${area}`, 'Insurance Approved']
  if (lower.includes('lock')) return [`24/7 Locksmith in ${area}`, 'Fast & Reliable']
  if (lower.includes('mech')) return [`Trusted Mechanics in ${area}`, 'Fair Prices, Quality Work']
  if (lower.includes('nail')) return [`Nail Studio in ${area}`, 'Walk-ins Welcome']
  if (lower.includes('hair')) return [`Hair Salon in ${area}`, 'Book Today']
  if (lower.includes('barber')) return [`Barber Shop in ${area}`, 'Fresh Cuts Daily']
  if (lower.includes('cell') || lower.includes('phone')) return [`Phone Repairs in ${area}`, 'While You Wait']
  return [`${category} in ${area}`, 'Professional & Reliable']
}

const ICONS = ['⚡', '🔧', '🛡️', '📞', '⭐', '✅']

function DemoContent() {
  const params = useSearchParams()
  const name = params.get('name') || 'Your Business'
  const phone = params.get('phone') || '0800000000'
  const category = params.get('category') || 'Service Business'
  const rating = params.get('rating') || '5.0'
  const reviews = params.get('reviews') || '24'
  const area = params.get('area') || 'Johannesburg'
  const stars = Math.round(parseFloat(rating))
  const waLink = `https://wa.me/27${phone.replace(/^0/, '')}?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote`
  const fiksrWa = `https://wa.me/27828203489?text=Hey%2C%20I%27d%20like%20to%20set%20up%20Fiksr%20for%20my%20business`
  const services = getServices(category)
  const [headline, subline] = getTagline(category, area)
  const firstName = name.split(' ')[0]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0a1628', minHeight: '100vh', color: '#fff' }}>
      <div style={{ background: '#1a2a4a', borderBottom: '1px solid #2a3a5a', padding: '8px 16px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
        ⚡ Free demo by <strong style={{ color: '#f5c518' }}>Fiksr</strong> — this page could be live for {firstName} in 24hrs ·{' '}
        <a href={fiksrWa} style={{ color: '#f5c518', textDecoration: 'none' }}>Claim it →</a>
      </div>
      <nav style={{ background: '#0c1f3d', borderBottom: '1px solid #1e3a5f', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#f5c518', fontSize: 18 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{name}</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
          <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Services</a>
          <a href="#reviews" style={{ color: '#94a3b8', textDecoration: 'none' }}>Reviews</a>
          <a href={waLink} style={{ color: '#f5c518', textDecoration: 'none', fontWeight: 600 }}>Get Quote</a>
        </div>
      </nav>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px 60px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#f5c518', textTransform: 'uppercase', marginBottom: 16 }}>{name.toUpperCase()}</div>
        <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.1, margin: '0 0 12px', maxWidth: 580 }}>{headline}</h1>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#f5c518', marginBottom: 20 }}>{subline}</div>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 32, maxWidth: 500, lineHeight: 1.6 }}>Serving {area} and surrounding areas. Professional service, guaranteed workmanship, fast response times.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          {[1,2,3,4,5].map(i => (<span key={i} style={{ color: i <= stars ? '#f5c518' : '#2a3a5a', fontSize: 22 }}>★</span>))}
          <span style={{ fontWeight: 700, fontSize: 18 }}>{rating}</span>
          <span style={{ color: '#64748b', fontSize: 14 }}>({reviews} Google reviews)</span>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', fontWeight: 700, padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}>💬 WhatsApp for a Quote</a>
          <a href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 15, border: '1px solid #2a3a5a' }}>📞 Call {phone}</a>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
          {['Registered & Insured', 'Fast Response', `${area} Based`, `${reviews}+ Happy Clients`].map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}><span style={{ color: '#f5c518' }}>✓</span> {b}</div>
          ))}
        </div>
      </section>
      <section id="services" style={{ background: '#0c1f3d', padding: '60px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Our Services</h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 40 }}>Professional {category} services across {area}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {services.map((s, i) => (
              <div key={s} style={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 10, padding: '20px 24px' }}>
                <div style={{ marginBottom: 10, fontSize: 20 }}>{ICONS[i % ICONS.length]}</div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{s}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Professional service, guaranteed results</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="reviews" style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', fontSize: 20, color: '#f5c518', marginBottom: 8 }}>★★★★★</div>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>What Customers Say</h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 40 }}>{rating} stars · {reviews} reviews on Google</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {([['Excellent work, very professional and fast. Highly recommended!', 'Thabo M.'],['Called them in an emergency, arrived quickly and sorted everything. Great service.', 'Sarah K.'],['Fair pricing, quality workmanship. Will definitely use again.', 'Pieter V.']] as [string,string][]).map(([quote, author]) => (
              <div key={author} style={{ background: '#0c1f3d', border: '1px solid #1e3a5f', borderRadius: 10, padding: '20px 24px' }}>
                <div style={{ color: '#f5c518', fontSize: 14, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 16 }}>"{quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#f5c518' }}>{author[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{author}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Google Review</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#0c1f3d', borderTop: '1px solid #1e3a5f', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to get started?</h2>
        <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32 }}>WhatsApp us for a fast, free quote</p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', fontWeight: 700, padding: '16px 36px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>💬 WhatsApp {firstName} Now</a>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #1e3a5f', fontSize: 12, color: '#334155' }}>
          Demo page by <a href={fiksrWa} style={{ color: '#f5c518', textDecoration: 'none' }}>Fiksr</a> · fiksr.co.za · hello@fiksr.co.za
        </div>
      </section>
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0a1628', minHeight: '100vh' }} />}>
      <DemoContent />
    </Suspense>
  )
}
