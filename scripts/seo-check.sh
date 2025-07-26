#!/bin/bash

# SEO Health Check Script for Cyber Physical Lab

echo "🔍 Starting SEO Health Check..."
echo "================================"

# Check if robots.txt exists
if [ -f "public/robots.txt" ]; then
    echo "✅ robots.txt found"
else
    echo "❌ robots.txt missing"
fi

# Check if sitemap exists by trying to access it
echo "🔍 Checking sitemap..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml | grep -q "200" && echo "✅ sitemap.xml accessible" || echo "❌ sitemap.xml not accessible"

# Check for meta tags in build output
echo "🔍 Checking for SEO meta tags..."
if [ -d ".next" ]; then
    grep -r "description" .next/server/pages/ > /dev/null && echo "✅ Meta descriptions found" || echo "❌ Meta descriptions not found"
    grep -r "og:" .next/server/pages/ > /dev/null && echo "✅ Open Graph tags found" || echo "❌ Open Graph tags not found"
    grep -r "twitter:" .next/server/pages/ > /dev/null && echo "✅ Twitter cards found" || echo "❌ Twitter cards not found"
else
    echo "⚠️  Build not found - run 'npm run build' first"
fi

# Check for structured data
echo "🔍 Checking structured data..."
grep -r "application/ld+json" app/ > /dev/null && echo "✅ Structured data found" || echo "❌ Structured data not found"

echo "================================"
echo "🏁 SEO Health Check Complete"

# SEO Checklist
echo ""
echo "📋 SEO Checklist:"
echo "- [ ] Meta titles (50-60 characters)"
echo "- [ ] Meta descriptions (120-160 characters)"
echo "- [ ] Open Graph images (1200x630px)"
echo "- [ ] Alt tags for images"
echo "- [ ] Canonical URLs"
echo "- [ ] XML sitemap"
echo "- [ ] robots.txt"
echo "- [ ] Structured data"
echo "- [ ] Page load speed"
echo "- [ ] Mobile responsiveness"
echo "- [ ] HTTPS"
echo "- [ ] Clean URLs"
